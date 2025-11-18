import type { Request, Response } from "express";
import { asyncWrapper } from "../../common/utils";
import Admin from "./admin.models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createAdmin = asyncWrapper(async (req: Request, res: Response) => {
  const {
    email,
    password,
    role,
    schoolName,
    schoolAddress,
    schoolEmail,
    schoolPhone,
    adminName,
    adminPhone,
  } = req.body;

  //Check if user already exists in the database
  const existing = await Admin.findOne({ email });

  if (existing)
    return res.status(404).json({
      success: false,
      message: "Admin with this email aready exists",
    });

  //Hash admin password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //Create new admin
  const newAdmin = new Admin({
    schoolName: schoolName,
    schoolAddress: schoolAddress,
    schoolEmail: schoolEmail,
    schoolPhone: schoolPhone,
    adminName: adminName,
    email: email,
    adminPhone: adminPhone,
    password: hash,
    role,
  });

  await newAdmin.save();

  //Generate token for that session
  const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  //Return the creation details
  return res.status(201).json({
    success: true,
    message: "Admin created successfully✅",
    data: {
      admin: {
        id: newAdmin._id,
        token,
        adminName: newAdmin.adminName,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    },
  });
});

//Create admin login route
export const login = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //Confirm the admin exists
  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin)
    return res.status(400).json({
      success: false,
      message: "User not found!",
    });

  //Compare password sent with exiting password in the database
  const match = await bcrypt.compare(password, admin.password);
  if (!match)
    return res.status(400).json({
      success: false,
      message: "Error: email or password invalid😕",
    });

  //Create a token for each session
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  if (!token)
    return res.status(400).json({ message: "Error: Invalid or expired token" });

  //Return the data
  return res.status(200).json({
    success: true,
    message: "User logged in successfully✅",
    admin: {
      id: admin._id,
      token,
      email: admin.email,
      role: admin.role,
    },
  });
});
