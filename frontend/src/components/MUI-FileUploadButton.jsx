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
        const fd = new FormData();
        for (var key of fd.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        fd.append('file', file);

        for (var key of fd.entries()) {
            console.log(key[0] + ', ' + key[1]);
            console.log(key[1]);
        }

        console.log(file);

        fetch('http://127.0.0.1:8000/api/form', {
            method: "POST",
            body: fd
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
