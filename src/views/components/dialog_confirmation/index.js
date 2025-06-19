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
import { CircularProgress } from '@mui/material'

const CustomDialogConfirmation = ({ opeen, title, content, onConfirm, onCancel, loading = false }) => {
    // ** State
    const [open, setOpen] = useState(false)

    // Effect to open or close the dialog when the `opeen` prop changes
    useEffect(() => {
        setOpen(opeen)
    }, [opeen])


    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== 'backdropClick') {
                        handleClose()
                    }
                }}
                aria-labelledby="custom-dialog-title"
                aria-describedby="custom-dialog-description"
            >
                {/* Dialog Title */}
                <DialogTitle id="custom-dialog-title">
                    <Typography variant="h6" component="span" fontWeight="bold">
                        {title}
                    </Typography>
                </DialogTitle>

                {/* Divider under the title */}
                <Divider />

                {/* Dialog Content */}
                <DialogContent>
                    <DialogContentText id="custom-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>

                {/* Divider above the footer */}
                <Divider />

                {/* Dialog Actions (footer) */}
                <DialogActions>
                    <Button 
                        disabled={loading}
                    onClick={() => { onCancel();}}>
                        No
                    </Button>
                    <Button
                        onClick={() => { onConfirm() }}
                        disabled={loading}
                        color="primary" xs>
                        {loading ? <CircularProgress size={18} /> : 'Yes'}

                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default CustomDialogConfirmation
