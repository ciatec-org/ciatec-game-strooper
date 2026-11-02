import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App.tsx'
import { cssVariables } from './theme/tokens.ts'
import './theme/global.css'

for (const [name, value] of Object.entries(cssVariables)) {
  document.documentElement.style.setProperty(name, value)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
