// app/demo-chat/DemoChatClient.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

// Simula la risposta del Hornbeam Agent in base al comando inserito
const simulateAgentResponse = (input: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      // Il simbolo "$" è opzionale per riconoscere gli importi
      const regex = /\$?([\d,\.]+)/;
      const match = input.match(regex);
      let amount = 0;
      if (match && match[1]) {
        amount = Number(match[1].replace(/,/g, ''));
      }
      
      // Use Case 1: Comandi di pagamento (transfer / pay)
      if (lowerInput.includes("transfer") || lowerInput.includes("pay")) {
        if (amount > 5000) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payment Agent: Transaction of $${amount} flagged as high-risk.`
          );
        } else if (amount > 0) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payment Agent: Transaction of $${amount} processed successfully.`
          );
        } else {
          resolve(`Payment Agent: Please include a valid amount (e.g., Transfer $3000 to account XYZ).`);
        }
      }
      // Use Case 2: Gestione del payroll
      else if (lowerInput.includes("payroll")) {
        if (amount > 10000) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payroll Agent: Payroll amount of $${amount} requires extra verification.`
          );
        } else if (amount > 0) {
          resolve(
            `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Payroll Agent: Payroll of $${amount} approved successfully.`
          );
        } else {
          resolve(`Payroll Agent: Please specify a valid payroll amount.`);
        }
      }
      // Use Case 3: Compliance e verifiche sospette
      else if (lowerInput.includes("suspicious") || lowerInput.includes("compliance")) {
        resolve(
          `<img src="/hornbeam-logo.svg" alt="Hornbeam Logo" class="inline-block w-6 h-6 mr-2" /> Compliance Agent: Analyzing transactions... No anomalies detected.`
        );
      }
      // Caso default: comando non riconosciuto
      else {
        resolve(`Hornbeam Agent: I'm sorry, I didn't understand your request. Try these examples:\n• Transfer $6000 to account ABC\n• Approve payroll of $12000\n• Show suspicious activity in transactions`);
      }
    }, 1500);
  });
};

export default function DemoChatClient() {
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
    // Quando viene inviato un nuovo comando, rimuovi la spiegazione
    setExplanation(null);
    setMessages((prev) => [...prev, { sender: 'User', text: input }]);
    setInput('');
    setIsProcessing(true);

    const response = await simulateAgentResponse(input);
    setMessages((prev) => [...prev, { sender: 'Hornbeam Agent', text: response }]);

    // Determina se mostrare una scheda esplicativa in base al comando
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
      <h1 className="text-4xl font-bold mb-2">Secure, User-Managed LLM Chat</h1>
      <p className="mb-6 text-lg">
        Manage your commands while Hornbeam ensures privacy-first adaptive authentication.
      </p>
      
      {/* Box esplicativo esterno */}
      {explanation && (
        <div className="mb-4 p-4 bg-white text-black rounded shadow-lg transition-all duration-300">
          <p>{explanation}</p>
        </div>
      )}
      
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
      
      {/* Finestra della chat */}
      <div className="w-full max-w-2xl bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-4 mb-4 h-80 overflow-y-auto shadow-lg">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2 fade-in whitespace-pre-line">
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
            // Quando l'utente inizia a digitare, nascondi il box esplicativo
            setExplanation(null);
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
      
      <div className="mt-4">
        <Link href="/" className="text-blue-300 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

