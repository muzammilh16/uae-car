import styled from "@emotion/styled";
import {
  ArrowBackOutlined,
  ArrowForward,
  BackHand,
  Edit,
  EditOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import { borderRadius, useMediaQuery } from "@mui/system";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import BasicDetails from "src/pageComponents/basicDetails";
import CarDetails from "src/pageComponents/carDetails";
import FormSection from "src/pageComponents/fom_sections";
import PolicyDetails from "src/pageComponents/poilicyDetails";
import Navbar from "src/views/components/navbar";

import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import LocalGasStationOutlinedIcon from "@mui/icons-material/LocalGasStationOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import TwentyTwoMpOutlinedIcon from "@mui/icons-material/TwentyTwoMpOutlined";
import CommonDialog from "src/pageComponents/commonModal";
import dayjs from "dayjs";
import CommonCalenderPicker from "src/pageComponents/commonCalenderPicker";
import { IDVdefaultData } from "src/mockData/commonData";
const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 450,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 500,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: 750,
  },
}));
const CarEnquiryPage = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [activeStep, setActiveStep] = useState(0);

  const router = useRouter();
  const [steps, setSteps] = useState([
    { label: "Choose RTO", key: "rto", completed: false },
    {
      label: "Choose Car Registrating Year",
      key: "carRegistrationYear",
      completed: false,
    },
    { label: "Choose Car Maker", key: "carCompany", completed: false },
    { label: "Choose Car Model", key: "carModal", completed: false },
    { label: "Choose Car Fuel Type", key: "fuelType", completed: false },
    { label: "Choose Car Variant", key: "carVariant", completed: false },
    { label: "Claim", key: "claim", completed: false },
  ]);

  const [selectedData, setSelectedData] = useState([]);

  const [openExpDateModal, setOpenExpDateModel] = useState(false);
  const [ExpDateSelected, setExpDateSelected] = useState("");

  const [openClaimDetailModal, setOpenClainDetailModal] = useState(false);
  const [claimDetailSelected, setClaimDetailSelected] = useState({
    isClaimMade: false,
    ownershipTransferred: false,
  });
const registrationNumber = typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem("registrationNumber")) : ""
  const [formValues, setFormValues] = useState({
    rto: "",
    carRegistrationYear: "",
    carCompany: "",
    carModal: "",
    fuelType: "",
    carVariant: "",
    claimFullName: "",
    claimMobile: "",
    claimEmail: "",
  });

  // useEffect(()=>{
  //   if (typeof window != "undefined") {
  //    const getData = window.localStorage.getItem("carEnquiry");
  //    if(getData){
  //     setFormValues({...formValues,...JSON.parse(getData)});

  //    }
  //   }
  // },[formValues])

  useEffect(() => {
    const newFormValues = { ...formValues };
    Object.keys(newFormValues).forEach((key, index) => {
      if (index > activeStep) {
        newFormValues[key] = "";
      }
    });
    setFormValues(newFormValues);
  }, [activeStep]);

  const handleBack = () => {
    router.push("/");
    setGlobalState((prev) => ({
      ...prev,
      key: "data",
      value: {},
    }));
  };

  useEffect(() => {
    // if (Object.values(formValues).every((value) => value !== "")) {
    //   setOpenExpDateModel(true);
    //   return;
    // }

    const hasValue = Object.entries(formValues).some(
      ([key, value]) => value !== ""
    );
    if (typeof window !== "undefined" && hasValue) {
      const getData = window.localStorage.getItem("carEnquiry");
      const parsedData = getData ? JSON.parse(getData) : {};
      console.log(parsedData,"parsedData");
      window.localStorage.setItem(
        "carEnquiry",
        // JSON.stringify(formValues)
        JSON.stringify({ ...parsedData, ...formValues })
      );
    }
    const newData = {
      rto: formValues.rto,
      carRegistrationYear:
        formValues.carRegistrationYear?.includes("-")
          ? new Date(formValues.carRegistrationYear).getFullYear()
          : formValues.carRegistrationYear,
      carCompany: formValues.carCompany,
      carModal: formValues.carModal,
      fuelType: formValues.fuelType,
      carVariant: formValues.carVariant,
    };
    const data = Object.entries(newData)
      .filter(([key, value]) => typeof value !== "object" && value !== "")
      .map(([key, value], index) => {
        let icon = null;
        if (key === "fuelType") {
          icon = <LocalGasStationOutlinedIcon />;
        } else if (key === "carCompany") {
          icon = <DirectionsCarFilledOutlinedIcon />;
        } else if (key === "carModal") {
          icon = <DirectionsCarFilledOutlinedIcon />;
        } else if (key === "carVariant") {
          icon = <DirectionsCarFilledOutlinedIcon />;
        } else if (key === "rto") {
          icon = <LocationOnOutlined />;
        } else {
          icon = <CalendarMonthOutlinedIcon />;
        }
        return {
          label: key,
          value: value,
          icon: icon,
        };
      });
    setSelectedData(data);
  }, [formValues]);

  useEffect(() => {
    const data =
      typeof window !== "undefined" &&
      window.localStorage.getItem("carEnquiry");
    if (data) {
      const parsedData = JSON.parse(data);
      const datanew = Object.entries(parsedData).filter(
        ([key, value]) => value !== ""
      );
      const hasValue = Object.entries(parsedData).some(
        ([key, value]) => value !== ""
      );
      console.log(datanew, hasValue, "new changes");
      if (hasValue) {
        console.log(datanew.length, "datanew.length");
        setActiveStep(datanew.length >= 7 ? 6 : datanew.length);
        setFormValues((prev) => ({
          ...prev,
          ...parsedData,
        }));
      }
      setExpDateSelected(parsedData.policyExpiryDate);
      setClaimDetailSelected({
        isClaimMade: parsedData.isClaimMade,
        ownershipTransferred: parsedData.ownershipTransferred,
      })
    }
  }, []);

  useEffect(() => {
    const IdvValue = IDVdefaultData.minIdv;
   
    if (
      typeof window != "undefined" &&
      (claimDetailSelected.isClaimMade !== null ||
        claimDetailSelected.ownershipTransferred !== null)
    ) {
      const data =
      typeof window !== "undefined" &&
      window.localStorage.getItem("carEnquiry");
      const parsedData = JSON.parse(data);
      window.localStorage.setItem(
        "carEnquiry",
        JSON.stringify({
          ...parsedData,
          ...formValues,
          ...claimDetailSelected,
          ncbPercentage: "0%",
          IdvValue,
        })
      );
    }

    if (typeof window != "undefined" && ExpDateSelected) {
      const data =
      typeof window !== "undefined" &&
      window.localStorage.getItem("carEnquiry");
      const parsedData = JSON.parse(data);
      window.localStorage.setItem(
        "carEnquiry",
        JSON.stringify({
          ...parsedData,
          ...formValues,
          ...claimDetailSelected,
          policyExpiryDate: ExpDateSelected,
          ncbPercentage: "0%",
          IdvValue,
        })
      );
    }
  }, [claimDetailSelected, ExpDateSelected]);

  const handleNextPage = () => {
    if (
      claimDetailSelected.isClaimMade !== null &&
      claimDetailSelected.ownershipTransferred !== null
    ) {
      setOpenClainDetailModal(false);

      router.push("/car-insurance-list");
    }
  };
  return (
    <>
      <Navbar />
      <Box
        className="content-right"
        sx={{ backgroundColor: "secondary", px: isMobile ? 1 : 50 }}
      >
        <Grid container height={"10%"} spacing={2}>
          {/* <Grid item xs={12}>
            <Typography variant="h3" sx={{ mb: 1.5, mx: 2 }}>
              Car Enquiry Page
            </Typography>
          </Grid> */}
          <Grid item xs={12} my={8}>
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                p={4}
                borderRadius={2}
                sx={{ background: "primary", boxShadow: 10 }}
              >
                <FormSection
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  steps={steps}
                  setSteps={setSteps}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  setOpenExpDateModel={setOpenExpDateModel}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                // p={4}
                display={isMobile ? "none" : "flex"}
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Box
                  sx={{
                    // mt: 2,
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    p: 2,
                    width: "70%",
                    boxShadow: 10,
                  }}
                >
                  <Box
                    display={"flex"}
                    width={"100%"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    {/* <ArrowBackOutlined onClick={()=>router.push("/")}/> */}
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        mb: 2,
                        width: "100%",
                      }}
                    >
                      Your Selection
                    </Typography>
                  </Box>
                  {/* {globalState.value?.registrationNumber || globalState.value?.message !== "" && */}
                  <ListItem
                    disableGutters
                    secondaryAction={
                      <IconButton aria-label="comment">
                        <EditOutlined
                          onClick={handleBack}
                          sx={{ height: "15px", width: "15px" }}
                        />
                      </IconButton>
                    }
                    sx={{ borderBottom: "1px solid grey", fontWeight: "bold" }}
                  >
                    <TwentyTwoMpOutlinedIcon />
                    <Typography component="p" sx={{ fontSize: "14px", ml: 2 }}>
                      {/* {globalState?.value?.registrationNumber
                        ? `${globalState?.value?.registrationNumber}`
                        : globalState?.value?.message || ""} */}
                        {registrationNumber || ""}
                    </Typography>
                    {/* <Typography sx={{ fontSize: "14px", ml: 2 }}>
                      {globalState?.value?.registrationNumber
                        ? `Registration Number : ${
                            globalState?.value?.registrationNumber || ""
                          }`
                        : globalState?.value?.message || ""}
                    </Typography> */}
                    {/* <ListItemText  primary={globalState.value?.registrationNumber ? "Registration Number : ":globalState?.value?.message}  sx={{fontSize:"10px"}}/> */}
                  </ListItem>
                  {/* } */}
                  {Object.keys(formValues).some(
                    (key) => formValues[key] !== ""
                  ) && (
                    <>
                      {selectedData?.map((item, index) => {
                        return (
                          <ListItem
                            key={index}
                            disableGutters
                            secondaryAction={
                              <IconButton aria-label="comment">
                                <EditOutlined
                                  onClick={() => setActiveStep(index)}
                                  sx={{ height: "15px", width: "15px" }}
                                />
                              </IconButton>
                            }
                            sx={{ borderBottom: "1px solid grey" }}
                          >
                            {item.icon}
                            <ListItemText
                              primary={` ${item.value}`}
                              sx={{ fontSize: "10px", ml: 2 }}
                            />
                          </ListItem>
                          // <Card>
                          //   <CardContent>

                          //     <Box
                          //       sx={{
                          //         display: "flex",
                          //         justifyContent: "space-between",
                          //       }}
                          //     >
                          //       <Typography variant="h6">{value} </Typography>

                          //     </Box>
                          //   </CardContent>
                          // </Card>
                        );
                      })}
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {openExpDateModal && (
          <CommonDialog
            open={openExpDateModal}
            onClose={() => setOpenExpDateModel(false)}
            modalWidth={350}
            hideClose
            content={() => (
              <>
                <CommonCalenderPicker
                  ExpDateSelected={ExpDateSelected}
                  setExpDateSelected={setExpDateSelected}
                  setOpenClainDetailModal={setOpenClainDetailModal}
                  setOpenExpDateModel={setOpenExpDateModel}
                />
              </>
            )}
            header={"Select the previous policy expiry date"}
            // subHeader="Select the expiry date of your last policy"
          />
        )}

        {ExpDateSelected && openClaimDetailModal && (
          <CommonDialog
            open={openClaimDetailModal}
            onClose={() => setOpenClainDetailModal(false)}
            hideClose
            content={() => {
              return (
                <Box>
                  <Box my={2}>
                    <Typography
                      sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                      variant="h6"
                    >
                      Did you make a claim in your existing policy?
                    </Typography>

                    {/* <Stack
                      direction="column"
                      spacing={1}
                      sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                    > */}

                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="false"
                      name="radio-buttons-group"
                      value={claimDetailSelected.isClaimMade}
                      onChange={() => {
                        setClaimDetailSelected({
                          ...claimDetailSelected,
                          isClaimMade: !claimDetailSelected.isClaimMade,
                        });
                      }}
                      row
                    >
                      <FormControlLabel
                        value="false"
                        defaultChecked
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>

                    {/* <Card
                        sx={{
                          my: 2,
                          background:
                            !claimDetailSelected.isClaimMade &&
                            claimDetailSelected.isClaimMade != "null"
                              ? "#f5f5f5"
                              : "auto",
                        }}
                        onClick={() =>
                          setClaimDetailSelected({
                            ...claimDetailSelected,
                            isClaimMade: false,
                          })
                        }
                      >
                        <CardContent
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="h6">No</Typography>
                          <ArrowForward color="primary" />
                        </CardContent>
                      </Card> */}
                    {/* </Stack> */}
                  </Box>
                  <Box my={2}>
                    <Typography
                      sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                      variant="h6"
                    >
                      Was ownership transferred in the last 12 months?
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="false"
                      name="radio-buttons-group"
                      value={claimDetailSelected.ownershipTransferred}
                      onChange={() => {
                        setClaimDetailSelected({
                          ...claimDetailSelected,
                          ownershipTransferred:
                            !claimDetailSelected.ownershipTransferred,
                        });
                      }}
                      row
                    >
                      <FormControlLabel
                        value="false"
                        defaultChecked
                        control={<Radio />}
                        label="No"
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                    </RadioGroup>
                  </Box>
                </Box>
              );
            }}
            actionFooter={() => (
              <Button
                // fullWidth
                sx={{ mb: 2 }}
                variant="text"
                color="primary"
                onClick={handleNextPage}
              >
                Done
              </Button>
            )}
            header={"Other Details"}
          />
        )}
      </Box>
    </>
  );
};

CarEnquiryPage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default CarEnquiryPage;
