// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { getStoredSettings } from 'src/common/constants'
import { useSelector } from 'react-redux'

const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  [theme.breakpoints.down('md')]: {},
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  }
}))

const FallbackSpinner = ({ sx }) => {
  // ** Hook
  const theme = useTheme()

  const { appSettingData } = useSelector(state => state.commonStore)


  // Fetch primary font family from stored settings
  const { logo_url, is_default } = getStoredSettings();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}>

      <Img height={100} alt="Logo" src={appSettingData?.is_default === 0 && appSettingData?.logo_url || '/images/logo/logo.png'} />
      <CircularProgress disableShrink sx={{ mt: 6 }} />

    </Box>
  )
}

export default FallbackSpinner
