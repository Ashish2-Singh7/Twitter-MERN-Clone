import express from "express";
import { protectRoute } from "../middleware/protectRoute";
import { sendMessages } from "../controllers/message.controller";

const router = express.Router();


router.post("/send/:id", protectRoute, sendMessages);
router.get("/:id", protectRoute, getMessages);


export default router;