/**
 * Main Application Entry Script
 */

import { initNav } from './nav.js';
import { initAnimations } from './animations.js';
import { initContactForm } from './form.js';
import { initPortfolioFilter } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initContactForm();
  initPortfolioFilter();

  // Highlight header on scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
});
