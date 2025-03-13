import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

export default function MultilineTextFields() {
  const [inputData, setInputData] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });

      const result = await response.json();
      console.log(result);

    } catch (error) {
      console.error('Error', error);
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
          placeholder="Paste PGN here"
          required={true}
          multiline
          onChange={(e) => setInputData(e.target.value)}
        />
      </div>
      <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}