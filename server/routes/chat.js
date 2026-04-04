const router = require('express').Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

router.post('/', async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model  = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(
      `You are a women's safety assistant. Answer helpfully and briefly: ${req.body.message}`
    );
    res.json({ reply: result.response.text() });
  } catch (err) {
    res.status(500).json({ error: 'Chatbot unavailable: ' + err.message });
  }
});

module.exports = router;