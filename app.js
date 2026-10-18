const header = document.querySelector('.site-header');
const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });

const menu = document.querySelector('.menu-button');
menu.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menu.setAttribute('aria-expanded', 'false');
}));

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhxGW-LLvXeDTPsV7XCMD0ZEmvbXtj03hazeF2qyshpEhRV_VcSQDySvsKq-548eB6Fw/exec';

document.querySelector('#contact-form').addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;
  const status = document.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  const data = new URLSearchParams(new FormData(form));

  button.disabled = true;
  status.textContent = 'Sending your enquiry…';

  try {
    await fetch(APPS_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: data });
    status.textContent = 'Thank you — our care team will be in touch within one working day.';
    form.reset();
  } catch (error) {
    status.textContent = 'We could not send your enquiry. Please try again.';
  } finally {
    button.disabled = false;
  }
  return;
  document.querySelector('.form-status').textContent = 'Thank you — our care team will be in touch within one working day.';
  event.target.reset();
});
