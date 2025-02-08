// app/contacts/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Contacts',
  description: 'Get in touch with Hornbeam for inquiries and support',
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-800 text-white flex flex-col items-center p-8">
      {/* Header */}
      <header className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Get in Touch with Hornbeam</h1>
        <p className="text-xl">
          We’re here to help you secure your financial operations with adaptive authentication.  
          Reach out for support, partnerships, or general inquiries.
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg">
        {/* Contact Information */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl mr-4">📧</span>
              <div>
                <p className="text-lg font-medium">Email</p>
                <a 
                  href="mailto:info@hornbeam.xyz" 
                  className="text-blue-300 hover:underline"
                >
                  info@hornbeam.xyz
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-4">📞</span>
              <div>
                <p className="text-lg font-medium">Phone</p>
                <p className="text-blue-300">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-4">🏢</span>
              <div>
                <p className="text-lg font-medium">Address</p>
                <p className="text-blue-300">123 Fintech Blvd, Suite 100, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-6">
            <a 
              href="https://twitter.com/hornbeam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-3xl hover:text-blue-400 transition"
            >
              🐦
            </a>
            <a 
              href="https://linkedin.com/company/hornbeam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-3xl hover:text-blue-400 transition"
            >
              💼
            </a>
            <a 
              href="https://facebook.com/hornbeam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-3xl hover:text-blue-400 transition"
            >
              📘
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mt-12 text-center">
        <Link 
          href="/" 
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition"
        >
          Back to Home
        </Link>
        <p className="mt-6 text-sm">&copy; 2025 Hornbeam. All rights reserved.</p>
      </footer>
    </div>
  );
}
