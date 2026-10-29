import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, type MouseEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import {
  getPageDirection,
  usePageTransition,
} from '@/components/layout/PageTransition/PageTransition.context';
import { useHeader } from '@/context/Header.context';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';
import { preloadRoute } from '@/pages/lazyPages';
import {
  headerVariants,
  mobileMenuItemVariants,
  mobileMenuNavVariants,
  mobileMenuOverlayVariants,
} from '@/utils/animations';
import { ROUTES } from '@/utils/constants';

import type { NavItem } from './Header.types';
import { useNavIndicator } from './useNavIndicator';
import './Header.css';
import './HeaderBurger.css';

const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.HOME, label: 'Accueil', end: true },
  { to: ROUTES.GALLERY, label: 'Galerie' },
  { to: ROUTES.ABOUT, label: 'À propos' },
  { to: ROUTES.CONTACT, label: 'Contact' },
];

const TITLE = 'Thomas Marguenot';
const ROMAN_TITLE = 'とーます・まるぐの';

export function Header() {
  const { hidden } = useHeader();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const runTransition = usePageTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveringTitle, setHoveringTitle] = useState(false);
  const [titleAnimationFinished, setTitleAnimationFinished] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activePath = (
    NAV_ITEMS.find((item) => item.to === pathname) ?? NAV_ITEMS[0]
  ).to;
  const { navRef, indicatorRef, linkRefs } = useNavIndicator(activePath);

  useBodyOverflow(mobileOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateWithTransition = (to: string) => {
    if (to === pathname) return;
    runTransition(
      getPageDirection(pathname, to),
      () => navigate(to),
      () => preloadRoute(to)
    );
  };

  const handleDesktopLinkClick = (
    e: MouseEvent<HTMLAnchorElement>,
    to: string
  ) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <motion.header
      className={`header${scrolled ? ' header--scrolled' : ''}`}
      variants={headerVariants}
      initial="enter"
      animate={hidden ? 'hidden' : 'visible'}
    >
      <div className="header-container">
        <div className="header-logo">
          <div
            className="header-title-wrapper"
            onMouseEnter={() => {
              if (titleAnimationFinished) setHoveringTitle(true);
            }}
            onMouseLeave={() => setHoveringTitle(false)}
          >
            <span className="header-title header-title-base">
              {hoveringTitle ? ROMAN_TITLE : TITLE}
            </span>
            <span
              className="header-title header-title-overlay"
              aria-hidden="true"
              style={{
                opacity: hoveringTitle ? 0 : 1,
                pointerEvents: hoveringTitle ? 'none' : undefined,
              }}
              onAnimationEnd={() => setTitleAnimationFinished(true)}
            >
              {TITLE}
            </span>
          </div>
        </div>
        <nav className="header-nav" ref={navRef}>
          <div className="header-nav-indicator" ref={indicatorRef} />
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `header-link${isActive ? ' active' : ''}`
              }
              ref={(el) => {
                linkRefs.current[item.to] = el;
              }}
              onMouseEnter={() => preloadRoute(item.to)}
              onFocus={() => preloadRoute(item.to)}
              onClick={(e) => handleDesktopLinkClick(e, item.to)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-burger-wrapper">
          <button
            className={`header-burger${mobileOpen ? ' open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="header-mobile-overlay"
            onClick={() => setMobileOpen((v) => !v)}
            type="button"
          >
            <span className="header-burger-bar" />
            <span className="header-burger-bar" />
            <span className="header-burger-bar" />
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-overlay"
              id="header-mobile-overlay"
              className="header-mobile-overlay"
              variants={mobileMenuOverlayVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.nav
                className="header-mobile-nav"
                variants={mobileMenuNavVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div key={item.to} variants={mobileMenuItemVariants}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `header-mobile-link${isActive ? ' active' : ''}`
                      }
                      onMouseEnter={() => preloadRoute(item.to)}
                      onFocus={() => preloadRoute(item.to)}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileOpen(false);
                        navigateWithTransition(item.to);
                      }}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
