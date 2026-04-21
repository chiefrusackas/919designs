import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="w-full flex justify-center py-12 px-8 flex-col bg-surface border-t border-outline/10 mt-auto pb-28 md:pb-12">
      {/* Footer CTA */}
      <div className="w-full flex justify-between items-center bg-surface-variant/30 p-8 mb-12 border border-outline/10">
         <h3 className="text-xl md:text-3xl font-black uppercase text-on-surface tracking-tight">Ready to build?</h3>
         <Link 
           to="/configurator" 
           className="inline-flex items-center justify-center px-6 py-3 bg-primary text-on-primary text-sm font-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-primary transition-colors shadow-md"
         >
           Let's Get Started!
         </Link>
      </div>
      
      {/* Default Footer Content */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold tracking-[0.2em] text-on-surface uppercase">
            919<span className="text-primary-container">DESIGNS</span>
          </h2>
          <p className="text-on-surface-variant max-w-sm text-sm leading-relaxed font-light">
            Precision-engineered apparel. Designed in the 919. Built for performance.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-12 w-full md:w-auto">
          <div className="flex flex-col gap-3">
            <span className="text-xs tracking-widest text-on-surface uppercase font-bold mb-2">Platform</span>
            <Link to="/products" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Catalog</Link>
            <Link to="/configurator" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Create Order</Link>
            <Link to="/faq" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Technical FAQ</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs tracking-widest text-on-surface uppercase font-bold mb-2">Legal</span>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-on-surface-variant hover:text-primary transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
