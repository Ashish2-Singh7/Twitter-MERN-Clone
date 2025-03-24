import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getMessages, sendMessages } from "../controllers/message.controller.js";

const router = express.Router();


router.post("/send/:id", protectRoute, sendMessages);
router.get("/:id", protectRoute, getMessages);


export default router;