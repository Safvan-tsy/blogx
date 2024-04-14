import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'spin-reverse': 'spin-reverse 6s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(0deg)' }, // Pause for 10% of the animation
          '40%': { transform: 'rotate(360deg)' },
          '50%': { transform: 'rotate(360deg)' }, // Pause for 10% of the animation
          '60%': { transform: 'rotate(360deg)' }, // Pause for 10% of the animation
          '75%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' }, // Ensure the animation ends at the same point it starts
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['retro', 'dark'],
  },
};
export default config;
