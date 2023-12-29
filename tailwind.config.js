/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx, svg}'],
  theme: {
    extend: {
      backgroundImage: {
        'admin-login': "url('@/assets/image/screenLogin.png')",
        'login-logo': "url('@/assets/image/banner.png')",
        'download-excel': "url('@/assets/image/upload.png')",
        'bg-home': "url('@/assets/image/home.jpg')",
      },
      backgroundColor: {
        red: { primary: '#e50914', secondary: '#c11119' },
      },
      colors: {
        primary: '#d7d7d7',
        red: {
          primary: 'rgba(224, 59, 111, 1)',
          secondary: 'rgba(224, 59, 111, 1)',
          inactive: '#D9001B',
          active: '#4B7902',
          third: 'rgba(217, 0, 27, 1)',
          light: '#e03b2f',
          main: '#e50914',
          delete: '#e8001b',
          deleteHover: '#f8112c',
        },
        gray: {
          account: '#737373',
          primary: 'rgb(170 170 170)',
          secondary: 'rgba(0, 0, 0, 0.88)',
          disable: '#ebebeb',
        },

        blue: {
          primary: 'rgba(0, 0, 191, 1)',
          secondary: 'rgba(22, 155, 213, 1)',
          third: 'rgba(0, 191, 191, 1)',
          fouth: 'rgba(129, 211, 248, 1)',
          fifth: '#027db4',
          sixth: 'rgba(2, 125, 180, 1)',
          cancel: '#0958d9',
        },
        green: {
          primary: 'rgba(3, 157, 18, 1)',
          secondary: 'rgba(75, 121, 2, 1)',
          ok: '#0bb51c',
          okHover: '#0cc91f',
        },
        border: {
          primary: '#d7d7d7',
        },
        orange: {
          primary: '#ff8a00',
          secondary: '#FB8C0A',
        },
        violet: {
          primary: 'rgba(99, 0, 191, 1)',
        },
        yellow: {
          primary: '#fcb900',
        },
        brown: {
          primary: '#7f7f7f',
        },
        black: {
          primary: '#141414',
          main: '#0b0b0b',
        },
        whiteForm: '#ffffffc9',
      },
      fontFamily: {
        home: 'Calistoga',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // <== disable this!
  },
}
