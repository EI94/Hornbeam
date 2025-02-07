// app/features/mercury-chat.tsx
'use client'; // Necessario per usare gli hook di React

import { useState } from 'react';
import Link from 'next/link';

// Funzione per simulare una risposta dell'LLM
const simulateLLMResponse = (input: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`LLM received your task: "${input}". Processing with Agent Mercury...`);
    }, 1500);
  });
};

// Funzione per simulare il comportamento di Agent Mercury
const simulateMercuryAgent = (input: string): Promise<string> => {
  // Cerchiamo un importo nel testo, ad esempio "$6000"
  const regex = /\$?([\d,\.]+)/;
  const match = input.match(regex);
  let amount = 0;
  if (match && match[1]) {
    amount = Number(match[1].replace(/,/g, ''));
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      if (amount > 5000) {
  // Includi l'immagine del logo usando HTML e un tag <img>.
  resolve(
    `<img src="/mercury-logo.svg.svg" alt="Mercury Logo" class="inline-block w-6 h-6 mr-2" /> Agent Mercury detects a high-risk transaction ($${amount}). Adaptive authentication required.`
  );
} else {
  resolve(
    `<img src="/mercury-logo.svg.svg" alt="Mercury Logo" class="inline-block w-6 h-6 mr-2" /> Agent Mercury processed your task successfully.`
  );
}
}, 1500);
});
};

export default function MercuryChat() {
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    // Aggiungi il messaggio dell'utente
    setChatMessages((prev) => [...prev, { sender: 'User', text: userInput }]);
    setUserInput('');
    setIsProcessing(true);

    // Simula la risposta dell'LLM
    const llmResponse = await simulateLLMResponse(userInput);
    setChatMessages((prev) => [...prev, { sender: 'LLM', text: llmResponse }]);

    // Simula il comportamento di Agent Mercury
    const mercuryResponse = await simulateMercuryAgent(userInput);
    setChatMessages((prev) => [...prev, { sender: 'Agent Mercury', text: mercuryResponse }]);

    setIsProcessing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white text-black rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Mercury Chat Demo</h1>
      <div className="h-64 border border-gray-300 rounded-lg p-4 mb-4 overflow-y-auto bg-gradient-to-br from-gray-50 to-white shadow-lg">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'User' ? 'text-blue-600' : msg.sender === 'LLM' ? 'text-green-600' : 'text-red-600'}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {isProcessing && <div className="text-gray-600">Processing...</div>}
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Enter your task (e.g., Transfer $6000 to account XYZ)..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-grow border border-gray-300 p-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSendMessage}
          disabled={isProcessing}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-500 transition-all duration-200"
        >
          Send
        </button>
      </div>
      <div className="mt-4">
        <Link href="/landing" className="text-blue-600 hover:underline">
          Back to Landing Page
        </Link>
      </div>
    </div>
  );
}
