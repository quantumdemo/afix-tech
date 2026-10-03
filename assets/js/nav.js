/**
 * Mobile Navigation Module
 * Handles responsive menu toggle, accessibility focus trap, ARIA attributes, and Esc key listeners.
 */

export function initNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const backdrop = document.querySelector('.nav-backdrop');

  if (!toggleBtn || !navMenu) return;

  let isOpen = false;
  let focusableElements = [];
  let firstFocusable = null;
  let lastFocusable = null;

  function updateFocusables() {
    focusableElements = Array.from(
      navMenu.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])')
    );
    firstFocusable = focusableElements[0];
    lastFocusable = focusableElements[focusableElements.length - 1];
  }

  function openMenu() {
    isOpen = true;
    toggleBtn.setAttribute('aria-expanded', 'true');
    navMenu.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-visible');
    document.body.style.overflow = 'hidden';

    updateFocusables();
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  function closeMenu() {
    isOpen = false;
    toggleBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';

    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Handle Keydown (Esc and Tab trapping)
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      closeMenu();
    } else if (e.key === 'Tab') {
      if (focusableElements.length === 0) return;

      if (e.shiftKey) { // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else { // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  });

  // Close menu when clicking nav links
  const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isOpen) closeMenu();
    });
  });
}
