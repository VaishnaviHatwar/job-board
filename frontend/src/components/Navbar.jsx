import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>JobBoard</Link>
      <div style={styles.links}>
        <Link to="/jobs" style={styles.link}>Jobs</Link>
        {!user ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.btn}>Register</Link>
          </>
        ) : (
          <>
            <Link to={user.role === 'employer' ? '/employer/dashboard' : '/candidate/dashboard'} style={styles.link}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#1d4ed8', color: 'white' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: 'white' },
  links: { display: 'flex', gap: '1rem', alignItems: 'center' },
  link: { color: 'white', fontSize: '1rem' },
  btn: { backgroundColor: 'white', color: '#1d4ed8', padding: '0.4rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }
}

export default Navbar