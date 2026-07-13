document.addEventListener('DOMContentLoaded', function () {
  const storyTabs = Array.from(document.querySelectorAll('.kb-story-tabs [role="tab"]'));
  const storyPanel = document.querySelector('.kb-story-panel');
  if (storyTabs.length && storyPanel) {
    const image = storyPanel.querySelector('img');
    const copy = storyPanel.lastElementChild;
    const assetRoot = image.src.slice(0, image.src.lastIndexOf('/') + 1);
    const stories = [
      ['2001','합작 인프라 회사 설립','LG U+ 전신 데이콤과 글로벌 케이블 사업자의 합작으로 출발했습니다.','business-collaboration.jpg'],
      ['2002','EAC 백홀과 태안 육양국','국제 해저케이블이 한국에 도착하는 핵심 운영 자산을 확보했습니다.','coastline-aerial.jpg'],
      ['2015','Telstra 운영 체계 연계','글로벌 NOC/GSD와 연결된 국제회선 장애 대응 체계를 강화했습니다.','operations-control-room.jpg'],
      ['2025','AIDC와 대용량 트래픽','11.5T 백홀과 중립 소싱으로 AI 데이터센터 연결 수요에 대응합니다.','data-aisle-blue.jpg']
    ];
    const selectStory = function (index, focus) {
      storyTabs.forEach(function (tab, i) { tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
      const story = stories[index];
      image.src = assetRoot + story[3];
      image.alt = story[1];
      copy.querySelector('span').textContent = story[0];
      copy.querySelector('h3').textContent = story[1];
      copy.querySelector('p').textContent = story[2];
      if (focus) storyTabs[index].focus();
    };
    storyTabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { selectStory(index, false); });
      tab.addEventListener('keydown', function (event) {
        if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
        event.preventDefault();
        let next = event.key === 'Home' ? 0 : event.key === 'End' ? storyTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + storyTabs.length) % storyTabs.length;
        selectStory(next, true);
      });
    });
    selectStory(0, false);
  }

  const localLinks = Array.from(document.querySelectorAll('.kb-local-tabs a[href^="#"]'));
  if (localLinks.length) {
    const setActive = function (id) { localLinks.forEach(function (link) { link.classList.toggle('active', link.hash === '#' + id); }); };
    localLinks.forEach(function (link) { link.addEventListener('click', function () { setActive(link.hash.slice(1)); }); });
    const targets = localLinks.map(function (link) { return document.getElementById(link.hash.slice(1)); }).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: '-28% 0px -62%', threshold: 0 });
      targets.forEach(function (target) { observer.observe(target); });
    }
    if (location.hash && document.getElementById(location.hash.slice(1))) setActive(location.hash.slice(1));
  }

  const form = document.querySelector('.kb-form');
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      let status = form.querySelector('[role="status"]');
      if (!status) { status = document.createElement('p'); status.setAttribute('role','status'); form.appendChild(status); }
      status.textContent = '문의 내용을 확인했습니다. 담당자 연결을 준비합니다.';
    });
  }
});
