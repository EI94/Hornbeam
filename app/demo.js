// pages/demo.js
import { useState } from 'react'

export default function Demo() {
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  // Funzione per chiamare l’API che genera un token
  const generateToken = async () => {
    setLoading(true)
    try {
      const res = await fetch('http://localhost:3001/api/generate-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      setToken(data.token)
    } catch (error) {
      console.error('Errore nella generazione del token:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Demo: Generazione Token</h1>
      <button 
        onClick={generateToken} 
        className="bg-blue-600 text-white py-2 px-4 rounded mb-4"
        disabled={loading}>
        {loading ? 'Generazione in corso...' : 'Genera Token'}
      </button>
      {token && (
        <div className="bg-white shadow p-4 rounded">
          <h2 className="text-xl font-bold">Token Generato:</h2>
          <p>{token}</p>
        </div>
      )}
    </div>
  )
}
