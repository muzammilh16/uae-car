import React, { useContext } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   useMediaQuery,
//   Typography,
//   Grid,
//   Divider,
// } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Close, CloseRounded } from "@mui/icons-material";


import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useMediaQuery } from "@mui/system";

const CustomCloseButton = styled(IconButton)(({ theme }) => ({
  top: 0,
  right: 0,
  color: 'grey.500',
  position: 'absolute',
  boxShadow: theme.shadows[2],
  transform: 'translate(10px, -10px)',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: 'transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out',
  '&:hover': {
    transform: 'translate(7px, -5px)'
  }
}))

const CommonDialog = ({
  header,
  subHeader,
  content,
  actionFooter,
  open,
  onClose,
  hideClose,
  modalWidth,
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const router = useRouter();
  const theme = useTheme();

  const handleNavigation = (message, isRegistrationNumber) => {
    router.push("/car-enquiry");
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose();
        }
      }}
      maxWidth="md"
      fullWidth={false}
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh',      // Limit the height so it doesn't overflow
          height: 'auto',         // Let content determine the height
          overflowY: 'auto',      // Enable scrolling when content is taller
        },
      }}
      aria-labelledby="customized-dialog-title"
    >

      <DialogTitle id='customized-dialog-title' sx={{ p: 4 }}>
        <Typography variant="h5" component='span'
        >{header}</Typography>
        {subHeader &&
          <Typography variant="body2" component='span'
          >{subHeader}</Typography>
        }
        {!hideClose && (
          <CustomCloseButton aria-label='close' onClick={() => onClose()}>
            <Icon icon='tabler:x' fontSize='1.25rem' />
          </CustomCloseButton>
        )}
      </DialogTitle>
      <DialogContent dividers sx={{ p: theme => `${theme.spacing(4)} !important` }}>
        {content()}
      </DialogContent>

      {actionFooter && (
        <DialogActions sx={{ p: theme => `${theme.spacing(3)} !important` }}>
          {actionFooter(handleNavigation)}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CommonDialog;
