/**
 * BorderGlow - Vanilla JS implementation of the React Bits "Border Glow" component
 * Updates CSS variables (--edge-proximity, --cursor-angle) based on pointer movement
 * so gradient borders and glows follow the cursor trail.
 */

function initBorderGlow() {
  const cards = document.querySelectorAll('.border-glow');
  
  cards.forEach(card => {
    // Avoid binding event listeners multiple times
    if (card.dataset.glowBound) return;
    card.dataset.glowBound = 'true';

    // Track mouse/pointer movement on the element
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const w = rect.width;
      const h = rect.height;
      
      // Calculate center coordinates
      const cx = w / 2;
      const cy = h / 2;

      // Distance from center
      const dx = x - cx;
      const dy = y - cy;

      // Edge proximity calculation (0 to 1)
      let kx = dx !== 0 ? cx / Math.abs(dx) : Infinity;
      let ky = dy !== 0 ? cy / Math.abs(dy) : Infinity;
      const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

      // Angle of cursor from center (in degrees)
      let degrees = 0;
      if (dx !== 0 || dy !== 0) {
        const radians = Math.atan2(dy, dx);
        degrees = radians * (180 / Math.PI) + 90; // offset by 90 to match conic-gradient starting point
        if (degrees < 0) degrees += 360;
      }

      // Set CSS variables dynamically
      card.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
      card.style.setProperty('--cursor-angle', `${degrees.toFixed(3)}deg`);
    });

    // Reset edge-proximity when mouse leaves the card
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--edge-proximity', '0');
    });
  });
}

// Auto-run when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initBorderGlow();
});

// Expose globally so that dynamically rendered pages (works.js, showcase.js) can re-init
window.initBorderGlow = initBorderGlow;
