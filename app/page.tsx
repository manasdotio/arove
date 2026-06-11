import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Branding & Digital Production',
  description: 'We design brands that become your favorites and digital experiences that keep you coming back. Based in the intersection of strategy and soul.',
};

export default function HomePage() {
  return <HomeClient />;
}
