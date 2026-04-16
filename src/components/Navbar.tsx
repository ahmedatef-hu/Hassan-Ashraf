import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'عن الدكتور', path: '/about' },
    { label: 'الخدمات', path: '/services' },
    { label: 'الفروع', path: '/branches' },
    { label: 'تواصل معنا', path: '/contact' },
    { label: 'حجوزاتي', path: '/patient-portal' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-600 to-teal-500 backdrop-blur-2xl z-50 border-b border-blue-600/60 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 group">
            <h1 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300 origin-left drop-shadow-md">
              Hassan Ashraf
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="nav-link group relative px-5 py-2.5 text-white font-medium rounded-xl transition-all duration-300"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 group"
          >
            <svg className="w-6 h-6 text-white group-hover:text-blue-50 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 border-t border-white/30 bg-gradient-to-b from-blue-600/90 via-teal-500/80 to-blue-600/90 backdrop-blur-xl">
            <div className="flex flex-col space-y-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group relative mx-2 px-4 py-3 text-white hover:text-blue-50 rounded-xl transition-all duration-300 font-medium overflow-hidden"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-white/20 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-300 origin-center -z-10"></span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
