/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        '2xl': '1920px',
      },
      colors: {
        'hero-bg': '#2d8cc4',
        'heading-bg': '#1a3a52',
        'gray-bg': '#f7f7f7',
        'blue-bg': '#1a3a52',
        'image-hd': '#4a8f3f',
        'dot': 'rgba(194, 194, 194, 1)',
        'text-primary': 'rgba(0,0,0,1)',
        'text-muted': '#666666',
        'text-frame2': '#54994B',
        'price-strikethrough': 'rgba(170,170,170,1)',
        'card-border': 'rgba(0,0,0,0.12)',
        'border-light': '#e0e0e0',
        'accordion-bg': '#fafafa',
        'content-body': '#444444',
        'content-muted': '#555555',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
        pp: ['Poppins', 'sans-serif'],
        rb: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        card: '4px',
      },
      spacing: {
        'slider-btn': '48px',
        'dot': '8px',
        'dot-active': '10px',
        'card-image': '710px',
        'hero-text-col': '640px',
        'heading-block-h': '278px',
        'card-h-mobile': '345px',
        'card-h-desktop': '758px',
        'card-img-w': '174px',
        'card-img-h-mobile': '276px', 
        'card-img-h-desktop': '710px',
      },
      boxShadow: {
        'card': '0 0 16.1px 0 rgba(0, 0, 0, 0.5)',
        'card-mobile': '0 0 16.1px 0 rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}