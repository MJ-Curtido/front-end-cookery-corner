import React, { useEffect, useRef } from 'react';
import CSS from './ImageUploader.module.css';
import { Button } from '@mui/material';

const ImageUploader = ({ images, setImages }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const files = event.target.files;

        convertImagesToBase64(files);
    };

    const convertImagesToBase64 = (files) => {
        const convertedImages = [];

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                convertedImages.push(base64);

                if (convertedImages.length === files.length) {
                    setImages([...images, ...convertedImages]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <div>
            <input type="file" id="image-input" accept="image/png, image/jpeg" multiple ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />

            <Button
                className={CSS.btn}
                variant="contained"
                color="secondary"
                onClick={() => {
                    fileInputRef.current.click();
                }}
            >
                Upload images
            </Button>
        </div>
    );
};

export default ImageUploader;
