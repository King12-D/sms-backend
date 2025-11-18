import express from "express";
import { generateCard, getCard } from "./card.controllers";

const router = express.Router();

router.post("/generate", generateCard);
router.get("/", getCard);

export const cardRoute = router;
