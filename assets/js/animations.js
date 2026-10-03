/**
 * Scroll Reveal Animations Module
 * Uses IntersectionObserver to trigger smooth reveal transitions.
 * Strictly checks `prefers-reduced-motion`.
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Reveal all immediately without animation
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '50px 0px 0px 0px', // Trigger slightly ahead of viewport entry so content is ready
    threshold: 0.05
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}
