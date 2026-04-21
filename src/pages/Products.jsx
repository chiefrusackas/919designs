import { useState } from 'react';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Dynamically import all product JSON files
  const productsData = import.meta.glob('../content/products/*.json', { eager: true });
  const products = Object.keys(productsData).map((key, index) => {
    return {
      id: index + 1,
      ...(productsData[key].default || productsData[key])
    };
  });

  const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="w-full flex flex-col min-h-screen p-6 md:p-12 xl:p-24 pb-32">
      <div className="text-xs tracking-[0.3em] text-primary-container font-bold uppercase mb-4 flex items-center gap-2">
        <span className="w-4 h-[1px] bg-primary"></span>
        Collection
      </div>
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <h1 className="text-6xl md:text-8xl font-black uppercase text-on-surface leading-none tracking-tighter relative">
          Products
        </h1>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs tracking-widest font-bold uppercase transition-all border ${
                activeCategory === cat 
                  ? 'border-primary bg-primary text-on-primary' 
                  : 'border-outline/20 bg-surface text-on-surface hover:border-primary-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full border-t border-outline/20 pt-8">
        {filteredProducts.map((item) => (
          <div key={item.id} className="flex flex-col group cursor-pointer relative overflow-hidden bg-surface">
            <div className="aspect-[3/4] bg-surface-variant/30 border border-outline/10 flex items-center justify-center mb-4 relative overflow-hidden transition-all group-hover:bg-surface-variant/50">
              {item.image ? (
                <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
              ) : (
                <span className="material-symbols-outlined text-[80px] text-on-surface-variant/20 group-hover:text-on-surface-variant/40 transition-colors transform group-hover:scale-110 duration-700">
                  {item.category === 'Hats' ? 'apparel' : item.category === 'Jackets' ? 'dry_cleaning' : 'checkroom'}
                </span>
              )}
              
              <div className="absolute top-4 left-4">
                 <span className="bg-surface/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface">
                    {item.status}
                 </span>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                 <button className="w-full bg-primary text-on-primary text-xs tracking-widest font-bold uppercase py-3 text-center shadow-lg hover:bg-primary-container transition-colors">
                   View Details
                 </button>
              </div>
            </div>
            
            <div className="flex justify-between items-start px-1 pb-4">
              <div>
                <span className="text-[10px] tracking-widest text-on-surface-variant uppercase font-bold mb-1 block">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
              </div>
              <span className="text-sm font-medium text-on-surface mt-1">{item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
