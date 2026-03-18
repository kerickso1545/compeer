// Set copyright year
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Formspree AJAX submission with success state
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

if (form && successMsg) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const action = form.getAttribute('action');

    // Don't submit if Formspree ID hasn't been configured yet
    if (action.includes('YOUR_FORMSPREE_ID')) {
      alert('Contact form not yet configured. Please email us directly at info@gocompeer.com');
      return;
    }

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
      } else {
        alert('There was a problem sending your message. Please email us directly at info@gocompeer.com');
      }
    } catch {
      alert('There was a problem sending your message. Please email us directly at info@gocompeer.com');
    }
  });
}
