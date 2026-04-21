export default function Catalog() {
  return (
    <div className="w-full flex flex-col min-h-[calc(100vh-4rem)] p-6 md:p-12 xl:p-24 pb-32">
      <div className="text-xs tracking-[0.3em] text-primary-container font-bold uppercase mb-4 md:mb-8 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-primary"></span>
        Archive
      </div>
      <h1 className="text-6xl md:text-8xl font-black uppercase text-on-surface leading-none tracking-tighter mb-16 relative">
        The<br/>Catalog
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full border-t border-outline/20 pt-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="flex flex-col group cursor-pointer">
            <div className="aspect-[4/5] bg-surface-variant/50 border border-outline/10 flex items-center justify-center mb-4 relative overflow-hidden transition-all group-hover:border-primary-container/50">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 group-hover:text-on-surface-variant/50 transition-colors">checkroom</span>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                 <button className="bg-primary-container text-xs tracking-widest font-bold uppercase py-2 px-4 w-full text-center">Quick Inspect</button>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] tracking-widest text-on-surface-variant uppercase font-bold mb-1 block">Edition 00{item}</span>
                <h3 className="text-lg font-bold text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors">Tech Core Tee</h3>
              </div>
              <span className="text-sm font-light text-on-surface-variant">$45.00</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
