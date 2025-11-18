import type { Request, Response } from "express";
import { asyncWrapper } from "../../common/utils";
import Card from "./card.models";

//Generate serial number for Scratch Cards
const generateSerial = (i: any) => {
  return `SC-${new Date().getFullYear()}-${String(i).padStart(6, "0")}`;
};

//Generate pin for Scratch Cards
const generatePin = () => {
  const chars = "0123456789";
  let pin = "";

  for (let i = 0; i < 12; i++) {
    pin += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return pin.match(/.{1,4}/g)?.join("-");
};

//Configure generate scratch card route
export const generateCard = asyncWrapper(
  async (req: Request, res: Response) => {
    const { quantity, price } = req.body;

    if (!quantity || quantity <= 0)
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be empty",
      });

    const cards = [];

    //Generate cards from the request sent
    for (let i = 1; i <= quantity; i++) {
      cards.push({
        serial: generateSerial(Date.now() + i),
        pin: generatePin(),
        price,
        status: "unused",
      });
    }

    //Save to the database
    await Card.insertMany(cards);

    res.status(201).json({
      success: true,
      message: "Scratch Cards created successfuly✅",
      count: quantity,
      cards,
    });
  }
);

export const getCard = asyncWrapper(async (req: Request, res: Response) => {
  const cards = await Card.find();

  if (!cards || cards <= [])
    return res.status(400).json({
      success: false,
      message: "No card created!",
    });

  return res.status(200).json({
    success: true,
    cards,
  });
});
