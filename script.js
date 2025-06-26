document.addEventListener('DOMContentLoaded', () => {
  // 1. IntersectionObserver for section and card reveals
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('section, .about-card, .work-card, .experience-card, .education-card, .blog-card').forEach(el => {
    observer.observe(el);
  });

  // 2. Smooth scroll for nav links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
          const navbarHeight = 100; // Account for fixed navbar
          const targetPosition = target.offsetTop - navbarHeight;
          
          // Use scrollIntoView for better browser compatibility
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Fallback for older browsers
          setTimeout(() => {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }, 100);
          
          console.log('Scrolling to section:', targetId);
        } else {
          console.error('Section not found:', targetId);
        }
      }
    });
  });

  // 3. Micro-interaction pop for social icons
  document.querySelectorAll('.contact-social a img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.transition = 'transform 0.18s cubic-bezier(.4,2,.2,1)';
      img.style.transform = 'scale(1.18) rotate(-6deg)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.transform = '';
    });
    img.addEventListener('mousedown', () => {
      img.style.transform = 'scale(0.92) rotate(2deg)';
    });
    img.addEventListener('mouseup', () => {
      img.style.transform = 'scale(1.18) rotate(-6deg)';
    });
  });

  // Navbar blend effect on scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) { // Apply effect after 50px scroll
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // Typewriter effect for About Me section on scroll
  const aboutTypeTarget = document.querySelector('.about-typewriter');
  let aboutTyped = false;
  if (aboutTypeTarget) {
    const aboutText = aboutTypeTarget.dataset.text;
    const aboutObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !aboutTyped) {
          aboutTyped = true;
          let i = 0;
          function typeWriter() {
            if (i < aboutText.length) {
              if (aboutText.substr(i, 2) === '\n') {
                aboutTypeTarget.innerHTML += '<br>';
                i += 2;
              } else {
                aboutTypeTarget.innerHTML += aboutText.charAt(i);
                i++;
              }
              setTimeout(typeWriter, 18);
            }
          }
          typeWriter();
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    aboutObserver.observe(aboutTypeTarget);
  }

  // Hamburger menu toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          navLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});
