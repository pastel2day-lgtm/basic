/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'system-ui', 'sans-serif'],
        display: ['"Noto Serif KR"', 'serif'],
      },
      colors: {
        midnight: '#120d24',
        ink: '#19132d',
        orchid: '#8d5cf6',
        violetMist: '#c8b6ff',
        aureate: '#f4c95d',
        ember: '#ff8a5b',
        tealglow: '#6ee7d8',
      },
      boxShadow: {
        aura: '0 0 40px rgba(244, 201, 93, 0.25)',
        card: '0 18px 50px rgba(0, 0, 0, 0.38)',
      },
    },
  },
  plugins: [],
}
