import React, { useState } from 'react'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

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

  return (
    <div className="container">
      <h1>She Can Foundation - Contact</h1>
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
    </div>
  )
}
