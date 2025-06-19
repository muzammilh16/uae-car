import { Stack, Typography, useTheme } from "@mui/material";
import ReactHtmlParser from 'react-html-parser';
import CustomAvatar from 'src/@core/components/mui/avatar';

const EmptyContent = ({ imageUrl, title, subTitle, subTitleProps, containerProps }) => {
  const theme = useTheme()

  return (
    <Stack flexDirection={'column'} alignItems={'center'} mt={10} rowGap={2} {...containerProps}>
      {
        imageUrl && imageUrl.length > 0 ?
          <Stack>
            <CustomAvatar alt={""} src={imageUrl} sx={{ overFlow: 'hidden', borderRadius: 0, height: 300, width: 300 }} />
          </Stack>
          :
          <></>
      }
      {
        title ?
          <Stack><Typography variant='h5' color={theme.palette.action.disabled} >{title}</Typography></Stack>
          :
          <></>
      }
      {
        subTitle ?
          <Stack>
            {
              typeof subTitle === 'string' ?
                <Typography variant='subtitle2' color={theme.palette.action.disabled} {...subTitleProps}>{ReactHtmlParser(subTitle)}</Typography>
                :
                subTitle
            }
          </Stack>
          :
          <></>
      }

    </Stack>
  )
}

export default EmptyContent
