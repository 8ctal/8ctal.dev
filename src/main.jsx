import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { MotionPreferenceProvider } from './context/MotionPreference.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionPreferenceProvider>
        <App />
      </MotionPreferenceProvider>
    </BrowserRouter>
  </StrictMode>,
)
