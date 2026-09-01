/* =========================================================
   Jeferson Araujo — Portfólio
   script.js — dados, renderização e interações
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     CONFIGURAÇÃO GERAL
     Altere aqui os links pessoais usados em todo o site.
  --------------------------------------------------------- */
  const CONFIG = {
    githubUrl: 'YOUR_GITHUB_URL', // ex: https://github.com/seu-usuario
    email: '[ADICIONAR EMAIL]',
    linkedinUrl: '[ADICIONAR LINK DO LINKEDIN]',
  };

  /* ---------------------------------------------------------
     STATUS DOS PROJETOS
     Mapeia cada status para um rótulo e cor (usa as CSS vars
     --status-* definidas em css/style.css).
  --------------------------------------------------------- */
  const STATUS_MAP = {
    dev: { label: 'Em desenvolvimento', color: 'var(--status-dev)' },
    mvp: { label: 'MVP', color: 'var(--status-mvp)' },
    experimental: { label: 'Experimental', color: 'var(--status-exp)' },
    production: { label: 'Em produção', color: 'var(--status-prod)' },
    concept: { label: 'Conceito', color: 'var(--status-concept)' },
    archived: { label: 'Arquivado', color: 'var(--status-archived)' },
  };

  /* ---------------------------------------------------------
     PROJETOS
     Array de dados — adicione novos projetos aqui.
     `image` pode ficar vazio: um placeholder estilizado
     será exibido automaticamente.
  --------------------------------------------------------- */
  const projects = [
    {
      name: 'Melhor que Ontem',
      description: 'Aplicativo baseado em microações personalizadas para ajudar o usuário a evoluir um pouco todos os dias.',
      category: 'Produtividade & Hábitos',
      status: 'mvp',
      technologies: ['React', 'JavaScript', 'Firebase'],
      image: '',
      url: '',
      featured: true,
    },
    {
      name: 'Enxoval de Bebê',
      description: 'Aplicativo para ajudar famílias a organizar o enxoval com base em data prevista, localização, clima e estação do ano.',
      category: 'Utilidade & Família',
      status: 'mvp',
      technologies: ['React', 'Expo', 'Firebase', 'AdMob'],
      image: '',
      url: '',
      featured: true,
    },
    {
      name: 'Rede Social de Desafios da Vida Real',
      description: 'Rede social baseada em desafios e experiências reais, incentivando a saída do consumo passivo de conteúdo.',
      category: 'Social & Comunidade',
      status: 'concept',
      technologies: ['React', 'Node.js'],
      image: '',
      url: '',
      featured: false,
    },
    {
      name: 'Plataforma de Minigames Personalizados',
      description: 'Plataforma onde pais podem criar experiências e minigames personalizados para seus filhos.',
      category: 'Entretenimento & Família',
      status: 'concept',
      technologies: ['JavaScript', 'Node.js'],
      image: '',
      url: '',
      featured: false,
    },
  ];

  /* ---------------------------------------------------------
     RENDERIZAÇÃO — PROJETOS
  --------------------------------------------------------- */
  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projects.map((project) => {
      const status = STATUS_MAP[project.status] || STATUS_MAP.concept;
      const media = project.image
        ? `<img src="${escapeAttr(project.image)}" alt="Mockup do projeto ${escapeAttr(project.name)}" loading="lazy">`
        : `<div class="project-media-placeholder" aria-hidden="true">${initials(project.name)}</div>`;

      const techPills = project.technologies
        .map((tech) => `<span class="tech-pill">${escapeHtml(tech)}</span>`)
        .join('');

      const primaryBtn = project.url
        ? `<a href="${escapeAttr(project.url)}" class="btn btn-accent" target="_blank" rel="noopener noreferrer">Ver projeto</a>`
        : `<span class="btn btn-outline" aria-disabled="true" title="Em construção">Ver projeto</span>`;

      return `
        <div class="col-md-6 col-lg-6" data-reveal>
          <article class="project-card">
            <div class="project-media">
              ${media}
              <span class="status-badge">
                <span class="status-dot" style="background:${status.color}"></span>
                ${escapeHtml(status.label)}
              </span>
            </div>
            <div class="project-body">
              <span class="project-category">${escapeHtml(project.category)}</span>
              <h3>${escapeHtml(project.name)}</h3>
              <p class="project-desc">${escapeHtml(project.description)}</p>
              <div class="project-tech">${techPills}</div>
              <div class="project-actions">
                ${primaryBtn}
                <a href="#contato" class="btn btn-outline">Ver detalhes</a>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join('');

    observeReveal(grid.querySelectorAll('[data-reveal]'));
  }

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
  }

  function initials(name) {
    return name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase();
  }

  /* ---------------------------------------------------------
     LINKS CONFIGURÁVEIS
  --------------------------------------------------------- */
  function applyConfig() {
    document.querySelectorAll('#githubLink, #githubLink2').forEach((el) => {
      el.setAttribute('href', CONFIG.githubUrl);
    });

    const githubValue = document.querySelector('#githubLink2 .contact-link-value');
    if (githubValue) githubValue.textContent = CONFIG.githubUrl;

    const emailLink = document.getElementById('emailLink');
    if (emailLink) {
      emailLink.setAttribute('href', `mailto:${CONFIG.email}`);
      const val = emailLink.querySelector('.contact-link-value');
      if (val) val.textContent = CONFIG.email;
    }

    const linkedinLink = document.getElementById('linkedinLink');
    if (linkedinLink) {
      linkedinLink.setAttribute('href', CONFIG.linkedinUrl);
      const val = linkedinLink.querySelector('.contact-link-value');
      if (val) val.textContent = CONFIG.linkedinUrl;
    }
  }

  /* ---------------------------------------------------------
     NAVBAR — scroll state, mobile menu, active link, smooth scroll
  --------------------------------------------------------- */
  function initNavbar() {
    const header = document.getElementById('siteHeader');
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('[data-nav]');

    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    const sections = Array.from(navLinks)
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('id');
          const link = document.querySelector(`[data-nav][href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('is-active'));
            link.classList.add('is-active');
          }
        });
      }, { rootMargin: '-45% 0px -45% 0px' });

      sections.forEach((section) => sectionObserver.observe(section));
    }
  }

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
  --------------------------------------------------------- */
  let revealObserver;

  function getRevealObserver() {
    if (revealObserver) return revealObserver;

    if (!('IntersectionObserver' in window)) return null;

    revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    return revealObserver;
  }

  function observeReveal(elements) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observer = getRevealObserver();

    elements.forEach((el) => {
      if (prefersReduced || !observer) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---------------------------------------------------------
     CONTADOR DE ESTATÍSTICAS
  --------------------------------------------------------- */
  function initStatCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-counter'), 10) || 0;

      if (prefersReduced) {
        el.textContent = String(target);
        return;
      }

      const duration = 900;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });

      counters.forEach((el) => observer.observe(el));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------------------------------------------------------
     FOOTER — ano atual
  --------------------------------------------------------- */
  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     EASTER EGG
  --------------------------------------------------------- */
  function consoleEasterEgg() {
    const styleTitle = 'color:#5B8CFF;font-size:16px;font-weight:bold;font-family:monospace;';
    const styleText = 'color:#9AA4B2;font-size:12px;font-family:monospace;';

    console.log('%cOlá, dev 👋', styleTitle);
    console.log('%cSe você chegou até aqui olhando o console, provavelmente também gosta de entender como as coisas funcionam por dentro.', styleText);
    console.log('%cVamos trocar uma ideia? ' + CONFIG.githubUrl, styleText);
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
    initNavbar();
    renderProjects();
    initStatCounters();
    setYear();
    consoleEasterEgg();

    observeReveal(document.querySelectorAll('[data-reveal]:not(#projectsGrid [data-reveal])'));
  });
})();
