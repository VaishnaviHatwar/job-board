import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const CandidateDashboard = () => {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])

  useEffect(() => {
    if (!user || user.role !== 'candidate') return navigate('/login')
    axios.get('https://job-board-kvp0.onrender.com/api/applications/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setApplications(res.data))
      .catch(err => console.error(err))
  }, [])

  const getStatusColor = (status) => {
    const colors = { pending: '#f59e0b', reviewed: '#3b82f6', accepted: '#10b981', rejected: '#ef4444' }
    return colors[status] || '#6b7280'
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Candidate Dashboard</h1>
      <p style={styles.welcome}>Welcome, {user?.name}!</p>

      <div style={styles.card}>
        <h2 style={styles.subTitle}>My Applications ({applications.length})</h2>
        {applications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>No applications yet.</p>
            <Link to="/jobs" style={styles.btn}>Browse Jobs</Link>
          </div>
        ) : applications.map(app => (
          <div key={app._id} style={styles.appRow}>
            <div>
              <p style={styles.jobTitle}>{app.job?.title}</p>
              <p style={styles.jobInfo}>{app.job?.company} • {app.job?.location}</p>
            </div>
            <span style={{ ...styles.badge, backgroundColor: getStatusColor(app.status) }}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' },
  title: { fontSize: '2rem', color: '#1d4ed8', marginBottom: '0.5rem' },
  welcome: { color: '#6b7280', marginBottom: '2rem' },
  card: { backgroundColor: 'white', borderRadius: '10px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  subTitle: { fontSize: '1.3rem', marginBottom: '1.5rem', color: '#111827' },
  appRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' },
  jobTitle: { fontWeight: 'bold', color: '#111827' },
  jobInfo: { color: '#6b7280', fontSize: '0.9rem', marginTop: '0.3rem' },
  badge: { color: 'white', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' },
  btn: { backgroundColor: '#1d4ed8', color: 'white', padding: '0.7rem 1.5rem', borderRadius: '6px', fontWeight: 'bold' }
}

export default CandidateDashboard