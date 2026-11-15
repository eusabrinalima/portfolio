'use strict';

document.addEventListener('DOMContentLoaded', () => {
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
});