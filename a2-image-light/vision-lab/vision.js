(() => {
  const nav = document.querySelector('.vision-about-nav');
  if (!nav) return;

  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.hash))
    .filter(Boolean);

  const setActive = (id) => {
    links.forEach((link) => {
      const active = link.hash === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  };

  const update = () => {
    const marker = window.scrollY + nav.offsetHeight + 180;
    let current = sections[0];
    sections.forEach((section) => {
      if (section.offsetTop <= marker) current = section;
    });
    if (current) setActive(current.id);
  };

  links.forEach((link) => link.addEventListener('click', () => setActive(link.hash.slice(1))));
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
