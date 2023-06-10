import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '../api/api';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(async () => {
    // Get the initial messages
    setMessages(await getChatResponse());

    // Scroll to the bottom of the chat
    scrollToBottom();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: input }]);

      // Get the AI response
      try {
        const aiResponse = await getChatResponse(input);

        // Add the AI's response to the chat
        setMessages((prevMessages) => [...prevMessages, { sender: 'AI', text: aiResponse }]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Chat Interface</h2>
      <div
        style={{
          maxHeight: '300px',
          overflowY: 'scroll',
          marginBottom: '10px',
          border: '1px solid #ced4da',
          borderRadius: '5px',
          padding: '10px',
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <strong>{message.sender === 'user' ? 'You' : 'AI'}:</strong> {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '80%', marginRight: '10px' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;
