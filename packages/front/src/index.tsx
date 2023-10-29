import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Game from './routes/Game'
import ReduxProviders from './redux/provider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ReduxProviders>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:slug' element={<Game />} />
        </Routes>
      </HashRouter>
    </ReduxProviders>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
