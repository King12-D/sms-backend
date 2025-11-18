import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { asyncWrapper } from "../../common/utils";
import { User } from "../users/user.schema";
import bcrypt from "bcryptjs";

//Create a signup controller
export const signUp = asyncWrapper(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  //Check if user already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res
      .status(400)
      .json({ message: "User with this email already exists" });

  //Hash the users password on signUp
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Create the new user
  const newUser = new User({
    name: name,
    email: email,
    password: hashPassword,
    role,
  });

  await newUser.save();

  //Generate a token for that session
  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  //Return the signUp details
  return res.status(201).json({
    id: newUser._id,
    token,
    name: newUser.name,
    email: newUser.email,
    role: role,
  });
});

//Create a login controller
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //Check for user in the database
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    //Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect email or password" });

    //Create a session token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    if (!token) return res.status(400).json({ message: "Error loggin in" });

    //Return user data
    return res.status(200).json({
      message: "User logged in successfully!",
      user: {
        id: user._id,
        token,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error(error.message);
    return res.status(400).json({ message: "error, input fields required" });
  }
};
