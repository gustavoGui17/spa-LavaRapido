import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import GlobalStyle from './assets/css/globalStyled.js'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle/>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3500}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="colored"
      toastStyle={{
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: 500,
      }}
    />
  </StrictMode>,
)
