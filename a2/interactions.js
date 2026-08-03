(() => {
  const isEnglish = document.documentElement.lang === 'en';
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
    menu?.setAttribute('aria-label', open ? (isEnglish ? 'Close menu' : '메뉴 닫기') : (isEnglish ? 'Open menu' : '메뉴 열기'));
    if (menu) menu.textContent = open ? (isEnglish ? 'CLOSE' : '닫기') : (isEnglish ? 'MENU' : '메뉴');
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
    const data = new FormData(form);
    const title = String(data.get('title') || (isEnglish ? 'Service inquiry' : '서비스 문의'));
    const body = [
      `${isEnglish ? 'Service' : '관심 서비스'}: ${data.get('service') || ''}`,
      `${isEnglish ? 'Company' : '회사명'}: ${data.get('company') || ''}`,
      `${isEnglish ? 'Contact' : '연락처'}: ${data.get('contact') || ''}`,
      '',
      String(data.get('message') || '')
    ].join('\n');
    const prefix = isEnglish ? '[Website inquiry]' : '[홈페이지 문의]';
    const mailto = `mailto:dacom@dacomcrossing.co.kr?subject=${encodeURIComponent(`${prefix} ${title}`)}&body=${encodeURIComponent(body)}`;
    const status = form.querySelector('.a2-form-status');
    if (status) status.textContent = isEnglish ? 'Opening your email application.' : '이메일 작성 창을 엽니다.';
    window.location.href = mailto;
  });
})();
