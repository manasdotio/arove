import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us — Design and Studio Culture',
  description: 'Learn about Velis Studio. We are a small, agile team of designers, developers, and brand strategists obsessed with minimalist excellence and customer acquisition.',
};

export default function AboutPage() {
  return <AboutClient />;
}
