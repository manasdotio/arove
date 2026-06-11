export interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export interface Article {
  id: number;
  category: string;
  date: string;
  title: string;
  imageUrl: string;
}

export interface ProcessStep {
  num: string;
  title: string;
  desc: string;
  duration: string;
  deliverables: string[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'project-1',
    num: '/01',
    title: 'NovaBank digital platform',
    category: 'Redesign • Experience',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g'
  },
  {
    id: 'project-2',
    num: '/02',
    title: 'Hello finance mobile',
    category: 'Product • Fintech',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk'
  },
  {
    id: 'project-3',
    num: '/03',
    title: 'Lumina Brand Identity',
    category: 'Visual System • Sustainability',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g'
  },
  {
    id: 'project-4',
    num: '/04',
    title: 'Nexus Web Experience',
    category: 'E-commerce • Luxury',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO TechFlow',
    content: '"Amazing work! Our brand finally feels authentic and our sales doubled in a matter of months."',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7vssDrQwkqMfc5Hv83xEJuKCADI9SMBksasJMZTpRQNbDSxasIjUSTbRBoeRaLGGGOcD-Iw0cojz7x525q-IbxRa3PiqzbizwGxfo6lY-A70owUI5ysCyD8vobwNBOy7SnUwvCbaoWZndWEOWDV_TmAHQe5RMvPo75NW_lDio13Gmd8jf0vLrGfy4ycnm6lI6_k16Hb-MTlM5azHMa2ewjL3A9_ueglUfCdI4_in_YtyWEkwwqN7zL3m5M-JdQSsncgnIPdh_8rY_',
    rating: 5
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    role: 'CEO Heritage Co',
    content: '"They transformed our outdated website into something beautiful, highly functional, and extremely fast."',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwpOjZ3SRJbYvDBovekAcz6Df2rgUR1FM5nvAlm019nE1j1efBGxXTMWmyiDN1MTu5XKgFPzc03lmzaolYUU3wegA2qxS-LFZaLianCPOmDTYQcxH-jCdsjOexGMFfyfSohKOlQoMNfNiZr02Q33kGMzkoYquOaGDAvYGC2fSHYC66kKgOr-VkORyfRHWcGt_vxbZZbxsXw_ZZIxOijOMe4bv0h-xmAxXnqQNfESxzoxElJXbXemV39xdhI7I9mkM3_bBoiJ0AmWfN',
    rating: 5
  },
  {
    id: 3,
    name: 'Eleanor Vance',
    role: 'Founder Horizon',
    content: '"From strategy to execution, the team exceeded expectations. A level of craftsmanship rarely seen."',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5
  }
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'Design',
    date: 'September 8, 2024',
    title: 'Stories, ideas, and insights from our creative studio',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk'
  },
  {
    id: 2,
    category: 'Trends',
    date: 'September 5, 2024',
    title: 'Latest design insights and industry trends from our experts',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'Audit & Discovery',
    desc: 'We audit your current website (if any) and outline a simple, high-converting blueprint to capture more local leads.',
    duration: '3-5 Days',
    deliverables: ['Website Performance Report', 'Lead Capture Blueprint', 'Site Architecture']
  },
  {
    num: '02',
    title: 'Prototype & Copywriting',
    desc: 'We write professional copywriting and design a high-converting, custom homepage mockup for your direct review.',
    duration: '1 Week',
    deliverables: ['Figma Homepage Mockup', 'Lead-focused Copywriting', 'SEO Keyword Plan']
  },
  {
    num: '03',
    title: 'Speed-Optimized Build',
    desc: 'We turn the approved design into lighting-fast code, integrate custom booking/contact forms, and test on all devices.',
    duration: '1 Week',
    deliverables: ['Responsive Web Pages', 'Booking & Review Widgets', 'Lighthouse Optimization']
  },
  {
    num: '04',
    title: 'Local SEO & Launch',
    desc: 'We map your domain, configure your Google Business Profile (Maps), setup schema markup, and launch live.',
    duration: '1-2 Days',
    deliverables: ['Production Launch', 'Google Business Sync', 'Schema & Metadata Config']
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    q: 'How much does a typical local business website cost?',
    a: 'Most of our high-converting landing pages and local business sites range between $1,500 and $3,500. We also offer monthly subscription plans starting at $150/mo for businesses wanting zero upfront cost.'
  },
  {
    q: 'Can you connect the website to my booking or CRM software?',
    a: 'Yes! We seamlessly integrate booking apps like Calendly, Acuity, Housecall Pro, or custom lead capture forms so customer inquiries flow straight to your phone or inbox.'
  },
  {
    q: 'How fast will my new website load?',
    a: 'We build using React, TypeScript, and Vite optimized for near-instant speeds. Every site we build achieves a 90+ score on Google PageSpeed Insights, keeping you from losing visitors to slow loading.'
  },
  {
    q: 'Do I need to write my own website text?',
    a: 'No, we handle the professional copywriting for you. We write clean, clear headlines and calls-to-action designed specifically to make local customers pick up the phone or book a service.'
  }
];
