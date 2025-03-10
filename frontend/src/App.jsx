import { useState, useEffect } from 'react'
import './App.css'
import ColorTabs from './components/MUI-ColorTabs'
import axios from 'axios';

function App() {
  // const [data, setData] = useState([]);
  const endpoint = `${import.meta.env.VITE_API_URL}/posts/`;

  const fetchData = async () => {
    console.log(endpoint);
    console.log('fetching...');

    const response = axios.get(endpoint);
    console.log(response);

    const { data } = response;
    console.log(data);

    return data;
  }

  useEffect(() => {
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
