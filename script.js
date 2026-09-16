/* ═══════════════════════════════════════════════════════════════
   Swathi P V — Academic Portfolio Interactivity Scripts
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── 1. Sticky Navigation Bar Scroll Effect ──
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    // ── 2. Mobile Menu Toggle ──
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
      });

      // Close menu when a navigation link is clicked
      navMenu.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          navToggle.classList.remove('open');
          navMenu.classList.remove('open');
        });
      });
    }

    // ── 3. Active Nav Link on Scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.25,
      rootMargin: '-72px 0px -50% 0px'
    });

    sections.forEach(function (sec) {
      sectionObserver.observe(sec);
    });

    // ── 4. Scroll Reveal Animations with Staggered Delays ──
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(function (el) {
      const parent = el.parentElement;
      if (parent && (
        parent.classList.contains('education-grid') ||
        parent.classList.contains('subjects-grid') ||
        parent.classList.contains('publications-list') ||
        parent.classList.contains('skills-trio') ||
        parent.classList.contains('awards-grid') ||
        parent.classList.contains('collaborative-grid')
      )) {
        const siblings = Array.from(parent.children);
        const idx = siblings.indexOf(el);
        el.style.transitionDelay = (idx * 0.08) + 's';
      }
      revealObserver.observe(el);
    });

    // ── 5. Subject Category Filtering ──
    const subjBtns = document.querySelectorAll('.subj-btn');
    const subjCards = document.querySelectorAll('.subject-card');

    subjBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        subjBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-subject');

        subjCards.forEach(function (card) {
          const cat = card.getAttribute('data-cat');
          if (filter === 'all' || cat === filter) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // ── 6. Publications Filtering ──
    const pubFilterBtns = document.querySelectorAll('.pub-filter-btn');
    const pubCards = document.querySelectorAll('.pub-card');

    pubFilterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        pubFilterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const pubType = btn.getAttribute('data-pub');

        pubCards.forEach(function (card) {
          const type = card.getAttribute('data-type');
          if (pubType === 'all' || type === pubType) {
            card.classList.remove('hidden');
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });

    // ── 7. Full Academic CV Modal View ──
    const cvModal = document.getElementById('cvModal');
    const btnOpenCvModal = document.getElementById('btnOpenCvModal');
    const btnCloseCvModal = document.getElementById('btnCloseCvModal');
    const cvModalBackdrop = document.getElementById('cvModalBackdrop');

    function openCvModal() {
      if (cvModal) {
        cvModal.classList.add('open');
        cvModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeCvModal() {
      if (cvModal) {
        cvModal.classList.remove('open');
        cvModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (btnOpenCvModal) btnOpenCvModal.addEventListener('click', openCvModal);
    if (btnCloseCvModal) btnCloseCvModal.addEventListener('click', closeCvModal);
    if (cvModalBackdrop) cvModalBackdrop.addEventListener('click', closeCvModal);

    // ESC key closes modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && cvModal && cvModal.classList.contains('open')) {
        closeCvModal();
      }
    });

    // ── 8. Contact Form Handling ──
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const btnSubmitForm = document.getElementById('btnSubmitForm');

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('senderName').value.trim();
        const email = document.getElementById('senderEmail').value.trim();
        const subject = document.getElementById('senderSubject').value.trim();
        const message = document.getElementById('senderMessage').value.trim();

        if (!name || !email || !subject || !message) {
          formStatus.className = 'form-status error';
          formStatus.textContent = 'Please complete all required fields before submitting.';
          formStatus.style.display = 'block';
          return;
        }

        // Disable button during simulated submission
        btnSubmitForm.disabled = true;
        btnSubmitForm.innerHTML = 'Sending Message...';

        setTimeout(function () {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `✓ Thank you, <strong>${name}</strong>! Your message regarding "<em>${subject}</em>" has been noted. Swathi P V will get back to you at <strong>${email}</strong>.`;
          formStatus.style.display = 'block';

          contactForm.reset();
          btnSubmitForm.disabled = false;
          btnSubmitForm.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Submit Message`;
        }, 800);
      });
    }

  });
})();
