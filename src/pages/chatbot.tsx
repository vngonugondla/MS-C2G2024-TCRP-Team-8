import Page from '@/components/page';
import { send } from 'process';
import React, { useState } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const faqResponses: { [key: string]: string } = {
    'What are your hours?': 'We are open 24/7!',
    'How can I donate?': 'You can donate via our website or drop off items at our shelter.',
    'Where are you located?': 'We are located at 123 Non-Profit St., City, State.',
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const inputMsg: Message = { sender: 'user', text: input };
    setMessages([inputMsg, ...messages]);

    setInput('');
  };

  return (
    <main className="max-w-md mx-auto p-4 border rounded-lg shadow-lg bg-gray-100">
      <div className="h-64 overflow-y-scroll p-2 bs-white border roundeed">
        {messages.map((message, index) => {
          <div key={index} className={`my-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block p-2 rounded-lg ${
                message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-purple-300 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>;
        })}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          className="w-full p-2 border rounded l-lg focus:outline-none"
          placeholder="Ask a question..."
          value={input}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
      </div>
      <button className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg:blue-600" onClick={handleSend}></button>
    </main>
  );
};
export default function Home() {
  return (
    <Page>
      <div className="min-h-screen flex iterms-center justify-center bg-gray-200">
        <ChatBot />
      </div>
    </Page>
  );
}
