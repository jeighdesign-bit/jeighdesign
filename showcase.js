/**
 * JEIGH DESIGN — SHOWCASE PAGE CONTROLLER
 * Project data, card rendering, filter logic, and modal interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // PROJECT DATABASE
  // Images follow recommended order:
  //   [0] design mockup  ·  [1-4] customer/team wearing apparel
  // ============================================================
  const showcaseProjects = [
    {
      id: 'discipline-project',
      title: 'USTP Discipline Class Shirt',
      category: 't-shirt',
      categoryLabel: 'T-Shirt',
      coverImage: 'Showcase/Discipline/1.jpeg',
      images: [
        'Showcase/Discipline/1.jpeg',
        'Showcase/Discipline/2.jpg',
        'Showcase/Discipline/3.jpg',
        'Showcase/Discipline/4.jpg',
      ],
      year: '2025',
      software: ['Adobe Illustrator', 'Photoshop'],
      overview: 'Custom sublimation class t-shirts designed for the Grade 11 Discipline section of the University of Science and Technology of Southern Philippines (USTP) Senior High School. The project features full-color sublimation print on activewear fabric, highlighting school spirit and class unity.',
      concept: 'The design features a bold maroon and red base with traditional geometric patterns layered across the body. Gold sleeve cuffs and collar trim add a premium touch, with a prominent Greek key (meander) border pattern on the sleeves. The back includes customized student names, individual sports numbers, and the official USTP Senior High School branding.',
      icon: 'school',
    },
    {
      id: 'ldcu-project',
      title: 'LDCU Titans Sports Jersey',
      category: 't-shirt',
      categoryLabel: 'T-Shirt',
      coverImage: 'Showcase/Ldcu/1.jpg',
      images: [
        'Showcase/Ldcu/1.jpg',
        'Showcase/Ldcu/2.jpg',
      ],
      year: '2025',
      software: ['Adobe Illustrator', 'Photoshop'],
      overview: 'Custom sublimation sports jerseys designed for the LDCU Titans team of Liceo de Cagayan University. Built for high performance, these shirts feature moisture-wicking fabric and a custom graphic print, presenting a unified and professional look for school athletic events.',
      concept: 'The design showcases Liceo de Cagayan University\'s team colors: maroon, vibrant orange, and gold accents. It features a bold diagonal color block layout, featuring the "LDCU Titans" logo on the chest and custom numbers. The sublimated gradients create a modern, high-energy aesthetic that stands out on the court.',
      icon: 'emoji_events',
    },
    {
      id: 'pikol-project',
      title: 'Pikol Pickleball Performance Tee',
      category: 't-shirt',
      categoryLabel: 'T-Shirt',
      coverImage: 'Showcase/Pikol/1.jpg',
      images: [
        'Showcase/Pikol/1.jpg',
        'Showcase/Pikol/2.jpg',
        'Showcase/Pikol/3.jpg',
      ],
      year: '2025',
      software: ['Adobe Illustrator', 'Photoshop'],
      overview: 'Custom performance sportswear t-shirts created for Pikol Pickleball athletes. Optimized for intense court movement, these lightweight, breathable tees maintain an active fit and present a cohesive, stylish athletic brand.',
      concept: 'The layout features a sleek black primary base accented with electric green piping and side panels. A stylized halftone circular gradient wraps around the lower portion of the shirt. Brand elements include the "pikol." front logomark, "Play. Rally. Repeat." tagline on the upper back, and custom vertical lettering down the side for player names.',
      icon: 'sports_tennis',
    },
    {
      id: 'team-goodboy-project',
      title: 'Team Goodboy Chill Ride Jersey',
      category: 'long-sleeve',
      categoryLabel: 'Long Sleeve',
      coverImage: 'Showcase/Team Goodboy/1.jpeg',
      images: [
        'Showcase/Team Goodboy/1.jpeg',
        'Showcase/Team Goodboy/2.jpg',
        'Showcase/Team Goodboy/3.jpg',
        'Showcase/Team Goodboy/4.jpg',
      ],
      year: '2025',
      software: ['Adobe Illustrator', 'Photoshop'],
      overview: 'Team Goodboy custom long sleeve riding jersey designed for motorcycle enthusiasts and active riders. Featuring full sublimation printing with lightweight, durable, and breathable mesh fabric panels for optimal air circulation during rides.',
      concept: 'A high-visibility dynamic design showcasing a split layout of black and white color blocks on the chest. The sleeves feature a bold racing checkerboard pattern in black and white, paired with vibrant yellow, orange, and red speed lines. The back has the signature "Team Goodboy - Chill Ride, Scam" mascot logo emblem.',
      icon: 'sports_motorsports',
    }
  ];

  // ============================================================
  // DOM REFERENCES
  // ============================================================
  const htmlEl = document.documentElement;
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const mainNav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const showcaseGrid = document.getElementById('showcase-grid');
  const noResults = document.getElementById('sc-no-results');
  const filterButtons = document.querySelectorAll('.filter-btn');

  // Modal
  const modal = document.getElementById('sc-modal');
  const modalClose = document.getElementById('sc-modal-close');
  const galleryImg = document.getElementById('sc-gallery-img');
  const galleryPrev = document.getElementById('sc-gallery-prev');
  const galleryNext = document.getElementById('sc-gallery-next');
  const galleryCounter = document.getElementById('sc-gallery-counter');
  const galleryThumbs = document.getElementById('sc-gallery-thumbs');
  const detailBadge = document.getElementById('sc-detail-badge');
  const detailIcon = document.getElementById('sc-detail-icon');
  const detailCategoryBadge = document.getElementById('sc-detail-category-badge');
  const detailTitle = document.getElementById('sc-detail-title');
  const metaCategory = document.getElementById('sc-meta-category');
  const metaYear = document.getElementById('sc-meta-year');
  const metaSoftware = document.getElementById('sc-meta-software');
  const detailOverview = document.getElementById('sc-detail-overview');
  const detailConcept = document.getElementById('sc-detail-concept');

  // Parallax blobs
  const blob1 = document.getElementById('blob-1');
  const blob2 = document.getElementById('blob-2');
  const blob3 = document.getElementById('blob-3');

  // ============================================================
  // STATE
  // ============================================================
  let activeFilter = 'all';
  let currentProject = null;
  let currentSlideIdx = 0;
  let visibleProjects = [...showcaseProjects];

  // ============================================================
  // THEME
  // ============================================================
  const applyTheme = (theme) => {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };
  const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  applyTheme(getPreferredTheme());
  themeToggleBtn.addEventListener('click', () => {
    const cur = htmlEl.getAttribute('data-theme');
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  });

  // ============================================================
  // NAV SCROLL
  // ============================================================
  window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // Mobile drawer
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileDrawer.classList.toggle('active');
  });
  mobileDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileDrawer.classList.remove('active');
    });
  });

  // ============================================================
  // RENDER CARDS
  // ============================================================
  const renderCards = () => {
    visibleProjects = activeFilter === 'all'
      ? [...showcaseProjects]
      : showcaseProjects.filter(p => p.category === activeFilter);

    showcaseGrid.innerHTML = '';

    if (visibleProjects.length === 0) {
      noResults.style.display = 'block';
      return;
    }
    noResults.style.display = 'none';

    visibleProjects.forEach((project, idx) => {
      const card = document.createElement('div');
      card.className = 'sc-card sc-fade-in reveal active';
      card.style.animationDelay = `${idx * 0.06}s`;
      card.setAttribute('data-id', project.id);

      const imageCount = project.images.length;
      const encodedCover = encodeURI(project.coverImage);

      card.innerHTML = `
        <div class="sc-card-image-wrap">
          <img src="${encodedCover}" alt="${project.title}" loading="lazy" decoding="async">
          ${imageCount > 1 ? `
            <div class="sc-card-count">
              <span class="material-symbols-outlined">photo_library</span>
              ${imageCount} Photos
            </div>
          ` : ''}
          <div class="sc-card-hover-label">
            <span class="material-symbols-outlined" style="font-size:16px;">open_in_full</span>
            View Project
          </div>
        </div>
        <div class="sc-card-body">
          <span class="sc-card-category">${project.categoryLabel}</span>
          <h3 class="sc-card-title">${project.title}</h3>
        </div>
      `;

      card.addEventListener('click', () => openModal(project));
      showcaseGrid.appendChild(card);
    });
  };

  // ============================================================
  // FILTER LOGIC
  // ============================================================
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-filter');
      renderCards();
    });
  });

  // ============================================================
  // MODAL: OPEN / CLOSE
  // ============================================================
  const openModal = (project) => {
    currentProject = project;
    currentSlideIdx = 0;
    populateModalDetails(project);
    renderGallery(project);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    currentProject = null;
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  // ============================================================
  // MODAL: POPULATE DETAILS
  // ============================================================
  const softwareIcons = {
    'Adobe Illustrator': 'draw',
    'Photoshop': 'image',
  };

  const populateModalDetails = (project) => {
    detailIcon.textContent = project.icon || 'checkroom';
    detailCategoryBadge.textContent = project.categoryLabel;
    detailTitle.textContent = project.title;
    metaCategory.textContent = project.categoryLabel;
    metaYear.textContent = project.year;
    detailOverview.textContent = project.overview;
    detailConcept.textContent = project.concept;

    // Software chips
    metaSoftware.innerHTML = '';
    (project.software || []).forEach(sw => {
      const chip = document.createElement('span');
      chip.className = 'sc-software-chip';
      const icon = softwareIcons[sw] || 'design_services';
      chip.innerHTML = `<span class="material-symbols-outlined">${icon}</span>${sw}`;
      metaSoftware.appendChild(chip);
    });
  };

  // ============================================================
  // MODAL: GALLERY NAVIGATION
  // ============================================================
  const renderGallery = (project) => {
    // Thumbnails
    galleryThumbs.innerHTML = '';
    project.images.forEach((src, idx) => {
      const thumb = document.createElement('img');
      thumb.className = 'sc-thumb' + (idx === 0 ? ' active' : '');
      thumb.src = encodeURI(src);
      thumb.alt = `${project.title} photo ${idx + 1}`;
      thumb.loading = 'lazy';
      thumb.decoding = 'async';
      thumb.addEventListener('click', () => goToSlide(idx));
      galleryThumbs.appendChild(thumb);
    });

    goToSlide(0);
  };

  const goToSlide = (idx) => {
    if (!currentProject) return;
    const images = currentProject.images;
    currentSlideIdx = Math.max(0, Math.min(idx, images.length - 1));

    // Swap image with fade
    galleryImg.style.opacity = '0';
    galleryImg.src = encodeURI(images[currentSlideIdx]);
    galleryImg.alt = `${currentProject.title} — photo ${currentSlideIdx + 1}`;
    galleryImg.onload = () => {
      galleryImg.style.opacity = '1';
      galleryImg.style.transition = 'opacity 0.3s ease';
    };

    // Counter
    galleryCounter.textContent = `${currentSlideIdx + 1} / ${images.length}`;

    // Update thumb states
    galleryThumbs.querySelectorAll('.sc-thumb').forEach((th, i) => {
      th.classList.toggle('active', i === currentSlideIdx);
      if (i === currentSlideIdx) {
        th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Show/hide nav arrows
    galleryPrev.style.display = images.length > 1 ? 'flex' : 'none';
    galleryNext.style.display = images.length > 1 ? 'flex' : 'none';
    galleryCounter.style.display = images.length > 1 ? 'block' : 'none';
  };

  const prevSlide = () => {
    if (!currentProject) return;
    const total = currentProject.images.length;
    goToSlide((currentSlideIdx - 1 + total) % total);
  };

  const nextSlide = () => {
    if (!currentProject) return;
    const total = currentProject.images.length;
    goToSlide((currentSlideIdx + 1) % total);
  };

  galleryPrev.addEventListener('click', prevSlide);
  galleryNext.addEventListener('click', nextSlide);

  // ============================================================
  // PARALLAX BLOBS
  // ============================================================
  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (ticking) return;
    window.requestAnimationFrame(() => {
      const ox = (e.clientX / window.innerWidth) - 0.5;
      const oy = (e.clientY / window.innerHeight) - 0.5;
      if (blob1) blob1.style.transform = `translate(${ox * 60}px, ${oy * 60}px) translateX(-50%)`;
      if (blob2) blob2.style.transform = `translate(${ox * -40}px, ${oy * -40}px)`;
      if (blob3) blob3.style.transform = `translate(${ox * 30}px, ${oy * -30}px)`;
      ticking = false;
    });
    ticking = true;
  });

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ============================================================
  // INIT
  // ============================================================
  renderCards();
});
