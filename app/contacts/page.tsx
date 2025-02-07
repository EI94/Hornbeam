// app/contacts/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'Contacts',
  description: 'Get in touch with Hornbeam',
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Contacts</h1>
      <p className="text-xl mb-2">For inquiries and support, please reach out to us.</p>
      <p className="text-lg mb-6">
        Email: <a href="mailto:info@hornbeam.xyz" className="text-blue-600 hover:underline">info@hornbeam.xyz</a>
      </p>
      <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition">
        Back to Home
      </Link>
    </div>
  );
}
