import { Router } from "express";
import { userRoutes } from "./users/user.routes";
import { authorize } from "../common/middleware/auth.middleware";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authorize);

export const appRouter = router;
