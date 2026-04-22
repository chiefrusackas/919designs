import { useOutlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';
import Sidebar from './Sidebar';
import GlobalWipe from './GlobalWipe';
import BackToTop from './BackToTop';

export default function Layout() {
  const outlet = useOutlet();

  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <GlobalWipe />
      <BackToTop />
      <Header />
      <Sidebar />
      <main className="flex-grow pt-16 xl:pl-24">
        {/* pb-24 md:pb-0 ensures content clears the bottom nav bar on mobile */}
        <div className="max-w-[1600px] mx-auto w-full pb-24 md:pb-0">
          {outlet}
        </div>
      </main>
      {/* Footer only on desktop — mobile has bottom nav */}
      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomNavBar />
    </div>
  );
}
