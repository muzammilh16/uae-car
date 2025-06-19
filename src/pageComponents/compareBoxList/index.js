import {
  AddCircleOutlined,
  AddOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { formatRuppee } from "src/utility";

const CompareBoxList = ({ setIsCompareSelected, isCompareSelected }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 1100px)");
  const isSmallScreen = useMediaQuery("(max-width: 1300px)");
  const router = useRouter();
  const handleCompare = () => {
    console.log(isCompareSelected, "data isCompareSelected");

    // if (typeof window != "undefined" && isCompareSelected.length > 1) {
    //   window.localStorage.setItem(
    //     "compareData",
    //     JSON.stringify(isCompareSelected)
    //   );
    //   // router.push("/compare-policies");
    // } else {
    //   alert("Please select at least two items to compare");
    //   window.localStorage.removeItem("compareData");
    // }
  };
  return (
    <Box
      sx={{
        minHeight: isMobile ? "250px" : "120px",
        borderTop: `1px solid ${theme.palette.primary}`,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[10],
        position: "fixed",
        bottom: isMobile ? "auto" : "0",
        top: isMobile ? "0" : "auto",
        width: "100%",

        // px: "10%",
      }}
    >
      <Tooltip title="Close" placement="top">
        <IconButton
          onClick={() => {
            setIsCompareSelected([]);
            if (typeof window != "undefined") {
              window.localStorage.removeItem("compareData");
            }
          }}
          sx={{ position: "absolute", top: 0, right: 0 }}
        >
          <CloseOutlined color="primary" />
        </IconButton>
      </Tooltip>
      <Grid
        container
        // justifyContent="center"
        // spacing={2}\
        my={isMobile ? 2 : 2}
        sx={{ height: isMobile ? "250px" : "120px" }}
        pl={isMobile ? 0 : 4}
        // px={isMobile ? 1 : 10}
        alignItems={"center"}
      >
        <Grid item xs={12} md={10}>
          <Grid container>
            {isCompareSelected.length === 0 ? (
              <Grid item xs={2}>
                <Box
                  sx={{
                    minHeight: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: isMobile ? theme.spacing(2) : theme.spacing(8),
                    border: `1px dashed ${theme.palette.primary.main}`,
                    borderRadius: theme.shape.borderRadius,
                    backgroundColor: theme.palette.background.default,
                  }}
                >
                  <AddOutlined />
                  <Typography variant="body1">Choose Plan</Typography>
                </Box>
              </Grid>
            ) : (
              isCompareSelected?.map((item, index) => (
                <Grid item xs={3} key={index}>
                  <Box
                    sx={{
                      minHeight: "100px",
                      display: "flex",
                      // justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: isMobile ? "column" : "row",
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: "3px",
                      backgroundColor: theme.palette.background.paper,
                      padding: theme.spacing(2),
                      mx: isMobile ? theme.spacing(2) : theme.spacing(4),
                      boxShadow: theme.shadows[1],
                      position: "relative",
                      "&:hover": {
                        boxShadow: theme.shadows[10],
                      },
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setIsCompareSelected((prev) =>
                          prev.filter((i) => i?.id !== item?.id)
                        );
                      }}
                      sx={{
                        position: "absolute",
                        top: isMobile ? -10 : 0,
                        right: isMobile ? -10 : 0,
                      }}
                    >
                      <CloseOutlined color="primary" />
                    </IconButton>
                    <img
                      src={item?.pjSubProductInsurerPlanPackages?.pjSubProductInsurerPlanDetails?.pjSubProductInsurerMapping?.logo_url}
                      alt={"no image"}
                      // height: "80px",
                      //     width: "120px",
                      height={isMobile ? 40 : isSmallScreen ? "60px" : "70px"}
                      width={isMobile ? 40 :  isSmallScreen ? "90px" :"100px"}
                    />
                    <Box sx={{ mx: "auto" }}>
                      <Typography variant="h6" fontSize={"1.2rem"}>
                        Premium
                      </Typography>
                      <Typography
                        variant="body1"
                        fontSize={"1.2rem"}
                        fontWeight={"bold"}
                      >
                        {formatRuppee(item?.total_premium)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))
            )}

            {isCompareSelected.length < 4 &&
              Array.from({ length: 4 - isCompareSelected.length }).map(
                (_, index) => (
                  <Grid item xs={3} key={`default-${index}`}>
                    <Box
                      sx={{
                        minHeight: "100px",
                        mx: isMobile ? theme.spacing(2) : theme.spacing(4),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        border: `1px dashed ${theme.palette.primary.main}`,
                        borderRadius: "3px",
                        backgroundColor: theme.palette.background.default,
                      }}
                    >
                      <AddCircleOutlined color="primary" fontSize="large" />
                      <Typography variant="body1">Choose Plan</Typography>
                    </Box>
                  </Grid>
                )
              )}
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          md={2}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Button variant="contained" color="primary" onClick={handleCompare}>
            Compare
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompareBoxList;
