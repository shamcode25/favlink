import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [links, setLinks] = useState([])
  const [linkName, setLinkName] = useState('')
  const [linkUrl, setLinkUrl] = useState('')

  // Load links from localStorage on mount
  useEffect(() => {
    const savedLinks = localStorage.getItem('favoriteLinks')
    if (savedLinks) {
      setLinks(JSON.parse(savedLinks))
    }
  }, [])

  // Save links to localStorage whenever links change
  useEffect(() => {
    localStorage.setItem('favoriteLinks', JSON.stringify(links))
  }, [links])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (linkName.trim() && linkUrl.trim()) {
      // Add http:// if no protocol is specified
      let url = linkUrl.trim()
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url
      }

      const newLink = {
        id: Date.now(),
        name: linkName.trim(),
        url: url
      }
      setLinks([...links, newLink])
      setLinkName('')
      setLinkUrl('')
    }
  }

  const handleRemove = (id) => {
    setLinks(links.filter(link => link.id !== id))
  }

  return (
    <div className="app">
      <h1>My Favorite Links</h1>
      <p className="description">Add a new link with a name and URL to the table!</p>
      
      {links.length > 0 && (
        <div className="links-table-container">
          <table className="links-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>URL</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {links.map(link => (
                <tr key={link.id}>
                  <td>{link.name}</td>
                  <td>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  </td>
                  <td>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemove(link.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="add-new-section">
        <h2>Add New</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="linkName">Link Name:</label>
            <input
              type="text"
              id="linkName"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              placeholder="Enter link name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="linkUrl">Link URL:</label>
            <input
              type="text"
              id="linkUrl"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="Enter link URL"
            />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App

