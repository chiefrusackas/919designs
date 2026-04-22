import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const categories = [
    { name: 'Hats', id: 'hats', description: 'Premium technical headwear.' },
    { name: 'T-Shirts', id: 'tshirts', description: 'Heavyweight organic staples.' },
    { name: 'Hoodies', id: 'hoodies', description: 'High-density comfort gear.' },
    { name: 'Polo Shirts', id: 'polo-shirts', description: 'Elevated foundation wear.' },
    { name: 'Sweatshirts', id: 'sweatshirts', description: 'Modern athletic silhouettes.' },
    { name: '...and More!', id: 'more', description: 'Accessories & collaborations.' },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen p-6 md:p-12 xl:p-24 pb-32">
      <Helmet>
        <title>919 Designs | Precision Apparel & Embroidery</title>
        <meta name="description" content="High-end custom apparel tailored for creators, rebels, and visionaries. Professional embroidery and DTF printing." />
      </Helmet>

      {/* Intro Section */}
      <div className="max-w-4xl mb-12">
        <div className="text-xs tracking-[0.3em] text-primary-container font-bold uppercase mb-4 flex items-center gap-2">
          <span className="w-4 h-[1px] bg-primary"></span>
          919 Designs
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase text-on-surface leading-none tracking-tighter mb-8 relative">
          Stitching<br />
          <span className="text-surface-variant-focus text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-surface-variant">The Future.</span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-light">
          We manufacture high-end apparel tailored for creators, rebels, and visionaries. Explore our foundational categories below.
        </p>
      </div>

      {/* Large Hero Image Space */}
      <div className="w-full aspect-[21/9] md:aspect-[3/1] bg-surface-variant/30 overflow-hidden mb-24 relative rounded-sm border border-outline/10 shadow-2xl">
        <img 
          src="/Users/seth/.gemini/antigravity/brain/2a7750b8-e1df-4385-8562-c3700bcaf823/919designs_home_hero_v1_1776814092380.png" 
          alt="919 Designs Studio Hero" 
          className="w-full h-full object-cover opacity-80 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Category Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-8">
        {categories.map((cat, idx) => (
          <Link
            to={`/products#${cat.id}`}
            key={cat.id}
            className="group flex flex-col relative overflow-hidden bg-surface-variant/20 p-8 min-h-[250px] transition-all duration-500 hover:bg-surface-variant/40 shadow-sm hover:shadow-2xl border border-outline/5 hover:border-primary/20"
          >
            {/* Background Icon Layer */}
            <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
               <span className="material-symbols-outlined text-[100px] text-on-surface/5 transform group-hover:scale-125 transition-transform duration-1000 rotate-12 group-hover:rotate-0">
                  {cat.id === 'hats' ? 'hat' : 'checkroom'}
               </span>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                 <h2 className="text-3xl font-black uppercase tracking-tighter text-on-surface group-hover:text-primary transition-colors duration-300">
                   {cat.name}
                 </h2>
                 <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1">
                   arrow_outward
                 </span>
              </div>
              
              <div className="mt-8">
                 <p className="text-[10px] tracking-widest text-on-surface-variant uppercase font-bold mb-2 opacity-60">Section 0{idx + 1}</p>
                 <p className="text-sm text-on-surface-variant max-w-[90%] font-light tracking-wide">
                   {cat.description}
                 </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
