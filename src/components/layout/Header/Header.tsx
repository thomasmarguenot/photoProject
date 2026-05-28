import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, MouseEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { usePageTransition } from '@/components/layout/PageTransition/PageTransition.context';
import { useBodyOverflow } from '@/hooks/useBodyOverflow';
import { preloadRoute } from '@/pages/lazyPages';
import { ANIMATION, ROUTES } from '@/utils/constants';

import type { HeaderProps, NavItem } from './Header.types';
import './Header.css';
import './HeaderBurger.css';

const NAV_ITEMS: NavItem[] = [
  { to: ROUTES.HOME, label: 'Accueil', end: true },
  { to: ROUTES.GALLERY, label: 'Galerie' },
  { to: ROUTES.ABOUT, label: 'À propos' },
  { to: ROUTES.CONTACT, label: 'Contact' },
];

export function Header({
  title = 'Thomas Marguenot',
  romanTitle = 'とーます・まるぐの',
  hidden = false,
}: HeaderProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { runTransition, getDirectionBetween } = usePageTransition();
  const initialPositioned = useRef<boolean>(false);

  const navigateWithTransition = useCallback(
    (to: string) => {
      if (to === pathname) return;
      const doNavigate = () => navigate(to);
      if (runTransition && getDirectionBetween) {
        runTransition(getDirectionBetween(pathname, to), doNavigate, () =>
          preloadRoute(to)
        );
      } else {
        doNavigate();
      }
    },
    [pathname, navigate, runTransition, getDirectionBetween]
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveringTitle, setHoveringTitle] = useState(false);
  const [titleAnimationFinished, setTitleAnimationFinished] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useBodyOverflow(mobileOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const navEl = navRef.current;
      const indicatorEl = indicatorRef.current;
      if (!navEl || !indicatorEl) return;
      // Desktop-only nav: below 1024px the links are display:none, so bail and
      // reset the snap flag so re-entering desktop positions without sliding.
      if (window.innerWidth < 1024) {
        indicatorEl.style.opacity = '0';
        initialPositioned.current = false;
        return;
      }
      const activeItem =
        NAV_ITEMS.find((i) => i.to === pathname) || NAV_ITEMS[0];
      const el = linkRefs.current[activeItem.to];
      if (!el) {
        indicatorEl.style.opacity = '0';
        return;
      }
      const navRect = navEl.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();

      const paddingX = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--header-indicator-padding'
        ) || '16'
      );

      const left = elRect.left - navRect.left + navEl.scrollLeft - paddingX;
      const width = elRect.width + paddingX * 2;

      const verticalPad = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          '--header-indicator-vertical-padding'
        ) || '6'
      );
      const height = elRect.height + verticalPad + 8;

      indicatorEl.style.width = `${width}px`;
      indicatorEl.style.height = `${height}px`;

      if (!initialPositioned.current) {
        indicatorEl.style.transition = 'none';
        indicatorEl.style.transform = `translateX(${left}px) translateY(-50%) scaleX(1)`;
        indicatorEl.style.opacity = '1';
        void indicatorEl.offsetWidth;
        requestAnimationFrame(() => {
          indicatorEl.style.transition = '';
        });
        initialPositioned.current = true;
        return;
      }

      indicatorEl.style.transform = `translateX(${left}px) translateY(-50%) scaleX(1)`;
      indicatorEl.style.opacity = '1';
    };

    updateIndicator();
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [pathname]);

  return (
    <motion.header
      className={`header${scrolled ? ' header--scrolled' : ''}`}
      initial={{ opacity: 0, y: -30 }}
      animate={{
        opacity: hidden ? 0 : 1,
        y: hidden ? -100 : 0,
      }}
      transition={{
        delay: hidden ? 0 : 1,
        duration: ANIMATION.DURATION_FAST,
        ease: ANIMATION.EASING,
      }}
    >
      <div className="header-container">
        {/* Logo left */}
        <div className="header-logo">
          <div
            className="header-title-wrapper"
            aria-hidden="false"
            onMouseEnter={() => {
              if (!titleAnimationFinished) return;
              setHoveringTitle(true);
            }}
            onMouseLeave={() => setHoveringTitle(false)}
          >
            <span className="header-title header-title-base">
              {hoveringTitle ? romanTitle : title}
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
              {title}
            </span>
          </div>
        </div>
        {/* Desktop nav center (hidden on mobile) */}
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
          {NAV_ITEMS.map((item) => {
            const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)
                return;
              e.preventDefault();
              navigateWithTransition(item.to);
            };
            return (
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
                onMouseEnter={() => preloadRoute(item.to)}
                onFocus={() => preloadRoute(item.to)}
                onClick={(e) => handleClick(e)}
              >
                {item.label}
              </NavLink>
            );
          })}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: ANIMATION.DURATION_FAST }}
            >
              <motion.nav
                className="header-mobile-nav"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  closed: {},
                  open: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
                  },
                }}
              >
                {NAV_ITEMS.map((item) => (
                  <motion.div
                    key={item.to}
                    variants={{
                      closed: { opacity: 0, scale: 0.8, y: 40 },
                      open: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: ANIMATION.SPRING,
                      },
                    }}
                  >
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
