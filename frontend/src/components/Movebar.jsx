import * as React from 'react';
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Movebar({ data }) {
    return (
        <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '35ch', textarea: { color: 'white', whiteSpace: 'wrap', minHeight: '600px' }, '& .MuiInputBase-root': { minHeight: '600px', alignItems: 'baseline' } } }}
      noValidate
      autoComplete="off"
    >
      <div>
        {/* <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue={ data }
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        /> */}
        <TextField
            id="outlined-textarea"
            label=""
            value={ data }
            spellcheck="false"
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change this to your desired color
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change this to your desired hover color
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Change this to your desired focused color
              },
            }}
            multiline
        />
        </div>
    </Box>
  );
}