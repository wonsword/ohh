// ============================================================
// 각 페이지 공통 스크립트 (iframe 안에서 실행)
// ============================================================

// 부모 shell로 페이지 이동 요청
function go(route){
  if (window.parent && window.parent !== window && window.parent.adminNavigate){
    window.parent.adminNavigate(route);
  } else {
    // 단독 실행 — index.html#route로 이동
    window.location.href = '/admin/index.html#' + route;
  }
}

// 모달
function openModal(name){
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('on'));
  const m = document.querySelector(`.modal-backdrop[data-modal="${name}"]`);
  if(m) m.classList.add('on');
}
function closeModal(){
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('on'));
}

window.addEventListener('DOMContentLoaded', () => {
  // breadcrumb · button[data-go] 링크
  document.querySelectorAll('[data-go]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      go(el.dataset.go);
    });
  });
  // 토글 스위치
  document.querySelectorAll('.toggle').forEach(t => {
    t.addEventListener('click', () => t.classList.toggle('on'));
  });
  // 탭 그룹
  document.querySelectorAll('.tabs').forEach(group => {
    const tabs = group.querySelectorAll('.tab');
    const panels = group.parentElement?.querySelectorAll('.tab-panel') || [];
    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('on'));
        tab.classList.add('on');
        panels.forEach((p, pi) => p.classList.toggle('on', pi === idx));
      });
    });
  });
  // 모달 탭
  document.querySelectorAll('.modal-tabs').forEach(g => {
    const tabs = g.querySelectorAll('.modal-tab');
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.classList.remove('on'));
      t.classList.add('on');
    }));
  });
  // 모달 백드롭/ESC
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', e => { if(e.target === m) closeModal(); });
  });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
  // 검색 결과 다중 선택
  document.querySelectorAll('.search-result').forEach(r => {
    r.addEventListener('click', e => {
      if(e.target.closest('button,a,input,select')) return;
      r.classList.toggle('selected');
    });
  });
  // 색상 팔레트
  document.querySelectorAll('.swatch-grid').forEach(g => {
    g.querySelectorAll('.swatch-item').forEach(s => {
      s.addEventListener('click', () => {
        g.querySelectorAll('.swatch-item').forEach(x => x.classList.remove('on'));
        s.classList.add('on');
      });
    });
  });
  // 에디터 토글
  document.querySelectorAll('.editor-toolbar .ed-btn').forEach(b => {
    if(b.hasAttribute('onclick')) return;
    b.addEventListener('click', e => {
      e.preventDefault();
      b.classList.toggle('on');
    });
  });
  // 트리 노드 펼치기
  document.querySelectorAll('.tree-node .toggle-ico').forEach(t => {
    if(t.textContent === '·') return;
    t.addEventListener('click', () => {
      t.textContent = t.textContent === '▼' ? '▶' : '▼';
    });
  });
  // 행 클릭으로 이동 (data-row-go)
  document.querySelectorAll('tr[data-row-go]').forEach(tr => {
    tr.addEventListener('click', e => {
      if(e.target.closest('input,button,a,select,.toggle')) return;
      go(tr.dataset.rowGo);
    });
  });
});
