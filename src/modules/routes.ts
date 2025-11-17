import { Router } from "express";
import { userRoutes } from "./users/user.routes";
import { authRoute } from "./auth/auth.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoute);

export const appRouter = router;
