const deck = document.getElementById('deck');
const bar = document.getElementById('bar');
const dotsWrap = document.getElementById('dots');
const slides = [...document.querySelectorAll('.slide')];

// 인디케이터 생성
slides.forEach((slide, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.setAttribute('aria-label', `${i + 1}번째 화면`);
  b.addEventListener('click', () => {
    slide.scrollIntoView({ behavior: 'smooth' });
  });
  dotsWrap.appendChild(b);
});
const dots = [...dotsWrap.children];

// 화면 진입 애니메이션 + 현재 위치 표시
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      const i = slides.indexOf(e.target);
      dots.forEach((d, j) => d.classList.toggle('is-active', j === i));
      bar.style.width = `${((i + 1) / slides.length) * 100}%`;
    });
  },
  { threshold: 0.55 }
);
slides.forEach((s) => io.observe(s));

// 리센느 화면 — 탭하면 정답 공개, 다시 탭하면 되돌리기(다음 사람에게 재사용)
const reveal = document.getElementById('reveal');
if (reveal) {
  const answer = reveal.querySelector('[data-reveal-show]');

  reveal.addEventListener('click', () => {
    const on = reveal.classList.toggle('is-revealed');
    if (on) {
      answer.hidden = false;
      // 애니메이션 재시작
      answer.querySelectorAll('p').forEach((p) => {
        p.style.animation = 'none';
        void p.offsetWidth;
        p.style.animation = '';
      });
    } else {
      answer.hidden = true;
    }
  });
}

// 키보드 / 리모컨(프레젠터) 조작
const move = (dir) => {
  const i = dots.findIndex((d) => d.classList.contains('is-active'));
  const next = slides[Math.min(Math.max(i + dir, 0), slides.length - 1)];
  next?.scrollIntoView({ behavior: 'smooth' });
};

window.addEventListener('keydown', (e) => {
  if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
    e.preventDefault();
    move(1);
  } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
    e.preventDefault();
    move(-1);
  }
});
