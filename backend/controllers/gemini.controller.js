import * as ai from "../services/gemini.service.js";

export const getResults = async (req, res) => {
    try {

        const { prompt } = req.query;

        if (!prompt || prompt.length === 0) return res.status(400).json({ error: "Prompt must have some value in it" });

        const aiResult = await ai.getAiResults(prompt);

        return res.status(200).json(aiResult);

    } catch (error) {
        console.log("Error in getResults controller", error.message);
        return res.status(500).json({ error: "INTERNAL SERVER ERROR" });
    }
}