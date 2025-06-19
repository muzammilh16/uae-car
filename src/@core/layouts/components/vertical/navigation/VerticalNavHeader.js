// ** Next Import
import Link from "next/link";

// ** MUI Imports
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Custom Icon Import
import Icon from "src/@core/components/icon";

// ** Configs
import themeConfig from "src/configs/themeConfig";

import { Stack } from "@mui/system";
import { getStoredSettings } from "src/common/constants";
import { useSelector } from "react-redux";

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingRight: theme.spacing(3.5),
  transition: "padding .25s ease-in-out",
  minHeight: theme.mixins.toolbar.minHeight,
}));

const HeaderTitle = styled(Typography)({
  fontWeight: 700,
  lineHeight: "24px",
  transition: "opacity .25s ease-in-out, margin .25s ease-in-out",
});

const LinkStyled = styled(Link)({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
});

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

const MenuItem = styled(Stack)(({ theme, selected }) => ({
  width: 200,
  height: 45,
  backgroundColor: selected ? "#1A2B60" : "#EBEBEB", // Change to gold when selected, otherwise default
  color: selected ? "#FFFFFF" : "#1A2B60", // Change to black when selected, otherwise white
  textAlign: "center",
  verticalAlign: "middle",
  borderRadius: 25,
  cursor: "pointer",
}));

const VerticalNavHeader = (props) => {
  // ** Props
  const {
    hidden,
    navHover,
    settings,
    saveSettings,
    collapsedNavWidth,
    toggleNavVisibility,
    navigationBorderWidth,
    menuLockedIcon: userMenuLockedIcon,
    navMenuBranding: userNavMenuBranding,
    menuUnlockedIcon: userMenuUnlockedIcon,
  } = props;

  // ** Hooks & Vars
  const theme = useTheme();
  const { appSettingData } = useSelector(state => state.commonStore)

  const { navCollapsed } = settings;
  const menuCollapsedStyles =
    navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 };

  const menuHeaderPaddingLeft = () => {
    if (navCollapsed && !navHover) {
      if (userNavMenuBranding) {
        return 0;
      } else {
        return (collapsedNavWidth - navigationBorderWidth - 34) / 8;
      }
    } else {
      return 6;
    }
  };
  const MenuLockedIcon = () =>
    userMenuLockedIcon || <Icon icon="tabler:circle-dot" />;
  const MenuUnlockedIcon = () =>
    userMenuUnlockedIcon || <Icon icon="tabler:circle" />;


  // Fetch primary font family from stored settings


  return (
    <MenuHeaderWrapper
      className="nav-header"
      sx={{ pl: menuHeaderPaddingLeft() }}
    >
      {userNavMenuBranding ? (
        userNavMenuBranding(props)
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: 'center'
            // justifyContent: "space-between",
          }}
        >
          <div>
            <LinkStyled href="/">
              <Img
                height={48}
                width={navCollapsed && !navHover ? 48 : 100}
                alt="Logo"
                src={appSettingData?.is_default === 0 && appSettingData?.logo_url || '/images/logo/logo.png'}
                style={{ objectFit: 'contain' }}
              />
              {/* <HeaderTitle
                variant="h4"
                sx={{
                  ...menuCollapsedStyles,
                  ...(navCollapsed && !navHover ? {} : { ml: 2 }),
                }}
              >
                POS Panel
              </HeaderTitle> */}
            </LinkStyled>
          </div>
        </Box>
      )}

      {hidden ? (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={toggleNavVisibility}
          sx={{
            p: 0,
            color: "text.secondary",
            backgroundColor: "transparent !important",
          }}
        >
          <Icon icon="tabler:x" fontSize="1.25rem" />
        </IconButton>
      ) : userMenuLockedIcon === null &&
        userMenuUnlockedIcon === null ? null : (
        <IconButton
          disableRipple
          disableFocusRipple
          onClick={() =>
            saveSettings({ ...settings, navCollapsed: !navCollapsed })
          }
          sx={{
            p: 0,
            color: "text.primary",
            backgroundColor: "transparent !important",
            "& svg": {
              fontSize: "1.25rem",
              ...menuCollapsedStyles,
              transition: "opacity .25s ease-in-out",
            },
          }}
        >
          {navCollapsed ? MenuUnlockedIcon() : MenuLockedIcon()}
        </IconButton>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
