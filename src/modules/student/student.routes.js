import express from 'express'
const router = express.Router();
import {authorize, checkRole} from "../../common/middleware/auth.middleware"
import createStudent from "./student.controller"
router.post("/student",authorize, checkRole("admin"), createStudent);

export default router