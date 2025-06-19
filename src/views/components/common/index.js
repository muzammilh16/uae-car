import { styled } from '@mui/material/styles'
import MuiStep from '@mui/material/Step'
import { Box, Dialog } from '@mui/material'

export const Step = styled(MuiStep)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(5)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '& .MuiStepLabel-label': {
    cursor: 'pointer'
  }
}))

export const MasterBox = styled(Box)(({ theme }) => ({
  mt: 5,
  backgroundColor: '#fafafa',
  borderRadius: 1,
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    width: '5px' // adjust this value to make the scrollbar thinner
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc', // color of the scrollbar thumb
    borderRadius: '5px'
  }
}))

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

export const Logo = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(20)
  }
}))

export const ImageIcon = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  [theme.breakpoints.down('xl')]: {
    width: 48,
    height: 48
  },
  [theme.breakpoints.down('lg')]: {
    width: 48,
    height: 48
  },
  [theme.breakpoints.down('md')]: {
    width: 36,
    height: 36
  },
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32
  }
}))
