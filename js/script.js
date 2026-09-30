/* ===========================================================
   Jeferson Araujo — Portfólio (Redesign 2026)
   script.js — dados, renderização, interações e partículas
   =========================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     CONFIG
  --------------------------------------------------------- */
  const CONFIG = {
    githubUrl: 'https://github.com/jeferson-Ferreira-Araujo',
    email: 'jeferson.tecinfo@gmail.com',
    linkedinUrl: 'https://www.linkedin.com/in/jefersonfaraujo/',
  };

  /* ---------------------------------------------------------
     STATUS MAP
  --------------------------------------------------------- */
  const STATUS_MAP = {
    dev: { label: 'Em desenvolvimento', color: 'var(--accent)' },
    mvp: { label: 'MVP', color: 'var(--green)' },
    experimental: { label: 'Experimental', color: 'var(--amber)' },
    production: { label: 'Em produção', color: 'var(--green)' },
    concept: { label: 'Conceito', color: 'var(--purple)' },
    archived: { label: 'Arquivado', color: 'var(--text-muted)' },
  };

  /* ---------------------------------------------------------
     PROJETOS (mesmos dados)
  --------------------------------------------------------- */
  const projects = [
    {
      name: 'SAVIA',
      description: 'Plataforma para pequenos profissionais criarem cursos e disponibilizarem aulas em vídeo. Contextos Criador e Aluno, com Savia Studio para legendas e sugestões por IA.',
      category: 'Educação & Produto',
      status: 'production',
      technologies: ['React Native', 'Expo', 'Supabase', 'TypeScript', 'Groq'],
      image: 'assets/images/savia.jpg',
      url: '',
      featured: true,
    },
    {
      name: 'AUTORA',
      description: 'Plataforma de automação para Instagram — agendamento inteligente, publicação automática e gestão de mídias para pequenos negócios.',
      category: 'Automação & Marketing',
      status: 'production',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'Supabase', 'Cloudflare R2', 'Meta API'],
      image: 'assets/images/autora.jpg',
      url: 'https://autora-dashboard.vercel.app',
      featured: true,
    },
    {
      name: 'AVIVAPLAY',
      description: 'Catálogo de mini-jogos bíblicos pra jogar em grupo. 100% gratuito, sem cadastro, direto no navegador.',
      category: 'Entretenimento & Fé',
      status: 'production',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Bootstrap'],
      image: 'assets/images/avivaplay.jpg',
      url: 'https://play-gospel.vercel.app',
      featured: true,
    },
    {
      name: 'OHANA',
      description: 'Aplicativo mobile para famílias organizarem calendário, tarefas, rotinas, listas e recados compartilhados.',
      category: 'Família & Produtividade',
      status: 'mvp',
      technologies: ['React Native', 'Expo', 'Supabase', 'TypeScript'],
      image: 'assets/images/ohana.jpg',
      url: '',
      featured: true,
    },
    {
      name: 'DALIZ',
      description: 'Aplicativo que ajuda você com micro tarefas e micro ações no dia a dia para se tornar uma pessoa melhor.',
      category: 'Produtividade & Bem-estar',
      status: 'dev',
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'Prisma'],
      image: 'assets/images/daliz.jpg',
      url: '',
      featured: true,
    },
  ];

  /* ---------------------------------------------------------
     RENDER PROJECTS
  --------------------------------------------------------- */
  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = projects.map(function (project) {
      var status = STATUS_MAP[project.status] || STATUS_MAP.concept;
      var media = project.image
        ? '<img src="' + escapeAttr(project.image) + '" alt="Mockup do projeto ' + escapeAttr(project.name) + '" loading="lazy">'
        : '<div class="project-placeholder" aria-hidden="true">' + initials(project.name) + '</div>';

      var techPills = project.technologies
        .map(function (tech) { return '<span class="tech-pill">' + escapeHtml(tech) + '</span>'; })
        .join('');

      var featuredBadge = project.featured
        ? '<span class="project-featured">Destaque</span>'
        : '';

      return (
        '<div data-reveal-scale>' +
          '<article class="project-card">' +
            '<div class="project-media">' +
              media +
              '<span class="status-badge">' +
                '<span class="status-dot" style="background:' + status.color + '"></span>' +
                escapeHtml(status.label) +
              '</span>' +
              featuredBadge +
            '</div>' +
            '<div class="project-body">' +
              '<span class="project-category">' + escapeHtml(project.category) + '</span>' +
              '<h3>' + escapeHtml(project.name) + '</h3>' +
              '<p class="project-desc">' + escapeHtml(project.description) + '</p>' +
              '<div class="project-tech">' + techPills + '</div>' +
            '</div>' +
          '</article>' +
        '</div>'
      );
    }).join('');

    observeReveal(grid.querySelectorAll('[data-reveal-scale]'));
  }

  /* ---------------------------------------------------------
     HELPERS
  --------------------------------------------------------- */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
  }

  function initials(name) {
    return name.split(' ').filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  /* ---------------------------------------------------------
     LINKS CONFIG
  --------------------------------------------------------- */
  function applyConfig() {
    var githubLinks = document.querySelectorAll('#githubLink, #githubLink2');
    githubLinks.forEach(function (el) { el.setAttribute('href', CONFIG.githubUrl); });

    var githubVal = document.querySelector('#githubLink2 .contact-link-value');
    if (githubVal) githubVal.textContent = CONFIG.githubUrl;

    var emailLink = document.getElementById('emailLink');
    if (emailLink) {
      emailLink.setAttribute('href', 'mailto:' + CONFIG.email);
      var val = emailLink.querySelector('.contact-link-value');
      if (val) val.textContent = CONFIG.email;
    }

    var linkedinLink = document.getElementById('linkedinLink');
    if (linkedinLink) {
      linkedinLink.setAttribute('href', CONFIG.linkedinUrl);
      var val = linkedinLink.querySelector('.contact-link-value');
      if (val) val.textContent = CONFIG.linkedinUrl;
    }
  }

  /* ---------------------------------------------------------
     NAVBAR
  --------------------------------------------------------- */
  function initNavbar() {
    var header = document.getElementById('siteHeader');
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    var navLinks = document.querySelectorAll('[data-nav]');

    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    var sections = Array.from(navLinks)
      .map(function (link) { return document.querySelector(link.getAttribute('href')); })
      .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
      var sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute('id');
          var link = document.querySelector('[data-nav][href="#' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { return l.classList.remove('is-active'); });
            link.classList.add('is-active');
          }
        });
      }, { rootMargin: '-45% 0px -45% 0px' });

      sections.forEach(function (section) { return sectionObserver.observe(section); });
    }
  }

  /* ---------------------------------------------------------
     REVEAL ON SCROLL
  --------------------------------------------------------- */
  var revealObserver;

  function getRevealObserver() {
    if (revealObserver) return revealObserver;
    if (!('IntersectionObserver' in window)) return null;

    revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    return revealObserver;
  }

  function observeReveal(elements) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var observer = getRevealObserver();

    elements.forEach(function (el) {
      if (prefersReduced || !observer) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });
  }

  /* ---------------------------------------------------------
     COUNTERS
  --------------------------------------------------------- */
  function initStatCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      if (prefersReduced) { el.textContent = String(target); return; }

      var duration = 900;
      var start = performance.now();

      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });

      counters.forEach(function (el) { return observer.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------------------------------------------------------
     PARTICLES (Canvas)
  --------------------------------------------------------- */
  function initParticles() {
    var canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    var ctx = canvas.getContext('2d');
    var particles = [];
    var w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    var count = Math.min(Math.floor((w * h) / 15000), 80);

    for (var i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.5,
        a: Math.random() * 0.4 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 155, 255, ' + p.a + ')';
        ctx.fill();

        // Lines between close particles
        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(124, 155, 255, ' + (0.08 * (1 - dist / 120)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  /* ---------------------------------------------------------
     CURSOR GLOW
  --------------------------------------------------------- */
  function initCursorGlow() {
    var glow = document.getElementById('cursorGlow');
    if (!glow) return;

    var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.documentElement.classList.add('cursor-disabled');
      return;
    }

    document.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     YEAR
  --------------------------------------------------------- */
  function setYear() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     EASTER EGG
  --------------------------------------------------------- */
  function consoleEasterEgg() {
    console.log('%cOl\u00e1, dev \ud83d\udc4b', 'color:#7C9BFF;font-size:16px;font-weight:bold;font-family:monospace;');
    console.log('%cSe voc\u00ea chegou at\u00e9 aqui olhando o console, provavelmente tamb\u00e9m gosta de entender como as coisas funcionam por dentro.', 'color:#9AA4B2;font-size:12px;font-family:monospace;');
    console.log('%cVamos trocar uma ideia? ' + CONFIG.githubUrl, 'color:#9AA4B2;font-size:12px;font-family:monospace;');
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    applyConfig();
    initNavbar();
    renderProjects();
    initStatCounters();
    initParticles();
    initCursorGlow();
    setYear();
    consoleEasterEgg();

    observeReveal(document.querySelectorAll('[data-reveal]:not(#projectsGrid [data-reveal], #projectsGrid [data-reveal-scale])'));
    observeReveal(document.querySelectorAll('[data-reveal-scale]:not(#projectsGrid [data-reveal-scale])'));
  });

})();