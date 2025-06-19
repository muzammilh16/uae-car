// ** MUI Imports
import { Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material'

const AlertPopup = ({ open, handleConfirmClose, actionButtons, objData }) => {

    return (
        <Dialog
            open={open}
            onClose={handleConfirmClose}
        >
            <DialogTitle>
                <Typography fontWeight="bold">{objData?.title}</Typography>
            </DialogTitle>
            <Divider />
            <DialogContent>
                {objData?.text}
            </DialogContent>
            <DialogActions>
                {
                    actionButtons && actionButtons !== null ?
                        actionButtons
                        :
                        <></>
                }
            </DialogActions>
        </Dialog>
    )
}

export default AlertPopup
