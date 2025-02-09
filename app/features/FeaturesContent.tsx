// app/features/FeaturesContent.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

// Funzione che simula la risposta del Hornbeam Agent in base al comando inserito
const simulateAgentResponse = (input: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      const regex = /\$?([\d,\.]+)/; // il simbolo "$" è opzionale
      const match = input.match(regex);
      let amount = 0;
      if (match && match[1]) {
        amount = Number(match[1].replace(/,/g, ''));
      }
      
      if (lowerInput.includes("transfer") || lowerInput.includes("pay")) {
        if (amount > 5000) {
          resolve(
            `Payment Processing:\nTransaction of $${amount} flagged as high-risk and requires extra authentication.`
          );
        } else if (amount > 0) {
          resolve(
            `Payment Processing:\nTransaction of $${amount} processed successfully.`
          );
        } else {
          resolve(`Payment Processing:\nPlease include a valid amount (e.g., Transfer $3000 to account ABC).`);
        }
      } else if (lowerInput.includes("payroll")) {
        if (amount > 10000) {
          resolve(
            `Payroll Management:\nPayroll amount of $${amount} requires extra verification for compliance.`
          );
        } else if (amount > 0) {
          resolve(
            `Payroll Management:\nPayroll of $${amount} approved successfully.`
          );
        } else {
          resolve(`Payroll Management:\nPlease specify a valid payroll amount.`);
        }
      } else if (lowerInput.includes("suspicious") || lowerInput.includes("compliance")) {
        resolve(
          `Compliance & Reporting:\nAnalyzing transactions... No anomalies detected.`
        );
      } else {
        resolve(
          `Hornbeam Agent:\nI'm sorry, I didn't understand your request. Try these examples:\n• Transfer $6000 to account ABC\n• Approve payroll of $12000\n• Show suspicious activity in transactions`
        );
      }
    }, 1500);
  });
};

export default function FeaturesContent() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const examples = [
    'Transfer $6000 to account ABC',
    'Approve payroll of $12000',
    'Show suspicious activity in transactions'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    // Nascondi il box esplicativo quando l'utente invia un nuovo comando
    setExplanation(null);
    setMessages((prev) => [...prev, { sender: 'User', text: input }]);
    setInput('');
    setIsProcessing(true);

    const response = await simulateAgentResponse(input);
    setMessages((prev) => [...prev, { sender: 'Hornbeam Agent', text: response }]);

    // Determina se mostrare il box esplicativo in base al comando
    const lowerInput = input.toLowerCase();
    const regex = /\$?([\d,\.]+)/;
    const match = input.match(regex);
    let amount = 0;
    if (match && match[1]) {
      amount = Number(match[1].replace(/,/g, ''));
    }
    if ((lowerInput.includes("transfer") || lowerInput.includes("pay")) && amount > 5000) {
      setExplanation("How it works: For high-risk payment transactions, Hornbeam requires additional authentication to ensure privacy and security.");
    } else if (lowerInput.includes("payroll") && amount > 10000) {
      setExplanation("How it works: For payroll transactions exceeding the threshold, Hornbeam triggers extra verification to maintain compliance.");
    } else if (lowerInput.includes("suspicious") || lowerInput.includes("compliance")) {
      setExplanation("How it works: Hornbeam monitors transaction patterns and flags anomalies. For sensitive cases, extra authentication is required.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-800 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-2">Hornbeam Interactive Chat</h1>
      <p className="mb-6 text-lg">
        Try our interactive chat to simulate adaptive authentication use cases.
      </p>
      
      {/* Box esplicativo esterno */}
      {explanation && (
        <div className="mb-4 p-4 bg-white text-black rounded shadow-lg transition-all duration-300">
          <p>{explanation}</p>
        </div>
      )}
      
      {/* Comandi di esempio */}
      <div className="mb-4">
        <p className="text-lg mb-2">Example commands:</p>
        <div className="flex space-x-4">
          {examples.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => setInput(ex)}
              className="bg-white text-blue-800 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
      
      {/* Finestra della chat */}
      <div className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 mb-4 h-80 overflow-y-auto shadow-lg">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 whitespace-pre-line">
            <strong className={msg.sender === 'User' ? 'text-blue-300' : 'text-yellow-300'}>
              {msg.sender}:
            </strong>{' '}
            {msg.sender === 'Hornbeam Agent' ? (
              <span style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: msg.text }} />
            ) : (
              msg.text
            )}
          </div>
        ))}
        {isProcessing && <div className="text-gray-300">Processing...</div>}
      </div>
      
      {/* Campo input e pulsante */}
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter your command (e.g., Transfer $6000 to account ABC)..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setExplanation(null); // Hide explanation when user starts typing
          }}
          className="flex-grow p-2 rounded-l border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          disabled={isProcessing}
          className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-500 transition-all duration-200"
        >
          Send
        </button>
      </div>
      
      {/* Back to Home Link */}
      <div className="mt-4">
        <Link href="/" className="text-blue-300 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}





