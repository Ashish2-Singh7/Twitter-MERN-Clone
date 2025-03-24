import express from "express";
import { getResults } from "../controllers/gemini.controller.js";

const router = express.Router();

router.get("/get-results", getResults);


export default router;