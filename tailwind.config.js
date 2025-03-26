/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '.dark'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'question-easy': 'var(--question-easy)',
        'question-easy-start': 'var(--question-easy-start)',
        'question-easy-end': 'var(--question-easy-end)',
        'question-easy-gradient': 'var(--question-easy-gradient)',
        'question-medium': 'var(--question-medium)',
        'question-medium-start': 'var(--question-medium-start)',
        'question-medium-end': 'var(--question-medium-end)',
        'question-medium-gradient': 'var(--question-medium-gradient)',
        'question-hard': 'var(--question-hard)',
        'question-hard-start': 'var(--question-hard-start)',
        'question-hard-end': 'var(--question-hard-end)',
        'question-hard-gradient': 'var(--question-hard-gradient)',
        'question-cp': 'var(--question-cp)',
        'question-cp-start': 'var(--question-cp-start)',
        'question-cp-end': 'var(--question-cp-end)',
        'question-cp-gradient': 'var(--question-cp-gradient)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}