// app/features/FeaturesContent.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FeaturesContent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-800 text-white">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-extrabold">Hornbeam Features</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contacts" className="hover:text-gray-300 transition-colors">
                  Contacts
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Revolutionizing Fintech Security</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Hornbeam leverages adaptive authentication to secure every financial transaction, ensuring efficiency and compliance.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-white text-blue-800 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-200 transition-all"
          >
            How does it work?
          </button>
        </section>

        {/* Use Cases Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Use Case 1: Payment Processing */}
          <div className="p-6 rounded-xl bg-white bg-opacity-20 backdrop-blur-md shadow-2xl transform hover:-translate-y-2 transition duration-300">
            <h3 className="text-2xl font-bold mb-2">Payment Processing</h3>
            <p className="mb-4">
              Secure, automated payment processing with adaptive authentication for transactions above $5k.
            </p>
            <Link href="/features/payment-demo" className="inline-block border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-blue-800 transition">
              Try Demo
            </Link>
          </div>
          {/* Use Case 2: Payroll Management */}
          <div className="p-6 rounded-xl bg-white bg-opacity-20 backdrop-blur-md shadow-2xl transform hover:-translate-y-2 transition duration-300">
            <h3 className="text-2xl font-bold mb-2">Payroll Management</h3>
            <p className="mb-4">
              Enable fintech employees to process high-value payrolls securely with dynamic authentication.
            </p>
            <Link href="/features/payroll-demo" className="inline-block border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-blue-800 transition">
              Learn More
            </Link>
          </div>
          {/* Use Case 3: Compliance & Reporting */}
          <div className="p-6 rounded-xl bg-white bg-opacity-20 backdrop-blur-md shadow-2xl transform hover:-translate-y-2 transition duration-300">
            <h3 className="text-2xl font-bold mb-2">Compliance & Reporting</h3>
            <p className="mb-4">
              Monitor transactions and flag suspicious activities with an AI-driven compliance engine.
            </p>
            <Link href="/features/compliance-demo" className="inline-block border border-white rounded-full px-4 py-2 text-white hover:bg-white hover:text-blue-800 transition">
              Discover More
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-black bg-opacity-40">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Hornbeam. All rights reserved.</p>
        </div>
      </footer>

      {/* Modal for "How does it work?" */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl p-8 max-w-2xl w-full relative transform transition-all duration-300">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <h2 className="text-3xl font-bold mb-4">How Does Hornbeam Work?</h2>
            <p className="mb-4">
              Hornbeam uses adaptive authentication to secure financial operations. When a task is submitted:
            </p>
            <ol className="list-decimal list-inside mb-4 text-left">
              <li>The AI LLM receives and processes your request.</li>
              <li>The Hornbeam Agent evaluates transaction risk.</li>
              <li>If the risk is above the threshold, additional authentication is required.</li>
              <li>The final result is communicated via the interface.</li>
            </ol>
            <p>
              This dynamic process ensures that only authorized actions are processed, keeping your transactions secure.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}



