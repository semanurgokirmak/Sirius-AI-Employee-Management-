/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Bu satır önemli - dark mode'u class tabanlı olarak ayarlıyoruz
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        // Tailwind'in mavi tonlarını MUI primary tonlarıyla değiştirme
        blue: {
          50: '#EEF2FF',  // Açık ton
          100: '#E0E7FF', // Açık ton
          200: '#C7D2FE', // Açık ton
          300: '#A5B4FC', // Açık ton
          400: '#818CF8', // Orta ton
          500: '#6366F1', // Orta ton
          600: '#5D87FF', // MUI primary.main
          700: '#4B6CD9', // MUI primary.dark
          800: '#3730A3', // Koyu ton
          900: '#312E81', // Koyu ton
        },

        // Tailwind'in indigo tonlarını MUI secondary tonlarıyla değiştirme
        indigo: {
          50: '#E8F7FF',  // Açık ton
          100: '#CCEDFF', // Açık ton
          200: '#A5DBFF', // Açık ton
          300: '#7CCEFF', // MUI secondary.light
          400: '#63D4FF', // Açık orta ton
          500: '#49BEFF', // MUI secondary.main
          600: '#3A98CC', // MUI secondary.dark
          700: '#2C74A0', // Koyu ton
          800: '#1D4D6B', // Koyu ton
          900: '#0F2738', // Koyu ton
        },

        // Tailwind'in yeşil tonlarını MUI success tonlarıyla değiştirme
        green: {
          50: '#ECFDF5',  // Açık ton
          100: '#D1FAE5', // Açık ton
          200: '#A7F3D0', // Açık ton
          300: '#6EE7B7', // Açık ton
          400: '#50E5CA', // MUI success.light
          500: '#13DEB9', // MUI success.main
          600: '#0FB99C', // MUI success.dark
          700: '#047857', // Koyu ton
          800: '#065F46', // Koyu ton
          900: '#064E3B', // Koyu ton
        },

        // Tailwind'in kırmızı tonlarını MUI error tonlarıyla değiştirme
        red: {
          50: '#FFF1F0',  // Açık ton
          100: '#FFE4E0', // Açık ton
          200: '#FFCDC5', // Açık ton
          300: '#FFA58D', // MUI error.light
          400: '#FF8A72', // Açık orta ton
          500: '#FA896B', // MUI error.main
          600: '#D67058', // MUI error.dark
          700: '#B25646', // Koyu ton
          800: '#8A3C32', // Koyu ton
          900: '#672A24', // Koyu ton
        },

        // Tailwind'in sarı/turuncu tonlarını MUI warning tonlarıyla değiştirme
        amber: {
          50: '#FFFBEB',  // Açık ton
          100: '#FEF3C7', // Açık ton
          200: '#FDE68A', // Açık ton
          300: '#FCD34D', // Açık ton
          400: '#FFC14D', // MUI warning.light
          500: '#FFAE1F', // MUI warning.main
          600: '#DB9419', // MUI warning.dark
          700: '#A16207', // Koyu ton
          800: '#854D0E', // Koyu ton
          900: '#713F12', // Koyu ton
        },

        // Tailwind'in açık gri arka planı MUI light theme background'u ile değiştirme
        gray: {
          50: '#F2F6FA',  // MUI light theme background
          100: '#F3F4F6', // Düzenlenmiş gri tonları
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },

        // Dark mode arka plan renkleri
        dark: {
          background: '#15171d',
          paper: '#24262D',
          card: '#2C2C2C',
          border: '#373737',
        },
      },
      borderRadius: {
        md: '7px', // MUI card border radius
      },
      boxShadow: {
        card: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        'card-dark': 'rgba(0, 0, 0, 0.3) 0px 0px 10px 0px',
        input: '0 0 0 2px rgba(93, 135, 255, 0.25)',
        'input-error': '0 0 0 2px rgba(250, 137, 107, 0.25)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        slideIn: 'slideIn 0.4s ease-out',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}