import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SECTIONS = [
  { id: 'hats', title: 'Hats', description: 'Technical headwear engineered for the elements.' },
  { id: 'tshirts', title: 'T-Shirts', description: 'Heavyweight essentials with precision embroidery.' },
  { id: 'polo-shirts', title: 'Polo Shirts', description: 'Elevated staples for a sharper profile.' },
  { id: 'long-sleeves', title: 'Long Sleeve Shirts', description: 'Layering foundations for year-round utility.' },
  { id: 'hoodies', title: 'Hoodies', description: 'Engineered warmth with high-density stitching.' },
  { id: 'sweatshirts', title: 'Sweatshirts', description: 'Modern athletic cuts in premium fleece.' },
  { id: 'more', title: '...and More!', description: 'Limited collaborative runs and unique accessories.' },
];

export default function Catalog() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className="w-full flex flex-col min-h-screen p-6 md:p-12 xl:p-24 pb-32">
      {/* Header Section */}
      <div className="text-xs tracking-[0.3em] text-primary-container font-bold uppercase mb-4 md:mb-8 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-primary"></span>
        Archive
      </div>
      <h1 className="text-6xl md:text-8xl font-black uppercase text-on-surface leading-none tracking-tighter mb-12 relative">
        The<br/>Catalog
      </h1>

      {/* Large Hero Image Space */}
      <div className="w-full aspect-[21/9] md:aspect-[3/1] bg-surface-variant/30 overflow-hidden mb-24 relative rounded-sm border border-outline/10 shadow-2xl">
        <img 
          src="/Users/seth/.gemini/antigravity/brain/2a7750b8-e1df-4385-8562-c3700bcaf823/apparel_manufacturing_hero_1776814075044.png" 
          alt="Apparel Manufacturing Hero" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
      </div>
      
      {/* Product Sections */}
      <div className="flex flex-col gap-32">
        {SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-outline/20">
              <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-on-surface mb-2">
                  {section.title}
                </h2>
                <p className="text-on-surface-variant font-light text-sm tracking-wide">
                  {section.description}
                </p>
              </div>
              <div className="text-[10px] tracking-[0.5em] text-primary font-bold uppercase mt-4 md:mt-0">
                Foundations / {section.id.replace('-', ' ')}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={`${section.id}-${item}`} className="flex flex-col group cursor-pointer">
                  <div className="aspect-[4/5] bg-surface-variant/20 border border-outline/5 flex items-center justify-center mb-4 relative overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:bg-surface-variant/40 shadow-sm hover:shadow-xl">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/10 group-hover:text-on-surface-variant/30 transition-colors duration-700">checkroom</span>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                       <button className="bg-primary text-on-primary text-[10px] tracking-[0.3em] font-bold uppercase py-3 px-4 w-full text-center hover:bg-primary/90 transition-colors">
                         Quick Inspect
                       </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-start px-1">
                    <div>
                      <span className="text-[9px] tracking-[0.3em] text-on-surface-variant uppercase font-bold mb-1 block opacity-60">Edition 00{item}</span>
                      <h3 className="text-lg font-bold text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors">
                        {section.title.replace('...and More!', 'Core')} Item
                      </h3>
                    </div>
                    <span className="text-sm font-light text-on-surface-variant/80 tracking-tighter">$45.00</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
