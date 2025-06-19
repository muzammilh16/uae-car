// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { CircularProgress, IconButton } from '@mui/material'
import { Download as DownloadIcon } from '@mui/icons-material';
import { getFileType } from 'src/utility'

const ImagePreviewWithDialog = ({ opeen, title, subTitle, content, onConfirm, onCancel, loading = false, imageUrl }) => {
    // ** State
    const [open, setOpen] = useState(false)

    // Effect to open or close the dialog when the `opeen` prop changes
    useEffect(() => {
        setOpen(opeen)
    }, [opeen])


    const fileType = getFileType(imageUrl);
    const handleDownload = () => {
        const newWindow = window.open(imageUrl, '_blank'); // Opens the image in a new tab
        if (!newWindow) {
            alert('Popup blocked. Please allow popups for this site.');
        }
    };
    
    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        onCancel()
                    }
                }}
                aria-labelledby="custom-dialog-title"
                aria-describedby="custom-dialog-description"
            >
                {/* Dialog Title */}
                <DialogTitle id="custom-dialog-title">
                    <Typography variant="h6" component="span" fontWeight="bold" sx={{ display: 'block' }}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" component="span" sx={{ color: 'text.secondary', mt: 1 }}>
                        {subTitle}
                    </Typography>
                </DialogTitle>


                {/* Divider under the title */}
                <Divider />

                {/* Dialog Content */}
                <DialogContent
                    sx={{
                        textAlign: 'center',
                        position: 'relative',
                        backgroundColor: 'background.paper',
                        p: 2, // Padding for better spacing
                    }}
                >
                    {fileType === 'image' ? (
                        <img
                            src={imageUrl}
                            alt="Uploaded File"
                            style={{
                                maxWidth: '100%',
                                maxHeight: '400px',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for the image
                            }}
                        />
                    ) : fileType === 'pdf' ? (
                        <iframe
                            src={imageUrl}
                            title="PDF Preview"
                            style={{
                                width: '100%',
                                height: '400px',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for the PDF
                                border: 'none',
                            }}
                        />
                    ) : (
                        <Typography color="error">
                            Unsupported file type.
                        </Typography>
                    )}

                    {/* Download Button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly transparent background for visibility
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darker on hover
                            },
                            zIndex: 10,
                        }}
                        onClick={handleDownload}
                    >
                        <DownloadIcon fontSize="medium" />
                    </IconButton>
                </DialogContent>

                {/* Divider above the footer */}
                <Divider />

                {/* Dialog Actions (footer) */}
                <DialogActions>
                    <Button
                        onClick={() => { onCancel() }}
                        variant='contained'
                        color={'primary'}
                        xs>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default ImagePreviewWithDialog
