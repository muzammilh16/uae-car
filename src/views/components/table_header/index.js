import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Icon from "src/@core/components/icon"; // Custom Icon Component
import Tab from "@mui/material/Tab";
import MuiTabList from "@mui/lab/TabList";
import { styled } from "@mui/material/styles";
import TabContext from "@mui/lab/TabContext";
import { useState } from "react";
import { hasPermission } from "src/utility";

const TabList = styled(MuiTabList)(({ theme }) => ({
  borderBottom: "0 !important",
  "&, & .MuiTabs-scroller": {
    boxSizing: "content-box",
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    minWidth: 65,
    minHeight: 38,
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.up("sm")]: {
      minWidth: 130,
    },
  },
}));

const TableHeader = (props) => {
  const {
    toggle,
    title,
    showLeftSection = false,
    handleTabChange,
    activeTab = false,
    isCreateAllowed = true,
    isAllUsersVisible = false,
    isMyTeamVisible = false,
    isMyUsersVisible = false,
    isMyTeamUsersVisible = false
  } = props;


  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const hideText = useMediaQuery((theme) => theme.breakpoints.down("sm"));


  return (
    <Box
      sx={{
        py: 2,
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row", // Stack vertically on small screens
        alignItems: isSmallScreen ? "flex-start" : "center", // Adjust alignment for small screens
        justifyContent: showLeftSection ? "space-between" : "flex-end", // Align based on left section visibility
        width: "100%",
        gap: isSmallScreen ? 2 : 0, // Add gap on small screens for spacing
      }}
    >
      {/* Left Side Tabs */}
      {showLeftSection && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Align tabs to the left
            gap: 2,
            width: isSmallScreen ? "100%" : "auto", // Full-width on small screens
          }}>

          <TabContext value={activeTab}>
            <TabList
              variant="scrollable"
              scrollButtons="auto"
              onChange={(event, newValue) => {
                handleTabChange(newValue)
              }}>
              {
                isAllUsersVisible &&
                <Tab
                  value="all"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ...(!hideText && { "& svg": { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:users" />
                      {!hideText && "All Users"}
                    </Box>
                  }
                />
              }
              {
                isMyTeamVisible &&
                <Tab
                  value="my_team"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ...(!hideText && { "& svg": { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:user-check" />
                      {!hideText && "My Team"}
                    </Box>
                  }
                />
              }

              {
                isMyUsersVisible &&
                <Tab
                  value="my"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ...(!hideText && { "& svg": { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:users" />
                      {!hideText && "My Users"}
                    </Box>
                  }
                />
              }

              {
                isMyTeamUsersVisible &&
                <Tab
                  value="team"
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ...(!hideText && { "& svg": { mr: 2 } }),
                      }}
                    >
                      <Icon fontSize="1.125rem" icon="tabler:users" />
                      {!hideText && "My Team's Users"}
                    </Box>
                  }
                />
              }

            </TabList>
          </TabContext>
        </Box>
      )}

      {/* Right Side: Create Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isSmallScreen ? "center" : "flex-end", // Center for small screens, right for large
          width: isSmallScreen ? "100%" : "auto", // Full-width on small screens
        }}
      >
        {isCreateAllowed && (
          <Button
            onClick={toggle}
            variant="contained"
            startIcon={<Icon fontSize="1.125rem" icon="tabler:plus" />}
          >
            {title}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TableHeader;


