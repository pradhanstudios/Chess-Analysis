import * as React from 'react';
import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LoadingBar from "react-top-loading-bar";
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
    const [receivedData, setReceivedData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        setLoading(true);
        const fd = new FormData();
        fd.append('file', file);

        const response = await fetch('http://127.0.0.1:8000/api/upload', {
            method: "POST",
            body: fd
        });

        const data = await response.json();

        if (response.ok && data.data) {
            setReceivedData(data.data);
        } else {
            setReceivedData({ message: data.message || "Error submitting data" });
        }
        setLoading(false);
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
            {loading && (
                <>
                <p>Processing Data</p>
                <LoadingBar
                    color="#f11946"
                    progress={85}
                />
                </>
            )}
            {receivedData && (
                <div>
                    <h2>Received Data:</h2>
                    <pre>{JSON.stringify(receivedData, null, 2)}</pre>
                </div>
            )}
        </>
    );
}
