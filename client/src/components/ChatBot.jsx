import React, { useState, useRef, useEffect } from 'react';
import { Bot, Loader2, Trash2 } from 'lucide-react';
import Message from './Message';
import ChatInput from './ChatInput';
import { sendMessage, deleteConversation } from '../services/Api';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm powered by Gemini AI. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}`);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      role: 'user',
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(messageText, sessionId);

      const assistantMessage = {
        role: 'assistant',
        content: response.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (window.confirm('Are you sure you want to clear this conversation?')) {
      try {
        await deleteConversation(sessionId);
        setMessages([
          {
            role: 'assistant',
            content: "Hello! I'm powered by Gemini AI. How can I help you today?",
          },
        ]);
      } catch (error) {
        console.error('Error clearing chat:', error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="w-8 h-8 text-indigo-600 mr-3" />
          <div>
            <h1 className="text-xl font-bold text-gray-800">Gemini Chatbot</h1>
            <p className="text-xs text-gray-500">Powered by Google Gemini AI</p>
          </div>
        </div>
        <button
          onClick={handleClearChat}
          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Clear conversation"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, idx) => (
          <Message key={idx} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <Bot className="w-5 h-5 text-gray-700" />
              </div>
              <div className="bg-white px-4 py-2 rounded-2xl shadow-md">
                <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatBot;