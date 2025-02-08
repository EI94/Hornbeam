// app/demo-chat/page.tsx
import DemoChatClient from './DemoChatClient';

export const metadata = {
  title: 'Secure, User-Controlled LLM Chat',
  description: 'Experience Hornbeam with privacy-first adaptive authentication.',
};

export default function DemoChatPage() {
  return <DemoChatClient />;
}
