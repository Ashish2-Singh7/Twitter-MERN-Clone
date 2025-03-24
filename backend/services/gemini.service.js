import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

export const getAiResults = async (prompt) => {
    try {

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(prompt);
        let response = result.response.text();
        return response;

    } catch (error) {
        console.log("Error in getAiResults service", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}