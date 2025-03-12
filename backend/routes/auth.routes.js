import express from 'express';
import { Login, Logout, signUp } from '../controllers/auth.controller.js';
const router = express.Router();

router.get("/signup", signUp);
router.get("/login", Login);
router.get("/logout", Logout);

export default router;