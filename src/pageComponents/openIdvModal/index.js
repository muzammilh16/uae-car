import {
  Button,
  Chip,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  SliderThumb,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { border, borderRadius, Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import CommonDialog from "../commonModal";
import {
  ExpandCircleDownRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import { formatAED, formatRuppee, reverseRuppeeFormat } from "src/utility";
import { IDVdefaultData } from "src/mockData/commonData";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { actionGetQuoteMaster, actionGetQuotes, actionUpdateQuoteDetails } from "src/store/quoteDetails";
import { useRouter } from "next/router";
import { setQuoteId } from "src/store/urlReference";

const IdvModal = ({ openModal, quoteDetailsObj, setOpenModal, setQuoteLoading, defaultValue, dummyLoading, setGlobalIdvValue, globalIdvValue }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const quoteData = useSelector((state) => state.quoteDetailsStore);

  const [showTable, setShowTable] = useState(false);
  const [minMaxIdv, setMinMaxIdv] = useState(IDVdefaultData);
  // const [selectedIdv, setSelectedIdv] = useState(
  //   defaultValue || minMaxIdv.minIdv
  // );
  const [selectedIdv, setSelectedIdv] = useState(globalIdvValue);
  const [fieldErrorMessage, setFieldErrorMessage] = useState("");
  function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
      <SliderThumb {...other}>
        {children}
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </SliderThumb>
    );
  }

  // AirbnbThumbComponent.propTypes = {
  //   children: PropTypes.node,
  // };
  // const handleSubmit = async () => {
  //   // if (typeof window !== "undefined") {
  //   // const data = JSON.parse(localStorage.getItem("carEnquiry"));
  //   // console.log("IdvValue", selectedIdv, { ...data, IdvValue: selectedIdv });
  //   // console.log("ncbPercentage", newValue);
  //   // window.localStorage.setItem(
  //   //   "carEnquiry",
  //   //   JSON.stringify({ ...data, IdvValue: selectedIdv })
  //   // );
  //   // }
  //   console.log("IdvValue", selectedIdv);
  //   const params = {
  //     "reference_id": quoteDetailsObj?.quote_id,
  //     "policy_type": quoteDetailsObj?.policy_type,
  //     "idv": selectedIdv,
  //     "manufacture_date": quoteDetailsObj?.manufacture_date,
  //     "registration_date": quoteDetailsObj?.registration_date
  //   };

  //   try {
  //     const response = await dispatch(actionUpdateQuoteDetails(params)).unwrap();

  //     if (response?.result === true && response?.status === 200) {
  //       toast.success(response?.message || "Quote details updated!");
  //       console.log("reference_id:", response?.response?.reference_id);
  //       router.push({
  //         pathname: "/car-insurance-list",
  //         query: { quoteId: response?.response?.reference_id },
  //       });
  //       dispatch(actionGetQuotes({ reference_id: response?.response?.reference_id }));
  //     } else {
  //       toast.error(response?.message || "Something went wrong. Please try again.");
  //     }
  //   } catch (error) {
  //     toast.error("Some error occured. Please try again.");
  //     console.error("Quote details update failed:", error);
  //   }
  //   setOpenModal(false);
  // };

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 2000; // 2 seconds

  // const fetchQuotesWithRetry = async (referenceId, attempt = 1) => {
  //   try {
  //     const response = await dispatch(actionGetQuotes({ reference_id: referenceId })).unwrap();

  //     // Check if premiums array exists and has data
  //     if (Array.isArray(response?.response?.premiums) && response.response.premiums.length > 0) {
  //       // setQuoteLoading(false);
  //       console.log("✅ Got quotes:", response.response.premiums);
  //       toast.success(response?.message || "Quote details updated!");
  //       return;
  //     }

  //     // Retry logic
  //     if (attempt < MAX_RETRIES) {
  //       console.log(`🔁 Retrying getQuotes... Attempt ${attempt + 1}`);
  //       setTimeout(() => fetchQuotesWithRetry(referenceId, attempt + 1), RETRY_DELAY);
  //     } else {
  //       toast.error("⚠️ Could not fetch quotes. Please try again later.");
  //     }
  //   } catch (error) {
  //     console.error("❌ Error fetching quotes:", error);
  //     toast.error("Error while retrying quote fetch.");
  //   }
  // };

  const fetchQuotesWithRetry = async (referenceId) => {
    setQuoteLoading(true);
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`🔁 Attempt ${attempt}: Fetching quotes...`);

        const response = await dispatch(actionGetQuotes({ reference_id: referenceId })).unwrap();
        const premiums = response?.response?.premiums || [];

        console.log(`✅ Attempt ${attempt}: Premiums length: ${premiums.length}`);
      } catch (error) {
        console.error(`❌ Attempt ${attempt} failed:`, error);
      }

      if (attempt < MAX_RETRIES) {
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
      }
    }

    // toast.success("✅ Finished quote fetch attempts.");
    setQuoteLoading(false);
  };


  const handleSubmit = async () => {
    const params = {
      reference_id: quoteDetailsObj?.quote_id,
      policy_type: quoteDetailsObj?.policy_type,
      idv: selectedIdv,
      manufacture_date: quoteDetailsObj?.manufacture_date,
      registration_date: quoteDetailsObj?.registration_date,
      proposer_type: quoteDetailsObj?.proposer_type
    };

    // Conditionally add optional values
    if (quoteDetailsObj?.electrical_kit_value != null) {
      params.electrical_kit_value = quoteDetailsObj.electrical_kit_value;
    }

    if (quoteDetailsObj?.non_electrical_kit_value != null) {
      params.non_electrical_kit_value = quoteDetailsObj.non_electrical_kit_value;
    }

    if (quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type == 'used') {
      params.previous_policy_type = quoteDetailsObj?.previous_policy_type,
        params.is_claim_made_last_year = quoteDetailsObj?.is_claim_made_last_year
      // params.proposer_type = quoteDetailsObj?.proposer_type
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_ncb_visible) {
      params.previous_ncb_percentage = quoteDetailsObj?.previous_ncb_percentage
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_expire_date_visible) {
      params.previous_tp_policy_expire_date = quoteDetailsObj?.previous_tp_policy_expire_date
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_policy_expire_date_visible) {
      params.previous_policy_expire_date = quoteDetailsObj?.previous_policy_expire_date
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible) {
      params.previous_policy_expire_date = quoteDetailsObj?.previous_policy_expire_date
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_policy_insurer_visible) {
      params.previous_policy_insurer_id = quoteDetailsObj?.previous_policy_insurer_id
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_od_policy_insurer_visible) {
      params.previous_policy_insurer_id = quoteDetailsObj?.previous_policy_insurer_id
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_insurer_visible) {
      params.previous_tp_policy_insurer_id = quoteDetailsObj?.previous_tp_policy_insurer_id
    }

    dummyLoading();
    // console.log(selectedIdv)
    setGlobalIdvValue(selectedIdv);


    // try {
    //   const response = await dispatch(actionUpdateQuoteDetails(params)).unwrap();

    //   if (response?.result === true && response?.status === 200) {
    //     // toast.success(response?.message || "Quote details updated!");
    //     const refId = response?.response?.reference_id;

    //     localStorage.setItem("QUOTE_ID", response?.response?.reference_id);
    //     dispatch(setQuoteId(response?.response?.reference_id));

    //     dispatch(actionGetQuoteMaster({ reference_id: refId }));

    //     // router.push({
    //     //   pathname: "/car-insurance-list",
    //     //   query: { quoteId: refId },
    //     // });

    //     // Start retry logic
    //     // fetchQuotesWithRetry(refId);
    //   } else {
    //     toast.error(response?.message || "Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   toast.error("Some error occurred. Please try again.");
    //   console.error("Quote details update failed:", error);
    // }

    setOpenModal(false);
  };




  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const data = JSON.parse(localStorage.getItem("carEnquiry"));
  //     console.log("ncbPercentage", data?.ncbPercentage);
  //     setNcbPercentage(
  //       ncbPercentage.map((item, index) =>
  //         index === ncbPercentage?.findIndex((item) => item.label === data?.ncbPercentage) - 1
  //           ? { ...item, isSelected: true }
  //           : { ...item, isSelected: false }
  //       )
  //     );
  //   }
  // }, []);
  const handleSliderChange = (event, newValue) => {
    // console.log(newValue, "newValue", typeof newValue);
    setSelectedIdv(newValue);
  };
  return (
    <>
      <CommonDialog
        open={openModal}
        header="Car Value"
        // subHeader="What the insurer pays in case of total damage/theft"
        content={() => {
          return (
            <Box>
              <Grid container sx={{ borderRadius: 1 }}>
                <Grid item xs={12} display={"flex"} justifyContent={"end"}>
                  <TextField
                    id="input-slider"
                    variant="outlined"
                    placeholder="IDV"
                    type="currency"
                    // value={formatRuppee(selectedIdv)}
                    value={selectedIdv}
                    // sx={}{COLOR}
                    onChange={(e) => {
                      const numericValue = e.target.value
                        .replace(/[^0-9.]/g, "")
                        .split(".")[0];

                      setSelectedIdv(Number(numericValue) || 0);
                      if (
                        Number(numericValue) > minMaxIdv.maxIdv ||
                        Number(numericValue) < minMaxIdv.minIdv
                      ) {
                        setFieldErrorMessage(
                          `Car Value must be equal to or in between ${formatAED(
                            quoteDetailsObj?.min_idv
                          )} & ${formatAED(quoteDetailsObj?.max_idv)}`
                        );
                      } else {
                        setFieldErrorMessage("");
                      }
                    }}
                    error={Boolean(fieldErrorMessage)}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">AED</InputAdornment>,
                    }}
                  // helperText={fieldErrorMessage}
                  />
                </Grid>
                <Grid item xs={12} p={10} pb={3}>
                  <Slider
                    track={false}
                    aria-labelledby="input-slider"
                    color="primary"
                    value={typeof selectedIdv === "number" ? selectedIdv : 0}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    min={quoteDetailsObj?.min_idv}
                    max={quoteDetailsObj?.max_idv}
                    sx={{
                      ".MuiSlider-rail": {
                        background:
                          "linear-gradient(90deg, rgb(228, 227, 227) 21%, rgba(169,35,231,1) 79%)",
                        // border:".1px solid lightgrey"
                      },
                    }}
                    slots={{ thumb: AirbnbThumbComponent }}
                  />
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  // border={1}
                  >
                    <Typography variant="body1" fontSize={12}>
                      {formatAED(quoteDetailsObj?.min_idv)}
                    </Typography>
                    <Typography variant="body1" fontSize={12}>
                      {formatAED(quoteDetailsObj?.max_idv)}
                    </Typography>
                  </Box>
                </Grid>
                {Boolean(fieldErrorMessage) && (
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      color="error"
                      sx={{ width: "100%", textAlign: "center" }}
                    >
                      {fieldErrorMessage}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Box mt={1} sx={{ backgroundColor: '#fffdd0', p: 3, maxWidth: '500px' }}>
                <Typography variant="body1" fontSize={12} fontWeight={500}>
                  Note: The car value range shown is a guide, and is subject to approval from the insurance company. Final premium may vary based on the car value approved by the chosen insurer.
                </Typography>
                <Typography variant="body1" fontSize={12} fontWeight={500}>
                  Amount you'll receive in case of total damage or theft of your car. It doesn't affect your car's resale value.
                </Typography>
              </Box>
            </Box>
          );
        }}
        onClose={() => {
          setOpenModal(false);
        }}
        actionFooter={() => {
          return (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          );
        }}
      />
    </>
  );
};

export default IdvModal;
