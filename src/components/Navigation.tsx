"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Главная', href: '/' },
    { label: 'Проекты', href: '#projects' },
    { label: 'О нас', href: '#about' },
    { label: 'Услуги', href: '/services' },
    { label: 'НАЧАТЬ ПРОЕКТ', href: '#contact' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
        transition: 'background-color 0.3s ease',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        boxSizing: 'border-box',
      }}
    >
      {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
        <div
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 300,
            letterSpacing: '2px',
            cursor: 'pointer',
          }}
        >
          M9
        </div>
        </Link>

      {/* Desktop Menu */}
      <div
        style={{
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
        }}
        className="desktop-menu"
      >
        {navItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <span
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '0.75rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'opacity 0.3s ease',
                fontFamily: 'inherit',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Burger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '24px',
          height: '18px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
        className="burger-button"
      >
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            transition: 'all 0.3s ease',
          }}
        />
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            transition: 'all 0.3s ease',
          }}
        />
        <span
          style={{
            display: 'block',
            width: '100%',
            height: '2px',
            backgroundColor: 'white',
            transition: 'all 0.3s ease',
          }}
        />
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            padding: '16px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
          className="mobile-menu"
        >
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <span
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '0.875rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '12px 0',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  display: 'block',
                }}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Responsive Styles */}
        <style>{`
          @media (max-width: 768px) {
            .desktop-menu {
              display: none !important;
            }
            .burger-button {
              display: flex !important;
            }
            nav div[onClick] {
              font-size: 1.25rem !important;
            }
          }
        `}</style>
    </nav>
  );
}