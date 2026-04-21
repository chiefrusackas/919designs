import { Link, useLocation } from 'react-router-dom';

export default function BottomNavBar() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Products', icon: 'view_cozy', path: '/products' },
    { label: 'Create Order', icon: 'precision_manufacturing', path: '/configurator' },
    { label: 'Gallery', icon: 'photo_library', path: '/gallery' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 h-20 bg-surface-dim border-t border-outline/20 md:hidden pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 w-20 rounded-md transition-colors ${
              isActive ? 'text-primary-container' : 'text-on-surface hover:text-primary-container/80'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
            <span className="text-[10px] tracking-widest font-medium uppercase">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
