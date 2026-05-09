// ============================================================
// 어드민 shell — iframe 페이지 라우팅 + 사이드바 active 동기화
// ============================================================

const ROUTES = {
  'dashboard':         { path: 'pages/dashboard.html',         menu: 'dashboard' },
  'sites':             { path: 'pages/sites/list.html',        menu: 'sites' },
  'sites/new':         { path: 'pages/sites/new.html',         menu: 'sites' },
  'sites/edit':        { path: 'pages/sites/edit.html',        menu: 'sites' },
  'sites/main':        { path: 'pages/sites/main-builder.html',menu: 'sites' },
  'sites/hero':        { path: 'pages/sites/hero.html',        menu: 'sites' },
  'sites/menu':        { path: 'pages/sites/menu.html',        menu: 'sites' },
  'sites/seo':         { path: 'pages/sites/seo.html',         menu: 'sites' },
  'sites/security':    { path: 'pages/sites/security.html',    menu: 'sites' },
  'lawyers':           { path: 'pages/lawyers/list.html',      menu: 'lawyers' },
  'lawyers/new':       { path: 'pages/lawyers/new.html',       menu: 'lawyers' },
  'lawyers/edit':      { path: 'pages/lawyers/edit.html',      menu: 'lawyers' },
  'lawyers/badges':    { path: 'pages/lawyers/badges.html',    menu: 'lawyers' },
  'cases':             { path: 'pages/cases/list.html',        menu: 'cases' },
  'cases/new':         { path: 'pages/cases/new.html',         menu: 'cases' },
  'cases/featured':    { path: 'pages/cases/featured.html',    menu: 'cases' },
  'cases/categories':  { path: 'pages/cases/categories.html',  menu: 'cases' },
  'insights':          { path: 'pages/insights/list.html',     menu: 'insights' },
  'insights/new':      { path: 'pages/insights/new.html',      menu: 'insights' },
  'insights/featured': { path: 'pages/insights/featured.html', menu: 'insights' },
  'legal-info':        { path: 'pages/legal-info.html',        menu: 'legal-info' },
  'faq':               { path: 'pages/faq.html',               menu: 'faq' },
  'reviews':           { path: 'pages/reviews.html',           menu: 'reviews' },
  'news':              { path: 'pages/news.html',              menu: 'news' },
  'fields':            { path: 'pages/fields/tree.html',       menu: 'fields' },
  'fields/detail':     { path: 'pages/fields/detail.html',     menu: 'fields' },
  'marketing':         { path: 'pages/marketing.html',         menu: 'marketing' },
  'branches':          { path: 'pages/branches.html',          menu: 'branches' },
  'media':             { path: 'pages/media.html',             menu: 'media' },
  'inquiries':         { path: 'pages/inquiries.html',         menu: 'inquiries' },
  'users':             { path: 'pages/users.html',             menu: 'users' },
  'system':            { path: 'pages/system.html',            menu: 'system' },
};

function getCurrentRoute(){
  const hash = (window.location.hash || '#dashboard').slice(1);
  // 쿼리 파라미터 제거
  const baseHash = hash.split('?')[0];
  const queryStr = hash.includes('?') ? '?' + hash.split('?')[1] : '';
  return { hash: baseHash, query: queryStr };
}

function navigate(){
  const { hash, query } = getCurrentRoute();
  const route = ROUTES[hash] || ROUTES['dashboard'];
  const frame = document.getElementById('main-frame');
  if (frame){
    frame.src = route.path + query;
  }
  // 사이드바 active 상태
  document.querySelectorAll('.nav-link, .nav-child').forEach(n => {
    n.classList.remove('active');
  });
  const activeLink = document.querySelector(`.nav-link[data-menu="${route.menu}"]`);
  if (activeLink) activeLink.classList.add('active');
  const activeChild = document.querySelector(`.nav-child[data-route="${hash}"]`);
  if (activeChild) {
    activeChild.classList.add('active');
    // 부모 메뉴 펼치기
    const parent = activeChild.closest('.nav-children')?.previousElementSibling;
    if (parent && parent.classList.contains('nav-link')) parent.classList.add('open');
  }
}

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', () => {
  // 사이드바 메뉴 클릭
  document.querySelectorAll('.nav-link[data-route]').forEach(link => {
    link.addEventListener('click', e => {
      const route = link.dataset.route;
      window.location.hash = '#' + route;
      // 콜랩스 토글
      if (link.hasAttribute('data-collapse')){
        link.classList.toggle('open');
      }
    });
  });
  document.querySelectorAll('.nav-link[data-collapse]:not([data-route])').forEach(link => {
    link.addEventListener('click', () => link.classList.toggle('open'));
  });
  document.querySelectorAll('.nav-child').forEach(c => {
    c.addEventListener('click', () => {
      window.location.hash = '#' + c.dataset.route;
    });
  });
  // 첫 진입 자동 펼치기
  document.querySelectorAll('.nav-link[data-collapse]').forEach((l,i) => { if(i===0) l.classList.add('open'); });
  navigate();
});

// 자식 페이지가 호출하는 이동 함수 (부모 hash 변경)
window.adminNavigate = function(route){
  window.location.hash = '#' + route;
};
