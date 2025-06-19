// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Context
import { useAuth } from "src/hooks/useAuth";
import { ERROR, TOAST_DURATION, TOAST_POSITION, UNAUTHORIZED } from "src/common/constants";
import { useDispatch, useSelector } from "react-redux";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
  "&:hover .MuiBox-root, &:hover .MuiBox-root svg": {
    color: theme.palette.primary.main,
  },
}));

const UserDropdown = (props) => {
  // ** Props
  const dispatch = useDispatch()
  const { settings } = props;

  // ** States
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null)


  // ** Hooks
  const router = useRouter();
  const { logout, user } = useAuth();
  // const { profileDetailsResponse } = useSelector((state) => state.myProfileStore);

  // ** Vars
  const { direction } = settings;



  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const styles = {
    px: 4,
    py: 1.75,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      mr: 2.5,
      fontSize: "1.5rem",
      color: "text.secondary",
    },
  };

  const handleLogout = () => {
    logout();
    handleDropdownClose();
  };


  return (
    <Fragment>
      <Badge
        overlap="circular"
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: "pointer" }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Avatar
          onClick={handleDropdownOpen}
          sx={{
            width: 38,
            height: 38,
            bgcolor: "primary.main",
            color: "white",
            fontSize: "20px",
          }}
          src={profileDetails?.profile_url || user?.intial_name}
        >
          {user?.intial_name || ""}
        </Avatar>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, mt: 4.75 } }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: direction === "ltr" ? "right" : "left",
        }}
      >
        <Box sx={{ py: 1.75, px: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Badge
              overlap="circular"
              //onClick={handleDropdownOpen}
              sx={{ ml: 2, cursor: "pointer" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "primary.main",
                  color: "white",
                  fontSize: "20px",
                }}
                src={profileDetails?.profile_url || user?.intial_name}
              >
                {user?.intial_name || ""}
                
              </Avatar>
            </Badge>
            <Box
              sx={{
                display: "flex",
                ml: 2.5,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {user && user?.username ? user?.username : ""}
              </Typography>
              <Typography variant="body2">
                {user && user?.designation ? user?.designation : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={() => {
          const POS_ID = window.localStorage.getItem('POS_ID');
          if (POS_ID) {
            router.push('/my-profile')
          } else {
            toast.error('The profile will be activated after the onboarding is completed.', {
              duration: TOAST_DURATION,
              position: TOAST_POSITION
            })
          }
          setAnchorEl(null)
        }}>
          <Box sx={styles}>
            <Icon icon="tabler:user-check" />
            My Profile
          </Box>
        </MenuItemStyled>
        <Divider sx={{ my: (theme) => `${theme.spacing(2)} !important` }} />
        <MenuItemStyled sx={{ p: 0 }} onClick={handleLogout}>
          <Box sx={styles}>
            <Icon icon="tabler:logout" />
            Sign Out
          </Box>
        </MenuItemStyled>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;
