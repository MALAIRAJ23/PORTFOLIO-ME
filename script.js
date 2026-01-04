document.addEventListener('DOMContentLoaded', () => {

  // --- Custom Cursor Logic ---
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');

  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    follower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });

  document.querySelectorAll('.interactive').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('interactive-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('interactive-hover'));
  });

  // --- 3D Card Tilt Effect ---
  document.querySelectorAll('.bento-card:not(.project-card), .education-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const { width, height } = rect;
      const rotateX = (y - height / 2) / (height / 2);
      const rotateY = (x - width / 2) / (width / 2);
      const tiltStrength = card.style.getPropertyValue('--tilt-strength') || 5;

      card.style.transform = `perspective(1000px) rotateX(${-rotateX * tiltStrength}deg) rotateY(${rotateY * tiltStrength}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // --- Active Nav Link on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(section => sectionObserver.observe(section));


  // --- Skill Tag "Loading" Animation on Scroll ---
  const skillCardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillTags = entry.target.querySelectorAll('.skill-tag');
        skillTags.forEach((tag, index) => {
          setTimeout(() => {
            tag.classList.add('is-visible');
          }, index * 100); // Staggered delay for each tag
        });
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.skill-card').forEach(card => {
    skillCardObserver.observe(card);
  });

  // Apply same animation to soft skill cards
  document.querySelectorAll('.soft-skill-card').forEach(card => {
    skillCardObserver.observe(card);
  });


  // --- Mobile Navbar Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // --- Resume Dropdown Toggle ---
  const resumeToggle = document.getElementById('resume-toggle');
  const resumeDropdownContainer = document.querySelector('.resume-dropdown-container');

  if (resumeToggle && resumeDropdownContainer) {
    resumeToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      resumeDropdownContainer.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!resumeDropdownContainer.contains(e.target)) {
        resumeDropdownContainer.classList.remove('active');
      }
    });
  }

  // --- 3D Book Flip Toggle ---
  // Removed - using simple card layout now

  // --- EmailJS Contact Form ---
  emailjs.init('sJqndMEU3YgHvpzqA');

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const statusEl = document.getElementById('form-status');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      emailjs.sendForm('service_x9ndwpa', 'template_ef79pvl', this)
        .then(function() {
          statusEl.textContent = 'Message sent successfully!';
          statusEl.className = 'form-status success';
          contactForm.reset();
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, function(error) {
          console.error('EmailJS Error:', error);
          statusEl.textContent = 'Failed to send: ' + (error.text || 'Please check your EmailJS settings');
          statusEl.className = 'form-status error';
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        });
    });
  }
});