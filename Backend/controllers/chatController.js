const axios = require('axios');
const Conversation = require('../models/Conversation');

// Send message to Gemini API
const sendMessage = async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{ text: message }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;

    if (!aiResponse) {
      throw new Error('Invalid response from Gemini API');
    }

    // Save conversation to database if sessionId is provided
    if (sessionId) {
      let conversation = await Conversation.findOne({ sessionId });

      if (!conversation) {
        conversation = new Conversation({
          sessionId,
          messages: []
        });
      }

      // Add user message
      conversation.messages.push({
        role: 'user',
        content: message
      });

      // Add assistant message
      conversation.messages.push({
        role: 'assistant',
        content: aiResponse
      });

      await conversation.save();
    }

    res.json({
      success: true,
      response: aiResponse,
      sessionId
    });

  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Failed to get response from AI',
      details: error.response?.data?.error?.message || error.message
    });
  }
};

// Get conversation history
const getConversation = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const conversation = await Conversation.findOne({ sessionId });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      success: true,
      conversation
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'Failed to retrieve conversation',
      details: error.message
    });
  }
};

// Delete conversation
const deleteConversation = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const conversation = await Conversation.findOneAndDelete({ sessionId });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    res.json({
      success: true,
      message: 'Conversation deleted successfully'
    });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      error: 'Failed to delete conversation',
      details: error.message
    });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  deleteConversation
};