export default function FAQ() {
  const faqs = [
    {
      q: "What is your turnaround time?",
      a: "Standard production cycles run 14-21 business days from spec approval. Precision takes time."
    },
    {
      q: "Do you offer samples?",
      a: "Blank samples can be ordered via the Catalog. Fully customized prototype runs are available for a flat rate before full production."
    },
    {
      q: "What printing methods do you use?",
      a: "We utilize direct-to-garment (DTG), high-density screen printing, and premium embroidery based on the tactical requirements of your design."
    }
  ];

  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-4rem)] p-6 md:p-12 xl:p-24 pb-32">
      <div className="text-xs tracking-[0.3em] text-primary-container font-bold uppercase mb-4 md:mb-8 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-primary"></span>
        Specs
      </div>
      <h1 className="text-6xl md:text-8xl font-black uppercase text-on-surface leading-none tracking-tighter mb-16 relative">
        Technical<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-surface-variant">FAQ.</span>
      </h1>

      <div className="max-w-3xl w-full border-t border-outline/20">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-outline/20 py-8 flex items-start gap-6 group cursor-pointer hover:bg-surface-variant/10 px-4 -mx-4 transition-colors">
            <span className="text-primary-container font-bold tracking-widest text-sm">0{idx + 1}</span>
            <div className="flex-grow">
              <h3 className="text-lg font-bold text-on-surface uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">{faq.q}</h3>
              <p className="text-on-surface-variant leading-relaxed font-light text-sm">{faq.a}</p>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">add</span>
          </div>
        ))}
      </div>
    </div>
  );
}
