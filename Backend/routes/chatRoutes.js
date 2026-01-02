const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getConversation,
  deleteConversation
} = require('../controllers/chatController');

// POST /api/chat/message - Send a message
router.post('/message', sendMessage);

// GET /api/chat/conversation/:sessionId - Get conversation history
router.get('/conversation/:sessionId', getConversation);

// DELETE /api/chat/conversation/:sessionId - Delete conversation
router.delete('/conversation/:sessionId', deleteConversation);

module.exports = router;