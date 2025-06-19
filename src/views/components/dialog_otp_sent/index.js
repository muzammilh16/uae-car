// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Typography from '@mui/material/Typography'
import { Box, CircularProgress } from '@mui/material'
import { styled, useTheme } from "@mui/material/styles";


const Img = styled("img")(({ theme }) => ({
    position: "absolute",
    top: "-50px", // Move it upwards to be half outside
    left: "50%",
    zIndex: 1000,
    transform: "translate(-50%, 0)", // Center horizontally
}));


const OTPSent = ({ opeen, title, content, onConfirm, loading = false }) => {
    // ** State
    const [open, setOpen] = useState(false)

    // Effect to open or close the dialog when the `opeen` prop changes
    useEffect(() => {
        setOpen(opeen)
    }, [opeen])


    return (
        <Dialog
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    handleClose();
                }
            }}
            aria-labelledby="custom-dialog-title"
            aria-describedby="custom-dialog-description"
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '360px',
                    padding: '10px',
                    borderRadius: 4,
                    position: 'relative', // Needed for absolute positioning of the image
                    overflow: 'visible', // Ensure the image is not cut off
                },
            }}
        >
            <Img alt="Logo" src="/images/otp_sent.png" />

            {/* Dialog Title */}
            <DialogTitle id="custom-dialog-title" sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h5" fontWeight="bold">
                    {title}
                </Typography>
            </DialogTitle>

            {/* Dialog Content */}
            <DialogContent sx={{ textAlign: 'center', mt: -4 }}>
                <DialogContentText id="custom-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={18} /> : 'Ok'}
                </Button>
            </DialogActions>
        </Dialog>

    );

}

export default OTPSent
