
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'
import Box from "@mui/material/Box";
import { Fragment, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'

const Img = styled("img")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("lg")]: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const UploadedFilePreview = ({ url = null, title = "", handlePreview}) => {
    const [imageError, setImageError] = useState(false)

    return (
        <Fragment>
            <Box
                sx={{
                    width: 'fit-content',
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: "#ecf4dd",
                    padding: 0,
                    borderRadius: 2,
                    cursor: 'pointer',
                    my: 2,
                }}
            >
                <Box sx={{ padding: 1, borderRadius: 2, width: "fit-content", display: "flex", flexDirection: "column", gap: 0, justifyContent: "space-between", alignItems: "center", backgroundColor: "#d3e3b2" }}>
                    <Box
                        sx={{
                            width: 180,
                            height: 180,
                            display: 'flex',
                            borderRadius: 2,
                            m: 1,
                            alignItems: 'center',
                            backgroundColor: '#d3e3b2',
                            justifyContent: 'center',
                        }}
                    >
                        {imageError ? (
                            <Icon icon="tabler:file" fontSize="4rem" />
                        ) : (url) ?
                            <Img
                                height={180}
                                width={180}
                                alt="Uploaded Image"
                                src={url}
                                sx={{ borderRadius: 2 }}
                                onError={() => setImageError(true)}
                            /> :
                            <Icon icon="tabler:upload" fontSize="1.75rem" />
                        }
                    </Box>
                    <Box>
                        {url ? (
                            <>
                                <Button
                                    sx={{ cursor: "pointer", fontSize: "10px" }}
                                    variant='text'
                                    onClick={handlePreview}
                                >
                                    <Icon icon={"tabler:eye"} fontSize={16} />
                                    <Box ml={1}>Preview</Box>
                                </Button>
                                <Button
                                    sx={{ cursor: "pointer", fontSize: "10px" }}
                                    variant='text'
                                    onClick={() => {
                                        const newWindow = window.open(url, '_blank'); // Opens the image in a new tab
                                        if (!newWindow) {
                                            alert('Popup blocked. Please allow popups for this site.');
                                        }
                                    }}
                                >
                                    <Icon icon={"tabler:download"} fontSize={16} />
                                    <Box ml={1}>Download</Box>
                                </Button>
                            </>
                        ) : (
                            <></>
                        )}
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}

export default UploadedFilePreview
