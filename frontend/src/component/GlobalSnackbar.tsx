import React from 'react';
import { Snackbar, Alert, AlertTitle } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../state/store';
import { hideSnackbar } from '../state/snackbarSlice';

const severityTitles: Record<string, string> = {
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
  success: 'Success',
};

const GlobalSnackbar = () => {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useAppSelector((state) => state.snackbar);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ mt: 6 }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="outlined"
        sx={{
          width: '360px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          backdropFilter: 'blur(8px)',
          py: '2px',
          backgroundColor:
            severity === 'error'
              ? 'rgba(253,237,237,0.97)'
              : severity === 'warning'
              ? 'rgba(255,244,229,0.97)'
              : severity === 'success'
              ? 'rgba(237,247,237,0.97)'
              : 'rgba(229,246,253,0.97)',
          '& .MuiAlert-icon': {
            fontSize: '1.5rem',
            alignItems: 'center',
          },
          '& .MuiAlert-message': {
            fontSize: '0.875rem',
          },
          '& .MuiAlertTitle-root': {
            fontWeight: 700,
            fontSize: '0.95rem',
          },
        }}
      >
        <AlertTitle>{severityTitles[severity]}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
