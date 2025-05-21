
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider } from 'flowbite-react'
import { customTheme } from './utils/ThemeUtils.js'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={customTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
)
