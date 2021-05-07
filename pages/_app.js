import Router from 'next/router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../components/Footer/Footer';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress
import '../styles/globals.css';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    fontFamily: [
      'Avenir Next',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
