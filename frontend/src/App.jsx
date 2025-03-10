import { useState, useEffect } from 'react'
import './App.css'
import ColorTabs from './components/MUI-ColorTabs'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL)
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}posts`);
        if (!response.ok) {
          throw new Error('Network response NOT OK');
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [])

  return (
    <>
      <h1>Chess Analysis</h1>
      <div id="tabs">
        <ColorTabs></ColorTabs>
      </div>
    </>
  )
}

export default App
