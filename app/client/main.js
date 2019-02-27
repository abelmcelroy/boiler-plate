'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './storageConfig'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { Router } from 'react-router-dom'
import history from './history'
import Routes from './router'


const theme = createMuiTheme({
});

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </Provider>
  </Router>
  , document.getElementById('main')
);
