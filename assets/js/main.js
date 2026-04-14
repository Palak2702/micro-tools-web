/* ========================================
   COMPONENT LOADING - FETCH BASED

   HOW IT WORKS:
   - This loads header and footer HTML from separate component files
   - Components are stored in /components/header.html and /components/footer.html
   - Changing these files updates all pages automatically
   - No need to edit every page individually

   IMPORTANT: This works when accessing via http://localhost/
   If you get CORS errors, make sure you're using:
   → http://localhost/micro-tools-web/ ✓ (Works)
   NOT file:///C:/wamp64/... ✗ (Doesn't work)

   ======================================== */

function loadComponent(id, file, callback) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      // Run callback AFTER loading
      if (callback) callback();
    })
    .catch((err) => console.error("Error loading component:", err));
}

/* ========================================
   NAVIGATION FUNCTIONS
   ======================================== */

function initNavigation() {
  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('show');
    });

    // Close menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (hamburger && mobileMenu) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');
      }
    }
  });

  // Desktop dropdown
  const toolsBtn = document.getElementById('toolsBtn');
  const toolsDropdown = document.getElementById('toolsDropdown');

  if (toolsBtn && toolsDropdown) {
    toolsBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toolsDropdown.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!toolsBtn.contains(e.target) && !toolsDropdown.contains(e.target)) {
        toolsDropdown.classList.remove('show');
      }
    });
  }

  // Mobile dropdown
  const mobileToolsBtn = document.getElementById('mobileToolsBtn');
  const mobileToolsDropdown = document.getElementById('mobileToolsDropdown');

  if (mobileToolsBtn && mobileToolsDropdown) {
    mobileToolsBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      mobileToolsDropdown.classList.toggle('show');
      mobileToolsBtn.classList.toggle('active');
    });

    const mobileToolsLinks = mobileToolsDropdown.querySelectorAll('a');
    mobileToolsLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileToolsDropdown.classList.remove('show');
        mobileToolsBtn.classList.remove('active');
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('show');
      });
    });
  }
}

/* ========================================
   PAGE INITIALIZATION
   ======================================== */

// Load header and footer components
// Header: Loaded from /components/header.html
// Footer: Loaded from /components/footer.html
// After loading, initialize navigation functionality
loadComponent('header', '/components/header.html', initNavigation);
loadComponent('footer', '/components/footer.html');

/* ========================================
   SCROLL EFFECTS
   ======================================== */

// Add shadow to header on scroll for visual feedback
window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 10) {
      // User has scrolled - add stronger shadow
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      // User at top - use subtle shadow
      header.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
  }
});

/* ========================================
   SMOOTH SCROLL BEHAVIOR
   ======================================== */

// Enable smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

/* ========================================
   ACCESSIBILITY FEATURES
   ======================================== */

// Keyboard navigation - ESC key closes all open menus
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const toolsDropdown = document.getElementById('toolsDropdown');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.getElementById('hamburger');

    if (toolsDropdown) toolsDropdown.classList.remove('show');
    if (mobileMenu) mobileMenu.classList.remove('show');
    if (hamburger) hamburger.classList.remove('active');
  }
});

/* ========================================
   RESIZE HANDLER
   ======================================== */

// Close mobile menu when resizing to desktop view
let resizeTimer;
window.addEventListener('resize', function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    // Close mobile menu on resize to desktop (> 768px)
    if (window.innerWidth > 768) {
      if (hamburger) hamburger.classList.remove('active');
      if (mobileMenu) mobileMenu.classList.remove('show');
    }
  }, 250);
});
