(() => {
  const header = document.querySelector('.a2-header');
  const updateHeader = () => header?.classList.toggle('is-compact', window.scrollY > 56);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const menu = document.querySelector('.a2-menu');
  const nav = document.querySelector('.a2-nav');
  const setMenuState = (open) => {
    nav?.classList.toggle('is-open', open);
    header?.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    menu?.setAttribute('aria-expanded', String(open));
    menu?.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    if (menu) menu.textContent = open ? 'CLOSE' : 'MENU';
  };
  menu?.addEventListener('click', () => setMenuState(!nav?.classList.contains('is-open')));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuState(false)));

  const localLinks = [...document.querySelectorAll('.a2-localnav a')];
  if (localLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        localLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-30% 0px -58%', threshold: 0 });
    localLinks.forEach((link) => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });
  }

  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach((element) => revealObserver.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  const form = document.querySelector('.a2-form');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.a2-form-status');
    if (status) status.textContent = '프로토타입입니다. 실제 제출 시 담당자 이메일로 전달됩니다.';
  });
})();
