import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RootCmp } from './RootCmp'
import { store } from './store/store'
import './assets/style/styles.scss'


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootCmp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

