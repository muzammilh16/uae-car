// ** MUI Imports
import Box from '@mui/material/Box'

// ** Footer Content Component
import FooterContent from './FooterContent'

const Footer = props => {
  // ** Props
  const { settings, footerStyles, footerContent: userFooterContent } = props

  // ** Vars
  const { skin, layout, footer, contentWidth } = settings
  if (footer === 'hidden') {
    return null
  }

  return (
    <Box
      component='footer'
      className='layout-footer'
      sx={{
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...(footer === 'fixed' && {
          bottom: 0,
          
          ...(layout === 'vertical'
            ? { px: [0, 0.2] }
            : {
                backgroundColor: theme => theme.palette.background.paper,
                ...(skin === 'bordered'
                  ? { borderTop: theme => `1px solid ${theme.palette.divider}` }
                  : { boxShadow: 16 })
              })
        }),
        ...footerStyles
      }}
    >
      <Box
        className='footer-content-container'
        sx={{
          px: 6,
          width: '100%',
          py: theme => theme.spacing(footer === 'fixed' && skin === 'bordered' ? 0 : 0),
          ...(contentWidth === 'boxed' && { '@media (min-width:1440px)': { maxWidth: 1440 } }),
          ...(layout === 'vertical' && {

            ...(footer === 'fixed' && { backgroundColor: theme => theme.palette.background.paper })
          }),
          ...(footer === 'fixed' && {
            ...(contentWidth === 'boxed' &&
              layout === 'vertical' && {
                '@media (min-width:1440px)': { maxWidth: theme => `calc(1440px - ${theme.spacing(6)} * 2)` }
              }),
            ...(layout === 'vertical' && {
              ...(skin === 'bordered'
                ? { border: theme => `1px solid ${theme.palette.divider}`, borderBottomWidth: 0 }
                : { boxShadow: 16 })
            })
          })
        }}
      >
        {userFooterContent ? userFooterContent(props) : <FooterContent />}
      </Box>
    </Box>
  )
}

export default Footer
