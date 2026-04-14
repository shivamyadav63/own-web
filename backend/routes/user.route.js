import { Router } from "express";
import { signup , loging} from "../controller/User.controller.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", loging);

export default router;