import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#EB5757',
      contrastText: '#fff',
    },
    primary: {
      main: '#3cb88c',
      contrastText: '#fff',
    },
    info: {
      main: '#E8E8E8',
    },
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
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
