// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'AI Auth',
  description: 'Secure and scalable authentication solution for the AI world.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-r from-blue-800 via-indigo-900 to-purple-900 text-white">
        {children}
      </body>
    </html>
  );
}

