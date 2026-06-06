import { useState } from 'react'
import axios from 'axios'

const AiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! 👋 I am your AI Job Assistant. Tell me about your skills and experience, and I will help you find the perfect job!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const conversationHistory = updatedMessages.filter(m => m.role !== 'system')
      const res = await axios.post('http://localhost:5000/api/ai/recommend', {
        message: input,
        conversationHistory: conversationHistory.slice(-6)
      })

      setMessages([...updatedMessages, { role: 'assistant', content: res.data.reply }])
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again!' }])
    }
    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div style={styles.wrapper}>
      {isOpen && (
        <div style={styles.chatbox}>
          <div style={styles.header}>
            <span>🤖 AI Job Assistant</span>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}>✕</button>
          </div>
          <div style={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} style={{ ...styles.message, ...(msg.role === 'user' ? styles.userMsg : styles.botMsg) }}>
                {msg.content}
              </div>
            ))}
            {loading && <div style={{ ...styles.message, ...styles.botMsg }}>Thinking... 🤔</div>}
          </div>
          <div style={styles.inputArea}>
            <input
              style={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tell me your skills..."
            />
            <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} style={styles.fab}>
        {isOpen ? '✕' : '🤖'}
      </button>
    </div>
  )
}

const styles = {
  wrapper: { position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 },
  fab: { width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#1d4ed8', color: 'white', border: 'none', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' },
  chatbox: { position: 'absolute', bottom: '70px', right: '0', width: '420px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', overflow: 'hidden' },
  header: { backgroundColor: '#1d4ed8', color: 'white', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold' },
  closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1rem', cursor: 'pointer' },
  messages: { height: '300px', overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  message: { padding: '0.7rem 1rem', borderRadius: '12px', maxWidth: '85%', fontSize: '0.9rem', lineHeight: '1.5' },
  userMsg: { backgroundColor: '#1d4ed8', color: 'white', alignSelf: 'flex-end', borderBottomRightRadius: '4px' },
  botMsg: { backgroundColor: '#f3f4f6', color: '#111827', alignSelf: 'flex-start', borderBottomLeftRadius: '4px' },
  inputArea: { display: 'flex', padding: '0.8rem', borderTop: '1px solid #e5e7eb', gap: '0.5rem' },
  input: { flex: 1, padding: '0.6rem', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.9rem' },
  sendBtn: { padding: '0.6rem 1rem', backgroundColor: '#1d4ed8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
}

export default AiChatbot