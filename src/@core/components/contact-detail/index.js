// ** this component use in client, add lead and edit lead
import { Button, Checkbox, Chip, CircularProgress, Divider, FormControlLabel, Grid, IconButton, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Icon from 'src/@core/components/icon';
import { IMAGES_SCREEN_NO_DATA } from 'src/common/constants';
import EmptyContent from '../empty_content';

const ContactDetails = (props) => {

  const { objData, contactDetailData } = props

  const [loading, setLoading] = useState(false)
  const [addContactOpen, setAddContactOpen] = useState(false)
  const [editContactOpen, setEditContactOpen] = useState(false)
  const [selectedCheckbox, setSelectedCheckbox] = useState([])
  const [clientProps, setClientProps] = useState(null)
  const [contactDetail, setContactDetail] = useState([])
  const [contactData, setContactData] = useState(null)

  useEffect(() => {
    if (objData && objData !== null) {
      setClientProps(objData)
    }
    if (contactDetailData && contactDetailData !== null) {
      setContactDetail(contactDetailData?.contact_details)
    }
    setLoading(false)
  }, [objData, contactDetailData])

  const togglePermission = id => {
    const arr = selectedCheckbox
    if (selectedCheckbox.includes(id)) {
      arr.splice(arr.indexOf(id), 1)
      setSelectedCheckbox([...arr])
    } else {
      arr.push(id)
      setSelectedCheckbox([...arr])
    }
  }

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12} sx={{ mt: 3 }}>
          <Stack flex={1} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} sx={{ mb: 2 }}>
            <Stack>
              <Typography variant='h5' color={theme => `${theme.palette.grey[700]}`}>
                Contact Information
              </Typography>
            </Stack>
            <Stack>
              <Button
                variant='contained'
                type='button'
                size='small'
                sx={{ height: 40, width: 40 }}
                onClick={() => {
                  setAddContactOpen(true)
                }}
              >
                <Icon icon='tabler:user-plus' />
              </Button>
            </Stack>
          </Stack>
          <Divider />
        </Grid>
        <Grid item xs={12} mt={5}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              border: 1,
              borderColor: '#DEDEDE'
            }}
          >
            {contactDetail && contactDetail !== null && contactDetail?.length > 0 ? (
              loading ? ( // Render loader if loading is true
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer component={Paper}>
                  <Table size='small' aria-label='a dense table'>
                    <TableHead>
                      <TableRow>
                        {objData === 'add-lead' && (
                          <TableCell></TableCell>
                        )}
                        <TableCell>Contact Person Name</TableCell>
                        <TableCell>Contact Mobile No</TableCell>
                        <TableCell colSpan={2}>Contact Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contactDetail.map((row, index) => {
                        const id = row.id;

                        return (
                          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 60 }}>
                            {objData === 'add-lead' && (
                              <TableCell>
                                <FormControlLabel
                                  sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
                                  control={
                                    <Checkbox
                                      size='small'
                                      id={`${id}-read`}
                                      onChange={() => togglePermission(`${id}-read`)}
                                      checked={selectedCheckbox.includes(`${id}-read`)}
                                    />
                                  }
                                />
                              </TableCell>
                            )}
                            <TableCell sx={{ fontSize: 15 }}>{row.contact_name}</TableCell>
                            <TableCell sx={{ fontSize: 15 }}>
                              {row.mobile_options.map((mobile, idx) => (
                                <Chip key={idx} label={mobile?.mobile_no} color='secondary' variant='outlined' icon={<Icon icon='tabler:brand-whatsapp' color={mobile?.is_whatsapp === 1 ? 'green' : 'grey'} />} sx={{ margin: '2px' }} />
                              ))}
                            </TableCell>
                            <TableCell sx={{ fontSize: 15 }}>
                              {row.emails.map((email, idx) => (
                                <Chip key={idx} label={email} color='secondary' variant='outlined' sx={{ margin: '2px' }} />
                              ))}
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => {
                                setEditContactOpen(true)
                                setContactData(row)
                              }}>
                                <Icon icon='tabler:edit' />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )
            ) : (
              <EmptyContent imageUrl={IMAGES_SCREEN_NO_DATA.NO_DATA_FOUND} title={'No Contact Found'} subTitle={''} />
            )}
          </Box>
        </Grid>
      </Grid>

    </>
  )
}

export default ContactDetails
