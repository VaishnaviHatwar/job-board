import { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'

const Home = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('https://job-board-kvp0.onrender.com/api/jobs')
      .then(res => setJobs(res.data.slice(0, 6)))
      .catch(err => console.error(err))
  }, [])

  const handleSearch = ({ search, location }) => {
    axios.get(`https://job-board-kvp0.onrender.com/api/jobs?search=${search}&location=${location}`)
      .then(res => setJobs(res.data.slice(0, 6)))
  }

  return (
    <div>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find Your Dream Job</h1>
        <p style={styles.heroSub}>Thousands of jobs waiting for you</p>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Jobs</h2>
        <div style={styles.grid}>
          {jobs.length === 0 ? <p>No jobs posted yet.</p> : jobs.map(job => <JobCard key={job._id} job={job} />)}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/jobs" style={styles.btn}>View All Jobs</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  hero: { backgroundColor: '#1d4ed8', color: 'white', padding: '4rem 2rem', textAlign: 'center' },
  heroTitle: { fontSize: '2.5rem', marginBottom: '1rem' },
  heroSub: { fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 },
  section: { padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { fontSize: '1.8rem', marginBottom: '2rem', textAlign: 'center' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  btn: { backgroundColor: '#1d4ed8', color: 'white', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem' }
}

export default Home