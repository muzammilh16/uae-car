import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Divider,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getStoredSettings } from "src/common/constants";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux'
import { actionAppSetting, actionGetAppSettingData } from "src/store/common";
import { Router, useRouter } from "next/router";

// Styled image component
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

const Navbar = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Mobile view breakpoint
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { appSettingData } = useSelector(state => state.commonStore)

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    // useEffect(() => {
    //     dispatch(actionAppSetting());
    //     dispatch(actionGetAppSettingData());
    // }, [])

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{ backgroundColor: "white", borderBottom: "1px solid #ddd" }}
        >
            <Toolbar
                sx={{
                    display: "flex",
                    justifyContent: isMobile ? "center" : "space-between", // Center for mobile, space-between for desktop
                    flexWrap: "wrap", // Allow content to wrap on smaller screens
                }}
            >
                {/* Left Section: Logo + Links */}
                <Box
                    display="flex"
                    alignItems="center"
                    gap={3}
                    flexGrow={!isMobile ? 1 : 0} // Make it grow only on larger screens
                    sx={{
                        justifyContent: isMobile ? "center" : "flex-start",
                        ml: isMobile ? 0 : 5, // Adjust left margin for mobile
                        width: isMobile ? "100%" : "auto", // Full width for mobile
                        mb: isMobile ? 2 : 0, // Margin bottom for mobile
                    }}
                >
                    {/* Logo */}
                    <Box display="flex" alignItems="center" gap={1}>
                        <Img
                            height={30}
                            alt="Logo"
                            src={appSettingData?.is_default === 0 &&
                                appSettingData?.logo_url ||
                                '/images/logo/logo.png'}
                                onClick={()=>router.push("/") }
                                style={{
                                    cursor: "pointer",}}
                        />
                    </Box>

                    {/* Vertical Divider (only for desktop view) */}
                    {!isMobile && (
                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{
                                alignSelf: "center",
                                height: "30px",
                                borderColor: "#ddd",
                                borderWidth: "1px",
                            }}
                        />
                    )}

                    {/* Navigation Links (only for desktop view) */}
                    {!isMobile && (
                        <Box display="flex" alignItems="center" gap={5}>
                            {/* {[{ text: "Home", url: appSettingData?.official_website }].map((item, index) => (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer" // Prevent security vulnerabilities
                                    style={{ textDecoration: "none" }} // Optional: remove underline from the link
                                >
                                    <Typography
                                        key={index}
                                        variant="body1"
                                        sx={{ color: "#333", cursor: "pointer" }}
                                    >
                                        {item.text}
                                    </Typography>
                                </a>
                            ))} */}
                        </Box>
                    )}
                </Box>

                {/* Right Section: Admin Login or Hamburger Menu */}
                {isMobile ? (
                    // Mobile: Show Hamburger Menu
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ position: "absolute", right: "16px" }} // Keeps menu button on the right
                        >
                            <MenuIcon sx={{ color: "#2E3B4E" }} />
                        </IconButton>

                        {/* Drawer for Mobile Menu */}
                        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                            <Box
                                sx={{
                                    width: 250,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%",
                                }}
                                role="presentation"
                                onClick={toggleDrawer(false)}
                                onKeyDown={toggleDrawer(false)}
                            >
                                {/* Close Button */}
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    p={2}
                                    sx={{ borderBottom: "1px solid #ddd" }}
                                >
                                    <Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }}>
                                        Menu
                                    </Typography>
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>

                                {/* Menu Links */}
                                <List>
                                    {[{ text: "Home", url: appSettingData?.official_website }].map((item, index) => (
                                        <ListItem key={index}>
                                            <a
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ textDecoration: "none", color: "inherit" }} // Optional: remove underline and preserve styling
                                            >
                                                <ListItemText primary={item.text} />
                                            </a>
                                        </ListItem>
                                    ))
                                    }
                                    <ListItem>
                                        <a href={appSettingData?.admin_panel_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                                            <Button variant="contained" fullWidth>
                                                Admin Login
                                            </Button>
                                        </a>
                                    </ListItem>
                                </List>
                            </Box>
                        </Drawer>
                    </>
                ) : (
                    // Desktop: Show Admin Login Button
                    null
                    // <a href={appSettingData?.admin_panel_url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    //     <Button variant="contained" sx={{ alignSelf: "center" }}>
                    //         Admin Login
                    //     </Button>
                    // </a>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
