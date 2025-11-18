import express from "express";
import { createAdmin, login } from "./admin.controller";
import { checkRole } from "../../common/middleware/auth.middleware";

const router = express.Router();

router.post("/create", checkRole("super_admin"), createAdmin);
router.post("/login", login);

export const adminRoute = router;
