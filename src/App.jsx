import './App.css'

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY
  const API_URL = import.meta.env.VITE_API_URL

  return (
    <>
      <h1>api key: {API_KEY}</h1>
      <h1>api url: {API_URL}</h1>
    </>
  )
}

export default App
