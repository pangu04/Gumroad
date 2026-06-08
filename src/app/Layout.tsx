import { Outlet, useLocation } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export function Layout() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
      {!isLogin && <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      {!isLogin && <Footer />}
    </div>
  );
}
