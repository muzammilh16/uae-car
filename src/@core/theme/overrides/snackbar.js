import { extractRGB } from "src/utility"

const Snackbar = skin => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(skin === 'bordered' && { boxShadow: 'none' }),
          backgroundColor: `rgb(${extractRGB(theme.palette.customColors.main)})`,
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black']
        })
      }
    }
  }
}

export default Snackbar
