// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const globalNav = document.querySelector('.global-nav');

if (menuToggle && globalNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = globalNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  globalNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      globalNav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'メニューを開く');
    });
  });
}

// Product selector
const selectorButtons = document.querySelectorAll('.selector-option');
const resultBox = document.getElementById('selector-result');
const productCards = document.querySelectorAll('[data-product-card]');

const selectorResults = {
  sugarfree: {
    title: 'おすすめ：琉球もろみ酢 無加糖',
    body: '米こうじのみで作られた、シンプルな造り。リピートされる方が多いもろみ酢です。'
  },
  sweet: {
    title: 'おすすめ：琉球もろみ酢 黒糖入り',
    body: '沖縄の黒糖をつかったもろみ酢です。甘みを追加することで、とげの無いまろやかな飲み口に。'
  },
  citrus: {
    title: 'おすすめ：沖縄の活力 シークワーサー＆レモン入り',
    body: 'シークワーサー果汁、レモン果汁、ざらめを加えました。「飲みやすさ」を追求したもろみ酢です。。'
  }
};

selectorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectorButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');

    const key = button.dataset.result;
    const result = selectorResults[key];
    if (!result || !resultBox) return;

    resultBox.innerHTML = `
      <span class="result-label">YOUR MATCH</span>
      <strong>${result.title}</strong>
      <p>${result.body}</p>
    `;

    productCards.forEach((card) => {
      card.classList.toggle('is-recommended', card.dataset.productCard === key);
    });
  });
});

// Reveal animation
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Close mobile menu when viewport grows
window.addEventListener('resize', () => {
  if (window.innerWidth > 900 && globalNav && menuToggle) {
    globalNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});
