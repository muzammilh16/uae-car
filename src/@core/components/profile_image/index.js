import { Avatar } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

const ProfileImage = ({
  imageUrl,
  alt = '',
  sx = { width: 56, height: 56 },
  fontSize = '30',
  icon = 'tabler:user'
}) => {
  const theme = useTheme()

  return imageUrl && imageUrl.length > 0 ? (
    <CustomAvatar alt={alt} src={imageUrl} sx={{ ...sx }} />
  ) : (
    <Avatar
      sx={{
        ...sx,
        color: theme.palette.primary.light,
        background: theme.palette.tonalOffset.light
      }}
    >
      {/* <Icon fontSize={fontSize} icon={icon} /> */}
    </Avatar>
  )
}

export default ProfileImage
