document.addEventListener("DOMContentLoaded", () => {
  // Typewriter effect for headline
  const typeTarget = document.querySelector(".typewriter");
  if (typeTarget) {
    const text = typeTarget.dataset.text;
    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        typeTarget.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }
    typeWriter();
  }

  // Enhanced scroll-based animation trigger
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('about-card')) {
            entry.target.classList.add('animate-slide-in-left');
          } else if (entry.target.classList.contains('skills-list')) {
            entry.target.classList.add('animate-fade-in-up');
            // Animate each skill icon with stagger
            entry.target.querySelectorAll('li').forEach((li, idx) => {
              setTimeout(() => li.classList.add('animate-pop-in'), idx * 120);
            });
          } else if (entry.target.classList.contains('project-grid')) {
            // Animate each project card with stagger
            entry.target.querySelectorAll('.project-card').forEach((card, idx) => {
              card.classList.add('animate-fade-in');
              card.classList.add('stagger-' + (idx + 1));
            });
          } else if (entry.target.classList.contains('contact-form')) {
            entry.target.classList.add('animate-slide-in-right');
          } else {
            entry.target.classList.add('animate-fade-in');
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll("section, .about-card, .skills-list, .project-grid, .contact-form").forEach(sec => {
    observer.observe(sec);
  });

  // Mobile nav toggle for new glass-navbar
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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

  // Contact form validation (basic)
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Simple validation
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      // You can replace this with AJAX/email service
      alert('Thank you for reaching out, ' + name + '! I will get back to you soon.');
      contactForm.reset();
    });
  }

  // Scroll-to-top button
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTopBtn';
  scrollBtn.innerHTML = '↑';
  document.body.appendChild(scrollBtn);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Flip card logic for education section
  const schoolCard = document.getElementById('school-card');
  if (schoolCard) {
    schoolCard.addEventListener('click', () => {
      schoolCard.classList.toggle('flipped');
    });
  }
});
