import React from 'react';
import { Provider } from 'react-redux';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ConnectedRouter } from 'connected-react-router';
import Navbar from './containers/Navbar';
import Routes from './routes';
import store, { history } from './reducers';
import { loggedIn } from './actions/auth';
import config from './config';
import './App.css';

const userData = localStorage.getItem('userData');
const userToken = localStorage.getItem('userToken');

if (userData && userToken) {
  store.dispatch(loggedIn({
    token: userToken,
    user: JSON.parse(userData),
  }));
}

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={config.theme}>
        <div className="App">
          <CssBaseline />
          <ConnectedRouter history={history}>
            <Navbar />
            <Routes />
          </ConnectedRouter>
        </div>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
