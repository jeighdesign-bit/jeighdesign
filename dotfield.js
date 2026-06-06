/**
 * DotField - Vanilla JS port of the React Bits "Dot Field" component
 * An interactive, responsive background canvas that reacts to cursor movement.
 */

class DotField {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Configurable options with defaults
    this.dotRadius = options.dotRadius !== undefined ? options.dotRadius : 1.5;
    this.dotSpacing = options.dotSpacing !== undefined ? options.dotSpacing : 14;
    this.cursorRadius = options.cursorRadius !== undefined ? options.cursorRadius : 500;
    this.cursorForce = options.cursorForce !== undefined ? options.cursorForce : 0.1;
    this.bulgeOnly = options.bulgeOnly !== undefined ? options.bulgeOnly : true;
    this.bulgeStrength = options.bulgeStrength !== undefined ? options.bulgeStrength : 67;
    this.glowRadius = options.glowRadius !== undefined ? options.glowRadius : 160;
    this.sparkle = options.sparkle !== undefined ? options.sparkle : false;
    this.waveAmplitude = options.waveAmplitude !== undefined ? options.waveAmplitude : 0;

    // Canvas & State Setup
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.inset = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.container.appendChild(this.canvas);
    
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.dots = [];
    this.mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    this.size = { w: 0, h: 0, offsetX: 0, offsetY: 0 };
    this.glowOpacity = 0;
    this.engagement = 0;
    this.frameCount = 0;
    this.rafId = null;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Color definitions (fetched dynamically based on theme)
    this.gradientFrom = 'rgba(168, 85, 247, 0.35)';
    this.gradientTo = 'rgba(180, 151, 207, 0.25)';
    this.glowColor = '#120F17';

    this.init();
  }

  init() {
    // Sync colors with current document theme/styles
    this.updateColors();

    // Bind event listeners
    this.resize = this.resize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.updateMouseSpeed = this.updateMouseSpeed.bind(this);
    this.tick = this.tick.bind(this);

    window.addEventListener('resize', this.resize);
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    
    // Track speed every 20ms
    this.speedInterval = setInterval(this.updateMouseSpeed, 20);

    // Initial resize to set dimensions and build dots
    this.resize();

    // Start render loop
    this.rafId = requestAnimationFrame(this.tick);

    // Watch for theme alterations to adjust colors dynamically
    this.observeTheme();
  }

  updateColors() {
    const rootStyles = getComputedStyle(document.documentElement);
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // Read variables from style.css or use beautiful defaults
    const primaryColor = rootStyles.getPropertyValue('--color-primary').trim() || (isDark ? '#a38cff' : '#5e3bdb');
    const secondaryColor = rootStyles.getPropertyValue('--color-secondary').trim() || (isDark ? '#58c2ff' : '#006590');
    const bgColor = rootStyles.getPropertyValue('--color-background').trim() || (isDark ? '#0b0a0e' : '#fbf8fe');

    // Parse primary & secondary hex/rgb to apply proper alpha values
    this.gradientFrom = this.hexToRgba(primaryColor, 0.35);
    this.gradientTo = this.hexToRgba(secondaryColor, 0.2);
    this.glowColor = bgColor;
  }

  hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(char => char + char).join('');
    }
    
    // If it's already rgb/rgba format, return it
    if (hex.startsWith('rgb')) {
      return hex.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Fallback if parsing fails
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      return hex;
    }

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  observeTheme() {
    this.themeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme' || mutation.attributeName === 'class') {
          // Add brief delay to let styles apply
          setTimeout(() => this.updateColors(), 50);
        }
      });
    });

    this.themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    });
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    this.size = {
      w,
      h,
      offsetX: rect.left + window.scrollX,
      offsetY: rect.top + window.scrollY,
    };

    this.buildDots(w, h);
  }

  buildDots(w, h) {
    const step = this.dotRadius + this.dotSpacing;
    const cols = Math.floor(w / step);
    const rows = Math.floor(h / step);
    const padX = (w % step) / 2;
    const padY = (h % step) / 2;
    const dotsCount = rows * cols;
    
    this.dots = new Array(dotsCount);
    let idx = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const ax = padX + col * step + step / 2;
        const ay = padY + row * step + step / 2;
        this.dots[idx++] = {
          ax,
          ay,
          sx: ax,
          sy: ay,
          vx: 0,
          vy: 0,
          x: ax,
          y: ay
        };
      }
    }
  }

  onMouseMove(e) {
    // Read offset dynamically since page can scroll or resize
    const rect = this.container.getBoundingClientRect();
    this.size.offsetX = rect.left + window.scrollX;
    this.size.offsetY = rect.top + window.scrollY;

    this.mouse.x = e.pageX - this.size.offsetX;
    this.mouse.y = e.pageY - this.size.offsetY;
  }

  updateMouseSpeed() {
    const m = this.mouse;
    const dx = m.prevX - m.x;
    const dy = m.prevY - m.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    m.speed += (dist - m.speed) * 0.5;
    if (m.speed < 0.001) m.speed = 0;
    
    m.prevX = m.x;
    m.prevY = m.y;
  }

  tick() {
    this.frameCount++;
    const dots = this.dots;
    const m = this.mouse;
    const { w, h } = this.size;
    const len = dots.length;
    const t = this.frameCount * 0.02;

    const targetEngagement = Math.min(m.speed / 5, 1);
    this.engagement += (targetEngagement - this.engagement) * 0.06;
    if (this.engagement < 0.001) this.engagement = 0;
    const eng = this.engagement;

    this.glowOpacity += (eng - this.glowOpacity) * 0.08;

    this.ctx.clearRect(0, 0, w, h);

    if (len === 0) {
      this.rafId = requestAnimationFrame(this.tick);
      return;
    }

    // Set Linear Gradient for Dots
    const grad = this.ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, this.gradientFrom);
    grad.addColorStop(1, this.gradientTo);
    this.ctx.fillStyle = grad;

    const cr = this.cursorRadius;
    const crSq = cr * cr;
    const rad = this.dotRadius / 2;
    const isBulge = this.bulgeOnly;

    this.ctx.beginPath();

    for (let i = 0; i < len; i++) {
      const d = dots[i];
      const dx = m.x - d.ax;
      const dy = m.y - d.ay;
      const distSq = dx * dx + dy * dy;

      if (distSq < crSq && eng > 0.01) {
        const dist = Math.sqrt(distSq);
        if (isBulge) {
          const tFactor = 1 - dist / cr;
          const push = tFactor * tFactor * this.bulgeStrength * eng;
          const angle = Math.atan2(dy, dx);
          d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.15;
          d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.15;
        } else {
          const angle = Math.atan2(dy, dx);
          const move = (500 / dist) * (m.speed * this.cursorForce);
          d.vx += Math.cos(angle) * -move;
          d.vy += Math.sin(angle) * -move;
        }
      } else if (isBulge) {
        d.sx += (d.ax - d.sx) * 0.1;
        d.sy += (d.ay - d.sy) * 0.1;
      }

      if (!isBulge) {
        d.vx *= 0.9;
        d.vy *= 0.9;
        d.x = d.ax + d.vx;
        d.y = d.ay + d.vy;
        d.sx += (d.x - d.sx) * 0.1;
        d.sy += (d.y - d.sy) * 0.1;
      }

      let drawX = d.sx;
      let drawY = d.sy;
      if (this.waveAmplitude > 0) {
        drawY += Math.sin(d.ax * 0.03 + t) * this.waveAmplitude;
        drawX += Math.cos(d.ay * 0.03 + t * 0.7) * this.waveAmplitude * 0.5;
      }

      if (this.sparkle) {
        const hash = ((i * 2654435761) ^ (this.frameCount >> 3)) >>> 0;
        if ((hash % 100) < 3) {
          this.ctx.moveTo(drawX + rad * 1.8, drawY);
          this.ctx.arc(drawX, drawY, rad * 1.8, 0, Math.PI * 2);
        } else {
          this.ctx.moveTo(drawX + rad, drawY);
          this.ctx.arc(drawX, drawY, rad, 0, Math.PI * 2);
        }
      } else {
        this.ctx.moveTo(drawX + rad, drawY);
        this.ctx.arc(drawX, drawY, rad, 0, Math.PI * 2);
      }
    }

    this.ctx.fill();

    // Render Glow Mask directly in Canvas (more performant than SVG overlay)
    if (this.glowOpacity > 0.01 && m.x !== -9999) {
      this.ctx.save();
      const glowGrad = this.ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, this.glowRadius);
      glowGrad.addColorStop(0, this.glowColor);
      
      // Extract components to set smooth fade out
      let stopColorTransparent = 'rgba(11, 10, 14, 0)';
      if (this.glowColor.startsWith('#')) {
        stopColorTransparent = this.hexToRgba(this.glowColor, 0);
      } else if (this.glowColor.startsWith('rgb')) {
        stopColorTransparent = this.glowColor.replace(')', ', 0)').replace('rgb', 'rgba');
      }
      
      glowGrad.addColorStop(1, stopColorTransparent);

      this.ctx.fillStyle = glowGrad;
      this.ctx.globalAlpha = this.glowOpacity;
      this.ctx.beginPath();
      this.ctx.arc(m.x, m.y, this.glowRadius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    this.rafId = requestAnimationFrame(this.tick);
  }

  destroy() {
    cancelAnimationFrame(this.rafId);
    clearInterval(this.speedInterval);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('mousemove', this.onMouseMove);
    if (this.themeObserver) this.themeObserver.disconnect();
    if (this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }
}

// Auto-initialize when the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize DotField on container #dot-field-bg
  window.dotFieldInstance = new DotField('dot-field-bg', {
    dotRadius: 1.5,
    dotSpacing: 14,
    cursorRadius: 300,  // Subtle mouse attraction/repulsion radius
    cursorForce: 0.08,
    bulgeOnly: true,    // Bulge (push away) effect
    bulgeStrength: 50,  // Tweak strength of repulsion
    glowRadius: 150,
    sparkle: true,      // Turn on subtle organic twinkling
    waveAmplitude: 0    // Keep flat or set to small value (e.g. 2) for ocean waves
  });
});
