import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ColorTabs from './components/MUI-ColorTabs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Chess Analysis</h1>
      <ColorTabs></ColorTabs>
    </>
  )
}

export default App
