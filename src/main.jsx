import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './assets/css/globalStyled.js'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle/>
    <App />
  </StrictMode>,
)
