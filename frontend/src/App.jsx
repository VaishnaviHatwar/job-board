import AiChatbot from './components/AiChatbot'
import { useAuth } from './context/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import JobListings from './pages/JobListings'
import JobDetail from './pages/JobDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import EmployerDashboard from './pages/EmployerDashboard'
import CandidateDashboard from './pages/CandidateDashboard'
import Navbar from './components/Navbar'

function App() {
   const { user } = useAuth()

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobListings />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
      </Routes>
      {(!user || user.role === 'candidate') && <AiChatbot />}
    </BrowserRouter>
  )
}

export default App