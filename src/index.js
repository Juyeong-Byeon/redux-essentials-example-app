import './index.css'

import App from './App'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { fetchUsers } from "./features/user/userSlice";
import store from './app/store'
import { worker } from './api/server'

// Start our mock API server
worker.start({ onUnhandledRequest: 'bypass' })
store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
