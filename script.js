/**
 * SITE GRÁTIS EM 10 MINUTOS - JAVASCRIPT PURO (VANILLA JS)
 * - Menu mobile responsivo com controle de acessibilidade
 * - Acordeão de Perguntas Frequentes (FAQ) com transição suave
 * - Rolagem suave com compensação da barra fixa
 * - Controle inteligente da barra de compra fixa no celular
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementos de Navegação
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileStickyBar = document.getElementById('mobile-sticky-bar');

  // Alternar Menu Mobile
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
    });

    // Fechar menu ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      });
    });

    // Fechar menu se clicar fora dele
    document.addEventListener('click', (event) => {
      if (!header.contains(event.target) && navMenu.classList.contains('is-active')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      }
    });
  }

  // 2. Acordeão de Perguntas Frequentes (FAQ)
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item, index) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    // Abre a primeira pergunta por padrão para guiar o leitor
    if (index === 0) {
      item.classList.add('is-active');
      questionBtn.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      // Fecha os outros itens para um efeito sanfona limpo
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('is-active');
          const otherBtn = otherItem.querySelector('.faq-question');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Alterna o item atual
      if (isActive) {
        item.classList.remove('is-active');
        questionBtn.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('is-active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Reajuste de altura no redimensionamento da janela
  window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.faq-item.is-active');
    if (activeItem) {
      const answer = activeItem.querySelector('.faq-answer');
      if (answer) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    }
  }, { passive: true });

  // 3. Rolagem Suave com Compensação do Cabeçalho Fixo
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight || 72;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Efeito de Sombra no Header ao Rolar
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
});
