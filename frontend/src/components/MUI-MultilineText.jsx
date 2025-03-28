import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import GameDisplay from './GameDisplay'
import Movebar from './Movebar'

export default function MultilineTextFields() {
  const [formData, setFormData] = useState('');
  const [receivedData, setReceivedData] = useState(null);
  const [originalPGN, setOriginalPGN] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, "data": e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:8000/api/form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pgn: formData }),
    });

    const data = await response.json();

    if (response.ok && data.data) {
      setReceivedData(data.data);
      setOriginalPGN(data.original);
    } else {
      setReceivedData({ message: data.message || "Error submitting data" });
    }
  };

  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '35ch', textarea: { color: 'white' }, '& .MuiInputBase-root': { minHeight: '300px', alignItems: 'baseline' } } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-textarea"
          label=""
          value={formData.pgn}
          placeholder="Paste PGN here"
          required={true}
          multiline
          onChange={handleChange}
        />
      </div>
      <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>

      {receivedData && (
        <div>
          <h2>Received Data:</h2>
          <pre>{JSON.stringify(receivedData, null, 2)}</pre>
        </div>
      )}
      {originalPGN && (
          <div>
              <h2>PGN:</h2>
              {/* <pre>{JSON.stringify(originalPGN, null, 2)}</pre> */}
              <div class="analysis" style={{width: 300}}></div>
              <div class="analysis"><GameDisplay pgn={originalPGN} /></div>
              <div class="analysis"><Movebar data={originalPGN}/></div>
          </div>
      )}
    </Box>
  );
}