import { useState } from 'react'
import { FiMessageCircle, FiX, FiSend } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your Vistas travel assistant. How can I help you plan your village adventure?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: 'Thank you for your message! Our team will get back to you soon with personalized recommendations.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-saffron to-terracotta rounded-full shadow-warm flex items-center justify-center text-white z-40"
      >
        <FiMessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-xl shadow-warm border border-gray-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-saffron to-terracotta text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white font-pacifico font-bold text-sm">V</span>
                  </div>
                  <div>
                    <h3 className="font-pacifico font-semibold text-lg">Vistas Assistant</h3>
                    <p className="text-sm opacity-90">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto h-64">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-saffron to-terracotta text-white'
                          : 'bg-gray-100 text-charcoal'
                      }`}
                    >
                      <p className="text-base font-source-serif">{message.text}</p>
                      <p className="text-sm opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-saffron focus:outline-none text-base font-source-serif"
                />
                <button
                  onClick={handleSend}
                  className="px-3 py-2 bg-gradient-to-r from-saffron to-terracotta text-white rounded-lg hover:shadow-warm transition-all"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatbotWidget
