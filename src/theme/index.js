import { opacify } from 'polished';

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },
  defaultColorModeName: 'light',
  colors: {
    background: '#fff',
    grey: '#585858',
    inverseBackground: '#1c1c1c',
    shadow: opacify(0.19, '#000'),
    textDark: '#353535',
    text: '#353535',
    primary: '#ee424a',
    success: '#4CAF50',
    danger: '#f44336',
    warning: '#ffa000',
    modes: {
      dark: {
        background: '#1c1c1c',
        grey: '#9e9e9e',
        inverseBackground: '#fff',
        shadow: opacify(0.19, '#fff'),
        text: '#fff'
      }
    }
  },
  fontSizes: [0, 12, 14, 16, 20, 24, 32, 48, 64, 72],
  sizes: [0, 2, 4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
  shadows: {
    grey: 'rgba(0, 0, 0, 0.19) 0 0 10px 0px',
    greyInset: `inset rgba(0, 0, 0, 0.19) 0 0 10px 0px`,
    pink: '#e42974 0 0 3px',
    text: '0 0 rgba(0, 0, 0, 0.19)'
  },
  space: [0, 4, 8, 16, 24, 48, 96, 144, 192, 240]
};

export default theme;
