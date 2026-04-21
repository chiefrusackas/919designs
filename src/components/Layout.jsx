import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-surface">
      <Header />
      <Sidebar />
      <main className="flex-grow pt-16 xl:pl-24">
        <div className="max-w-[1600px] mx-auto w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      <BottomNavBar />
    </div>
  );
}
