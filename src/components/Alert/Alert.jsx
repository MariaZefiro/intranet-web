import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const AlertAdmin = ({ open, message, onClose, severity }) => {
    console.log('Alert aberto:', open);
    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={onClose} sx={{ zIndex: 2000 }}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default AlertAdmin;
