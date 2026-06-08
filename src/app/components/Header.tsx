import { Link, useLocation } from 'react-router';

const navItems = [
  { label: 'Discover', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Features', path: '/features' },
  { label: 'About', path: '/about' },
  { label: 'Jobs', path: '/jobs' },
];

export function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/discover';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-black text-white px-8 py-4 flex items-center justify-between border-b-2 border-black sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-1">
        <span
          className="text-white font-bold text-xl tracking-tight select-none"
          style={{ fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.02em' }}
        >
          gumroad
        </span>
      </Link>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-150 ${
              isActive(item.path)
                ? 'bg-[#FF90E8] text-black'
                : 'text-white hover:bg-white/10'
            }`}
            style={{ fontFamily: 'Space Grotesk, sans-serif' }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-white text-sm font-semibold hover:text-[#FF90E8] transition-colors"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Log in
        </Link>
        <Link
          to="/start-selling"
          className="bg-[#FF90E8] text-black font-bold px-5 py-2 rounded-full text-sm border-2 border-[#FF90E8] hover:bg-white hover:text-black hover:border-white transition-colors duration-150"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          Start selling
        </Link>
      </div>
    </header>
  );
}
