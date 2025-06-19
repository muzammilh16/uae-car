// ** MUI Imports
import Box from '@mui/material/Box'

import { Typography } from '@mui/material'

const FormLabel = ({ label = '', required = false, labelProps }) => {


    return (

        <Box>
            <Typography variant='span' {...labelProps}>
                {label}
            </Typography>
            {
                required ?
                    <Typography sx={{ color: 'red', marginLeft: '2px' }} variant='span'>*</Typography>
                    :
                    <></>
            }
        </Box>

    )
}

export default FormLabel
