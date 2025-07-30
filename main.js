const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
app.use(express.json()); // to read req.body

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content
const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.log(err);
    return "Something went wrong!";
  }
};

// API route
app.post("/api/content", async (req, res) => {
  try {
    const data = req.body.question;
    const response = await generate(data);
    res.json({ answer: response });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server is Up and running on port 3000");
});
