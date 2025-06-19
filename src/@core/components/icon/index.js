// ** Icon Imports
import { Icon } from '@iconify/react'
import { ImageIcon } from 'src/views/components/common'

const IconifyIcon = ({ icon, ...rest }) => {
  return <Icon icon={icon} fontSize='1.375rem' {...rest} />
}

export const IconPreview = ({ style, ...rest }) => {
  return <ImageIcon src='/images/icons/preview.png' alt='' style={style} {...rest} />
}

export default IconifyIcon
