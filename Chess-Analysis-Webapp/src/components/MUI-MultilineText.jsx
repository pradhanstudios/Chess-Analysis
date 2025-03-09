import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '35ch', textarea: {color: 'white'}, '& .MuiInputBase-root': { minHeight: '300px', alignItems: 'baseline' } }}}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-textarea"
          label=""
          placeholder="Paste PGN here"
          multiline
        />
      </div>
    </Box>
  );
}