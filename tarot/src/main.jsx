import React from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, Download, RotateCcw, Share2, Sparkles } from 'lucide-react'
import './styles.css'

const commonsImage = (fileName, width = 900) =>
  `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=${width}`

const MYSTIC_BACKGROUND_IMAGE = commonsImage('Purple starry sky (Unsplash).jpg', 2200)
const MAJOR_ARCANA_IMAGE = commonsImage('Rider-Waite Major Arcana full.png', 900)
const animalGlyphs = {
  개미: '🐜',
  강아지: '🐶',
  독수리: '🦅',
  고양이: '🐱',
  올빼미: '🦉',
  사슴: '🦌',
  원숭이: '🐵',
  사자: '🦁',
  코끼리: '🐘',
}

const animalConstellationImage = (animal) => {
  const glyph = animalGlyphs[animal] || '✦'
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <radialGradient id="aura" cx="50%" cy="42%" r="64%">
          <stop offset="0%" stop-color="#f4c95d" stop-opacity=".24"/>
          <stop offset="58%" stop-color="#8d5cf6" stop-opacity=".16"/>
          <stop offset="100%" stop-color="#120d24" stop-opacity=".94"/>
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.6" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="120" height="120" rx="60" fill="url(#aura)"/>
      <path d="M25 38 L43 28 L58 42 L76 29 L94 48 L81 73 L61 86 L39 72 Z" fill="none" stroke="#f4c95d" stroke-opacity=".46" stroke-width="1.8"/>
      <g fill="#f4c95d" filter="url(#glow)">
        <circle cx="25" cy="38" r="2.4"/><circle cx="43" cy="28" r="2.2"/><circle cx="58" cy="42" r="2.6"/>
        <circle cx="76" cy="29" r="2.2"/><circle cx="94" cy="48" r="2.4"/><circle cx="81" cy="73" r="2.3"/>
        <circle cx="61" cy="86" r="2.7"/><circle cx="39" cy="72" r="2.1"/>
      </g>
      <text x="60" y="69" text-anchor="middle" dominant-baseline="middle" font-size="46">${glyph}</text>
    </svg>`

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const enneagramTypes = {
  1: {
    name: '개혁가',
    animal: '개미',
    symbol: 'ANT',
    essence: '정확함과 원칙으로 더 나은 방향을 찾는 사람',
    gift: '흐트러진 상황을 정리하고 기준을 세우는 힘',
    shadow: '완벽해야 한다는 긴장',
    adviceTone: '기준을 낮추는 것이 아니라 숨 쉴 공간을 함께 마련하세요.',
  },
  2: {
    name: '조력가',
    animal: '강아지',
    symbol: 'DOG',
    essence: '관계의 온도를 읽고 필요한 손길을 내미는 사람',
    gift: '사람의 마음을 부드럽게 연결하는 힘',
    shadow: '인정받기 위해 너무 많이 내어주는 습관',
    adviceTone: '도움의 방향을 바깥에서 안쪽으로도 돌려보세요.',
  },
  3: {
    name: '성취자',
    animal: '독수리',
    symbol: 'EAGLE',
    essence: '목표를 향해 빠르게 형태를 만들어내는 사람',
    gift: '가능성을 결과로 바꾸는 실행력',
    shadow: '성과가 곧 자기 가치라는 압박',
    adviceTone: '속도를 잠시 늦춰도 당신의 빛은 사라지지 않습니다.',
  },
  4: {
    name: '개성가',
    animal: '고양이',
    symbol: 'CAT',
    essence: '감정의 깊이와 고유한 색을 소중히 여기는 사람',
    gift: '평범한 경험에 의미와 아름다움을 부여하는 힘',
    shadow: '결핍감에 오래 머무르는 경향',
    adviceTone: '지금 가진 것의 윤곽도 충분히 당신답습니다.',
  },
  5: {
    name: '탐구자',
    animal: '올빼미',
    symbol: 'OWL',
    essence: '거리를 두고 관찰하며 본질을 이해하려는 사람',
    gift: '복잡한 문제를 조용히 꿰뚫는 통찰',
    shadow: '준비가 끝날 때까지 삶을 미루는 습관',
    adviceTone: '모든 답을 갖추기 전에도 한 걸음은 가능합니다.',
  },
  6: {
    name: '충실가',
    animal: '사슴',
    symbol: 'DEER',
    essence: '위험을 감지하고 믿을 수 있는 기반을 세우는 사람',
    gift: '공동체를 지키는 현실감과 책임감',
    shadow: '불확실성을 오래 붙드는 불안',
    adviceTone: '확신이 없다는 사실이 곧 실패의 신호는 아닙니다.',
  },
  7: {
    name: '열정가',
    animal: '원숭이',
    symbol: 'MONKEY',
    essence: '새로운 가능성을 발견하고 분위기를 열어젖히는 사람',
    gift: '막힌 공기에 활기와 선택지를 불어넣는 힘',
    shadow: '불편한 감정을 빨리 건너뛰려는 습관',
    adviceTone: '즐거움만큼 깊이도 당신 편이 될 수 있습니다.',
  },
  8: {
    name: '도전자',
    animal: '사자',
    symbol: 'LION',
    essence: '강한 의지로 경계를 세우고 사람들을 이끄는 사람',
    gift: '위기 앞에서 물러서지 않는 보호 본능과 추진력',
    shadow: '통제권을 놓기 어려운 긴장',
    adviceTone: '힘을 잃는 것이 아니라 힘의 사용법을 바꾸는 시기입니다.',
  },
  9: {
    name: '평화주의자',
    animal: '코끼리',
    symbol: 'ELEPHANT',
    essence: '갈등을 부드럽게 낮추고 안정감을 만드는 사람',
    gift: '다른 사람을 편안하게 품는 넓은 수용성',
    shadow: '자기 욕구를 뒤로 미루는 습관',
    adviceTone: '평화를 지키려면 당신의 목소리도 그 안에 있어야 합니다.',
  },
}

const enneagramData = [
  {
    type: 1,
    animal: '개미',
    questions: [
      '나는 모든 일을 개선하기 위해 깊이 생각해서 행동한다.',
      '나는 다른 사람들보다 근면하며 책임감이 강하다.',
      '나는 정직하고 자제력이 있는 사람이다.',
      '나의 행동은 원칙에 기초를 둔다.',
      '나는 규칙을 잘 지키며 엄격하다.',
      '나는 완벽을 위해 끝까지 참고 노력한다.',
      '나는 다른 사람들의 신임을 얻을 수 있다.',
      '나는 정의감이 강하고 근면하다.',
      '나는 주로 나의 양심과 이성에 따른다.',
    ],
  },
  {
    type: 2,
    animal: '강아지',
    questions: [
      '나는 다른 사람들과 함께 일하기를 더 좋아한다.',
      '나의 관심사는 다른 사람들을 도와주는 것이다.',
      '나는 사람들에게 칭찬을 잘 한다.',
      '내 생각보다는 남의 생각에 공감할 때가 많다.',
      '나는 친구들이 나에게 의지할 때 기분이 좋다.',
      '나는 사람들을 관심 있게 대하고 보살피려 한다.',
      '나는 사람들과 친해지려고 많이 노력하고 있다.',
      '나는 타인의 만족을 위해 노력한다.',
      '나는 타인의 호감을 얻기 위해 노력한다.',
    ],
  },
  {
    type: 3,
    animal: '독수리',
    questions: [
      '나는 능력을 발휘하는 데 많은 시간을 투자한다.',
      '나는 과정보다는 결과를 중시한다.',
      '나는 인간 중심적이기보다는 오히려 목표 중심적이다.',
      '나는 적응력이 뛰어나 상황에 적절히 대응한다.',
      '나는 사람들에게 지나친 경쟁을 강요한다.',
      '나는 사람들에 대한 배려보다는 일의 성취를 더 중요하게 생각한다.',
      '나는 성공만이 이익을 획득할 수 있다고 믿는다.',
      '나는 실패를 두려워하며 과장하는 경향이 있다.',
      '나는 침체에 빠지지 않고 무엇인가를 끊임없이 만든다.',
    ],
  },
  {
    type: 4,
    animal: '고양이',
    questions: [
      '나는 감수성이 풍부해서 혼자 있을 때가 많다.',
      '나는 혼자서 자신만의 고결한 취미를 즐긴다.',
      '나는 낭만적이고 예술가적인 기질이 있다.',
      '나는 이방인처럼 느낄 때가 많다.',
      '나는 다른 사람들과는 다른 독특한 감정을 가지고 있다.',
      '나는 분위기에 약하고 자기 생각에 몰입하는 편이다.',
      '나는 내 행동의 동기가 감정에 의해 희구적인 생각이 들 때가 있다.',
      '나는 감동적인 것을 추구하다가 혼자 우울해 지기도 한다.',
      '나는 비현실적이며 몽상가적 기질을 가지고 있다.',
    ],
  },
  {
    type: 5,
    animal: '올빼미',
    questions: [
      '나는 무엇인가에 집중하며 통찰한다.',
      '나는 문제가 있으면 풀릴 때까지 그것만 골똘히 생각한다.',
      '나는 공적인 것보다는 개인적인 것들에 대한 관심이 많다.',
      '나는 감성보다는 이성을 추구한다.',
      '나는 시간이나 돈을 아끼는 경향이 있다.',
      '나의 관심사는 나를 둘러싼 세계를 이해하는 것이다.',
      '나는 권위를 믿지 않고 규칙을 무시한다.',
      '나는 지적이고 침착하게 관찰하는 편이다.',
      '나는 머리로 모든 것을 이해하고 판단한다.',
    ],
  },
  {
    type: 6,
    animal: '사슴',
    questions: [
      '나는 명확한 지침이 있을 때 일의 능률이 오른다.',
      '나는 사랑하는 사람을 가끔 의심하는 경향이 있다.',
      '나는 잘 훈련되어 있어 소속이나 집단에 헌신할 수 있다.',
      '나는 모든 일에서 안전을 중요하게 생각한다.',
      '사람들은 내게 더 큰 용기가 필요하다고 말한다.',
      '나는 결과에 대한 두려움 때문에 일을 질질 끄는 경우가 있다.',
      '나는 충성할 만한 사람이라고 판단되면 헌신할 수 있다.',
      '나는 친하게 지내는 사람과 친밀한 우정을 유지하도록 노력한다.',
      '나는 성공에 대해서도 가끔 의구심을 갖는 경향이 있다.',
    ],
  },
  {
    type: 7,
    animal: '원숭이',
    questions: [
      '나는 자발적으로 재미있는 일을 즐긴다.',
      '나는 모험적이며 위험을 감수한다.',
      '나는 끊임없이 변화하는 생활을 즐긴다.',
      '나는 자극과 흥분을 유발하는 행동을 좋아한다.',
      '나는 어린아이처럼 명랑하고 천진하다.',
      '나는 미래에 대해 항상 열정을 가지고 있다.',
      '나는 여러 가지 일을 즐기며 새로운 경험을 갈망한다.',
      '나는 한 가지 일이 정착하기가 어렵다.',
      '나는 현실에 만족하지 않고 새로운 것을 추구한다.',
    ],
  },
  {
    type: 8,
    animal: '사자',
    questions: [
      '나는 지도자로서의 기질이 있다.',
      '나는 의사 결정을 할 때 적절히 지도력을 발휘한다.',
      '나는 늘 강해야 한다고 생각한다.',
      '나는 사람들에게 영향력이 있는 사람이다.',
      '나는 다른 사람들이 말하기 어려워하는 것을 이야기한다.',
      '나는 공격적이고 자기주장이 강하다.',
      '나는 사람들을 통제하려고 한다.',
      '나는 사람들을 지지하고 동기를 부여한다.',
      '나는 강한 자신감으로 사람들은 설득시킨다.',
    ],
  },
  {
    type: 9,
    animal: '코끼리',
    questions: [
      '나는 자기만족적이며 낙관적인 편이다.',
      '나는 감정의 동요가 많지 않은 온화한 사람이다.',
      '나는 안정적 해결책을 원하고 되도록 갈등을 피한다.',
      '나는 친구들이 긴장을 풀고 마음 편하게 지내게 한다.',
      '나는 사람들을 유연하고 편하게 대한다.',
      '사람들은 나를 그냥 좋아한다.',
      '나는 세상에 대해 낙관적인 편이다.',
      '사람들이 하는 일은 각자의 몫이며 나와 상관없는 일이다.',
      '나는 조화로움을 추구하는 평화주의자이다.',
    ],
  },
]

const questions = enneagramData.flatMap(({ type, questions: typeQuestions }) =>
  typeQuestions.map((text, index) => ({
    id: `${type}-${index + 1}`,
    type,
    text,
  })),
)

const tarotImageFiles = [
  'RWS Tarot 00 Fool.jpg',
  'RWS Tarot 01 Magician.jpg',
  'RWS Tarot 02 High Priestess.jpg',
  'RWS Tarot 03 Empress.jpg',
  'RWS Tarot 04 Emperor.jpg',
  'RWS Tarot 05 Hierophant.jpg',
  'RWS Tarot 06 Lovers.jpg',
  'RWS Tarot 07 Chariot.jpg',
  'RWS Tarot 08 Strength.jpg',
  'RWS Tarot 09 Hermit.jpg',
  'RWS Tarot 10 Wheel of Fortune.jpg',
  'RWS Tarot 11 Justice.jpg',
  'RWS Tarot 12 Hanged Man.jpg',
  'RWS Tarot 13 Death.jpg',
  'RWS Tarot 14 Temperance.jpg',
  'RWS Tarot 15 Devil.jpg',
  'RWS Tarot 16 Tower.jpg',
  'RWS Tarot 17 Star.jpg',
  'RWS Tarot 18 Moon.jpg',
  'RWS Tarot 19 Sun.jpg',
  'RWS Tarot 20 Judgement.jpg',
  'RWS Tarot 21 World.jpg',
]

const tarotCards = [
  ['fool', 'The Fool', '광대', ['시작', '순수함', '모험'], '아직 정해지지 않은 길 위에서 가벼운 용기가 필요합니다.'],
  ['magician', 'The Magician', '마법사', ['의지', '창조', '자원'], '이미 손안에 있는 도구를 연결하면 현실이 움직입니다.'],
  ['priestess', 'The High Priestess', '여사제', ['직관', '비밀', '내면'], '지금은 소음보다 내면의 신호를 듣는 시간이 중요합니다.'],
  ['empress', 'The Empress', '여황제', ['풍요', '돌봄', '감각'], '성장은 밀어붙임보다 잘 돌보는 태도에서 열립니다.'],
  ['emperor', 'The Emperor', '황제', ['구조', '권위', '경계'], '명확한 기준과 경계가 상황을 안정시킵니다.'],
  ['hierophant', 'The Hierophant', '교황', ['전통', '배움', '신뢰'], '검증된 지혜나 멘토의 조언이 길을 밝힙니다.'],
  ['lovers', 'The Lovers', '연인', ['선택', '관계', '가치'], '마음이 진짜로 동의하는 선택을 확인해야 합니다.'],
  ['chariot', 'The Chariot', '전차', ['추진', '집중', '승리'], '흩어진 힘을 한 방향으로 모을 때 전진이 가능합니다.'],
  ['strength', 'Strength', '힘', ['용기', '인내', '부드러운 힘'], '강함은 제압보다 다정한 지속력으로 드러납니다.'],
  ['hermit', 'The Hermit', '은둔자', ['성찰', '거리두기', '지혜'], '잠시 물러나야 보이지 않던 답이 선명해집니다.'],
  ['wheel', 'Wheel of Fortune', '운명의 수레바퀴', ['전환', '흐름', '기회'], '흐름이 바뀌고 있으니 고정된 방식만 붙들 필요는 없습니다.'],
  ['justice', 'Justice', '정의', ['균형', '책임', '판단'], '감정보다 사실과 책임의 균형을 확인해야 합니다.'],
  ['hanged', 'The Hanged Man', '매달린 사람', ['멈춤', '관점 전환', '양보'], '지금의 정지는 실패가 아니라 시야를 바꾸는 초대입니다.'],
  ['death', 'Death', '죽음', ['종료', '변화', '재생'], '끝내야 새로 태어날 수 있는 것이 있습니다.'],
  ['temperance', 'Temperance', '절제', ['조율', '회복', '중용'], '극단 사이를 섞어 새로운 균형을 만들 때입니다.'],
  ['devil', 'The Devil', '악마', ['집착', '유혹', '패턴'], '나를 묶는 욕망이나 반복 패턴을 정직하게 봐야 합니다.'],
  ['tower', 'The Tower', '탑', ['붕괴', '충격', '해방'], '무너지는 것은 벌이 아니라 낡은 구조에서 풀려나는 과정일 수 있습니다.'],
  ['star', 'The Star', '별', ['희망', '치유', '영감'], '작은 믿음을 회복하면 다음 길이 다시 보입니다.'],
  ['moon', 'The Moon', '달', ['혼란', '무의식', '불확실'], '모든 것이 또렷하지 않아도 감정의 파도를 관찰할 수 있습니다.'],
  ['sun', 'The Sun', '태양', ['명료함', '기쁨', '활력'], '숨기지 않고 드러낼수록 상황이 밝아집니다.'],
  ['judgement', 'Judgement', '심판', ['각성', '부름', '재평가'], '오래 미뤄둔 선택 앞에서 깨어날 때입니다.'],
  ['world', 'The World', '세계', ['완성', '통합', '확장'], '한 주기가 닫히며 더 넓은 단계로 이동합니다.'],
].map(([id, name, korean, keywords, meaning], index) => ({
  id,
  index,
  name,
  korean,
  keywords,
  meaning,
  image: commonsImage(tarotImageFiles[index], 420),
}))

const spreadPositions = ['과거/원인', '현재 상황', '조언/해결']
const answers = [
  { label: '전혀 아니다', value: 1 },
  { label: '아니다', value: 2 },
  { label: '보통이다', value: 3 },
  { label: '그렇다', value: 4 },
  { label: '매우 그렇다', value: 5 },
]
const QUESTION_PAGE_SIZE = 5

const savedState = () => {
  try {
    return JSON.parse(localStorage.getItem('soulMirrorState') || '{}')
  } catch {
    return {}
  }
}

function encodeBase64Url(value) {
  const encoded = window.btoa(unescape(encodeURIComponent(JSON.stringify(value))))
  return encoded.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

function decodeBase64Url(value) {
  const padded = value.replaceAll('-', '+').replaceAll('_', '/') + '='.repeat((4 - (value.length % 4)) % 4)
  return JSON.parse(decodeURIComponent(escape(window.atob(padded))))
}

function hydrateSharedResult(payload) {
  if (!payload?.enneagramType || !Array.isArray(payload?.cardIds)) return null
  const enneagramType = String(payload.enneagramType)
  const selectedCards = payload.cardIds
    .map((cardId) => tarotCards.find((card) => card.id === cardId))
    .filter(Boolean)

  if (!enneagramTypes[enneagramType] || selectedCards.length !== 3) return null
  return { enneagramType, selectedCards }
}

function normalizeSelectedCards(cards) {
  if (!Array.isArray(cards)) return []
  return cards
    .map((card) => tarotCards.find((tarotCard) => tarotCard.id === card?.id))
    .filter(Boolean)
}

function getSharedResultFromUrl() {
  try {
    const result = new URLSearchParams(window.location.search).get('result')
    return result ? hydrateSharedResult(decodeBase64Url(result)) : null
  } catch {
    return null
  }
}

function createShareUrl(enneagramType, selectedCards) {
  const payload = {
    enneagramType,
    cardIds: selectedCards.map((card) => card.id),
  }
  const url = new URL(window.location.href)
  url.search = `?result=${encodeBase64Url(payload)}`
  url.hash = ''
  return url.toString()
}

function wrapCanvasText(context, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let currentLine = ''

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    if (context.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  })

  if (currentLine) lines.push(currentLine)
  return lines
}

function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  const lines = wrapCanvasText(context, text, maxWidth).slice(0, maxLines)
  lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight))
  return y + lines.length * lineHeight
}

function downloadResultImage(enneagramType, selectedCards, reading) {
  const type = enneagramTypes[enneagramType]
  const canvas = document.createElement('canvas')
  const scale = 2
  canvas.width = 1080 * scale
  canvas.height = 1350 * scale
  const context = canvas.getContext('2d')
  context.scale(scale, scale)

  const gradient = context.createLinearGradient(0, 0, 1080, 1350)
  gradient.addColorStop(0, '#25104f')
  gradient.addColorStop(0.42, '#17102f')
  gradient.addColorStop(1, '#0e2730')
  context.fillStyle = gradient
  context.fillRect(0, 0, 1080, 1350)

  context.fillStyle = 'rgba(244, 201, 93, 0.8)'
  for (let index = 0; index < 120; index += 1) {
    const x = (index * 97) % 1080
    const y = (index * 151) % 1350
    const size = index % 9 === 0 ? 2 : 1
    context.fillRect(x, y, size, size)
  }

  context.strokeStyle = 'rgba(244, 201, 93, 0.32)'
  context.lineWidth = 2
  context.strokeRect(60, 60, 960, 1230)

  context.fillStyle = '#f4c95d'
  context.font = '700 28px Georgia, serif'
  context.fillText('나를 비추는 운명', 100, 130)
  context.font = '700 16px sans-serif'
  context.fillText('TAROT X ENNEAGRAM', 100, 162)

  context.fillStyle = '#ffffff'
  context.font = '700 56px Georgia, serif'
  drawWrappedText(context, reading.headline, 100, 250, 880, 68, 2)

  context.fillStyle = '#c8b6ff'
  context.font = '400 27px sans-serif'
  drawWrappedText(context, `${enneagramType}유형 ${type.name} · ${type.animal}`, 100, 372, 880, 38, 2)

  const cardY = 470
  selectedCards.forEach((card, index) => {
    const x = 100 + index * 306
    context.fillStyle = 'rgba(18, 13, 36, 0.82)'
    context.strokeStyle = 'rgba(244, 201, 93, 0.55)'
    context.lineWidth = 2
    context.roundRect(x, cardY, 260, 250, 12)
    context.fill()
    context.stroke()

    context.fillStyle = '#f4c95d'
    context.font = '700 18px sans-serif'
    context.fillText(spreadPositions[index], x + 24, cardY + 42)
    context.fillStyle = '#ffffff'
    context.font = '700 32px Georgia, serif'
    context.fillText(card.korean, x + 24, cardY + 92)
    context.fillStyle = '#c8b6ff'
    context.font = '400 20px sans-serif'
    drawWrappedText(context, card.keywords.join(' · '), x + 24, cardY + 132, 210, 30, 3)
  })

  context.fillStyle = 'rgba(255, 255, 255, 0.07)'
  context.strokeStyle = 'rgba(255, 255, 255, 0.16)'
  context.roundRect(100, 790, 880, 330, 16)
  context.fill()
  context.stroke()

  context.fillStyle = '#ffffff'
  context.font = '400 28px sans-serif'
  let textY = drawWrappedText(context, reading.summary, 130, 852, 820, 42, 4)
  context.fillStyle = '#f4c95d'
  context.font = '700 28px sans-serif'
  textY = drawWrappedText(context, reading.solution, 130, textY + 42, 820, 42, 4)

  context.fillStyle = '#f4c95d'
  context.font = '700 26px sans-serif'
  drawWrappedText(context, reading.mantra, 100, 1215, 880, 38, 2)

  const link = document.createElement('a')
  link.download = `나를-비추는-운명-${Date.now()}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}

function createInitialScores() {
  return Object.fromEntries(Object.keys(enneagramTypes).map((type) => [type, 0]))
}

function shuffleQuestions(sourceQuestions) {
  const shuffled = [...sourceQuestions]
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
  }
  return shuffled
}

function isValidQuestionOrder(questionOrder) {
  return (
    Array.isArray(questionOrder) &&
    questionOrder.length === questions.length &&
    questionOrder.every((question) => question?.id && question?.text && question?.type)
  )
}

function calculateScores(questionOrder, testAnswers) {
  return questionOrder.reduce((nextScores, question) => {
    const value = testAnswers[question.id]
    if (value) {
      nextScores[question.type] += value
    }
    return nextScores
  }, createInitialScores())
}

function pickTopType(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]))[0]?.[0] || '1'
}

function generateReading(enneagramType, selectedCards) {
  const type = enneagramTypes[enneagramType]
  const [past, present, advice] = selectedCards
  const presentKeywords = present.keywords.join(', ')
  return {
    headline: `${type.name} 유형 통합 심리 리포트`,
    summary: `${type.essence}인 당신에게 현재 가장 크게 떠오른 심리 에너지는 ${present.korean}의 ${presentKeywords}입니다. ${present.meaning}`,
    origin: `${spreadPositions[0]} 카드 ${past.korean}은 최근 흐름의 배경에 '${past.keywords[0]}'의 주제가 깔려 있음을 보여줍니다. ${type.name} 유형의 장점인 ${type.gift}이 상황을 견디게 했지만, 동시에 ${type.shadow}이 선택의 폭을 좁혔을 가능성이 있습니다.`,
    current: `${spreadPositions[1]} 카드 ${present.korean}은 지금의 핵심 감정 상태입니다. 익숙한 반응으로 곧장 해결하려 하기보다, 카드가 말하는 '${present.keywords[1]}'을 통해 현재 상황을 조금 더 객관적으로 바라볼 필요가 있습니다.`,
    relationship: `관계에서는 상대의 말보다 그 말이 건드린 내 기준과 감정에 먼저 주의를 기울여보세요. ${type.name} 유형은 갈등을 해결하려는 힘이 크지만, 지금은 판단보다 표현의 순서가 더 중요합니다.`,
    work: `일과 선택의 문제에서는 ${advice.korean} 카드가 제안하는 '${advice.keywords[0]}'을 우선 기준으로 삼아보세요. 성과나 정답을 서두르기보다 지금 조정 가능한 한 가지 행동을 정하는 것이 현실적인 돌파구가 됩니다.`,
    solution: `${spreadPositions[2]} 카드 ${advice.korean}은 해결의 방향을 제안합니다. ${advice.meaning} ${type.adviceTone}`,
    mantra: `${type.animal}의 마음으로 기억할 문장: 오늘의 답은 '${advice.keywords[0]}' 안에 있습니다.`,
  }
}

function App() {
  const saved = savedState()
  const sharedResult = React.useMemo(() => getSharedResultFromUrl(), [])
  const savedSelectedCards = normalizeSelectedCards(saved.selectedCards)
  const canRestoreResult = saved.screen !== 'result' || (saved.enneagramType && savedSelectedCards.length === 3)
  const [screen, setScreen] = React.useState(sharedResult ? 'result' : canRestoreResult ? saved.screen || 'intro' : 'intro')
  const [scores, setScores] = React.useState(saved.scores || createInitialScores())
  const [questionOrder, setQuestionOrder] = React.useState(() =>
    isValidQuestionOrder(saved.questionOrder) ? saved.questionOrder : shuffleQuestions(questions),
  )
  const [pageIndex, setPageIndex] = React.useState(saved.pageIndex || 0)
  const [testAnswers, setTestAnswers] = React.useState(saved.testAnswers || {})
  const [enneagramType, setEnneagramType] = React.useState(sharedResult?.enneagramType || saved.enneagramType || null)
  const [selectedCards, setSelectedCards] = React.useState(sharedResult?.selectedCards || savedSelectedCards)

  React.useEffect(() => {
    localStorage.setItem(
      'soulMirrorState',
      JSON.stringify({ screen, scores, questionOrder, pageIndex, testAnswers, enneagramType, selectedCards }),
    )
  }, [screen, scores, questionOrder, pageIndex, testAnswers, enneagramType, selectedCards])

  const reset = () => {
    localStorage.removeItem('soulMirrorState')
    window.history.replaceState(null, '', window.location.pathname)
    setScreen('intro')
    setScores(createInitialScores())
    setQuestionOrder(shuffleQuestions(questions))
    setPageIndex(0)
    setTestAnswers({})
    setEnneagramType(null)
    setSelectedCards([])
  }

  const updateTestAnswer = (questionId, value) => {
    setTestAnswers((currentAnswers) => ({ ...currentAnswers, [questionId]: value }))
  }

  const goToNextTestPage = () => {
    const isLastPage = (pageIndex + 1) * QUESTION_PAGE_SIZE >= questionOrder.length
    if (isLastPage) {
      const nextScores = calculateScores(questionOrder, testAnswers)
      const result = pickTopType(nextScores)
      setScores(nextScores)
      setEnneagramType(result)
      setScreen('draw')
      return
    }

    setPageIndex((index) => index + 1)
  }

  const chooseCard = (card) => {
    if (selectedCards.some((selected) => selected.id === card.id) || selectedCards.length >= 3) return
    const next = [...selectedCards, card]
    setSelectedCards(next)
    if (next.length === 3) {
      window.setTimeout(() => setScreen('result'), 650)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-midnight text-white">
      <NightSky />
      <div className="relative z-10 min-h-screen">
        <TopBar reset={reset} screen={screen} />
        <AnimatePresence mode="wait">
          {screen === 'intro' && <Intro key="intro" onStart={() => setScreen('test')} />}
          {screen === 'test' && (
            <EnneagramTest
              key="test"
              pageIndex={pageIndex}
              questionOrder={questionOrder}
              testAnswers={testAnswers}
              onAnswer={updateTestAnswer}
              onNext={goToNextTestPage}
            />
          )}
          {screen === 'draw' && (
            <TarotDeck
              key="draw"
              enneagramType={enneagramType}
              selectedCards={selectedCards}
              onChoose={chooseCard}
            />
          )}
          {screen === 'result' && (
            <ResultView
              key="result"
              enneagramType={enneagramType}
              selectedCards={selectedCards}
              onReset={reset}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function TopBar({ reset, screen }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
      <button className="group flex items-center gap-3 text-left" onClick={reset} aria-label="처음으로">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-aureate/50 bg-aureate/10 text-aureate shadow-aura">
          <Sparkles size={18} />
        </span>
        <span>
          <span className="block font-display text-xl text-aureate">나를 비추는 운명</span>
          <span className="block text-xs uppercase tracking-[0.32em] text-violetMist/70">Tarot x Enneagram</span>
        </span>
      </button>
      {screen !== 'intro' && (
        <button
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/8 text-violetMist transition hover:border-aureate/60 hover:text-aureate"
          onClick={reset}
          title="다시 시작"
          aria-label="다시 시작"
        >
          <RotateCcw size={17} />
        </button>
      )}
    </header>
  )
}

function Intro({ onStart }) {
  return (
    <motion.section
      className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl items-center px-5 pb-12 lg:grid-cols-[1fr_0.95fr] lg:gap-10"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45 }}
    >
      <div className="max-w-2xl">
        <p className="mb-4 inline-flex rounded-full border border-aureate/30 bg-aureate/10 px-4 py-2 text-sm text-aureate backdrop-blur">
          마음의 혼란을 확신으로
        </p>
        <h1 className="font-display text-5xl leading-tight text-white sm:text-6xl lg:text-7xl">
          나를 비추는 운명
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-violetMist">
          에니어그램으로 당신의 깊은 성향을 읽고, 메이저 아르카나 3장으로 오늘의 흐름을 신비롭게 비춥니다.
        </p>
        <button
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-aureate px-6 py-4 font-bold text-midnight shadow-aura transition hover:-translate-y-0.5 hover:bg-[#ffd978]"
          onClick={onStart}
        >
          운명 확인하기 <ChevronRight size={19} />
        </button>
      </div>
      <div className="relative mx-auto mt-12 aspect-square w-full max-w-[520px] lg:mt-0">
        <motion.div
          className="absolute -right-4 -top-5 z-0 aspect-[4/5] w-44 overflow-hidden rounded-[8px] border border-aureate/30 bg-ink/70 shadow-card md:w-56"
          animate={{ y: [0, -8, 0], rotate: [4, 1, 4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            className="h-full w-full object-cover opacity-85 saturate-125"
            src={MAJOR_ARCANA_IMAGE}
            alt="Rider-Waite 메이저 아르카나 카드 모음"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/65 via-transparent to-aureate/10" />
        </motion.div>
        <AnimalRing />
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 h-48 w-32 -translate-x-1/2 -translate-y-1/2 rounded-[10px] border border-aureate/50 bg-[linear-gradient(145deg,#281b4d,#130f28_58%,#6945b8)] p-3 shadow-card"
          animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="mystic-card-face grid h-full place-items-center rounded-[8px] border border-aureate/35 bg-midnight/60">
            <svg className="mystic-sigil" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="8" />
              <path d="M50 12 L50 27 M50 73 L50 88 M12 50 L27 50 M73 50 L88 50" />
              <path d="M29 29 L39 39 M61 61 L71 71 M71 29 L61 39 M39 61 L29 71" />
              <path d="M26 50 C37 34 63 34 74 50 C63 66 37 66 26 50 Z" />
            </svg>
            <span className="font-display text-4xl text-aureate">FATE</span>
            <span className="text-[10px] font-bold tracking-[0.28em] text-violetMist">MIRROR ORACLE</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

function AnimalRing() {
  const types = Object.entries(enneagramTypes)
  const points = types
    .map(([, type], index) => {
      const angle = (index / types.length) * 360 - 90
      const radius = 42
      return {
        x: 50 + radius * Math.cos((angle * Math.PI) / 180),
        y: 50 + radius * Math.sin((angle * Math.PI) / 180),
        type,
      }
    })

  return (
    <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03]">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" aria-hidden="true">
        <polygon
          points={points.map((point) => `${point.x},${point.y}`).join(' ')}
          fill="none"
          stroke="rgba(244, 201, 93, 0.2)"
          strokeWidth="0.35"
        />
        {points.map((point, index) => (
          <line
            key={`${point.type.animal}-${index}`}
            x1="50"
            y1="50"
            x2={point.x}
            y2={point.y}
            stroke="rgba(200, 182, 255, 0.11)"
            strokeWidth="0.22"
          />
        ))}
      </svg>
      {types.map(([id, type], index) => {
        const { x, y } = points[index]
        return (
          <motion.div
            key={id}
            className="animal-node absolute grid h-[5.8rem] w-[5.8rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-aureate/25 bg-ink/75 text-center shadow-card backdrop-blur"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3 + index * 0.18, repeat: Infinity, ease: 'easeInOut' }}
            title={`${id}유형 ${type.animal}`}
          >
            <img className="h-14 w-14" src={animalConstellationImage(type.animal)} alt={`${type.animal} 별자리 이미지`} />
            <span className="mt-[-8px] text-[10px] font-semibold text-violetMist">{type.animal}</span>
          </motion.div>
        )
      })}
    </div>
  )
}

function EnneagramTest({ pageIndex, questionOrder, testAnswers, onAnswer, onNext }) {
  const start = pageIndex * QUESTION_PAGE_SIZE
  const currentQuestions = questionOrder.slice(start, start + QUESTION_PAGE_SIZE)
  const answeredCount = Object.keys(testAnswers).length
  const progress = (answeredCount / questionOrder.length) * 100
  const isPageComplete = currentQuestions.every((question) => testAnswers[question.id])
  const isLastPage = start + QUESTION_PAGE_SIZE >= questionOrder.length
  const pageTone = ['from-orchid/10', 'from-aureate/10', 'from-tealglow/10', 'from-ember/10'][pageIndex % 4]

  return (
    <motion.section
      className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-3xl flex-col justify-center px-5 pb-12"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-6 flex items-center justify-between text-sm text-violetMist">
        <span>Question {start + 1} - {Math.min(start + QUESTION_PAGE_SIZE, questionOrder.length)} / {questionOrder.length}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-aureate" animate={{ width: `${progress}%` }} />
      </div>
      <motion.div
        className={`rounded-[8px] border border-white/12 bg-gradient-to-br ${pageTone} to-white/[0.07] p-6 shadow-card backdrop-blur md:p-8`}
        key={pageIndex}
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: '100% 50%' }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aureate">Enneagram Diagnostic</p>
        <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">나에게 가까운 정도를 선택해주세요</h2>
        <div className="mt-7 grid gap-4">
          {currentQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              className="rounded-[8px] border border-white/12 bg-midnight/60 p-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <p className="text-base font-semibold leading-7 text-white md:text-lg">
                {start + index + 1}. {question.text}
              </p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {answers.map((answer) => {
                  const isSelected = testAnswers[question.id] === answer.value
                  return (
                    <button
                      key={answer.value}
                      className={`min-h-14 rounded-[8px] border px-2 text-sm font-semibold transition ${
                        isSelected
                          ? 'border-aureate bg-aureate text-midnight shadow-aura'
                          : 'border-white/12 bg-white/[0.05] text-violetMist hover:border-aureate/70 hover:bg-aureate/10 hover:text-white'
                      }`}
                      onClick={() => onAnswer(question.id, answer.value)}
                      title={answer.label}
                    >
                      <span className="block text-base">{answer.value}</span>
                      <span className="block text-[10px] leading-4 sm:text-xs">{answer.label}</span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-violetMist">
            현재 페이지 {currentQuestions.filter((question) => testAnswers[question.id]).length}/{currentQuestions.length}문항 완료
          </p>
          <button
            className="inline-flex items-center justify-center gap-3 rounded-full bg-aureate px-6 py-3 font-bold text-midnight shadow-aura transition enabled:hover:-translate-y-0.5 enabled:hover:bg-[#ffd978] disabled:cursor-not-allowed disabled:opacity-45"
            onClick={onNext}
            disabled={!isPageComplete}
          >
            {isLastPage ? '결과 계산하기' : '다음 문항'} <ChevronRight size={18} />
          </button>
        </div>
      </motion.div>
    </motion.section>
  )
}

function TarotDeck({ enneagramType, selectedCards, onChoose }) {
  const type = enneagramTypes[enneagramType]
  return (
    <motion.section
      className="mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-6xl flex-col justify-center px-5 pb-12"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aureate">{type.name} · {type.symbol}</p>
          <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">세 장의 카드를 선택하세요</h2>
        </div>
        <div className="flex gap-2">
          {spreadPositions.map((label, index) => (
            <div
              key={label}
              className={`rounded-full border px-4 py-2 text-sm ${
                selectedCards[index]
                  ? 'border-aureate/70 bg-aureate/15 text-aureate'
                  : 'border-white/12 bg-white/[0.05] text-violetMist'
              }`}
            >
              {index + 1}. {selectedCards[index]?.korean || label}
            </div>
          ))}
        </div>
      </div>
      <div className="relative min-h-[560px] overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-12 shadow-card md:min-h-[600px]">
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen"
          src={MAJOR_ARCANA_IMAGE}
          alt=""
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/55 via-ink/70 to-midnight/90" />
        <div className="absolute inset-x-0 bottom-5 mx-auto h-40 w-[80%] rounded-[50%] bg-aureate/10 blur-3xl" />
        <div className="relative mx-auto h-[500px] max-w-5xl">
          {tarotCards.map((card, index) => {
            const angle = -72 + index * (144 / (tarotCards.length - 1))
            const selectedIndex = selectedCards.findIndex((selected) => selected.id === card.id)
            const isSelected = selectedIndex >= 0
            return (
              <motion.button
                key={card.id}
                className="tarot-card absolute left-1/2 top-[54%] h-44 w-28 origin-bottom rounded-[10px] text-left"
                style={{ rotate: angle, x: '-50%', y: '-50%' }}
                initial={{ y: 80, opacity: 0 }}
                animate={{
                  y: isSelected ? -170 - selectedIndex * 8 : 0,
                  opacity: isSelected ? 1 : selectedCards.length >= 3 ? 0.35 : 1,
                  rotateY: isSelected ? 180 : 0,
                }}
                transition={{ type: 'spring', stiffness: 180, damping: 22, delay: index * 0.012 }}
                onClick={() => onChoose(card)}
                disabled={selectedCards.length >= 3 && !isSelected}
                aria-label={`${card.korean} 카드 선택`}
              >
                <div className="card-face card-back">
                  <span className="text-[10px] font-bold tracking-[0.22em] text-aureate">SOUL</span>
                  <span className="font-display text-4xl text-aureate">✦</span>
                  <span className="text-[10px] font-bold tracking-[0.22em] text-aureate">FATE</span>
                </div>
                <div className="card-face card-front">
                  <img className="absolute inset-0 h-full w-full object-cover" src={card.image} alt={`${card.korean} 타로 카드`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/88 via-transparent to-transparent" />
                  <div className="relative mt-auto p-3">
                    <span className="text-[10px] text-aureate">{String(card.index).padStart(2, '0')}</span>
                    <strong className="mt-1 block text-base leading-5 text-white">{card.korean}</strong>
                    <span className="block text-[10px] text-violetMist">{card.name}</span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

function ResultView({ enneagramType, selectedCards, onReset }) {
  const type = enneagramTypes[enneagramType]
  const reading = generateReading(enneagramType, selectedCards)
  const [shareStatus, setShareStatus] = React.useState('')
  const memorableOptions = [reading.mantra, reading.solution, reading.relationship]
  const issueOptions = ['관계에서 반복되는 갈등', '일/커리어 선택의 불안', '감정 표현의 어려움', '완벽주의와 자기비판']
  const [memorableSentence, setMemorableSentence] = React.useState(memorableOptions[0])
  const [focusIssues, setFocusIssues] = React.useState([])
  const [customIssue, setCustomIssue] = React.useState('')

  const handleSaveImage = () => {
    downloadResultImage(enneagramType, selectedCards, reading)
  }

  const handleShare = async () => {
    const shareUrl = createShareUrl(enneagramType, selectedCards)
    const shareData = {
      title: '나를 비추는 운명',
      text: `${enneagramType}유형 ${type.name}의 타로 리딩 결과`,
      url: shareUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        setShareStatus('공유 창을 열었어요.')
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl)
        setShareStatus('결과 링크를 복사했어요.')
      } else {
        window.prompt('결과 링크를 복사하세요.', shareUrl)
        setShareStatus('결과 링크를 만들었어요.')
      }
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setShareStatus('공유를 다시 시도해주세요.')
      }
    }
  }

  const toggleFocusIssue = (issue) => {
    setFocusIssues((currentIssues) =>
      currentIssues.includes(issue)
        ? currentIssues.filter((currentIssue) => currentIssue !== issue)
        : [...currentIssues, issue],
    )
  }

  const handleConsultation = () => {
    const issues = [...focusIssues, customIssue.trim()].filter(Boolean)
    const body = [
      '나를 비추는 운명 상담 신청',
      '',
      `에니어그램 결과: ${enneagramType}유형 ${type.name} (${type.animal})`,
      `선택 카드: ${selectedCards.map((card, index) => `${spreadPositions[index]}-${card.korean}`).join(', ')}`,
      '',
      `이 리포트에서 가장 마음에 남는 문장: ${memorableSentence}`,
      `지금 가장 다루고 싶은 관계/일 문제: ${issues.length ? issues.join(', ') : '아직 선택하지 않음'}`,
      '',
      '상담에서 더 자세히 나누고 싶은 내용을 적어주세요:',
    ].join('\n')

    window.location.href = `mailto:counseling@example.com?subject=${encodeURIComponent('나를 비추는 운명 상담 신청')}&body=${encodeURIComponent(body)}`
  }

  return (
    <motion.section
      className="mx-auto grid min-h-[calc(100vh-88px)] w-full max-w-6xl gap-8 px-5 pb-12 lg:grid-cols-[0.82fr_1.18fr]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4 }}
    >
      <aside className="self-start rounded-[8px] border border-white/12 bg-white/[0.06] p-6 shadow-card backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aureate">Your Enneagram</p>
        <h2 className="mt-4 font-display text-4xl text-white">{enneagramType}유형 · {type.name}</h2>
        <p className="mt-2 text-violetMist">{type.animal} / {type.symbol}</p>
        <p className="mt-5 leading-7 text-white/82">{type.essence}</p>
        <div className="mt-6 grid gap-3">
          {selectedCards.map((card, index) => (
            <div key={card.id} className="grid grid-cols-[56px_1fr] gap-4 rounded-[8px] border border-white/10 bg-midnight/60 p-3">
              <img className="h-20 w-14 rounded-[6px] object-cover" src={card.image} alt={`${card.korean} 타로 카드`} />
              <div>
                <p className="text-xs text-aureate">{spreadPositions[index]}</p>
                <p className="mt-1 font-semibold text-white">{card.korean}</p>
                <p className="mt-1 text-sm text-violetMist">{card.keywords.join(' · ')}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <article className="rounded-[8px] border border-aureate/20 bg-[rgba(25,19,45,0.78)] p-6 shadow-card backdrop-blur md:p-9">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aureate">Integrated Psychological Report</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-white md:text-5xl">{reading.headline}</h1>
        <p className="mt-5 text-lg leading-8 text-violetMist">{reading.summary}</p>
        <div className="mt-7 grid gap-3 rounded-[8px] border border-white/10 bg-white/[0.045] p-5 md:grid-cols-3">
          <ReportMetric label="성향" value={`${enneagramType}유형 ${type.name}`} />
          <ReportMetric label="현재 카드" value={selectedCards[1].korean} />
          <ReportMetric label="핵심 과제" value={selectedCards[2].keywords[0]} />
        </div>
        <div className="mt-8 grid gap-4">
          <ReadingBlock title="1. 현재 심리 배경" text={reading.origin} />
          <ReadingBlock title="2. 감정 상태와 무의식 메시지" text={reading.current} />
          <ReadingBlock title="3. 관계에서의 민감 포인트" text={reading.relationship} />
          <ReadingBlock title="4. 일과 선택의 처방" text={reading.work} />
          <ReadingBlock title="5. 오늘의 심리 처방전" text={reading.solution} />
        </div>
        <div className="mt-7 rounded-[8px] border border-aureate/30 bg-aureate/10 p-5 text-aureate">
          {reading.mantra}
        </div>
        <ConsultationBridge
          memorableOptions={memorableOptions}
          memorableSentence={memorableSentence}
          onMemorableChange={setMemorableSentence}
          issueOptions={issueOptions}
          focusIssues={focusIssues}
          onToggleIssue={toggleFocusIssue}
          customIssue={customIssue}
          onCustomIssueChange={setCustomIssue}
          onConsultation={handleConsultation}
        />
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            className="inline-flex items-center justify-center gap-3 rounded-full bg-aureate px-5 py-3 font-bold text-midnight shadow-aura transition hover:-translate-y-0.5 hover:bg-[#ffd978]"
            onClick={handleSaveImage}
          >
            <Download size={17} /> 이미지 저장
          </button>
          <button
            className="inline-flex items-center justify-center gap-3 rounded-full border border-aureate/45 bg-aureate/10 px-5 py-3 font-semibold text-aureate transition hover:border-aureate hover:bg-aureate/20"
            onClick={handleShare}
          >
            <Share2 size={17} /> 링크 공유
          </button>
          <button
            className="inline-flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-semibold text-white transition hover:border-aureate/60 hover:text-aureate"
            onClick={onReset}
          >
            <RotateCcw size={17} /> 다시 보기
          </button>
        </div>
        {shareStatus && <p className="mt-3 text-sm text-violetMist">{shareStatus}</p>}
      </article>
    </motion.section>
  )
}

function ReportMetric({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-aureate">{label}</p>
      <p className="mt-2 font-semibold text-white">{value}</p>
    </div>
  )
}

function ReadingBlock({ title, text }) {
  return (
    <section className="rounded-[8px] border border-white/10 bg-white/[0.045] p-5">
      <h3 className="font-semibold text-aureate">{title}</h3>
      <p className="mt-2 leading-7 text-white/82">{text}</p>
    </section>
  )
}

function ConsultationBridge({
  memorableOptions,
  memorableSentence,
  onMemorableChange,
  issueOptions,
  focusIssues,
  onToggleIssue,
  customIssue,
  onCustomIssueChange,
  onConsultation,
}) {
  return (
    <section className="mt-8 rounded-[8px] border border-aureate/25 bg-[rgba(244,201,93,0.08)] p-5">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aureate">Next Step</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">상담에서 이어서 다뤄볼 질문</h2>
      <div className="mt-5 grid gap-5">
        <fieldset>
          <legend className="font-semibold text-white">이 리포트에서 가장 마음에 남는 문장</legend>
          <div className="mt-3 grid gap-2">
            {memorableOptions.map((option) => (
              <label key={option} className="flex gap-3 rounded-[8px] border border-white/10 bg-midnight/55 p-3 text-sm leading-6 text-violetMist">
                <input
                  className="mt-1 accent-[#f4c95d]"
                  type="radio"
                  name="memorable-sentence"
                  checked={memorableSentence === option}
                  onChange={() => onMemorableChange(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="font-semibold text-white">지금 가장 다루고 싶은 관계/일 문제</legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {issueOptions.map((issue) => (
              <label key={issue} className="flex items-center gap-3 rounded-[8px] border border-white/10 bg-midnight/55 p-3 text-sm text-violetMist">
                <input
                  className="accent-[#f4c95d]"
                  type="checkbox"
                  checked={focusIssues.includes(issue)}
                  onChange={() => onToggleIssue(issue)}
                />
                <span>{issue}</span>
              </label>
            ))}
          </div>
          <textarea
            className="mt-3 min-h-24 w-full resize-y rounded-[8px] border border-white/10 bg-midnight/65 p-4 text-sm leading-6 text-white outline-none transition placeholder:text-violetMist/55 focus:border-aureate/70"
            value={customIssue}
            onChange={(event) => onCustomIssueChange(event.target.value)}
            placeholder="예: 승진 제안을 받아야 할지, 팀원과의 갈등을 어떻게 풀어야 할지 고민돼요."
          />
        </fieldset>
      </div>
      <button
        className="mt-5 inline-flex items-center justify-center rounded-full bg-aureate px-6 py-3 font-bold text-midnight shadow-aura transition hover:-translate-y-0.5 hover:bg-[#ffd978]"
        onClick={onConsultation}
      >
        상담 신청으로 이어가기
      </button>
    </section>
  )
}

function NightSky() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        className="absolute inset-0 h-full w-full object-cover opacity-55 saturate-150"
        src={MYSTIC_BACKGROUND_IMAGE}
        alt=""
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(141,92,246,0.28),transparent_28%),radial-gradient(circle_at_74%_22%,rgba(244,201,93,0.14),transparent_24%),linear-gradient(180deg,#120d24_0%,#19132d_52%,#0d1822_100%)]" />
      <div className="stars stars-one" />
      <div className="stars stars-two" />
      <div className="absolute right-[8vw] top-24 h-28 w-28 rounded-full bg-[radial-gradient(circle,#fff7d4_0%,#f7e7a2_34%,rgba(244,201,93,0.22)_56%,transparent_70%)] opacity-80 blur-[0.2px]" />
      <div className="absolute -bottom-40 left-1/2 h-96 w-[76rem] -translate-x-1/2 rounded-[50%] bg-tealglow/10 blur-3xl" />
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
