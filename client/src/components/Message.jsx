import React from 'react';
import { Bot, User } from 'lucide-react';

const Message = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`flex items-start max-w-xs lg:max-w-md xl:max-w-lg ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className={`shrink-0 ${isUser ? 'ml-2' : 'mr-2'}`}>
            {isUser ? (
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                </div>
            ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gray-700" />
                </div>
            )}
        </div>
        <div
          className={`px-4 py-2 rounded-2xl ${
            isUser
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-gray-800 shadow-md'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;