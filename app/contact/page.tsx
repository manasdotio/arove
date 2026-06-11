import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact Us — Start Your Project',
  description: 'Get in touch with Velis Studio. Drop us an email or fill out our online contact form to schedule a free 1-on-1 strategy call.',
};

export default function ContactPage() {
  return <ContactClient />;
}
