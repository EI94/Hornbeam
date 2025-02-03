// app/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'AI Auth',
  description: 'Secure and scalable authentication solution for the AI world.',
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">AI Auth</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="hover:text-gray-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-gray-300 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gray-300 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <section className="text-center">
          <h2 className="text-5xl font-extrabold mb-6">
            Security for the Future of Artificial Intelligence
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our platform offers advanced authentication solutions for AI Agents and Gen AI,
            ensuring maximum protection and scalability for your systems.
          </p>
          <Link
            href="/demo"
            className="inline-block bg-white text-blue-800 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all"
          >
            Discover the Demo
          </Link>
        </section>

        {/* Features Section */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
            <h3 className="text-2xl font-bold mb-2">Advanced Security</h3>
            <p>
              We implement state-of-the-art encryption technologies to protect your data.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
            <h3 className="text-2xl font-bold mb-2">Seamless Integration</h3>
            <p>
              Our APIs and SDKs enable fast and hassle-free integration into your stack.
            </p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:scale-105 transform transition-all">
            <h3 className="text-2xl font-bold mb-2">Unlimited Scalability</h3>
            <p>
              Designed to grow with you, our infrastructure supports limitless expansion.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 bg-black bg-opacity-30">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Autty. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

