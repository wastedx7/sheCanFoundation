import React, { useEffect, useState } from 'react'

export default function App() {
  const [mode, setMode] = useState('contact')

  // Contact form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  // Admin state
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminStatus, setAdminStatus] = useState('')
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('adminToken') || '')
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (mode === 'admin' && adminToken) {
      loadMessages(adminToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, adminToken])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const res = await fetch('http://localhost:8080/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      })
      const data = await res.json()
      setStatus(data.message || 'Form Submitted Successfully')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('Submission failed')
    }
  }

  async function adminLogin(e) {
    e.preventDefault()
    setAdminStatus('Validating...')

    try {
      const res = await fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminUsername, password: adminPassword })
      })

      if (!res.ok) {
        setAdminStatus('Invalid admin credentials')
        return
      }

      const data = await res.json()
      localStorage.setItem('adminToken', data.token)
      setAdminToken(data.token)
      setAdminStatus('Login successful')
      await loadMessages(data.token)
    } catch (err) {
      setAdminStatus('Admin login failed')
    }
  }

  async function loadMessages(token) {
    setAdminStatus('Loading messages...')
    try {
      const res = await fetch('http://localhost:8080/api/admin/messages', {
        method: 'GET',
        headers: {
          'X-Admin-Token': token
        }
      })

      if (!res.ok) {
        setAdminStatus('Unauthorized')
        return
      }

      const data = await res.json()
      setRows(data)
      setAdminStatus('')
    } catch (err) {
      setAdminStatus('Failed to load messages')
    }
  }

  function logout() {
    localStorage.removeItem('adminToken')
    setAdminToken('')
    setRows([])
    setAdminStatus('Logged out')
  }

  return (
    <div className="container">
      <div className="topbar">
        <h1>She Can Foundation</h1>
        <div className="tabs">
          <button className={mode === 'contact' ? 'active' : ''} onClick={() => setMode('contact')} type="button">
            Contact
          </button>
          <button className={mode === 'admin' ? 'active' : ''} onClick={() => setMode('admin')} type="button">
            Admin
          </button>
        </div>
      </div>

      {mode === 'contact' && (
        <>
          <h2>Contact</h2>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Name
              <input value={name} onChange={e => setName(e.target.value)} required />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
              Message
              <textarea value={message} onChange={e => setMessage(e.target.value)} required />
            </label>
            <button type="submit">Submit</button>
          </form>
          {status && <p className="status">{status}</p>}
        </>
      )}

      {mode === 'admin' && (
        <>
          <h2>Admin - Messages</h2>

          {!adminToken ? (
            <form onSubmit={adminLogin} className="form">
              <label>
                Username
                <input value={adminUsername} onChange={e => setAdminUsername(e.target.value)} required />
              </label>
              <label>
                Password
                <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
              </label>
              <button type="submit">Validate</button>
              {adminStatus && <p className="status">{adminStatus}</p>}
              <p className="hint">Use credentials: <b>admin</b> / <b>admin123</b></p>
            </form>
          ) : (
            <>
              <div className="admin-actions">
                <button type="button" className="secondary" onClick={logout}>Logout</button>
              </div>

              {adminStatus && <p className="status">{adminStatus}</p>}

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="empty">No messages yet.</td>
                      </tr>
                    ) : (
                      rows.map((r, idx) => (
                        <tr key={r.id ?? idx}>
                          <td>{r.name}</td>
                          <td>{r.email}</td>
                          <td className="msg">{r.message}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}

