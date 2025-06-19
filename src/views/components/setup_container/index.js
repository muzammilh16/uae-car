import { styled } from '@mui/material/styles'
import { Card } from '@mui/material'

export const SetupContainer = styled(Card)(({ theme }) => ({
  height: '80vh',
  borderRadius: 2,
  overflow: 'hidden',
  backgroundColor: 'white',
  padding: 3,
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '5px' // adjust this value to make the scrollbar thinner
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#ccc', // color of the scrollbar thumb
    borderRadius: '5px'
  }
}))
