import styled from "@emotion/styled";
import {
  ArrowBackOutlined,
  ArrowForward,
  CancelRounded,
  CheckCircleRounded,
  CloseRounded,
  InfoOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Paper,
  Tooltip,
  tooltipClasses,
  Typography,
  useTheme,
} from "@mui/material";

import { borderRadius, useMediaQuery } from "@mui/system";
import { useRouter } from "next/router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import Navbar from "src/views/components/navbar";

import CarDetailsSection from "src/pageComponents/carDetailsSection";
import { formatRuppee } from "src/utility";
import { defaultPoliciesCompareData } from "src/mockData/policiesData";
import data from "src/@fake-db/components/data";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000",
    color: "rgba(255, 254, 254, 0.87)",
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    cursor: "pointer",
  },
}));
const CarComparePage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");

  const theme = useTheme();
  const router = useRouter();
  const [carDetails, setCarDetails] = useState(null);
  const [compareDetails, setCompareDetails] = useState([]);
  const [policiesData, setPoliciesData] = useState({});

  useEffect(() => {
    if (typeof window != "undefined") {
      const getData = JSON.parse(window.localStorage.getItem("carEnquiry"));
      const registrationNumber = JSON.parse(
        window.localStorage.getItem("registrationNumber")
      );
      setCarDetails({ ...getData, registrationNumber });
      const getCompareData = JSON.parse(
        window.localStorage.getItem("compareData")
      );
      setCompareDetails(getCompareData);
      let newPoliciesData = defaultPoliciesCompareData;
      newPoliciesData = {
        ...newPoliciesData,
        "Plan details": newPoliciesData?.["Plan details"]?.map((item) => {
          const keysData = Object.keys(item);
          return {
            ...item,
            [keysData[0]]: {
              ...item?.[keysData[0]],
              data: getCompareData?.map((compareItem) => {
                let newValue = <>-</>;
                if (keysData[0] === "Insurance Company") {
                  newValue = (
                    <Typography
                      variant="body2"
                      fontSize={isMobile ? ".6rem" : ".85rem"}
                    >
                      {compareItem?.title}
                    </Typography>
                  );
                } else if (keysData[0] === "Plan Type") {
                  newValue = (
                    <Typography
                      variant="body2"
                      fontSize={isMobile ? ".6rem" : ".85rem"}
                    >
                      {compareItem?.partyType || "-"}
                    </Typography>
                  );
                } else if (keysData[0] === "Insured Declared Value (IDV)") {
                  newValue = (
                    <Typography
                      variant="body2"
                      fontSize={isMobile ? ".6rem" : ".85rem"}
                    >
                      {formatRuppee(getData?.IdvValue) || "-"}
                    </Typography>
                  );
                }
                return {
                  value: newValue,
                };
              }),
            },
          };
        }),
        "Add-On Covers": newPoliciesData?.["Add-On Covers"]?.map((item) => {
          const keysData = Object.keys(item);
          return {
            ...item,
            [keysData[0]]: {
              ...item?.[keysData[0]],
              data: getCompareData?.map((compareItem) => {
                let newValue = (
                  <Typography
                    variant="body2"
                    fontSize={isMobile ? ".6rem" : ".85rem"}
                  >
                    Not Selected
                  </Typography>
                );

                const findData = compareItem?.addOnsSelected?.find(
                  (item) =>
                    item?.title?.toLowerCase() === keysData[0]?.toLowerCase()
                );

                if (findData && !findData?.isStrike) {
                  newValue = (
                    <Tooltip arrow title="Covered">
                      <CheckCircleRounded color="success" />{" "}
                    </Tooltip>
                  );
                } else if (findData && findData?.isStrike) {
                  newValue = (
                    <Tooltip title="Not Covered" arrow>
                      <CancelRounded color="error" />{" "}
                    </Tooltip>
                  );
                }
                return {
                  value: newValue,
                };
              }),
            },
          };
        }),
        "Premium details": newPoliciesData?.["Premium details"]?.map((item) => {
          const keysData = Object.keys(item);
          return {
            ...item,
            [keysData[0]]: {
              ...item?.[keysData[0]],
              data: getCompareData?.map((compareItem) => {
                let newValue = (
                  <Typography
                    variant="body2"
                    fontSize={isMobile ? ".6rem" : ".85rem"}
                  >
                    NA
                  </Typography>
                );

                const findData = compareItem?.addOnsSelected?.find(
                  (item) =>
                    item?.title?.toLowerCase() === keysData[0]?.toLowerCase()
                );

                if (findData && !findData?.isStrike) {
                  newValue = (
                    <Typography
                      variant="body2"
                      fontSize={isMobile ? ".6rem" : ".85rem"}
                    >
                      {formatRuppee(findData?.price || 0)}
                    </Typography>
                  );
                }
                return {
                  value: newValue,
                };
              }),
            },
          };
        }),
        Discounts: newPoliciesData?.["Discounts"]?.map((item) => {
          const keysData = Object.keys(item);
          return {
            ...item,
            [keysData[0]]: {
              ...item?.[keysData[0]],
              data: getCompareData?.map((compareItem) => {
                let newValue = (
                  <Typography
                    variant="body2"
                    fontSize={isMobile ? ".6rem" : ".85rem"}
                  >
                    NA
                  </Typography>
                );

                const findData = compareItem?.addOnsSelected?.find(
                  (item) =>
                    item?.title?.toLowerCase() === keysData[0]?.toLowerCase()
                );

                if (findData && !findData?.isStrike) {
                  newValue = (
                    <Typography
                      variant="body2"
                      fontSize={isMobile ? ".6rem" : ".85rem"}
                    >
                      {formatRuppee(findData?.price || 0)}
                    </Typography>
                  );
                }
                return {
                  value: newValue,
                };
              }),
            },
          };
        }),

        Premium: newPoliciesData?.["Premium"]?.map((item) => {
          const keysData = Object.keys(item);
          return {
            ...item,
            [keysData[0]]: {
              ...item?.[keysData[0]],
              data: getCompareData?.map((compareItem) => {
                let newValue = (
                  <Typography
                    variant="body2"
                    fontSize={isMobile ? ".6rem" : ".85rem"}
                  >
                    NA
                  </Typography>
                );

                const findData = compareItem?.addOnsSelected?.find(
                  (item) =>
                    item?.title?.toLowerCase() === keysData[0]?.toLowerCase()
                );

                if (findData && !findData?.isStrike) {
                  newValue = (
                    <Typography
                      variant="body2"
                      fontSize={isMobile ? ".6rem" : ".85rem"}
                    >
                      {formatRuppee(findData?.price || 0)}
                    </Typography>
                  );
                }
                return {
                  value: newValue,
                };
              }),
            },
          };
        }),
      };
      setPoliciesData(newPoliciesData);
    }
  }, []);

  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Navbar />

      <Grid container justifyContent="center" spacing={0}>
        <Grid
          item
          xs={11}
          sm={10}
          lg={10}
          xl={9}
          md={11}
          sx={{
            position: isScrolling ? "fixed !important" : "static",
            top: -10,
            background: isScrolling
              ? theme.palette.background.default
              : theme.palette.background.default,
            borderRadius: isScrolling && 2,
            // borderBottom: isScrolling && 1,
            // borderColor: theme.palette.primary.main,
            // boxShadow: isScrolling && `1px 1px 6px ${theme.palette.primary.main}`,
            boxShadow: isScrolling && 3,
            py: isScrolling && 2,
            width: "100%",
            transition: "all 0.9s ease",
            transform: isScrolling ? "translateY(5px)" : "translateY(0)",
          }}
        >
          <CarDetailsSection carDetails={carDetails} hideEdit />
         
          <Grid container pt={4}>
            <Grid item xs={4} md={2}>
              <Button
                variant="contained"
                // color="secondary"
                size="small"
                sx={{ ml: 2 }}
                // sx={{border:1,borderColor:theme.palette.primary,color:"primary.main"}}
                startIcon={<ArrowBackOutlined />}
                onClick={() => {
                  router.back();
                  // if (typeof window != "undefined") {
                  //   window.localStorage.removeItem("compareData");
                  // }
                }}
              >
                Back
              </Button>
              {/* <Typography
                variant="h6"
                component="h6"
                sx={{ textDecoration: "underline" ,fontSize:".8rem"}}
                color="primary"
              >
                All prices are excluding GST
              </Typography> */}
            </Grid>
            <Grid item xs={8} md={10}>
              <Grid container spacing={4}>
                {compareDetails?.map((item, index) => (
                  <Grid
                    item
                    // xs={4}
                    key={index}
                    xs={
                      compareDetails?.length === 2
                        ? 6
                        : compareDetails?.length === 3
                        ? 4
                        : 3
                    }
                  >
                    <Card
                      key={index}
                      sx={{
                        boxShadow: theme.shadows[10],
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.paper,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2,

                        // m: 2,
                        maxHeight: "11rem",
                        width: "100%",
                        gap: 2,
                      }}
                    >
                      {/* <CardContent> */}
                      <img
                        src={item?.icon}
                        alt="car"
                        style={{
                          width:
                            compareDetails?.length === 2
                              ? "20%"
                              : compareDetails?.length === 4
                              ? "40%"
                              : "30%",
                          height: "20%",
                          objectFit: "contain",
                        }}
                      />
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{ fontWeight: "bold", fontSize: "1rem" }}
                      >
                        {formatRuppee(item?.price)}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => console.log("Book Now")}
                        size="small"
                        endIcon={<ArrowForward />}
                      >
                        Proceed to Buy
                      </Button>
                      {/* </CardContent> */}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* </Grid> */}
        <Grid item xs={11} sm={10} lg={10} xl={9} md={11}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {policiesData?.["Plan details"] && (
                <Grid container mt={4}>
                  <Grid item xs={4} md={2}>
                    <Typography
                      variant="h6"
                      component="h6"
                      textAlign={"right"}
                      color={"primary"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.75rem" : "1rem",
                        width: "100%",
                      }}
                      pr={2}
                    >
                      Plan Details
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={10}></Grid>
                  {policiesData?.["Plan details"]?.map((item, index) => (
                    <Grid item xs={12} key={index} height={"40px"}>
                      {Object.keys(item).map((key, index) => (
                        <Grid container height={"inherit"}>
                          {/* <> */}
                          <Grid
                            item
                            xs={4}
                            md={2}
                            key={index}
                            height={"100%"}
                            // border={1}
                            display={"flex"}
                            alignItems={"center"}
                            pr={2}
                          >
                            <Typography
                              key={index}
                              variant="body2"
                              component="p"
                              textAlign="right"
                              sx={{ fontSize: "0.75rem", flex: 1 }}
                            >
                              {key}
                            </Typography>
                            {item[key]?.info && (
                              <CustomTooltip
                                title={
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      p: 2,
                                    }}
                                  >
                                    <Typography color="inherit" variant="h6">
                                      {key}
                                    </Typography>
                                    <Divider
                                      color={theme.palette.primary.main}
                                      sx={{ width: "100%", mt: 2 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="inherit"
                                      mt={3}
                                    >
                                      {item[key]?.info}
                                    </Typography>
                                  </Box>
                                }
                              >
                                <InfoOutlined
                                  fontSize="0.75rem"
                                  sx={{ ml: 1 }}
                                />
                              </CustomTooltip>
                            )}
                          </Grid>

                          <Grid item xs={8} md={10}>
                            <Grid container height={"100%"}>
                              {item[key]?.data?.map((row, index) => {
                                const gridValue =
                                  item[key]?.data?.length === 2
                                    ? 6
                                    : item[key]?.data?.length === 3
                                    ? 4
                                    : 3;
                                return (
                                  <Grid
                                    key={row}
                                    item
                                    xs={gridValue}
                                    sx={{
                                      border: "1px solid #ccc",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    // border={1}
                                    // borderColor={"secondary"}
                                  >
                                    {/* <Button>sdfsdf</Button> */}
                                    {/* <Typography > */}
                                    {row?.value}
                                    {/* </Typography> */}
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                      {/* </Grid> */}
                    </Grid>
                  ))}
                </Grid>
              )}

              {policiesData?.["Add-On Covers"] && (
                <Grid container mt={4}>
                  <Grid item xs={4} md={2}>
                    <Typography
                      variant="h6"
                      component="h6"
                      textAlign={"right"}
                      color={"primary"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.75rem" : "1rem",
                        width: "100%",
                      }}
                      pr={2}
                    >
                      Add-On Covers
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={10}></Grid>
                  {policiesData?.["Add-On Covers"]?.map((item, index) => (
                    <Grid item xs={12} key={index} height={"40px"}>
                      {Object.keys(item).map((key, index) => (
                        <Grid container height={"inherit"}>
                          {/* <> */}
                          <Grid
                            item
                            xs={4}
                            md={2}
                            key={index}
                            height={"100%"}
                            // border={1}
                            display={"flex"}
                            alignItems={"center"}
                            pr={2}
                          >
                            <Typography
                              key={index}
                              variant="body2"
                              component="p"
                              textAlign="right"
                              sx={{ fontSize: "0.75rem", flex: 1 }}
                            >
                              {key}
                            </Typography>
                            {item[key]?.info && (
                              <CustomTooltip
                                title={
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      p: 2,
                                    }}
                                  >
                                    <Typography color="inherit" variant="h6">
                                      {key}
                                    </Typography>
                                    <Divider
                                      color={theme.palette.primary.main}
                                      sx={{ width: "100%", mt: 2 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="inherit"
                                      mt={3}
                                    >
                                      {item[key]?.info}
                                    </Typography>
                                  </Box>
                                }
                              >
                                <InfoOutlined
                                  fontSize="0.75rem"
                                  sx={{ ml: 1 }}
                                />
                              </CustomTooltip>
                            )}
                          </Grid>

                          <Grid item xs={8} md={10}>
                            <Grid container height={"100%"}>
                              {item[key]?.data?.map((row, index) => {
                                const gridValue =
                                  item[key]?.data?.length === 2
                                    ? 6
                                    : item[key]?.data?.length === 3
                                    ? 4
                                    : 3;
                                return (
                                  <Grid
                                    key={row}
                                    item
                                    xs={gridValue}
                                    sx={{
                                      border: "1px solid #ccc",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    // border={1}
                                    // borderColor={"secondary"}
                                  >
                                    {/* <Button>sdfsdf</Button> */}
                                    {/* <Typography > */}
                                    {row?.value}
                                    {/* </Typography> */}
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              )}

              {policiesData?.["Premium details"] && (
                <Grid container mt={4}>
                  <Grid item xs={4} md={2}>
                    <Typography
                      variant="h6"
                      component="h6"
                      textAlign={"right"}
                      color={"primary"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.75rem" : "1rem",
                        width: "100%",
                      }}
                      pr={2}
                    >
                      Premium Details
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={10}></Grid>
                  {policiesData?.["Premium details"]?.map((item, index) => (
                    <Grid item xs={12} key={index} height={"40px"}>
                      {Object.keys(item).map((key, index) => (
                        <Grid container height={"inherit"}>
                          {/* <> */}
                          <Grid
                            item
                            xs={4}
                            md={2}
                            key={index}
                            height={"100%"}
                            // border={1}
                            display={"flex"}
                            alignItems={"center"}
                            pr={2}
                          >
                            <Typography
                              key={index}
                              variant="body2"
                              component="p"
                              textAlign="right"
                              sx={{ fontSize: "0.75rem", flex: 1 }}
                            >
                              {key}
                            </Typography>
                            {item[key]?.info && (
                              <CustomTooltip
                                title={
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      p: 2,
                                    }}
                                  >
                                    <Typography color="inherit" variant="h6">
                                      {key}
                                    </Typography>
                                    <Divider
                                      color={theme.palette.primary.main}
                                      sx={{ width: "100%", mt: 2 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="inherit"
                                      mt={3}
                                    >
                                      {item[key]?.info}
                                    </Typography>
                                  </Box>
                                }
                              >
                                <InfoOutlined
                                  fontSize="0.75rem"
                                  sx={{ ml: 1 }}
                                />
                              </CustomTooltip>
                            )}
                          </Grid>

                          <Grid item xs={8} md={10}>
                            <Grid container height={"100%"}>
                              {item[key]?.data?.map((row, index) => {
                                const gridValue =
                                  item[key]?.data?.length === 2
                                    ? 6
                                    : item[key]?.data?.length === 3
                                    ? 4
                                    : 3;
                                return (
                                  <Grid
                                    key={row}
                                    item
                                    xs={gridValue}
                                    sx={{
                                      border: "1px solid #ccc",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    // border={1}
                                    // borderColor={"secondary"}
                                  >
                                    {/* <Button>sdfsdf</Button> */}
                                    {/* <Typography > */}
                                    {row?.value}
                                    {/* </Typography> */}
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              )}
              {policiesData?.["Discounts"] && (
                <Grid container my={4}>
                  <Grid item xs={4} md={2}>
                    <Typography
                      variant="h6"
                      component="h6"
                      textAlign={"right"}
                      color={"primary"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.75rem" : "1rem",
                        width: "100%",
                      }}
                      pr={2}
                    >
                      Discounts
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={10}></Grid>
                  {policiesData?.["Discounts"]?.map((item, index) => (
                    <Grid item xs={12} key={index} height={"40px"}>
                      {Object.keys(item).map((key, index) => (
                        <Grid container height={"inherit"}>
                          {/* <> */}
                          <Grid
                            item
                            xs={4}
                            md={2}
                            key={index}
                            height={"100%"}
                            // border={1}
                            display={"flex"}
                            alignItems={"center"}
                            pr={2}
                          >
                            <Typography
                              key={index}
                              variant="body2"
                              component="p"
                              textAlign="right"
                              sx={{ fontSize: "0.75rem", flex: 1 }}
                            >
                              {key}
                            </Typography>
                            {item[key]?.info && (
                              <CustomTooltip
                                title={
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      p: 2,
                                    }}
                                  >
                                    <Typography color="inherit" variant="h6">
                                      {key}
                                    </Typography>
                                    <Divider
                                      color={theme.palette.primary.main}
                                      sx={{ width: "100%", mt: 2 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="inherit"
                                      mt={3}
                                    >
                                      {item[key]?.info}
                                    </Typography>
                                  </Box>
                                }
                              >
                                <InfoOutlined
                                  fontSize="0.75rem"
                                  sx={{ ml: 1 }}
                                />
                              </CustomTooltip>
                            )}
                          </Grid>

                          <Grid item xs={8} md={10}>
                            <Grid container height={"100%"}>
                              {item[key]?.data?.map((row, index) => {
                                const gridValue =
                                  item[key]?.data?.length === 2
                                    ? 6
                                    : item[key]?.data?.length === 3
                                    ? 4
                                    : 3;
                                return (
                                  <Grid
                                    key={row}
                                    item
                                    xs={gridValue}
                                    sx={{
                                      border: "1px solid #ccc",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    // border={1}
                                    // borderColor={"secondary"}
                                  >
                                    {/* <Button>sdfsdf</Button> */}
                                    {/* <Typography > */}
                                    {row?.value}
                                    {/* </Typography> */}
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              )}
              {policiesData?.["Premium"] && (
                <Grid container my={4} mb={8}>
                  <Grid item xs={4} md={2}>
                    <Typography
                      variant="h6"
                      component="h6"
                      textAlign={"right"}
                      color={"primary"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: isMobile ? "0.75rem" : "1rem",
                        width: "100%",
                      }}
                      pr={2}
                    >
                      Premium
                    </Typography>
                  </Grid>
                  <Grid item xs={8} md={10}></Grid>
                  {policiesData?.["Premium"]?.map((item, index) => (
                    <Grid item xs={12} key={index} height={"40px"}>
                      {Object.keys(item).map((key, index) => (
                        <Grid container height={"inherit"}>
                          {/* <> */}
                          <Grid
                            item
                            xs={4}
                            md={2}
                            key={index}
                            height={"100%"}
                            // border={1}
                            display={"flex"}
                            alignItems={"center"}
                            pr={2}
                          >
                            <Typography
                              key={index}
                              variant="body2"
                              component="p"
                              textAlign="right"
                              sx={{ fontSize: "0.75rem", flex: 1 }}
                            >
                              {key}
                            </Typography>
                            {item[key]?.info && (
                              <CustomTooltip
                                title={
                                  <Box
                                    sx={{
                                      width: "100%",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      p: 2,
                                    }}
                                  >
                                    <Typography color="inherit" variant="h6">
                                      {key}
                                    </Typography>
                                    <Divider
                                      color={theme.palette.primary.main}
                                      sx={{ width: "100%", mt: 2 }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="p"
                                      color="inherit"
                                      mt={3}
                                    >
                                      {item[key]?.info}
                                    </Typography>
                                  </Box>
                                }
                              >
                                <InfoOutlined
                                  fontSize="0.75rem"
                                  sx={{ ml: 1 }}
                                />
                              </CustomTooltip>
                            )}
                          </Grid>

                          <Grid item xs={8} md={10}>
                            <Grid container height={"100%"}>
                              {item[key]?.data?.map((row, index) => {
                                const gridValue =
                                  item[key]?.data?.length === 2
                                    ? 6
                                    : item[key]?.data?.length === 3
                                    ? 4
                                    : 3;
                                return (
                                  <Grid
                                    key={row}
                                    item
                                    xs={gridValue}
                                    sx={{
                                      border: "1px solid #ccc",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                    // border={1}
                                    // borderColor={"secondary"}
                                  >
                                    {/* <Button>sdfsdf</Button> */}
                                    {/* <Typography > */}
                                    {row?.value}
                                    {/* </Typography> */}
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

CarComparePage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default CarComparePage;
