'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Filtro das abas de projetos
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.proj');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.setAttribute('aria-pressed', t === tab ? 'true' : 'false'));

      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.cat === filter;
        card.hidden = !matches;
      });
    });
  });

  // 2. Alternância Dark / Light Mode
  const themeBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('sl-theme') || 'dark';

  root.setAttribute('data-theme', savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('sl-theme', next);
      themeBtn.setAttribute(
        'aria-label',
        next === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'
      );
    });
  }

  // 3. Alternância de Idioma PT / EN
  const translations = {
    pt: {
      navSobre: 'Sobre',
      navProjetos: 'Projetos',
      navStack: 'Stack',
      navContato: 'Contato',
      statusTag: 'STATUS: DISPONÍVEL',
      heroTitle:
        'Oi, sou a <span class="nowrap">Sabrina —</span> desenvolvedora <em>Front-end</em> com formação em <em class="soft">Design Gráfico e Digital.</em>',
      heroSub:
        'Transformo ideias visuais em interfaces limpas, funcionais e atentas aos pequenos detalhes.',
      heroBtn: 'Ver projetos',
      aboutNum: '01 // Sobre Mim',
      aboutTitle: 'Do layout ao código.',
      fact1Label: 'Formação',
      fact1Val: 'Design Gráfico e Digital',
      fact2Label: 'Atuação',
      fact2Val: 'Desenvolvimento Front-end',
      fact3Label: 'Foco',
      fact3Val: 'Interfaces limpas e acessíveis',
      aboutP1:
        'Me formei em Design Gráfico e Digital, mas foi na vontade de tirar os layouts da tela estática e ver tudo funcionando de verdade que fui parar no Front-end.',
      aboutP2:
        'Gosto muito dessa sensação de construir algo com código e ver a interface ganhando vida e respondendo a quem usa.',
      aboutP3:
        'Hoje uso desse olhar visual juntamente com HTML5, SCSS e JavaScript para criar páginas bem estruturadas, responsivas e cuidadas nos detalhes.',
      projNum: '02 // Projetos Selecionados',
      projTitle: 'Alguns trabalhos recentes.',
      tabAll: '[ TODOS ]',
      tabAutorais: '[ AUTORAIS ]',
      tabEstudos: '[ ESTUDOS ]',
      kindAutoral: 'AUTORAL',
      kindEstudo: 'ESTUDO',
      p1Title: 'Portfólio Pessoal',
      p1Desc:
        'Este próprio portfólio: direção visual autoral, tipografia editorial e layout em página única, do conceito ao código.',
      p2Title: 'Landing Page Nothing',
      p2Desc:
        'Recriação de uma landing minimalista, com foco em tipografia, ritmo e fidelidade visual.',
      p3Title: 'Jogo 2048',
      p3Desc:
        'Versão do clássico quebra-cabeça numérico, com lógica de movimentação e pontuação.',
      liveDemo: 'Live Demo',
      codeLink: 'Código',
      stackNum: '03 // Ferramentas & Stack',
      stackTitle: 'Do desenho à entrega.',
      stackDesign: 'Design',
      stackDev: 'Front-end',
      contactNum: '04 // Contato',
      contactTitle: 'Vamos conversar sobre<br>o seu projeto?',
      contactSub:
        'Se você procura alguém para transformar um layout em interface, ou só quer trocar uma ideia, me escreve.',
      emailBtn: 'E-mail',
    },
    en: {
      navSobre: 'About',
      navProjetos: 'Projects',
      navStack: 'Stack',
      navContato: 'Contact',
      statusTag: 'STATUS: AVAILABLE',
      heroTitle:
        'Hi, I’m <span class="nowrap">Sabrina —</span> a <em>Front-end</em> developer with a background in <em class="soft">Graphic & Digital Design.</em>',
      heroSub:
        'I turn visual concepts into clean, functional interfaces with close attention to detail.',
      heroBtn: 'View projects',
      aboutNum: '01 // About Me',
      aboutTitle: 'From layout to code.',
      fact1Label: 'Education',
      fact1Val: 'Graphic & Digital Design',
      fact2Label: 'Role',
      fact2Val: 'Front-end Development',
      fact3Label: 'Focus',
      fact3Val: 'Clean & accessible interfaces',
      aboutP1:
        'I graduated in Graphic and Digital Design, but my desire to take layouts off a static screen and see them truly work led me to Front-end development.',
      aboutP2:
        'I love the feeling of building something with code and watching the interface come alive and respond to the user.',
      aboutP3:
        'Today I combine that visual eye with HTML5, SCSS, and JavaScript to build well-structured, responsive, and detail-oriented web pages.',
      projNum: '02 // Selected Projects',
      projTitle: 'Some recent work.',
      tabAll: '[ ALL ]',
      tabAutorais: '[ PERSONAL ]',
      tabEstudos: '[ STUDIES ]',
      kindAutoral: 'PERSONAL',
      kindEstudo: 'STUDY',
      p1Title: 'Personal Portfolio',
      p1Desc:
        'This very portfolio: bespoke visual direction, editorial typography, and single-page layout, from concept to code.',
      p2Title: 'Nothing Landing Page',
      p2Desc:
        'Recreation of a minimalist landing page focused on typography, rhythm, and visual accuracy.',
      p3Title: '2048 Game',
      p3Desc:
        'A version of the classic number puzzle game, featuring movement logic and score tracking.',
      liveDemo: 'Live Demo',
      codeLink: 'Source Code',
      stackNum: '03 // Tools & Stack',
      stackTitle: 'From design to delivery.',
      stackDesign: 'Design',
      stackDev: 'Front-end',
      contactNum: '04 // Contact',
      contactTitle: 'Let’s talk about<br>your project?',
      contactSub:
        'If you are looking for someone to turn a layout into a living interface, or just want to connect, drop me a message.',
      emailBtn: 'Email',
    },
  };

  const langBtn = document.getElementById('lang-toggle');
  const langLabel = document.getElementById('lang-label');
  let currentLang = localStorage.getItem('sl-lang') || 'pt';

  function applyLanguage(lang) {
    const dict = translations[lang];
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    if (langLabel) langLabel.textContent = lang === 'pt' ? 'EN' : 'PT';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (dict[key]) el.innerHTML = dict[key];
    });
  }

  applyLanguage(currentLang);

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'pt' ? 'en' : 'pt';
      localStorage.setItem('sl-lang', currentLang);
      applyLanguage(currentLang);
    });
  }
});