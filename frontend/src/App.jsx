import { useState, useEffect } from 'react';
import './App.css';
import ColorTabs from './components/MUI-ColorTabs';
import axios from 'axios';

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/users");
    console.log(response.data.users);
    setArray(response.data.users);
  }

  useEffect(() => {
    fetchAPI();
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
