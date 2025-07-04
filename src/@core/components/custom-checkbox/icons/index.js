// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const CustomCheckboxIcons = props => {
  // ** Props
  const { data, icon, name, selected, gridProps, iconProps, handleChange, color = 'primary' } = props
  const { title, value, content } = data

  const renderComponent = () => {
    return (
      <Grid item {...gridProps}>
        <Box
          onClick={() => handleChange(value)}
          sx={{
            p: 4,
            height: '100%',
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            position: 'relative',
            alignItems: 'center',
            flexDirection: 'column',
            border: theme => `1px solid ${theme.palette.divider}`,
            ...(selected.includes(value)
              ? {
                  borderColor: `${color}.main`,
                  '& svg': { color: theme => `${theme.palette.primary.main} !important` }
                }
              : { '&:hover': { borderColor: theme => `rgba(${extractRGB(theme.palette.customColors.main)}, 0.25)` } })
          }}
        >
          {icon ? <Icon icon={icon} {...iconProps} /> : null}
          {title ? (
            typeof title === 'string' ? (
              <Typography variant='h6' sx={{ ...(content ? { mb: 2 } : { my: 'auto' }) }}>
                {title}
              </Typography>
            ) : (
              title
            )
          ) : null}
          {content ? (
            typeof content === 'string' ? (
              <Typography variant='body2' sx={{ my: 'auto', textAlign: 'center' }}>
                {content}
              </Typography>
            ) : (
              content
            )
          ) : null}
          <Checkbox
            size='small'
            color={color}
            name={`${name}-${value}`}
            checked={selected.includes(value)}
            onChange={() => handleChange(value)}
            sx={{ mb: -2, ...(!icon && !title && !content && { mt: -2 }) }}
          />
        </Box>
      </Grid>
    )
  }

  return data ? renderComponent() : null
}

export default CustomCheckboxIcons
