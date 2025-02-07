// app/demo-chat/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Demo Chat',
  description: 'Interactive demo chat for Hornbeam use cases',
};

// Funzione che simula la risposta del Hornbeam Agent in base al comando inserito
const simulateAgentResponse = (input: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      // Regex: il simbolo "$" è opzionale per riconoscere gli importi
      const regex = /\$?([\d,\.]+)/;
      const match = input.match(regex);
      let amount = 0;
      if (match && match[1]) {
        amount = Number(match[1].replace(/,/g, ''));
      }

      // Caso 1: Transazione di pagamento ("transfer", "pay")
      if (lowerInput.includes("transfer") || lowerInput.includes("pay")) {
        if (amount > 5000) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payment Agent: Transaction of $${amount} requires additional authentication due to high risk.`
          );
        } else if (amount > 0) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payment Agent: Transaction of $${amount} processed successfully.`
          );
        } else {
          resolve(`Payment Agent: Please include a valid amount (e.g., "Transfer $3000 to account XYZ").`);
        }
      }
      // Caso 2: Gestione del Payroll ("payroll")
      else if (lowerInput.includes("payroll")) {
        if (amount > 10000) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payroll Agent: Payroll amount of $${amount} is high-risk and requires further verification.`
          );
        } else if (amount > 0) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payroll Agent: Payroll of $${amount} approved successfully.`
          );
        } else {
          resolve(`Payroll Agent: Please specify a valid payroll amount.`);
        }
      }
      // Caso 3: Verifica di Compliance ("suspicious", "compliance")
      else if (lowerInput.includes("suspicious") || lowerInput.includes("compliance")) {
        resolve(
          `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Compliance Agent: Analyzing recent transactions. No anomalies detected in the last 24 hours.`
        );
      }
      // Caso default: Comando non riconosciuto
      else {
        resolve(`Hornbeam Agent: I'm sorry, I didn't understand your request. Please try one of the example commands.`);
      }
    }, 1500);
  });
};

export default function DemoChat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Comandi di esempio per aiutare l'utente
  const examples = [
    'Transfer $6000 to account ABC',
    'Approve payroll of $12000',
    'Show suspicious activity in transactions'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    // Aggiungi il messaggio dell'utente
    setMessages((prev) => [...prev, { sender: 'User', text: input }]);
    setInput('');
    setIsProcessing(true);

    // Simula la risposta del Hornbeam Agent
    const response = await simulateAgentResponse(input);
    setMessages((prev) => [...prev, { sender: 'Hornbeam Agent', text: response }]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-800 text-white flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-6">Hornbeam Demo Chat</h1>
      {/* Sezione dei comandi di esempio */}
      <div className="mb-4">
        <p className="text-lg mb-2">Try one of these commands:</p>
        <div className="flex space-x-4">
          {examples.map((ex, index) => (
            <button
              key={index}
              onClick={() => setInput(ex)}
              className="bg-white text-blue-800 px-3 py-1 rounded hover:bg-gray-200 transition"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
      {/* Finestra chat */}
      <div className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 mb-4 h-80 overflow-y-auto shadow-lg">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 fade-in">
            <strong className={msg.sender === 'User' ? 'text-blue-300' : 'text-yellow-300'}>
              {msg.sender}:
            </strong>{' '}
            {msg.sender === 'Hornbeam Agent' ? (
              <span dangerouslySetInnerHTML={{ __html: msg.text }} />
            ) : (
              msg.text
            )}
          </div>
        ))}
        {isProcessing && <div className="text-gray-300">Processing...</div>}
      </div>
      {/* Input e pulsante */}
      <div className="flex w-full max-w-2xl">
        <input
          type="text"
          placeholder="Enter your command..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
      <div className="mt-4">
        <Link href="/" className="text-blue-300 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
