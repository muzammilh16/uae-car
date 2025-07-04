// ** Util Imports
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { extractRGB } from 'src/utility'

const Chip = () => {
  return {
    MuiChip: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          fontWeight: 500,
          fontSize: theme.typography.body2.fontSize,
          ...(ownerState.size === 'medium' && {
            height: 30
          }),
          '&.MuiChip-rounded': {
            borderRadius: 4
          }
        }),
        outlined: ({ theme }) => ({
          '&.MuiChip-colorDefault': {
            borderColor: `rgba(${extractRGB(theme.palette.customColors.main)}, 0.2)`
          }
        }),
        labelSmall: ({ theme }) => ({
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5)
        }),
        deleteIcon: {
          width: 18,
          height: 18
        },
        avatar: ({ theme }) => ({
          color: theme.palette.text.primary
        }),
        deletableColorPrimary: ({ theme }) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.primary.main, 0.7),
            '&:hover': {
              color: theme.palette.primary.main
            }
          }
        }),
        deletableColorSecondary: ({ theme }) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.secondary.main, 0.7),
            '&:hover': {
              color: theme.palette.secondary.main
            }
          }
        }),
        deletableColorSuccess: ({ theme }) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.success.main, 0.7),
            '&:hover': {
              color: theme.palette.success.main
            }
          }
        }),
        deletableColorError: ({ theme }) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.error.main, 0.7),
            '&:hover': {
              color: theme.palette.error.main
            }
          }
        }),
        deletableColorWarning: ({ theme }) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.warning.main, 0.7),
            '&:hover': {
              color: theme.palette.warning.main
            }
          }
        }),
        deletableColorInfo: ({ theme }) => ({
          '&.MuiChip-light .MuiChip-deleteIcon': {
            color: hexToRGBA(theme.palette.info.main, 0.7),
            '&:hover': {
              color: theme.palette.info.main
            }
          }
        })
      }
    }
  }
}

export default Chip
