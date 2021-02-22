import { createMuiTheme } from '@material-ui/core';
// import Monsterrat from './app/containers/fonts/Montserrat-Medium.ttf';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#20c997',
      contrastText: '#fff',
    },
    background: {
      default: '#303030',
      dark: '#272c34',
      contrastText: '#fff',
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
  overrides: {
    MuiTimelineItem: {
      missingOppositeContent: {
        '&:before': {
          display: 'none',
        },
      },
    },
  },
});
export default theme;
