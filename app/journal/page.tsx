import type { Metadata } from 'next';
import JournalClient from './JournalClient';

export const metadata: Metadata = {
  title: 'Journal — Insights & Design Trends',
  description: 'Stories, ideas, and insights from our creative team. Read our latest articles on web design, local business marketing, and branding trends.',
};

export default function JournalPage() {
  return <JournalClient />;
}
