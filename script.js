/* =============================================
   CHTEC - Script Principal
   ============================================= */

// --- Header scroll effect ---
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// --- Menu mobile ---
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Fechar menu ao clicar em link
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// --- Active nav link ao rolar ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// --- Formulário → WhatsApp ---
document.getElementById('form-contato').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const equipamento = document.getElementById('equipamento').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  let texto = `Olá! Me chamo *${nome}*.\n`;
  if (telefone) texto += `Telefone: ${telefone}\n`;
  if (email) texto += `E-mail: ${email}\n`;
  if (equipamento) texto += `Equipamento: ${equipamento}\n`;
  texto += `\n${mensagem}`;

  const url = `https://wa.me/5531998067007?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
});

// --- Animações de entrada (Intersection Observer) ---
const animateEls = document.querySelectorAll(
  '.service-card, .brand-card, .contato__item, .diferencial'
);

const fadeIn = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 6) * 60}ms`;
      entry.target.classList.add('visible');
      fadeIn.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animateEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeIn.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// Classe para ativar animação
const styleEl = document.createElement('style');
styleEl.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(styleEl);
