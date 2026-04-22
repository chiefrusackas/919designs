import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Create Order', path: '/configurator' },
    { label: 'Gallery', path: '/gallery' },
  ];

  const handleClose = () => setIsMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 w-full z-[60] flex items-center justify-between px-6 h-16 bg-surface/80 backdrop-blur-2xl border-b border-outline/10 transition-colors">
        <div className="flex items-center gap-10">
          {/* Menu Icon */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-on-surface hover:text-primary transition-colors focus:outline-none relative z-[60] lg:hidden"
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Brand ID */}
          <Link to="/" onClick={handleClose} className="text-xl font-black tracking-[0.2em] text-on-surface uppercase relative z-[60] flex-shrink-0">
            919<span className="text-primary">DESIGNS</span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-8 relative z-[60]">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`text-xs font-black tracking-[0.2em] uppercase transition-colors hover:text-primary ${
                  location.pathname === item.path ? 'text-primary' : 'text-on-surface/70'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6 relative z-[60]">
          <a href="https://www.instagram.com/nineonenine_designs" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-on-surface hover:text-primary transition-colors focus:outline-none">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <Link 
            to="/configurator" 
            onClick={handleClose}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 bg-primary text-on-primary text-xs font-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-primary transition-colors shadow-sm"
          >
            Create Order
          </Link>
          {/* Sign In / Avatar placeholder */}
          <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors focus:outline-none">
            <span className="material-symbols-outlined text-sm">person</span>
          </button>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-surface/95 backdrop-blur-2xl transition-all duration-500 ease-in-out flex flex-col items-center justify-center ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 w-full px-6">
          {navItems.map((item, i) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={handleClose}
                style={{ transitionDelay: `${i * 75}ms` }}
                className={`text-4xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-500 transform ${
                  isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-on-surface hover:text-primary-container hover:scale-105'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        {/* Mobile CTA inside menu */}
        <div className={`mt-16 md:hidden transition-all duration-700 delay-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Link 
            to="/configurator" 
            onClick={handleClose}
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-on-primary text-sm font-bold uppercase tracking-widest shadow-xl hover:bg-primary-container transition-colors"
          >
            Let's Get Started!
          </Link>
        </div>
      </div>
    </>
  );
}
