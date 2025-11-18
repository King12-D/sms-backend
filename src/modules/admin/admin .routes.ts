import express from "express";
import { createAdmin, login } from "./admin.controller";
import { authorize, checkRole } from "../../common/middleware/auth.middleware";

const router = express.Router();

router.post("/create", authorize, checkRole("super_admin"), createAdmin);
router.post("/login", login);

export const adminRoute = router;
