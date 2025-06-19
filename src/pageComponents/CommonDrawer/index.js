import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import { Box, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

const CommonDrawer = ({
  children,
  open,
  onClose,
  width = '40%',
  variant = 'temporary',
  anchor = 'left',
  direction = 'ltr',
  fullScreen = false,
  Header,
  sx = {},
  actionSection
}) => {
  const theme = createTheme({
    direction
  });

  const drawerWidth = width;

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    position: 'sticky',
    top: 0,
    zIndex: 1
  }));

  const DrawerFooter = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    position: 'sticky',
    height:"100%",
    
    // width:"inherit",
    bottom: 0,
    zIndex: 1
  }));

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        sx={{
          // width: fullScreen ? '100%' : drawerWidth || '20rem',
          // minWidth: fullScreen ? '100%' : drawerWidth || '20rem',
          flexShrink: 0,
          overflowY: 'hidden',
          position:"relative",
          '& .MuiDrawer-paper': {
            width: fullScreen ? '100%' : drawerWidth ,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            overflowY: 'auto',
            // position:"relative",
            WebkitOverflowScrolling: 'touch',
            '&::-webkit-scrollbar': {
              width: 0
            },
            ...sx
          },
        }}
        variant={variant}
        open={open}
        onClose={onClose}
        anchor={anchor}
        ModalProps={{
          keepMounted: false,
          disableScrollLock: true,
          BackdropProps: {
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }}
        disableEnforceFocus
        disableRestoreFocus
        disableAutoFocus
        disableBackdropClick={fullScreen}
        disableEscapeKeyDown={fullScreen}
      >
        <DrawerHeader sx={{background:"inherit"}}>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1  ,px:3}}>
            {Header || 'Header'}
          </Typography>
          
          <IconButton onClick={onClose}>
            <CloseOutlined/>
            {/* {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />} */}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {children}
        <DrawerFooter sx={{background:"inherit"}}>
          {actionSection && (
            // <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              actionSection()
            // </Box>
          )}
        </DrawerFooter>
      </Drawer>
     </ThemeProvider>
  );
};

export default CommonDrawer;

