import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import SakuraPetals from './SakuraPetals';
import FloatingStars from './FloatingStars';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Layout() {
  useScrollReveal(0.12);

  return (
    <div className="relative min-h-[100dvh]">
      <SakuraPetals />
      <FloatingStars />
      <Navbar />
      <main className="relative z-[1]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
