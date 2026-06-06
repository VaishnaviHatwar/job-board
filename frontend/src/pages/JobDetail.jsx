import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'

const JobDetail = () => {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [resume, setResume] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get(`https://job-board-kvp0.onrender.com/api/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error(err))
  }, [id])

  const handleApply = async (e) => {
    e.preventDefault()
    if (!user) return navigate('/login')
    try {
      const formData = new FormData()
      if (resume) formData.append('resume', resume)
      await axios.post(`https://job-board-kvp0.onrender.com/api/applications/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      })
      setMessage('Applied successfully!')
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Error applying')
    }
  }

  if (!job) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{job.title}</h1>
        <p style={styles.company}>{job.company}</p>
        <div style={styles.tags}>
          <span style={styles.tag}>📍 {job.location}</span>
          <span style={styles.tag}>💼 {job.type}</span>
          {job.salary && <span style={styles.tag}>💰 {job.salary}</span>}
        </div>
        <h3 style={styles.subTitle}>Job Description</h3>
        <p style={styles.desc}>{job.description}</p>

        {user?.role === 'candidate' && (
          <form onSubmit={handleApply} style={styles.form}>
            <h3 style={styles.subTitle}>Apply Now</h3>
            {message && <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
            <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} style={styles.input} />
            <button type="submit" style={styles.btn}>Submit Application</button>
          </form>
        )}

        {!user && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p>Please login to apply</p>
            <button onClick={() => navigate('/login')} style={styles.btn}>Login to Apply</button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' },
  card: { backgroundColor: 'white', borderRadius: '10px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  title: { fontSize: '2rem', color: '#1d4ed8', marginBottom: '0.5rem' },
  company: { fontSize: '1.2rem', fontWeight: 'bold', color: '#374151', marginBottom: '1rem' },
  tags: { display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' },
  tag: { backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.9rem' },
  subTitle: { fontSize: '1.2rem', marginBottom: '0.8rem', color: '#111827' },
  desc: { color: '#6b7280', lineHeight: '1.7', marginBottom: '2rem' },
  form: { borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.7rem', border: '1px solid #d1d5db', borderRadius: '6px' },
  btn: { padding: '0.8rem', backgroundColor: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }
}

export default JobDetail