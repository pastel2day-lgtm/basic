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

// 질문 선택지 — 탭하면 선택(다시 탭하면 해제), 인터뷰 신청 시 구글시트로 함께 전송
const ANSWERS_KEY = 'glitAnswers';
const answers = JSON.parse(localStorage.getItem(ANSWERS_KEY) || '{}');

document.querySelectorAll('.choices[data-question]').forEach((list) => {
  const question = list.dataset.question;
  const items = [...list.children];

  const render = () => {
    items.forEach((li) => li.classList.toggle('is-selected', li.dataset.value === answers[question]));
  };
  render();

  const select = (li) => {
    if (answers[question] === li.dataset.value) {
      delete answers[question];
    } else {
      answers[question] = li.dataset.value;
    }
    localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    render();
  };

  items.forEach((li) => {
    li.addEventListener('click', () => select(li));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(li);
      }
    });
  });
});

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
