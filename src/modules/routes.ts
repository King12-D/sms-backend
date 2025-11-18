import { Router } from "express";
import { userRoutes } from "./users/user.routes";
import { authRoute } from "./auth/auth.routes";
import { cardRoute } from "./scratchCards/card.routes";
import { adminRoute } from "./admin/admin .routes";

const router = Router();

router.use("/auth", authRoute);
router.use("/users", userRoutes);
router.use("/cards", cardRoute);
router.use("/admin", adminRoute);

export const appRouter = router;
