import * as React from 'react';
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function InputFileUpload(handleFile) {
    const [file, setFile] = useState(null);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const data = new FormData();
        data.append('file', file);

        console.log(file);

        for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1]);
            console.log(key[1]);
        }


        fetch('http://127.0.0.1:8000/api/upload', {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => console.log(data));
    };

    return (
        <>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Choose PGN file
                <VisuallyHiddenInput
                    type="file"
                    onChange={handleChange}
                    multiple
                />
            </Button>

            <Button
                component="label"
                role={undefined}
                variant='contained'
                tabIndex={-1}
                onClick={handleUpload}
            >
                Upload file
            </Button>
            {file && <p>{file.name}</p>}
        </>
    );
}
