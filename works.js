/**
 * JEIGH DESIGN - WORKS GALLERY CONTROLLER
 * Handles dynamic grid loading, search filtering, theme toggling, and lightbox navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Works Database ---
  const worksData = [
    // JERSEY BASKETBALL
    { path: 'New folder/JERSEY BASKETBALL/BLUE copy.jpeg', category: 'jersey-basketball', title: 'Blue Basketball Kit' },
    { path: 'New folder/JERSEY BASKETBALL/jerey - Copy copy.jpeg', category: 'jersey-basketball', title: 'Viper Esports Jersey' },
    { path: 'New folder/JERSEY BASKETBALL/jerey copy (2).jpeg', category: 'jersey-basketball', title: 'Starlight Basketball Uniform' },
    { path: 'New folder/JERSEY BASKETBALL/jerey copy.jpeg', category: 'jersey-basketball', title: 'Nebula Sports Jersey' },
    { path: 'New folder/JERSEY BASKETBALL/jerey2 copy.jpeg', category: 'jersey-basketball', title: 'Stealth Uniform Design' },
    { path: 'New folder/JERSEY BASKETBALL/jersey copy (2).jpeg', category: 'jersey-basketball', title: 'Championship Kit White' },
    { path: 'New folder/JERSEY BASKETBALL/jersey copy (3).jpeg', category: 'jersey-basketball', title: 'Phoenix Athletics Jersey' },
    { path: 'New folder/JERSEY BASKETBALL/jersey copy.jpeg', category: 'jersey-basketball', title: 'Grid Iron Uniform' },
    { path: 'New folder/JERSEY BASKETBALL/PINK copy.jpeg', category: 'jersey-basketball', title: 'Neon Pink Basketball Kit' },
    { path: 'New folder/JERSEY BASKETBALL/SUPER ROOKIES CLUB copy.jpeg', category: 'jersey-basketball', title: 'Super Rookies Club Edition' },

    // LONG SLEEVES
    { path: 'New folder/LONG SLEEVES/bomber jacket copy.jpeg', category: 'long-sleeves', title: 'Sublimated Bomber Jacket' },
    { path: 'New folder/LONG SLEEVES/criminologuy warmer.jpeg', category: 'long-sleeves', title: 'Criminology Warmer Jacket' },
    { path: 'New folder/LONG SLEEVES/HONDA - Copy copy.jpeg', category: 'long-sleeves', title: 'Honda Racing Long Sleeve' },
    { path: 'New folder/LONG SLEEVES/HONDA copy.jpeg', category: 'long-sleeves', title: 'Honda Track Long Sleeve' },
    { path: 'New folder/LONG SLEEVES/IMERCH cop.jpeg', category: 'long-sleeves', title: 'iMerch Brand Long Sleeve' },
    { path: 'New folder/LONG SLEEVES/IMERCH copy.jpeg', category: 'long-sleeves', title: 'iMerch Tech Jersey' },
    { path: 'New folder/LONG SLEEVES/long sleeve copy (2).jpeg', category: 'long-sleeves', title: 'Midnight Edition Sleeve' },
    { path: 'New folder/LONG SLEEVES/long sleeve copy.jpeg', category: 'long-sleeves', title: 'Aero Sleeve Jersey' },
    { path: 'New folder/LONG SLEEVES/MARKSMANSHIP2 copy.jpeg', category: 'long-sleeves', title: 'Marksmanship Special Force' },
    { path: 'New folder/LONG SLEEVES/scrc copy.jpeg', category: 'long-sleeves', title: 'SCRC Racing Warmer' },
    { path: 'New folder/LONG SLEEVES/TEAM GOODBOY copy.jpeg', category: 'long-sleeves', title: 'Team Goodboy Jersey' },
    { path: 'New folder/LONG SLEEVES/TEAM MANGANIE copy.jpeg', category: 'long-sleeves', title: 'Team Manganie Sportswear' },
    { path: 'New folder/LONG SLEEVES/TEAM WALOP v2 copy.jpeg', category: 'long-sleeves', title: 'Team Walop V2 Edition' },

    // PANTS
    { path: 'New folder/PANTS/553295069_796117569463139_8658625331831566076_n.jpeg', category: 'pants', title: 'Sublimated Jogger Pants' },

    // POLO SHIRT
    { path: 'New folder/POLO SHIRT/AMPS COC INTERN copy.jpeg', category: 'polo-shirt', title: 'AMPS COC Intern Polo' },
    { path: 'New folder/POLO SHIRT/CAHS SBO copy.jpeg', category: 'polo-shirt', title: 'CAHS SBO Corporate Polo' },
    { path: 'New folder/POLO SHIRT/cod copy.jpeg', category: 'polo-shirt', title: 'COD Esports Polo' },
    { path: 'New folder/POLO SHIRT/criminologuy copy (2).jpeg', category: 'polo-shirt', title: 'Criminology Polo Alternative' },
    { path: 'New folder/POLO SHIRT/criminologuy polo .jpeg', category: 'polo-shirt', title: 'Criminology Classic Polo' },
    { path: 'New folder/POLO SHIRT/filipinop] copy.jpeg', category: 'polo-shirt', title: 'Filipino Pride Polo' },
    { path: 'New folder/POLO SHIRT/japan copy.jpeg', category: 'polo-shirt', title: 'Tokyo Dragon Polo' },
    { path: 'New folder/POLO SHIRT/japan2 copy.jpeg', category: 'polo-shirt', title: 'Rising Sun Polo' },
    { path: 'New folder/POLO SHIRT/MARKSMANSHIP.jpeg', category: 'polo-shirt', title: 'Marksmanship Polo Jersey' },
    { path: 'New folder/POLO SHIRT/polo copy (2).jpeg', category: 'polo-shirt', title: 'Active Dry Polo White' },
    { path: 'New folder/POLO SHIRT/polo copy.jpeg', category: 'polo-shirt', title: 'Active Dry Polo Blue' },

    // SINGLET RUNNING
    { path: 'New folder/SINGLET RUNNING/RUN1 copy.jpeg', category: 'singlet-running', title: 'Volt Running Singlet' },
    { path: 'New folder/SINGLET RUNNING/RUN2 copy.jpeg', category: 'singlet-running', title: 'Pace Marathon Singlet' },
    { path: 'New folder/SINGLET RUNNING/RUN3 copy.jpeg', category: 'singlet-running', title: 'Aero Running Singlet' },

    // TSHIRT
    { path: 'New folder/TSHIRT/552950256_1141791847909670_8643866525819988218_n.jpeg', category: 'tshirt', title: 'Cyberpunk Graphics Tee' },
    { path: 'New folder/TSHIRT/591972080_1477192486709816_8594286276695636064_n.jpeg', category: 'tshirt', title: 'Retro Vaporwave Tee' },
    { path: 'New folder/TSHIRT/japan tshirt copy.jpeg', category: 'tshirt', title: 'Ukiyo-e Wave Tshirt' },
    { path: 'New folder/TSHIRT/MARKSMANSHIP3 copy.jpeg', category: 'tshirt', title: 'Marksmanship Tactical Tee' },
    { path: 'New folder/TSHIRT/MAWGANEE copy.jpeg', category: 'tshirt', title: 'Mawganee Performance Tee' },
    { path: 'New folder/TSHIRT/pikol - v2 copy.jpeg', category: 'tshirt', title: 'Pikol Sport Tee V2' },
    { path: 'New folder/TSHIRT/pikol - v3 - invert copy.jpeg', category: 'tshirt', title: 'Pikol Tee Inverted' },
    { path: 'New folder/TSHIRT/pikol - v3 copy.jpeg', category: 'tshirt', title: 'Pikol Sport Tee V3' },
    { path: 'New folder/TSHIRT/pikol copy.jpeg', category: 'tshirt', title: 'Pikol Sport Tee V1' },
    { path: 'New folder/TSHIRT/SUPER ROOKIES CLUB copy (2).jpeg', category: 'tshirt', title: 'Super Rookies Club Tee' },
    { path: 'New folder/TSHIRT/tshirt copy (2).jpeg', category: 'tshirt', title: 'Athletic Fit Tee Crimson' },
    { path: 'New folder/TSHIRT/tshirt copy (3).jpeg', category: 'tshirt', title: 'Athletic Fit Tee Cobalt' },
    { path: 'New folder/TSHIRT/tshirt copy (4).jpeg', category: 'tshirt', title: 'Athletic Fit Tee Emerald' },
    { path: 'New folder/TSHIRT/tshirt copy (5).jpeg', category: 'tshirt', title: 'Athletic Fit Tee Mustard' },
    { path: 'New folder/TSHIRT/tshirt copy (6).jpeg', category: 'tshirt', title: 'Athletic Fit Tee Charcoal' },
    { path: 'New folder/TSHIRT/tshirt copy (7).jpeg', category: 'tshirt', title: 'Athletic Fit Tee Amethyst' },
    { path: 'New folder/TSHIRT/tshirt copy.jpeg', category: 'tshirt', title: 'Athletic Fit Tee Crimson' },
    { path: 'New folder/TSHIRT/tshirt1 copy (2).jpeg', category: 'tshirt', title: 'Urban Streetwear Tee Black' },
    { path: 'New folder/TSHIRT/tshirt1 copy (3).jpeg', category: 'tshirt', title: 'Urban Streetwear Tee Slate' },
    { path: 'New folder/TSHIRT/tshirt1 copy (4).jpeg', category: 'tshirt', title: 'Urban Streetwear Tee Forest' },
    { path: 'New folder/TSHIRT/tshirt1 copy (5).jpeg', category: 'tshirt', title: 'Urban Streetwear Tee Navy' },
    { path: 'New folder/TSHIRT/tshirt1 copy.jpeg', category: 'tshirt', title: 'Urban Streetwear Tee Olive' },
    { path: 'New folder/TSHIRT/vneck copy.jpeg', category: 'tshirt', title: 'Dry-fit V-Neck Tee Red' },
    { path: 'New folder/TSHIRT/vneck isa copy.jpeg', category: 'tshirt', title: 'Dry-fit V-Neck Tee Blue' },

    // VARSITY JACKET
    { path: 'New folder/VARSITY JACKET/VARSITY cop.jpeg', category: 'varsity-jacket', title: 'Lumina Varsity Jacket' }
  ];

  // --- Category Map for User Friendliness ---
  const categoryLabels = {
    'jersey-basketball': 'Basketball Jersey',
    'long-sleeves': 'Long Sleeve',
    'pants': 'Pants',
    'polo-shirt': 'Polo Shirt',
    'singlet-running': 'Running Singlet',
    'tshirt': 'T-Shirt',
    'varsity-jacket': 'Varsity Jacket'
  };

  // --- DOM Elements ---
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mainNav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const worksGrid = document.getElementById('works-grid');
  const searchInput = document.getElementById('works-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const noResultsState = document.getElementById('no-results-state');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  // Parallax Blobs
  const blob1 = document.getElementById('blob-1');
  const blob2 = document.getElementById('blob-2');
  const blob3 = document.getElementById('blob-3');

  // State
  let activeFilter = 'all';
  let searchQuery = '';
  let activeItemsList = [];
  let currentLightboxIndex = 0;

  // --- Theme Controller ---
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  // Set default theme
  applyTheme(getPreferredTheme());

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // --- Navigation & Scroll Effects ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('active');
  });

  const mobileLinks = mobileDrawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileDrawer.classList.remove('active');
    });
  });

  // --- Render Gallery Grid ---
  const renderWorksGrid = () => {
    worksGrid.innerHTML = '';
    
    // Filter and Search visible items
    activeItemsList = worksData.filter(item => {
      const matchFilter = activeFilter === 'all' || item.category === activeFilter;
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.path.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });

    if (activeItemsList.length === 0) {
      noResultsState.style.display = 'block';
      return;
    } else {
      noResultsState.style.display = 'none';
    }

    activeItemsList.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-card reveal active';
      card.setAttribute('data-category', item.category);
      
      // Make some cards span two columns for a visual bento grid layout
      if (index % 5 === 0 && item.category !== 'pants' && item.category !== 'singlet-running') {
        card.classList.add('bento-colspan-2');
      }

      // Encode filename spaces and special characters for src attribute
      const encodedPath = encodeURI(item.path);

      card.innerHTML = `
        <img src="${encodedPath}" alt="${item.title}" loading="lazy">
        <div class="card-overlay">
          <div class="card-overlay-content">
            <div class="card-tags">
              <span class="card-tag label-caps">${categoryLabels[item.category]}</span>
            </div>
            <h3 class="headline-md card-title">${item.title}</h3>
          </div>
        </div>
      `;

      // Lightbox click trigger
      card.addEventListener('click', () => {
        openLightbox(index);
      });

      worksGrid.appendChild(card);
    });
  };

  // --- Lightbox Modal Manager ---
  const openLightbox = (index) => {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
  };

  const nextLightboxImage = () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % activeItemsList.length;
    updateLightboxContent();
  };

  const prevLightboxImage = () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + activeItemsList.length) % activeItemsList.length;
    updateLightboxContent();
  };

  const updateLightboxContent = () => {
    const item = activeItemsList[currentLightboxIndex];
    if (!item) return;

    lightboxImg.style.opacity = '0';
    
    // Set sources and content
    lightboxImg.src = encodeURI(item.path);
    lightboxImg.alt = item.title;
    lightboxCaption.textContent = item.title;
    lightboxCategory.textContent = categoryLabels[item.category];

    // Fade back in smoothly
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transition = 'opacity var(--transition-fast)';
    };
  };

  // Lightbox Close Events
  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxModal.addEventListener('click', (e) => {
    // Close only if click is directly on the backdrop, not on details
    if (e.target === lightboxModal) {
      closeLightbox();
    }
  });

  // Lightbox Nav Click Events
  lightboxNextBtn.addEventListener('click', nextLightboxImage);
  lightboxPrevBtn.addEventListener('click', prevLightboxImage);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextLightboxImage();
    } else if (e.key === 'ArrowLeft') {
      prevLightboxImage();
    }
  });

  // --- Filter and Search Listeners ---
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      activeFilter = button.getAttribute('data-filter');
      renderWorksGrid();
    });
  });

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderWorksGrid();
  });

  // --- Parallax Blobs ---
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const offsetX = (mouseX / windowWidth) - 0.5;
    const offsetY = (mouseY / windowHeight) - 0.5;

    if (blob1) blob1.style.transform = `translate(${offsetX * 60}px, ${offsetY * 60}px) translateX(-50%)`;
    if (blob2) blob2.style.transform = `translate(${offsetX * -40}px, ${offsetY * -40}px)`;
    if (blob3) blob3.style.transform = `translate(${offsetX * 30}px, ${offsetY * -30}px)`;
  });

  // --- Scroll Reveal Observers ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Initial Render ---
  renderWorksGrid();
});
