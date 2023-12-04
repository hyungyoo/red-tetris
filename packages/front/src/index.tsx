import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './routes/Home'
import Game from './routes/Game'
import ReduxProviders from './redux/provider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ReduxProviders>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:slug' element={<Game />} />
      </Routes>
    </HashRouter>
  </ReduxProviders>
)
