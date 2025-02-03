// app/features/page.tsx
import MercuryChat from './mercury-chat';

export const metadata = {
  title: 'Key Features',
  description: 'Adaptive Authentication Demo with Mercury Chat',
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-center text-4xl font-bold mb-8">Key Features</h1>
      <div className="px-4">
        <h2 className="text-2xl font-semibold mb-4">
          Adaptive Authentication with Mercury
        </h2>
        {/* Inseriamo il componente della chat che simula il processo */}
        <MercuryChat />
      </div>
    </div>
  );
}
