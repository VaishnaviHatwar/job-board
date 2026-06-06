import { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ search, location })
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input style={styles.input} placeholder="Job title..." value={search} onChange={e => setSearch(e.target.value)} />
      <input style={styles.input} placeholder="Location..." value={location} onChange={e => setLocation(e.target.value)} />
      <button type="submit" style={styles.btn}>Search</button>
    </form>
  )
}

const styles = {
  form: { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' },
  input: { padding: '0.7rem 1rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '1rem', minWidth: '200px' },
  btn: { padding: '0.7rem 2rem', backgroundColor: '#1d4ed8', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer', fontWeight: 'bold' }
}

export default SearchBar