// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'
import { extractRGB } from 'src/utility'

const Slider = () => {
  return {
    MuiSlider: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:not(.MuiSlider-vertical)': {
            height: 6
          },
          '&.MuiSlider-vertical': {
            width: 6
          },
          '&.MuiSlider-colorPrimary': {
            '& .MuiSlider-thumb.Mui-active': {
              boxShadow: `0 0 0 10px ${hexToRGBA(theme.palette.primary.main, 0.16)}`
            },
            '& .MuiSlider-thumbSizeSmall:hover, &.MuiSlider-sizeSmall .MuiSlider-thumb.Mui-focusVisible': {
              boxShadow: `0 0 0 6px ${hexToRGBA(theme.palette.primary.main, 0.16)}`
            },
            '& .MuiSlider-thumbSizeSmall.Mui-active': {
              boxShadow: `0 0 0 8px ${hexToRGBA(theme.palette.primary.main, 0.16)} !important`
            }
          },
          '&.MuiSlider-colorSecondary': {
            '& .MuiSlider-thumb.Mui-active': {
              boxShadow: `0 0 0 10px ${hexToRGBA(theme.palette.secondary.main, 0.16)}`
            },
            '& .MuiSlider-thumbSizeSmall:hover, &.MuiSlider-sizeSmall .MuiSlider-thumb.Mui-focusVisible': {
              boxShadow: `0 0 0 6px ${hexToRGBA(theme.palette.secondary.main, 0.16)}`
            },
            '& .MuiSlider-thumbSizeSmall.Mui-active': {
              boxShadow: `0 0 0 8px ${hexToRGBA(theme.palette.secondary.main, 0.16)} !important`
            }
          }
        }),
        rail: ({ theme }) => ({
          opacity: 1,
          backgroundColor: theme.palette.action.selected
        }),
        track: {
          border: 0
        },
        thumb: ({ theme }) => ({
          width: 14,
          height: 14,
          '&:before': {
            boxShadow: theme.shadows[3],
            border: `2px solid ${theme.palette.background.paper}`
          },
          '&:not(.Mui-active):after': {
            width: 30,
            height: 30
          },
          '&.Mui-active': {
            width: 19,
            height: 19,
            '&:before': {
              borderWidth: 3
            },
            '&:after': {
              width: 38,
              height: 38
            }
          }
        }),
        sizeSmall: {
          '&:not(.MuiSlider-vertical)': {
            height: 4
          },
          '&.MuiSlider-vertical': {
            width: 4
          }
        },
        thumbSizeSmall: ({ theme }) => ({
          width: 12,
          height: 12,
          '&:before': {
            boxShadow: theme.shadows[2]
          },
          '&:not(.Mui-active):after': {
            width: 24,
            height: 24
          },
          '&.Mui-active': {
            width: 14,
            height: 14,
            '&:before': {
              borderWidth: 2
            },
            '&:after': {
              width: 30,
              height: 30
            }
          }
        }),
        valueLabel: ({ theme }) => ({
          borderRadius: 4,
          padding: theme.spacing(1, 2),
          backgroundColor:
            theme.palette.mode === 'light'
              ? `rgba(${extractRGB(theme.palette.customColors.main)}, 0.9)`
              : hexToRGBA(theme.palette.customColors.trackBg, 0.9),
          '&:before': {
            display: 'none'
          },
          '& .MuiSlider-valueLabelCircle': {
            lineHeight: 'normal'
          }
        }),
        markLabel: ({ theme }) => ({
          color: theme.palette.text.disabled
        })
      }
    }
  }
}

export default Slider
