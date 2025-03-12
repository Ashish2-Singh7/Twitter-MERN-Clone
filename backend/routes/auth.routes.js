import express from 'express';
import { getMe, Login, Logout, signUp } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router = express.Router();

router.get("/me", protectRoute, getMe);
router.post("/signup", signUp);
router.post("/login", Login);
router.post("/logout", Logout);

export default router;