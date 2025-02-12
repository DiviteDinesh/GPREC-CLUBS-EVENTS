import * as ai from "../services/ai.service.js";    
export const getResult = async (req, res) => {
    try {
        // Extract the prompt string from the query parameters
        const promptText = req.query.prompt; 
        
        // If no prompt is provided, return an error message
        if (!promptText) {
            return res.status(400).send({ message: "Missing query parameter 'prompt'" });
        }
        
        // console.log("ai prompt", promptText);
        
        // Pass the prompt string to generateResult
        const result = await ai.generateResult(promptText);
        res.send(result);
    } catch (error) {
        console.error("Error generating AI result:", error);
        res.status(500).send({ message: error.message });
    }
};
