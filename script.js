/* ═══════════════════════════════════════════════════════════════
   Swathi P V — Academic Portfolio Scripts
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── Mobile Menu Toggle ──
    var navToggle = document.getElementById('navToggle');
    var mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
      navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('open');
        mainNav.classList.toggle('open');
      });

      mainNav.querySelectorAll('.nav__link').forEach(function (link) {
        link.addEventListener('click', function () {
          navToggle.classList.remove('open');
          mainNav.classList.remove('open');
        });
      });
    }

    // ── Active Navigation on Scroll ──
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav__link[href^="#"]');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
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
      rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(function (sec) {
      observer.observe(sec);
    });

    // ── Publications Filtering ──
    var pubBtns = document.querySelectorAll('.pub-btn');
    var pubItems = document.querySelectorAll('.pub-item');

    pubBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        pubBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');

        pubItems.forEach(function (item) {
          var type = item.getAttribute('data-type');
          if (filter === 'all' || type === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });

    // ── Clean Contact Form Submission ──
    var contactForm = document.getElementById('contactForm');
    var formMsg = document.getElementById('formMsg');
    var btnSubmit = document.getElementById('btnSubmit');

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var name = document.getElementById('name').value.trim();
        var email = document.getElementById('email').value.trim();
        var subject = document.getElementById('subject').value.trim();

        if (!name || !email || !subject) return;

        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Sending...';

        setTimeout(function () {
          formMsg.className = 'form-msg success';
          formMsg.innerHTML = 'Thank you, ' + name + '. Your message regarding "' + subject + '" has been received.';
          formMsg.style.display = 'block';

          contactForm.reset();
          btnSubmit.disabled = false;
          btnSubmit.textContent = 'Send Inquiry';
        }, 700);
      });
    }

  });
})();
