/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        flyOut: {
          '0%': { transform: 'translate(0, 0)', opacity: '1' },
          '100%': {
            transform: `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25
              }px) scale(0.5)`,
            opacity: '0',
          },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        colors: {
          primary: 'rgb(0, 123, 255)',
        },
      },
      animation: {
        'fly-out': 'flyOut 0.5s ease-out forwards',
        'spin-slow': 'spin-slow 2s linear infinite',
        pulseSlow: 'pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

