/**
 * JEIGH DESIGN - PORTFOLIO INTERACTION SCRIPT
 * Custom logic for themes, filters, animations, and form validation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mainNav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');
  const sections = document.querySelectorAll('section[id]');
  
  // Gallery
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');
  
  // Interactive Blobs
  const blob1 = document.getElementById('blob-1');
  const blob2 = document.getElementById('blob-2');
  const blob3 = document.getElementById('blob-3');

  // Contact Form
  const contactForm = document.getElementById('contact-form');
  const contactSubmitBtn = document.getElementById('contact-submit-btn');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  // --- Theme Management ---
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Initial Theme Application
  applyTheme(getPreferredTheme());

  // Toggle Theme on Click
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // --- Scroll Effects: Nav Shrink & Active Items ---
  let isScrolled = false;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolled) {
      isScrolled = scrolled;
      if (isScrolled) {
        mainNav.classList.add('scrolled');
      } else {
        mainNav.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // Active link highlighting using IntersectionObserver (highly performant)
  const observerOptions = {
    root: null,
    rootMargin: '-120px 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  // --- Mobile Drawer Menu ---
  const toggleMobileMenu = () => {
    mobileMenuBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('active');
  };

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);

  // Close drawer on links click
  const mobileLinks = mobileDrawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileDrawer.classList.remove('active');
    });
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport completely
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Hero 3D Circular Gallery (WebGL) ---
  const circularGalleryElement = document.getElementById('circular-gallery');
  if (circularGalleryElement) {
    window.circularGalleryInstance = new CircularGallery(circularGalleryElement, {
      items: [
        { image: 'New folder/JERSEY BASKETBALL/SUPER ROOKIES CLUB copy.jpeg', text: 'Basketball Jersey' },
        { image: 'New folder/LONG SLEEVES/HONDA copy.jpeg', text: 'Racing Long Sleeve' },
        { image: 'New folder/POLO SHIRT/japan copy.jpeg', text: 'Tokyo Dragon Polo' },
        { image: 'New folder/TSHIRT/japan tshirt copy.jpeg', text: 'Custom Graphic Tee' }
      ],
      bend: 1.5,
      textColor: 'var(--color-on-background)',
      borderRadius: 0.04,
      font: 'bold 26px "Plus Jakarta Sans", sans-serif',
      scrollSpeed: 2.5,
      scrollEase: 0.06
    });
  }

  // --- Portfolio Filtering ---
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle Active Button Class
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter Cards
      galleryCards.forEach(card => {
        card.classList.remove('fade-in-item');
        
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.classList.remove('hidden');
          // Trigger slight delay animation for rhythm
          setTimeout(() => {
            card.classList.add('fade-in-item');
          }, 20);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- Mouse-Guided Background Parallax Blobs ---
  let mouseX = 0, mouseY = 0;
  let ticking = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Calculate displacement offset ratios (-0.5 to 0.5)
        const offsetX = (mouseX / windowWidth) - 0.5;
        const offsetY = (mouseY / windowHeight) - 0.5;

        // Apply movement with dampening
        if (blob1) {
          blob1.style.transform = `translate(${offsetX * 60}px, ${offsetY * 60}px) translateX(-50%)`;
        }
        if (blob2) {
          blob2.style.transform = `translate(${offsetX * -40}px, ${offsetY * -40}px)`;
        }
        if (blob3) {
          blob3.style.transform = `translate(${offsetX * 30}px, ${offsetY * -30}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // --- Contact Form Submission & Toast ---
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Submit State feedback
      const originalBtnText = contactSubmitBtn.innerHTML;
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = `
        Sending Message...
        <span class="material-symbols-outlined animate-spin" style="animation: spin 1s linear infinite;">sync</span>
      `;

      // Mock Form Submission Delay (representing formspree / backend endpoints)
      setTimeout(() => {
        // Reset Button
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = originalBtnText;

        // Display Success Toast
        showToast("Message sent successfully! I will get back to you shortly.");
        
        // Reset Form
        contactForm.reset();
      }, 1500);
    });
  }

  // Toast utility function
  const showToast = (message) => {
    toastMessage.textContent = message;
    toastNotification.classList.add('active');

    // Auto close toast
    setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 4000);
  };
});

// Adding spin keyframes via JS style insertion
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);
