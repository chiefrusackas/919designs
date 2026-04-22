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
    <nav
      className="fixed bottom-0 left-0 w-full z-[80] flex justify-around items-center px-2 pt-2 md:hidden border-t border-white/10"
      style={{
        // Solid dark background — fully opaque, no transparency issues on iOS
        backgroundColor: '#1c1c1c',
        // Respect iPhone home indicator / Dynamic Island
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 10px)',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 min-w-[64px] min-h-[52px] justify-center transition-colors duration-150 ${
              isActive ? 'text-primary' : 'text-on-surface/60'
            }`}
          >
            <span
              className="material-symbols-outlined text-[22px] leading-none"
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="text-[9px] tracking-widest font-bold uppercase mt-0.5 leading-none">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
