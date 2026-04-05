import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../../mme-playground/src/modules/credentials/credentials.css'
import '../../mme-playground/src/modules/catering/catering.css'
import '../../mme-playground/src/modules/guestlists/guestlists.css'
import '../../mme-playground/src/modules/assets/assets.css'
import '../../mme-playground/src/modules/forms/forms.css'
import '../../mme-playground/src/App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
