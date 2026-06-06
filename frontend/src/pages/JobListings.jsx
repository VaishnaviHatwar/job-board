import { useEffect, useState } from 'react'
import axios from 'axios'
import JobCard from '../components/JobCard'
import SearchBar from '../components/SearchBar'

const JobListings = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async (filters = {}) => {
    try {
      const search = filters.search || ''
      const location = filters.location || ''
      const res = await axios.get(`http://localhost:5000/api/jobs?search=${search}&location=${location}`)
      console.log('Jobs data:', res.data)
      setJobs(res.data)
      setLoading(false)
    } catch (err) {
      console.error('Error:', err)
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>All Job Listings</h1>
        <SearchBar onSearch={fetchJobs} />
      </div>
      <div style={styles.grid}>
        {loading ? <p>Loading...</p> : jobs.length === 0 ? <p>No jobs found.</p> : jobs.map(job => <JobCard key={job._id} job={job} />)}
      </div>
    </div>
  )
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem' },
  header: { marginBottom: '2rem', textAlign: 'center' },
  title: { fontSize: '2rem', marginBottom: '1.5rem', color: '#1d4ed8' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }
}

export default JobListings