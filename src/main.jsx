import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Managerprofile from './managerprofile.jsx'
import Employerprofile from './employerprofile.jsx'
import Employerdashboard from './employerdashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
