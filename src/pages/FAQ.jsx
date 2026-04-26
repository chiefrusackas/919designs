import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FAQ_ITEMS = [
  {
    q: 'What file formats do you accept?',
    a: null,
    aJsx: true,
    answer: 'For embroidery, we require digitized files in .DST or .PES format. For DTF printing, provide vector-based .AI, .EPS, or high-resolution .PNG (300 DPI minimum) with transparent backgrounds. If you don\'t have these, we can assist with digitization for a flat conversion fee.',
  },
  {
    q: 'Is there a minimum order quantity?',
    answer: 'For DTF transfers, there is NO MINIMUM. For embroidery projects, we recommend a minimum of 12 units to optimize machine setup time and get you the best pricing. Smaller runs are possible — just ask.',
  },
  {
    q: 'Do you provide the garments?',
    answer: 'Yes. We source high-performance garments suited for work, sport, and everyday wear. You can also provide your own blanks, provided they meet our machine-compatibility requirements.',
  },
  {
    q: 'How long does an order take?',
    answer: 'Standard turnaround is 7–10 business days from artwork approval. Rush orders are available for time-sensitive deadlines at an additional charge. We\'ll confirm lead time when your project is confirmed.',
  },
  {
    q: 'Can I see a proof before production starts?',
    answer: 'Yes — every order includes a digital proof for your approval before we touch a single machine. Nothing goes into production without your sign-off.',
  },
  {
    q: 'What decoration methods do you offer?',
    answer: 'We offer machine embroidery, woven/iron-on patches, and DTF (Direct to Film) printed graphics. The right method depends on your design, garment type, and placement. We can advise on the best fit when you submit your order.',
  },
  {
    q: 'Where are you located?',
    answer: 'We\'re based in the 919 — Raleigh, NC. Local pickups are available. We also ship nationally.',
  },
  {
    q: 'How do I place an order?',
    answer: 'Use the Create Order tool to configure your garments, sizes, decoration type, and placement. We\'ll follow up to confirm artwork and details before finalizing anything.',
  },
];

function AccordionItem({ item, isOpen, onToggle }) {
  return (
    <div className={`border-b border-outline/10 transition-colors ${isOpen ? 'bg-surface-variant/10' : 'hover:bg-surface-variant/5'}`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center px-6 py-5 text-left group gap-4 focus:outline-none"
      >
        <span className="text-base font-bold uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">
          {item.q}
        </span>
        <span
          className={`material-symbols-outlined text-primary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          add
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <p className="px-6 pb-6 text-sm text-on-surface-variant leading-relaxed max-w-2xl">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="w-full flex flex-col min-h-screen p-6 md:p-12 xl:p-24 pb-32">
      <Helmet>
        <title>FAQ | 919 Designs</title>
        <meta name="description" content="Answers to common questions about our custom embroidery and DTF printing process, turnaround times, file formats, and ordering." />
      </Helmet>

      {/* Header */}
      <div className="max-w-4xl mb-16">
        <div className="text-xs tracking-[0.3em] text-primary-container font-bold uppercase mb-4 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-primary"></span>
          Support
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase text-on-surface leading-none tracking-tighter mb-6">
          Frequently<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-surface-variant">Asked.</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-xl font-light">
          Everything you need to know about our process. No fluff — just specs.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-3xl w-full border border-outline/10">
        {FAQ_ITEMS.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-3xl w-full mt-16 bg-surface-variant/20 border border-outline/10 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <p className="text-xs tracking-widest text-on-surface-variant uppercase font-bold mb-2">Still have questions?</p>
          <p className="text-on-surface font-light text-sm max-w-md">
            Reach out directly or jump straight into building your order. We'll sort the details together.
          </p>
        </div>
        <Link
          to="/configurator"
          className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:bg-primary-container transition-colors flex-shrink-0 shadow-md"
        >
          Start Your Build
        </Link>
      </div>
    </div>
  );
}
