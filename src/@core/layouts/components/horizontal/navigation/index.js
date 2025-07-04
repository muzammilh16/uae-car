// ** MUI Imports
import Box from '@mui/material/Box'

// ** Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Menu Components
import HorizontalNavItems from './HorizontalNavItems'

const Navigation = props => {
  return (
    <Box
      className='menu-content'
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        '& > *': {
          '&:not(:last-child)': { mr: 1 },
          ...(themeConfig.menuTextTruncate && { maxWidth: 200 })
        }
      }}
    >
      <HorizontalNavItems {...props} />
    </Box>
  )
}

export default Navigation
