import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { studioAudio } from '../utils/audio';

interface HeaderProps {
  onStartProject: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onStartProject }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleAudio = () => {
    const active = studioAudio.toggle();
    setIsAudioActive(active);
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Selected Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'About', href: '#about' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Archive', href: '#archive' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fcf9f3]/90 backdrop-blur-md shadow-xs border-b border-[#c4c7c7]/40'
          : 'bg-[#fcf9f3]/70 backdrop-blur-xs border-b border-[#c4c7c7]/20'
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-16 max-w-7xl mx-auto h-20">
        {/* Studio Monogram / Logo */}
        <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="flex flex-col group">
          <span className="font-headline text-xl md:text-2xl tracking-tight text-[#1c1c18] uppercase leading-tight group-hover:text-[#745a36] transition-colors duration-250">
            OYINDAMOLA <span className="font-light italic text-[#745a36]">zoe</span>
          </span>
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#745a36] uppercase">
            AI Creative Studio
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#444748] hover:text-[#000000] transition-colors duration-200 relative py-1 hover:underline underline-offset-4 decoration-1 decoration-[#745a36]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Subtle Ambient Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            type="button"
            title={isAudioActive ? 'Mute ambient studio soundscape' : 'Play ambient studio soundscape'}
            className={`p-2 rounded-full border transition-all duration-200 flex items-center justify-center ${
              isAudioActive
                ? 'bg-[#745a36] text-white border-[#745a36] shadow-xs'
                : 'border-[#c4c7c7]/50 text-[#444748] hover:text-[#1c1c18] hover:border-[#1c1c18]'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={onStartProject}
            type="button"
            className="bg-[#000000] text-white text-[11px] font-semibold tracking-[0.16em] uppercase px-6 py-3 hover:bg-[#745a36] transition-colors duration-250 inline-flex items-center space-x-2"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            onClick={handleToggleAudio}
            type="button"
            className={`p-2 rounded-full border ${
              isAudioActive ? 'bg-[#745a36] text-white border-[#745a36]' : 'border-[#c4c7c7] text-[#444748]'
            }`}
          >
            {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-[#1c1c18] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pt-4 pb-8 bg-[#fcf9f3] border-b border-[#c4c7c7]/30 flex flex-col space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#1c1c18] py-2 border-b border-[#c4c7c7]/20 flex items-center justify-between"
            >
              <span>{link.label}</span>
              <span className="text-[#745a36] text-xs">→</span>
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onStartProject();
            }}
            type="button"
            className="mt-4 w-full bg-[#000000] text-white text-[11px] font-semibold tracking-[0.16em] uppercase py-3.5 text-center hover:bg-[#745a36] transition-colors"
          >
            Start a Project
          </button>
        </div>
      )}
    </header>
  );
};
