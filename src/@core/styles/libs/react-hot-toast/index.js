// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const ReactHotToast = styled(Box)(({ theme }) => {
  // ** Hook & Var
  const { settings } = useSettings()
  const { layout, navHidden } = settings

  return {
    '& > div': {
      left: `${theme.spacing(6)} !important`,
      right: `${theme.spacing(6)} !important`,
      bottom: `${theme.spacing(6)} !important`,
      top: layout === 'horizontal' && !navHidden ? '139px !important' : '75px !important',
      zIndex: useMediaQuery(theme.breakpoints.down('lg'))
        ? `${theme.zIndex.drawer - 1} !important`
        : `${theme.zIndex.drawer + 1} !important`
    },
    '& .react-hot-toast': {
      fontWeight: 400,
      letterSpacing: '0.14px',
      boxShadow: theme.shadows[4],
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      fontSize: theme.typography.body1.fontSize,
      background: theme.palette.background.paper,
      '&>:first-of-type:not([role])>:first-of-type': {
        width: 14,
        height: 14
      }
    }
  }
})

export default ReactHotToast
