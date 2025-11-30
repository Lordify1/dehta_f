import { appName, appUrl, date } from '@/app';
import ParticleBackground from '@/components/ParticleBackground';
import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaUserAlt } from 'react-icons/fa';
import { useUser } from "@/context/UserContext";
import { classMap, FadeInAnim, PresaleBtn, SlideDown } from '../../components/Tools/Misc';

interface LayoutProps {
  children: ReactNode;
  showNavs: boolean;
}

  // { href: `${appUrl}/about`, label: 'About' },

const socials = [/* unchanged socials here */];

const Layout: React.FC<LayoutProps> = ({ children, showNavs = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState('');
  const { user } = useUser();

  const authStatus = (auth:string, guest:string) => {
    const status = user ? auth : guest;
    return status;
  }

  const navLinks = [
    // { href: '#allPages', label: 'All Pages', dropDown: true },
    { href: `${appUrl}/projects`, label: 'Projects' },
    { href: `${appUrl}/trendbet`, label: 'TrendBet' },
    { href: `${appUrl}/${authStatus('dashboard','login')}`, label: `${authStatus('Dashboard','Login')}` },
  ];

  useEffect(() => {
    const sectionIds = navLinks
      .filter(link => link.href.startsWith('#'))
      .map(link => link.href.replace('#', ''));

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: 0.6 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-(--background) text-(--primary)">
        
        {/* HEADER */}
        <header className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-[var(--tbg)] via-[] to-[] backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 sm:px-12 py-4">

            {/* Logo */}
            <Link to={'/'} replace className="w-20">
              <img src={`/logo.svg`} alt="Logo" />
            </Link>

            {/* DESKTOP NAV */}
            {showNavs && (
              <nav className="hidden md:flex space-x-8 font-medium text-sm relative">
                {navLinks.map((link, idx) => (
                  <div key={idx} className="relative">
                    <Link
                      to={link.href}
                      className={`transition-colors ${
                        activeSection === link.href.replace("#", "")
                          ? "text-[var(--owner)]"
                          : "text-[var(--primary)] hover:text-[var(--owner)]"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {/* Dropdown */}
                    {link.dropDown && (
                      <>
                        <button
                          onClick={() =>
                            setDropdownOpen(prev => (prev === link.label ? '' : link.label))
                          }
                          className="ml-1 text-[var(--primary)] hover:text-[var(--owner)]"
                        >
                          <FaArrowDown
                            className={`transition-transform ${
                              dropdownOpen === link.label ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>

                        {dropdownOpen === link.label && (
                          <div className="absolute top-full right-0 bg-[var(--background)] border border-[var(--border)] rounded-md p-4 w-48 shadow-xl space-y-3 z-40 animate-fadeIn">
                            <a className="block hover:text-[var(--owner)]">Option One</a>
                            <a className="block hover:text-[var(--owner)]">Option Two</a>
                            <a className="block hover:text-[var(--owner)]">Option Three</a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </nav>
            )}

            {/* MOBILE MENU BUTTON */}
            {showNavs && (
              <button
                className={`md:hidden p-2 rounded transition-all ${
                  menuOpen ? "bg-[var(--owner)] rotate-90" : "hover:bg-[var(--ceo)]"
                }`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <svg
                  className="w-6 h-6 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {menuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M3 12h18M3 6h18M3 18h18" />
                  )}
                </svg>
              </button>
            )}

            {/* USER BTN */}
            {showNavs &&
              (user ? (
                <Link to={`/dashboard`} className="hidden lg:flex rounded-full p-3 border-2 border-[var(--owner)]">
                  <FaUserAlt className="text-[var(--owner)]" />
                </Link>
              ) : (
                <Link className={`${classMap.button()}`} to="/register">
                  Get Started
                </Link>
              ))}
          </div>

          {/* MOBILE NAV PANEL */}
          {menuOpen && (
            <div className="md:hidden px-6 pb-6 w-full animate-fadeIn">
              <div className="border border-[var(--border)] rounded-md bg-[var(--background)] p-4 space-y-4">
                {navLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 text-[var(--primary)] hover:text-[var(--owner)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* MAIN */}
        <main className="relative flex-grow w-full px-0">
          <ParticleBackground />
          {children}
        </main>
        <PresaleBtn/>

        {/* FOOTER */}
        <footer className="bg-[var(--background)] border-t border-[var(--border)] py-10 px-6 sm:px-12 mt-auto">
          <div className="text-[var(--primary)] flex items-center justify-center gap-6 text-lg">
            {socials.map(({ name, href, icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer">
                {icon}
              </a>
            ))}
          </div>
          <p className="text-center text-[var(--accent)] text-xs mt-8">
            © {appName} {date()}. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;