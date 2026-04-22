import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SECTION_CONFIG = [
  { id: 'hats', title: 'Hats', category: 'Hats', description: 'Technical headwear engineered for the elements.' },
  { id: 'tshirts', title: 'T-Shirts', category: 'T-Shirts', description: 'Heavyweight essentials with precision embroidery.' },
  { id: 'polo-shirts', title: 'Polo Shirts', category: 'Polo Shirts', description: 'Elevated staples for a sharper profile.' },
  { id: 'long-sleeves', title: 'Long Sleeve Shirts', category: 'Long Sleeve Shirts', description: 'Layering foundations for year-round utility.' },
  { id: 'hoodies', title: 'Hoodies', category: 'Hoodies', description: 'Engineered warmth with high-density stitching.' },
  { id: 'sweatshirts', title: 'Sweatshirts', category: 'Sweatshirts', description: 'Modern athletic cuts in premium fleece.' },
  { id: 'more', title: '...and More!', category: 'Other', description: 'Limited collaborative runs and unique accessories.' },
];

export default function Products() {
  const { hash } = useLocation();

  // Dynamically import all product JSON files from Decap CMS
  const productsData = import.meta.glob('../content/products/*.json', { eager: true });
  const products = Object.keys(productsData).map((key, index) => {
    return {
      id: index + 1,
      ...(productsData[key].default || productsData[key])
    };
  });

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly for hydration/lazy loading
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
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
        The<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-surface-variant">Catalog.</span>
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
        {SECTION_CONFIG.map((section) => {
          const sectionProducts = products.filter(p => p.category === section.category);
          
          // If no specific products found in CMS, we'll show some placeholders so the page isn't empty
          // But usually the user will have added them via Decap CMS
          const displayProducts = sectionProducts.length > 0 ? sectionProducts : [];

          return (
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

              {displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayProducts.map((item) => (
                    <div key={item.id} className="flex flex-col group cursor-pointer">
                      <div className="aspect-[4/5] bg-surface-variant/20 border border-outline/5 flex items-center justify-center mb-4 relative overflow-hidden transition-all duration-500 group-hover:border-primary/30 group-hover:bg-surface-variant/40 shadow-sm hover:shadow-xl">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${item.out_of_stock ? 'opacity-20 grayscale' : ''}`} />
                        ) : (
                          <span className={`material-symbols-outlined text-6xl text-on-surface-variant/10 group-hover:text-on-surface-variant/30 transition-colors duration-700 ${item.out_of_stock ? 'opacity-5' : ''}`}>checkroom</span>
                        )}
                        
                        {item.out_of_stock && (
                          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-20">
                            <div className="bg-primary text-on-primary text-[10px] md:text-xs font-black uppercase tracking-[0.4em] py-2 px-12 rotate-[-35deg] whitespace-nowrap shadow-2xl border-y border-on-primary/20">
                              temporarily SOLD OUT!
                            </div>
                          </div>
                        )}
                        {!item.out_of_stock && (
                          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                             <div className="flex flex-col gap-1 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                               <div className="flex flex-wrap gap-1.5 mb-2">
                                 {item.colors && item.colors.map((c, i) => (
                                   <div key={i} className="w-3.5 h-3.5 rounded-full border border-on-primary/20 shadow-sm" style={{ backgroundColor: c.color.toLowerCase() }} title={c.color}></div>
                                 ))}
                               </div>
                               <div className="flex flex-wrap gap-1 mb-4">
                                 {item.sizes && item.sizes.map((s, i) => (
                                   <span key={i} className="text-[9px] tracking-tighter border border-on-primary/40 text-on-primary px-1.5 py-0.5 rounded-sm bg-on-primary/5">{s.size}</span>
                                 ))}
                               </div>
                               <button className="bg-primary text-on-primary text-[10px] tracking-[0.3em] font-bold uppercase py-3 px-4 w-full text-center hover:bg-primary/90 transition-colors shadow-lg">
                                 Quick Inspect
                               </button>
                             </div>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-start px-1">
                      <div>
                        <span className="text-[9px] tracking-[0.3em] text-on-surface-variant uppercase font-bold mb-1 block opacity-60">{item.status || 'Foundational'}</span>
                        <h3 className="text-lg font-bold text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <span className="text-sm font-light text-on-surface-variant/80 tracking-tighter">{item.price}</span>
                    </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 border border-dashed border-outline/10 rounded-sm flex items-center justify-center bg-surface-variant/5">
                  <p className="text-xs tracking-widest text-on-surface-variant/50 uppercase font-bold">New arrivals coming soon</p>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
