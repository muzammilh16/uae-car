// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { getStoredSettings } from 'src/common/constants'
import { useSelector } from 'react-redux'

const StyledCompanyName = styled(Link)(({ theme }) => ({
  fontWeight: 500,
  textDecoration: 'none',
  color: `${theme.palette.primary.main} !important`
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: `${theme.palette.text.secondary} !important`,
  '&:hover': {
    color: `${theme.palette.primary.main} !important`
  }
}))



// Fetch primary font family from stored settings
const { pos_footer_content, is_default } = getStoredSettings();

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  const { appSettingData } = useSelector(state => state.commonStore)

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', height: 50 }}>
      <Typography sx={{ mr: 2, display: 'flex', color: 'text.secondary' }}>
        {appSettingData?.is_default === 0 && appSettingData?.pos_footer_content ? (
          appSettingData?.pos_footer_content
        ) : (
          <>
            {`© ${new Date().getFullYear()}, Powered `}
            <span>by Kaitotech</span>
          </>
        )}
      </Typography>

      {/* {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Typography target='_blank' component={LinkStyled} href='https://kaitotech.com/'>
            License
          </Typography>
          <Typography target='_blank' component={LinkStyled} href='https://kaitotech.com/'>
            More Themes
          </Typography>
          <Typography
            target='_blank'
            component={LinkStyled}
            href='https://demos.pixinvent.com/vuexy-nextjs-admin-template/documentation'
          >
            Documentation
          </Typography>
          <Typography target='_blank' component={LinkStyled} href='https://pixinvent.ticksy.com'>
            Support
          </Typography>
        </Box>
      )} */}
    </Box>
  )
}

export default FooterContent
