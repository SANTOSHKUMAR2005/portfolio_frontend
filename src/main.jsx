import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import ContextAPI from './context/ContextAPI.jsx'
import {ToastContainer} from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <ContextAPI>
  {/* <StrictMode> */}
    <ToastContainer/>
    <App />
  {/* </StrictMode>, */}
  </ContextAPI>
)
