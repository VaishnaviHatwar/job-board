import { Link } from 'react-router-dom'

const JobCard = ({ job }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{job.title}</h3>
        <span style={styles.badge}>{job.type}</span>
      </div>
      <p style={styles.company}>🏢 {job.company}</p>
      <p style={styles.info}>📍 {job.location}</p>
      {job.salary && <p style={styles.info}>💰 {job.salary}</p>}
      <p style={styles.desc}>{job.description?.substring(0, 100)}...</p>
      <Link to={`/jobs/${job._id}`} style={styles.btn}>View & Apply →</Link>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    border: '1px solid #e5e7eb'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.1rem',
    color: '#1d4ed8',
    fontWeight: 'bold'
  },
  badge: {
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  },
  company: {
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.95rem'
  },
  info: {
    color: '#6b7280',
    fontSize: '0.9rem'
  },
  desc: {
    color: '#9ca3af',
    fontSize: '0.85rem',
    lineHeight: '1.5'
  },
  btn: {
    marginTop: '0.5rem',
    backgroundColor: '#1d4ed8',
    color: 'white',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '0.95rem'
  }
}

export default JobCard