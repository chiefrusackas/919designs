import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const categories = [
    { name: 'Hats', id: 'hats', description: 'Premium stitched technical headwear.' },
    { name: 'T-Shirts', id: 'tshirts', description: 'Heavyweight organic cotton staples.' },
    { name: 'Hoodies', id: 'hoodies', description: 'Engineered for comfort and durability.' },
    { name: 'Other', id: 'other', description: 'Accessories and unique collaborative runs.' },
  ];

  return (
    <div className="w-full flex flex-col min-h-screen p-6 md:p-12 xl:p-24 pb-32">
      <Helmet>
        <title>919 Designs | Precision Apparel & Embroidery</title>
        <meta name="description" content="High-end custom apparel tailored for creators, rebels, and visionaries. Professional embroidery and DTF printing." />
      </Helmet>

      {/* Intro Section */}
      <div className="max-w-4xl mb-16">
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

      {/* Featured Photos Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-8 pt-8">
        {categories.map((cat, idx) => (
          <Link
            to="/products"
            key={cat.id}
            className={`group flex flex-col relative overflow-hidden bg-surface-variant/30 p-8 min-h-[300px] transition-all duration-500 hover:bg-surface-variant/50 shadow-inner ${idx === 0 || idx === 3 ? 'md:col-span-1' : 'md:col-span-1'}`}
          >
            {/* Background Image / Placeholder layer */}
            <div className="absolute inset-0 bg-surface-variant/20 group-hover:bg-surface-variant/40 transition-colors z-0 flex items-center justify-center overflow-hidden">
               {/* Note: Insert generated image here later if needed */}
               <span className="material-symbols-outlined text-[120px] text-on-surface/5 transform group-hover:scale-110 transition-transform duration-700">
                  checkroom
               </span>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
              <div className="flex justify-between items-start">
                 <h2 className="text-4xl font-bold uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">
                   {cat.name}
                 </h2>
                 <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                   arrow_outward
                 </span>
              </div>
              
              <div className="mt-8">
                 <p className="text-sm text-on-surface-variant max-w-[80%] font-light">
                   {cat.description}
                 </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
