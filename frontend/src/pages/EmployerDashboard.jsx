import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const EmployerDashboard = () => {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [form, setForm] = useState({ title: '', company: '', location: '', description: '', salary: '', type: 'Full-time' })
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!user || user.role !== 'employer') return navigate('/login')
    fetchMyJobs()
  }, [])

  const fetchMyJobs = async () => {
    try {
      const res = await axios.get('https://job-board-kvp0.onrender.com/api/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setJobs(res.data.filter(j => j.postedBy?._id === user.id))
    } catch (err) {
      console.error(err)
    }
  }

  const handlePost = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://job-board-kvp0.onrender.com/api/jobs', form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage('Job posted successfully!')
      setForm({ title: '', company: '', location: '', description: '', salary: '', type: 'Full-time' })
      fetchMyJobs()
    } catch (err) {
      setMessage('Error posting job')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://job-board-kvp0.onrender.com/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchMyJobs()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employer Dashboard</h1>
      <p style={styles.welcome}>Welcome, {user?.name}!</p>

      <div style={styles.card}>
        <h2 style={styles.subTitle}>Post a New Job</h2>
        {message && <p style={{ color: message.includes('success') ? 'green' : 'red', marginBottom: '1rem' }}>{message}</p>}
        <form onSubmit={handlePost} style={styles.form}>
          <input style={styles.input} placeholder="Job Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <input style={styles.input} placeholder="Company Name" value={form.company} onChange={e => setForm({...form, company: e.target.value})} required />
          <input style={styles.input} placeholder="Location" value={form.location} onChange={e => setForm({...form, location: e.target.value})} required />
          <input style={styles.input} placeholder="Salary (optional)" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
          <select style={styles.input} value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
          <textarea style={{...styles.input, height: '120px'}} placeholder="Job Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
          <button type="submit" style={styles.btn}>Post Job</button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subTitle}>My Posted Jobs ({jobs.length})</h2>
        {jobs.length === 0 ? <p>No jobs posted yet.</p> : jobs.map(job => (
          <div key={job._id} style={styles.jobRow}>
            <div>
              <p style={styles.jobTitle}>{job.title}</p>
              <p style={styles.jobInfo}>{job.company} • {job.location} • {job.type}</p>
            </div>
            <button onClick={() => handleDelete(job._id)} style={styles.deleteBtn}>Delete</button>
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
  card: { backgroundColor: 'white', borderRadius: '10px', padding: '2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '2rem' },
  subTitle: { fontSize: '1.3rem', marginBottom: '1.5rem', color: '#111827' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  input: { padding: '0.7rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem' },
  btn: { padding: '0.8rem', backgroundColor: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' },
  jobRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', borderBottom: '1px solid #e5e7eb' },
  jobTitle: { fontWeight: 'bold', color: '#111827' },
  jobInfo: { color: '#6b7280', fontSize: '0.9rem', marginTop: '0.3rem' },
  deleteBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer' }
}

export default EmployerDashboard