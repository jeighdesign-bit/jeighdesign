/**
 * TextPressure - Vanilla JS port of the React Bits "Text Pressure" component
 * Splits text into individual character spans and morphs their font variation settings
 * (width, weight, slant) in real-time based on cursor proximity.
 */

class TextPressure {
  constructor(elementId, options = {}) {
    this.title = document.getElementById(elementId);
    if (!this.title) return;

    // Configuration settings
    this.fontFamily = options.fontFamily || 'Compressa VF';
    this.width = options.width !== undefined ? options.width : true;
    this.weight = options.weight !== undefined ? options.weight : true;
    this.italic = options.italic !== undefined ? options.italic : true;
    this.minFontSize = options.minFontSize || 36;
    this.flex = options.flex !== undefined ? options.flex : false;

    // Track mouse & target positions
    this.mouse = { x: 0, y: 0 };
    this.cursor = { x: 0, y: 0 };
    this.spans = [];
    this.rafId = null;

    this.init();
  }

  init() {
    const text = this.title.textContent.trim();
    const chars = text.split('');
    this.title.innerHTML = ''; // Clear original text

    // Wrap each character (and space) in a span
    chars.forEach(char => {
      const span = document.createElement('span');
      span.innerHTML = char === ' ' ? '&nbsp;' : char;
      span.style.display = 'inline-block';
      span.style.userSelect = 'none';
      span.style.fontFamily = this.fontFamily;
      this.title.appendChild(span);
      this.spans.push(span);
    });

    // Styling overrides for the title wrapper
    this.title.style.fontFamily = this.fontFamily;
    this.title.style.userSelect = 'none';
    this.title.style.whiteSpace = 'nowrap';
    this.title.style.display = this.flex ? 'flex' : 'inline-flex';
    if (this.flex) {
      this.title.style.justifyContent = 'space-between';
      this.title.style.width = '100%';
    } else {
      this.title.style.justifyContent = 'center';
      this.title.style.gap = '0.01em';
    }

    // Set initial mouse values in center of element
    const rect = this.title.getBoundingClientRect();
    this.mouse.x = rect.left + rect.width / 2;
    this.mouse.y = rect.top + rect.height / 2;
    this.cursor.x = this.mouse.x;
    this.cursor.y = this.mouse.y;

    // Bind event listeners
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.animate = this.animate.bind(this);

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove, { passive: true });
    window.addEventListener('resize', this.handleResize);

    // Initial resize sizing
    this.handleResize();

    // Start animation loop
    this.rafId = requestAnimationFrame(this.animate);
  }

  handleMouseMove(e) {
    this.cursor.x = e.clientX;
    this.cursor.y = e.clientY;
  }

  handleTouchMove(e) {
    if (e.touches && e.touches[0]) {
      this.cursor.x = e.touches[0].clientX;
      this.cursor.y = e.touches[0].clientY;
    }
  }

  handleResize() {
    const parent = this.title.parentElement;
    if (!parent) return;

    const parentW = parent.clientWidth;
    // Estimate size dynamically based on characters count
    let newFontSize = parentW / (this.spans.length * 0.45);
    newFontSize = Math.max(newFontSize, this.minFontSize);

    // Cap font-size based on screen width to prevent giant overflow
    const maxFontSize = window.innerWidth > 768 ? 96 : 48;
    newFontSize = Math.min(newFontSize, maxFontSize);

    this.title.style.fontSize = `${newFontSize}px`;
  }

  animate() {
    // Smooth easing/dampening
    this.mouse.x += (this.cursor.x - this.mouse.x) / 12;
    this.mouse.y += (this.cursor.y - this.mouse.y) / 12;

    const titleRect = this.title.getBoundingClientRect();
    const maxDist = Math.max(titleRect.width / 2, 200);

    const dist = (a, b) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getAttr = (distance, maxDistance, minVal, maxVal) => {
      const val = maxVal - Math.abs((maxVal * distance) / maxDistance);
      return Math.max(minVal, val + minVal);
    };

    this.spans.forEach(span => {
      const rect = span.getBoundingClientRect();
      const charCenter = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };

      const d = dist(this.mouse, charCenter);

      // Map values based on distance to cursor
      const wdth = this.width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
      const wght = this.weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
      const italVal = this.italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;

      const newSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;

      if (span.style.fontVariationSettings !== newSettings) {
        span.style.fontVariationSettings = newSettings;
      }
    });

    this.rafId = requestAnimationFrame(this.animate);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('resize', this.handleResize);
  }
}

// Auto-instantiate when DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
  window.textPressureInstance = new TextPressure('hero-title-pressure', {
    fontFamily: 'Compressa VF',
    width: true,
    weight: true,
    italic: true,
    minFontSize: 36,
    flex: false // Group centered look
  });
});
