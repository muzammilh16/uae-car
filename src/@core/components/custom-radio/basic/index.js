// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Typography from '@mui/material/Typography'

const CustomRadioBasic = props => {
  // ** Props
  const { name, data, selected, gridProps, handleChange, color = 'primary' } = props
  const { meta, title, value, content } = data

  const renderData = () => {
    if (meta && title && content) {
      return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              mb: 2,
              width: '100%',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between'
            }}
          >
            {typeof title === 'string' ? (
              <Typography sx={{ mr: 2 }} variant='h6'>
                {title}
              </Typography>
            ) : (
              title
            )}
            {typeof meta === 'string' ? <Typography sx={{ color: 'text.disabled' }}>{meta}</Typography> : meta}
          </Box>
          {typeof content === 'string' ? <Typography variant='body2'>{content}</Typography> : content}
        </Box>
      )
    } else if (meta && title && !content) {
      return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          {typeof title === 'string' ? (
            <Typography sx={{ mr: 2 }} variant='h6'>
              {title}
            </Typography>
          ) : (
            title
          )}
          {typeof meta === 'string' ? <Typography sx={{ color: 'text.disabled' }}>{meta}</Typography> : meta}
        </Box>
      )
    } else if (!meta && title && content) {
      return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {typeof title === 'string' ? <Typography sx={{ mb: 1, fontWeight: 500 }}>{title}</Typography> : title}
          {typeof content === 'string' ? <Typography variant='body2'>{content}</Typography> : content}
        </Box>
      )
    } else if (!meta && !title && content) {
      return typeof content === 'string' ? <Typography variant='body2'>{content}</Typography> : content
    } else if (!meta && title && !content) {
      return typeof title === 'string' ? <Typography sx={{ fontWeight: 500 }}>{title}</Typography> : title
    } else {
      return null
    }
  }

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
            alignItems: 'flex-start',
            border: theme => `1px solid ${theme.palette.divider}`,
            ...(selected === value
              ? { borderColor: `${color}.main` }
              : { '&:hover': { borderColor: theme => `rgba(${extractRGB(theme.palette.customColors.main)}, 0.25)` } })
          }}
        >
          <Radio
            name={name}
            size='small'
            color={color}
            value={value}
            onChange={handleChange}
            checked={selected === value}
            sx={{ mb: -2, mt: -2.5, ml: -2.75 }}
          />
          {renderData()}
        </Box>
      </Grid>
    )
  }

  return data ? renderComponent() : null
}

export default CustomRadioBasic
