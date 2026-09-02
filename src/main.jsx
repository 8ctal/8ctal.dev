import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { MotionPreferenceProvider } from './context/MotionPreference.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionPreferenceProvider>
      <App />
    </MotionPreferenceProvider>
  </StrictMode>,
)
