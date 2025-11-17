import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./user.controller";
import { authorize, checkRole } from "../../common/middleware/auth.middleware";

const router = express.Router();

router.use(authorize);

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", checkRole("admin", "super_admin"), deleteUser);

export const userRoutes = router;
