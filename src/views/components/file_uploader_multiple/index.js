import { styled } from '@mui/material/styles'
import { Box, Typography, List, ListItem, Button } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { useDropzone } from 'react-dropzone'
import { extractRGB } from 'src/utility'

const UploadContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  margin: theme.spacing(2)
}))

const FileList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(2)
}))

const FileListItem = styled(ListItem)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(1)
}))

const FileUpload = ({ onFilesChange }) => {
  const { acceptedFiles, rejectedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: files => {
      onFilesChange(files)
    },
    accept: '.jpg, .jpeg, .png' // Allow specific image file extensions
  })

  return (
    <UploadContainer {...getRootProps()}>
      <input {...getInputProps()} />
      <Box
        sx={{
          mb: 2,
          width: 120, // Adjust the width
          height: 120, // Adjust the height
          display: 'flex',
          borderRadius: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme => `rgba(${extractRGB(theme.palette.customColors.main)}, 0.08)`
        }}
      >
        <Icon icon='tabler:upload' fontSize='2rem' /> {/* Adjust the fontSize */}
      </Box>
      <Typography variant='h6' mb={1}>
        Upload an Image
      </Typography>
      {rejectedFiles && rejectedFiles.length > 0 && (
        <Typography color='error' mb={2}>
          Only .jpg, .jpeg, .png files are allowed
        </Typography>
      )}
      <FileList>
        {acceptedFiles.map((file, index) => (
          <FileListItem key={index}>
            <img
              width={64} // Adjust the width
              height={64} // Adjust the height
              alt={file.name}
              src={URL.createObjectURL(file)}
            />
          </FileListItem>
        ))}
      </FileList>
    </UploadContainer>
  )
}

export default FileUpload
