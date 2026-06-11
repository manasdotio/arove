import type { Metadata } from 'next';
import WorkClient from './WorkClient';

export const metadata: Metadata = {
  title: 'Our Work — Branding & Digital Production',
  description: 'Explore our gallery of lightning-fast web projects, branding campaigns, and custom applications built for maximum impact.',
};

export default function WorkPage() {
  return <WorkClient />;
}
