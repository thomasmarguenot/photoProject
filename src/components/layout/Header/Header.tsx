import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import type { HeaderProps } from './Header.types';
import './Header.css';

type NavItem = {
  to: string;
  label: string;
  end?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Home', end: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/charte', label: 'Charte' },
  { to: '/contact', label: 'Contact' },
];

export function Header({ title = 'とーます・まるぐの' }: HeaderProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  const updateIndicator = () => {
    const activeItem = NAV_ITEMS.find((i) => i.to === pathname) || NAV_ITEMS[0];
    const el = linkRefs.current[activeItem.to];
    const navEl = navRef.current;
    const indicatorEl = indicatorRef.current;
    if (!el || !navEl || !indicatorEl) return;

    const navRect = navEl.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    // read horizontal padding from CSS variable (fallback to 16px)
    const paddingX = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-indicator-padding'
      ) || '16'
    );

    // compute left and width including padding so the single pill translates between items
    const left = elRect.left - navRect.left + navEl.scrollLeft - paddingX;
    const width = elRect.width + paddingX * 2;

    // set height to match element's height plus vertical padding (from CSS variable)
    const verticalPad = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--header-indicator-vertical-padding'
      ) || '6'
    );
    const height = elRect.height + verticalPad + 8; // add small extra for comfortable sizing

    // Apply transform/width/height to indicator for smooth translate animation
    indicatorEl.style.width = `${width}px`;
    indicatorEl.style.height = `${height}px`;
    indicatorEl.style.transform = `translateX(${left}px) translateY(-50%)`;
  };

  useEffect(() => {
    updateIndicator();
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="header-title-wrapper">
            <span className="header-title header-title-base">{title}</span>
            <span
              className="header-title header-title-overlay"
              aria-hidden="true"
            >
              {title}
            </span>
          </Link>
        </div>
        <nav
          className="header-nav"
          ref={(r) => {
            navRef.current = r;
          }}
        >
          <div
            className="header-nav-indicator"
            ref={(r) => {
              indicatorRef.current = r;
            }}
          />
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `header-link${isActive ? ' active' : ''}`
              }
              ref={(el: HTMLAnchorElement | null) => {
                linkRefs.current[item.to] = el;
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
