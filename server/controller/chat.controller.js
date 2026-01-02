const axios = require("axios");

exports.chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message required" });
    }

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        contents: [
          {
            parts: [{ text: message }],
          },
        ],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    const reply =
      response.data.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ reply: "Gemini error" });
  }
};
