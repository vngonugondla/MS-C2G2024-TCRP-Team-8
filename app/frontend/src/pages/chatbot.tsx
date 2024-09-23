import Page from '@/components/page';
import React, { useEffect, useState, useRef } from 'react';
import * as chat from '@botpress/chat';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp?: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [client, setClient] = useState<any>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  let listener: any = null;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const initChat = async () => {
      const apiUrl = `https://chat.botpress.cloud/18d59c6d-437f-4fb8-98d3-c615ed30faf2`;
      const chatClient = await chat.Client.connect({ apiUrl });
      setClient(chatClient);

      const { conversation } = await chatClient.createConversation({});
      setConversationId(conversation.id);

      listener = await chatClient.listenConversation({ id: conversation.id });

      const onMessage = (ev: chat.Events['message_created']) => {
        if (ev.userId !== chatClient.user.id) {
          if (ev.payload.type === 'text') {
            let cleanedText = ev.payload.text.startsWith("I encountered an issue")
              ? "Thinking..."
              : ev.payload.text.replace(/\*\*[^*]+\*\*/g, '').replace(/["']/g, '');

            const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages((prev) => [...prev, { sender: 'bot', text: cleanedText, timestamp }]);
          }
        }
      };

      listener.on('message_created', onMessage);
    };

    initChat().catch(console.error);

    return () => {
      if (listener) {
        listener.off('message_created');
      }
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !conversationId || !client) return;

    const userMsg: Message = { sender: 'user', text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages((prev) => [...prev, userMsg]);

    await client.createMessage({
      conversationId,
      payload: {
        type: 'text',
        text: input,
      },
    });
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Chat container */}
      <div className="flex flex-col flex-grow max-w-md mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Chat header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white font-bold text-xl flex items-center">
          ChatBot
          </div>
  
          {/* Messages section */}
          <div className="flex flex-col flex-grow p-4 overflow-y-auto space-y-4" style={{ height: "calc(100vh - 150px)" }}>
            {messages.map((message, index) => (
              <div key={index} className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs break-words ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                  <div className="text-xs text-gray-400 mt-1 text-right">{message.timestamp}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
  
          {/* Input area */}
        <div className="bg-gray-100 p-4 flex items-center">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="ml-3 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <Page>
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <ChatBot />
      </div>
    </Page>
  );
}
