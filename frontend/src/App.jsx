import { useState, useEffect } from 'react';
import './App.css';
import ColorTabs from './components/MUI-ColorTabs';

function App() {
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
