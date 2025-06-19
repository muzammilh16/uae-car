// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { extractRGB } from 'src/utility'

const Backdrop = () => {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${extractRGB(theme.palette.customColors.main)}, 0.7)`
              : hexToRGBA(theme.palette.background.default, 0.7)
        }),
        invisible: {
          backgroundColor: 'transparent'
        }
      }
    }
  }
}

export default Backdrop
