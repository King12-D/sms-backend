import type { Request, Response } from "express";
import { asyncWrapper } from "../../common/utils";
import { User } from "./user.schema";

//Get all users routes
export const getAllUsers = asyncWrapper(async (req: Request, res: Response) => {
  const users = await User.find();

  if (!users || users.length === 0)
    return res.status(400).json({ message: "No user found or created" });

  return res.status(200).json({
    success: true,
    count: users.length,
    data: users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })),
  });
});

//Get a user by id
export const getUserById = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) return res.status(404).json({ message: "User not found 😕" });

  return res.status(200).json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

//Update a user data
export const updateUser = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(
    { _id: id, user: req.user.id },
    req.body,
    { new: true }
  );

  if (!user)
    return res.status(400).json({
      success: false,
      message: "User details not updated😕",
      error: "User not found",
    });

  return res.status(200).json({
    success: true,
    message: "User details updated succefully",
    data: user,
  });
});

//Delete a user account
export const deleteUser = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user)
    return res.status(400).json({
      error: "User does not exist",
      message: "User not deleted",
    });

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
