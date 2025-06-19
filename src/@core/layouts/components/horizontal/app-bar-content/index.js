// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'
import { getStoredSettings } from 'src/common/constants'
import { useSelector } from 'react-redux'

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginRight: theme.spacing(8)
}))

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("lg")]: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const AppBarContent = props => {
  // ** Props
  const { appBarContent: userAppBarContent, appBarBranding: userAppBarBranding } = props
  const { logo_url } = getStoredSettings();

  const { appSettingData } = useSelector(state => state.commonStore)


  // ** Hooks
  const theme = useTheme()

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {userAppBarBranding ? (
        userAppBarBranding(props)
      ) : (
        <LinkStyled href='/'>
          <Img
            height={20}
            width={50}
            alt="Logo"
            src={appSettingData?.is_default === 0 &&
              appSettingData?.logo_url ||
              '/images/logo/logo.png'}
            style={{ objectFit: 'contain' }}
          />
          {/* <Typography variant='h4' sx={{ ml: 2.5, fontWeight: 700, lineHeight: '24px' }}>
            {themeConfig.templateName}
          </Typography> */}
        </LinkStyled>
      )}
      {userAppBarContent ? userAppBarContent(props) : null}
    </Box>
  )
}

export default AppBarContent
