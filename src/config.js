import { createMuiTheme } from '@material-ui/core';

export const appName = 'League7';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    primary: {
      light: 'rgba(154, 156, 168, 1)',
      grey: 'rgba(154, 156, 168, 1)',
      main: 'rgba(30, 26, 27, 1)',
      dark: 'rgba(86, 89, 116, 1)',
      contrastText: '#fff',
    },
    secondary: {
      light: '#1890ff',
      main: '#186dd9',
      dark: '#185fba',
      contrastText: '#fff',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(9,40,39,0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
  },
});

const API_URL = 'https://beta4.next-game.app/api';
// const API_URL = 'http://api.local/api';

const config = {
  API_URL,
  OAUTH_REDIRECT_URL: `${API_URL}/socialite-redirect/:provider`,
  OAUTH_HANDLE_URL: `${API_URL}/socialite-handle`,
  theme,
};

export default config;
