import React from 'react';
/* Material-UI Components */
import { Modal, Box, Typography, Button } from '@mui/material';
import { modalStyle, descriptionStyle } from './CustomModalStyles';

const CustomModal = ({ open, handleClose, title, children }) => {
    return (
        <Modal
            /* Boolean that controls whether the modal is open or closed and function that runs when the modal is closed */
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-description" sx={descriptionStyle}>
                    {children}
                </Typography>
                <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    );
}

export default CustomModal;