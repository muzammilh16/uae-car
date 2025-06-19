import {
  Autocomplete,
  Button,
  Chip,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { border, Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import CommonDialog from "../commonModal";
import {
  ExpandCircleDownRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { insurerData } from "src/mockData/policiesData";
import dayjs from "dayjs";
import { monthsData, yearsData } from "src/mockData/commonData";
import { CommonAutoComplete } from "src/views/components/commonAutoComplete";
import { CommonDatePicker } from "src/views/components/commonDatePicker";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { actionGetQuoteMaster, actionUpdateQuoteDetails } from "src/store/quoteDetails";
import { useRouter } from "next/router";
import { setQuoteId } from "src/store/urlReference";

const tableData = [
  {
    title: "No claim in last 6 or more years",
    value: "50%",
  },
  {
    title: "No claim in last 5 years",
    value: "45%",
  },
  {
    title: "No claim in last 4 years",
    value: "35%",
  },
  {
    title: "No claim in last 3 years",
    value: "25%",
  },
  {
    title: "No claim in last 2 years",
    value: "20%",
  },
  {
    title: "No claim in last year",
    value: "0%",
  },
];

const previousPolicyTypeOptions = [
  { value: "bundled", label: "Bundled" },
  { value: "comprehensive", label: "Comprehensive" },
  { value: "third_party", label: "Third Party" },
  { value: "own_damage", label: "Own Damage" },
];

const policyHolderTypeOptons = ["Yes", "No"];
const PolicyExpSecction = ({ openModal, setOpenModal, fetchQuotesWithRetry, quoteDetailsObj, dummyLoading }) => {
  const [showTable, setShowTable] = useState(false);
  const [insurer, setInsurer] = useState(null);
  const [tpInsurer, setTpInsurer] = useState(null);
  const [odInsurer, setOdInsurer] = useState(null);
  const [selectedData, setSelectedData] = useState({
    ownershipTransferred: false,
    carRegistrationDate: "",
    manufacturingMonth: "",
    manufacturingYear: "",
    policyHolderType: "",
    previousPolicyTPExpiryDate: "",
    previousPolicyExpiryDate: "",
    previousPolicyODExpiryDate: "",
    previousPolicyType: null
  });

  const router = useRouter();
  const quoteData = useSelector((state) => state.quoteDetailsStore);
  const dispatch = useDispatch();

  const fetchedInsurerOptions = useSelector((state) => state.formFieldOptionsStore.INSURER_MASTER_OPTIONS);

  useEffect(() => {
    setSelectedData((prev) => ({ ...prev, policyHolderType: quoteData?.QUOTES?.response?.proposer_type }))
  }, [quoteData]);

  const [globalError, setGlobalError] = useState("");

  useEffect(() => {
    const currentMonth = dayjs(quoteDetailsObj?.manufacture_date).format("MMMM"); // Full month name (e.g., "April")
    const currentYear = dayjs(quoteDetailsObj?.manufacture_date).format("YYYY");  // e.g., "2025"
    const regDate = dayjs(quoteDetailsObj?.registration_date).format("MM-DD-YYYY");
    const policyExpDate = dayjs(quoteDetailsObj?.previous_policy_expire_date).format("MM-DD-YYYY");
    const tpPolicyExpDate = dayjs(quoteDetailsObj?.previous_tp_policy_expire_date).format("MM-DD-YYYY");
    const prevPolicyType = quoteDetailsObj?.previous_policy_type;

    setSelectedData((prev) => ({
      ...prev,
      manufacturingMonth: currentMonth,
      manufacturingYear: currentYear,
      carRegistrationDate: regDate,
      previousPolicyExpiryDate: policyExpDate,
      previousPolicyODExpiryDate: policyExpDate,
      previousPolicyTPExpiryDate: tpPolicyExpDate,
      previousPolicyType: prevPolicyType
    }));
    if (quoteDetailsObj?.previous_policy_insurer_id) {
      setInsurer(quoteDetailsObj?.previous_policy_insurer_id);
      setOdInsurer(quoteDetailsObj?.previous_policy_insurer_id);
    }
    if (quoteDetailsObj?.previous_tp_policy_insurer_id) {
      setTpInsurer(quoteDetailsObj?.previous_tp_policy_insurer_id);
    }
  }, [quoteDetailsObj]);

  const [errors, setErrors] = useState({});

  function getMonthNumber(monthName) {
    const months = [
      "january", "february", "march", "april", "may", "june",
      "july", "august", "september", "october", "november", "december"
    ];

    const index = months.findIndex(
      (m) => m.startsWith(monthName.toLowerCase())
    );

    if (index === -1) {
      throw new Error("Invalid month name");
    }

    return String(index + 1).padStart(2, '0');
  }


  // const validateFields = () => {
  //   const errors = {};

  //   if (!selectedData.manufacturingMonth) {
  //     errors.manufacturingMonth = "Manufacturing month is required!";
  //   }
  //   if (!selectedData.manufacturingYear) {
  //     errors.manufacturingYear = "Manufacturing year is required!";
  //   }
  //   if (!selectedData.carRegistrationDate) {
  //     console.log("inside error");
  //     errors.carRegistrationDate = "Vehicle registration date is required!";
  //   }
  //   if (
  //     quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible &&
  //     !selectedData.previousPolicyODExpiryDate
  //   ) {
  //     errors.previousPolicyODExpiryDate = "OD expiry date is required!";
  //   }
  //   if (
  //     quoteData?.QUOTE_MASTER?.response?.is_tp_expire_date_visible &&
  //     !selectedData.previousPolicyTPExpiryDate
  //   ) {
  //     errors.previousPolicyTPExpiryDate = "TP expiry date is required!";
  //   }
  //   if (
  //     quoteData?.QUOTE_MASTER?.response?.previous_policy_insurer_visible &&
  //     !insurer
  //   ) {
  //     errors.insurer = "Insurer is required!";
  //   }
  //   if (!selectedData.policyHolderType) {
  //     errors.policyHolderType = "Policy holder type is required!";
  //   }

  //   setErrors(errors);
  //   return Object.keys(errors).length === 0;
  // };

  const validateFields = () => {
    const errors = {};
    setGlobalError(""); // clear any previous global error

    if (!selectedData.manufacturingMonth) {
      errors.manufacturingMonth = "Manufacturing month is required!";
    }
    if (!selectedData.manufacturingYear) {
      errors.manufacturingYear = "Manufacturing year is required!";
    }
    if (!selectedData.carRegistrationDate) {
      errors.carRegistrationDate = "License issue date is required!";
    }
    if (!selectedData.dob) {
      errors.dob = "Date of Birth is required!";
    }

    // Custom date validation: only run if required fields exist
    if (
      selectedData.manufacturingMonth &&
      selectedData.manufacturingYear &&
      selectedData.carRegistrationDate
    ) {
      try {
        const manufacturingDate = dayjs(
          `${selectedData.manufacturingYear}-${getMonthNumber(selectedData.manufacturingMonth)}-01`
        );
        const registrationDate = dayjs(selectedData.carRegistrationDate);

        if (manufacturingDate.isAfter(registrationDate)) {
          setGlobalError("Manufacturing date cannot be after registration date.");
          return false;
        }

        if (registrationDate.diff(manufacturingDate, "day") > 370) {
          setGlobalError("Registration date must be within 370 days of manufacturing date.");
          return false;
        }
      } catch (err) {
        console.error("Date validation error:", err);
      }
    }

    // Other existing field validations
    if (
      quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible &&
      !selectedData.previousPolicyODExpiryDate
    ) {
      errors.previousPolicyODExpiryDate = "OD expiry date is required!";
    }

    if (
      quoteData?.QUOTE_MASTER?.response?.is_tp_expire_date_visible &&
      !selectedData.previousPolicyTPExpiryDate
    ) {
      errors.previousPolicyTPExpiryDate = "TP expiry date is required!";
    }

    if (
      quoteData?.QUOTE_MASTER?.response?.previous_policy_insurer_visible &&
      !insurer
    ) {
      errors.insurer = "Insurer is required!";
    }

    if (!selectedData.policyHolderType) {
      errors.policyHolderType = "Policy holder type is required!";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };



  const getFormattedDate = (monthName, year) => {
    // const month = dayjs().month(monthName).month(); // get zero-based month index (0 = Jan)

    // if (isNaN(month)) return "No date";

    // const date = dayjs(new Date(year, month, 1)); // 1st day of the month
    // return date.isValid() ? date.format("YYYY-MM-DD") : null;
  };

  // function getMonthNumber(monthName) {
  //   const months = [
  //     "january", "february", "march", "april", "may", "june",
  //     "july", "august", "september", "october", "november", "december"
  //   ];

  //   const index = months.findIndex(
  //     (m) => m.startsWith(monthName.toLowerCase())
  //   );

  //   if (index === -1) {
  //     throw new Error("Invalid month name");
  //   }

  //   return String(index + 1).padStart(2, '0');
  // }


  const handleSubmit = async () => {
    // if (!validateFields()) return;

    // let newData = {
    //   insurer,
    //   policyExpiryDate: selectedData.previousPolicyODExpiryDate,
    //   ownershipTransferred: selectedData.ownershipTransferred,
    //   policyHolderType: selectedData?.policyHolderType,
    //   carRegistrationDate: dayjs(selectedData?.carRegistrationDate).format("YYYY-MM-DD"),
    //   manufacturingMonth: selectedData?.manufacturingMonth,
    //   manufacturingYear: selectedData?.manufacturingYear,
    //   previousPolicyTPExpiryDate: selectedData?.previousPolicyTPExpiryDate,
    //   manufacture_date: dayjs().format("YYYY") + "-" + getMonthNumber(selectedData?.manufacturingMonth) + "-" + dayjs().format("DD")
    // };
    // console.log("data---<", newData);

    const params = {
      reference_id: quoteDetailsObj?.quote_id,
      policy_type: quoteDetailsObj?.policy_type,
      idv: quoteDetailsObj?.idv,
      manufacture_date: selectedData?.manufacturingYear + "-" + getMonthNumber(selectedData?.manufacturingMonth) + "-" + "01",
      registration_date: dayjs(selectedData?.carRegistrationDate).format("YYYY-MM-DD"),
      // electrical_kit_value: quoteDetailsObj?.electrical_kit_value,
      // non_electrical_kit_value: quoteDetailsObj?.non_electrical_kit_value,
      // proposer_type: quoteDetailsObj?.proposer_type,
      proposer_type: selectedData?.policyHolderType,
      // test: selectedData?.previousPolicyType
      // test: selectedData?.policyHolderType
    };

    // Conditionally add optional values
    if (quoteDetailsObj?.electrical_kit_value != null) {
      params.electrical_kit_value = quoteDetailsObj.electrical_kit_value;
    }

    if (quoteDetailsObj?.non_electrical_kit_value != null) {
      params.non_electrical_kit_value = quoteDetailsObj.non_electrical_kit_value;
    }

    if (quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type == 'used') {
      params.previous_policy_type = selectedData?.previousPolicyType,
        params.is_claim_made_last_year = quoteDetailsObj?.is_claim_made_last_year
      // params.proposer_type = quoteDetailsObj?.proposer_type
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_policy_insurer_visible) {
      params.previous_policy_insurer_id = insurer
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_od_policy_insurer_visible) {
      params.previous_policy_insurer_id = odInsurer
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_insurer_visible) {
      params.previous_tp_policy_insurer_id = tpInsurer
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible) {
      params.previous_policy_expire_date = dayjs(selectedData?.previousPolicyODExpiryDate).format("YYYY-MM-DD")
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_expire_date_visible) {
      params.previous_tp_policy_expire_date = dayjs(selectedData?.previousPolicyTPExpiryDate).format("YYYY-MM-DD")
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_policy_expire_date_visible) {
      params.previous_policy_expire_date = dayjs(selectedData?.previousPolicyExpiryDate).format("YYYY-MM-DD")
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_ncb_visible) {
      params.previous_ncb_percentage = quoteDetailsObj?.previous_ncb_percentage
    }

    console.log("params", params)

    dummyLoading();

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
    //     fetchQuotesWithRetry(refId);
    //   } else {
    //     toast.error(response?.message || "Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   toast.error("Some error occurred. Please try again.");
    //   console.error("Quote details update failed:", error);
    // }
    setOpenModal(false);
  };


  return (
    <CommonDialog
      open={openModal}
      header="Edit Personal Details"
      content={() => {
        return (
          <Box display={"flex"} flexDirection={"column"} gap={4}>
            <Grid container spacing={8}>

              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                  variant="h6"
                >
                  Are you using a company vehicle for personal use?
                </Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  // defaultValue="false"
                  name="radio-buttons-group"
                  value={selectedData.policyHolderType}
                  onChange={(e, newValue) => {
                    setSelectedData({
                      ...selectedData,
                      policyHolderType: newValue,
                    });
                  }}
                  row
                >
                  <FormControlLabel
                    value={policyHolderTypeOptons[0]}
                    defaultChecked
                    control={<Radio />}
                    label={policyHolderTypeOptons[0]}
                  />
                  <FormControlLabel
                    value={policyHolderTypeOptons[1]}
                    control={<Radio />}
                    label={policyHolderTypeOptons[1]}
                  />
                </RadioGroup>
              </Grid>

              {
                quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type == 'used' &&
                <Grid item xs={12} md={6}>
                  <CommonAutoComplete
                    disablePortal
                    options={quoteData?.QUOTE_MASTER?.response?.previousPolicyType}
                    onChange={(e, newValue) => {
                      setSelectedData({
                        ...selectedData,
                        previousPolicyType: newValue?.value || null,
                      });
                    }}
                    value={
                      quoteData?.QUOTE_MASTER?.response?.previousPolicyType.find(
                        (option) => option.value === selectedData.previousPolicyType
                      ) || null
                    }
                    label="Previous Policy Type"
                    placeholder="Select Policy Type"
                    // error={!!errors.previousPolicyType}
                    // helperText={errors.previousPolicyType}
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    ListboxProps={{
                      style: { maxHeight: "100px", overflowY: "auto" },
                    }}
                  />
                </Grid>
              }

              {/* <Grid item xs={12} md={3}>
                <CommonAutoComplete
                  disablePortal
                  options={monthsData}
                  onChange={(e, newValue) => {
                    setSelectedData({
                      ...selectedData,
                      manufacturingMonth: newValue,
                    });
                  }}
                  ListboxProps={{
                    style: { maxHeight: '100px', overflowY: 'auto' } // reduced height
                  }}
                  label="Manufacturing Month"
                  placeholder="Select Month"
                  value={selectedData.manufacturingMonth}
                  error={!!errors.manufacturingMonth}
                  helperText={errors.manufacturingMonth}
                />
              </Grid> */}

              {/* <Grid item xs={12} md={3}>
                <CommonAutoComplete
                  disablePortal
                  options={quoteData?.QUOTE_MASTER?.response?.manufacture_year}
                  onChange={(e, newValue) => {
                    setSelectedData({
                      ...selectedData,
                      manufacturingYear: newValue,
                    });
                  }}
                  ListboxProps={{
                    style: { maxHeight: '100px', overflowY: 'auto' } // reduced height
                  }}
                  value={selectedData.manufacturingYear}
                  error={!!errors.manufacturingYear}
                  helperText={errors.manufacturingYear}
                  label="Manufacturing Year"
                  placeholder="Select Year"
                  sx={{
                    "& .MuiAutocomplete-popup": {
                      backgroundColor: "red",
                    },
                  }}
                />
              </Grid> */}

              <Grid item xs={12} md={6}>
                <CommonDatePicker
                  label="UAE Driving License Issue Date (DD/MM/YYYY)"
                  value={selectedData.carRegistrationDate}
                  minDate={
                    quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type === "new"
                      ? dayjs().subtract(7, "day")
                      : dayjs().year(dayjs(quoteDetailsObj?.registration_date).year()).startOf("year")
                  }
                  maxDate={
                    quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type === "new"
                      ? dayjs()
                      : dayjs().year(dayjs(quoteDetailsObj?.registration_date).year()).endOf("year")
                  }
                  error={!!errors.carRegistrationDate}
                  helperText={errors.carRegistrationDate}
                  onChange={(newValue) => {
                    setSelectedData({
                      ...selectedData,
                      carRegistrationDate: newValue,
                    });
                  }}
                />
              </Grid>

              {
                quoteData?.QUOTE_MASTER?.response?.is_previous_od_policy_insurer_visible &&
                <Grid item xs={12} md={6}>
                  <CommonAutoComplete
                    disablePortal
                    options={fetchedInsurerOptions?.response}
                    onChange={(e, newValue) => {
                      setOdInsurer(newValue?.value || null); // only store the value
                      // console.log("Selected value:", newValue?.value);
                    }}
                    value={fetchedInsurerOptions?.response.find((option) => option.value === odInsurer) || null}
                    label="Previous OD Policy Insurer"
                    placeholder="Select Previous OD Policy Insurer"
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    ListboxProps={{
                      style: { maxHeight: "100px", overflowY: "auto" },
                    }}
                  />
                </Grid>
              }

              {
                quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible &&
                <Grid item xs={12} md={6}>
                  <CommonDatePicker
                    label="Previous OD Policy Expiry Date"
                    value={selectedData.previousPolicyODExpiryDate}
                    minDate={dayjs()} // today
                    maxDate={dayjs().add(90, "day")} // 90 days from now
                    onChange={(newValue) => {
                      setSelectedData({
                        ...selectedData,
                        previousPolicyODExpiryDate: newValue,
                      });
                    }}
                  />
                </Grid>
              }



              {
                quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_insurer_visible &&
                <Grid item xs={12} md={6}>
                  <CommonAutoComplete
                    disablePortal
                    options={fetchedInsurerOptions?.response}
                    onChange={(e, newValue) => {
                      setTpInsurer(newValue?.value || null); // only store the value
                      // console.log("Selected value:", newValue?.value);
                    }}
                    value={fetchedInsurerOptions?.response.find((option) => option.value === tpInsurer) || null}
                    label="Previous TP Policy Insurer"
                    placeholder="Select TP Policy Insurer"
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    ListboxProps={{
                      style: { maxHeight: "100px", overflowY: "auto" },
                    }}
                  />
                </Grid>
              }

              {
                quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_expire_date_visible &&
                <Grid item xs={12} md={6}>
                  <CommonDatePicker
                    label="Previous TP Policy Expiry Date"
                    value={selectedData.previousPolicyTPExpiryDate}
                    onChange={(newValue) => {
                      setSelectedData({
                        ...selectedData,
                        previousPolicyTPExpiryDate: newValue,
                      });
                    }}
                  />
                </Grid>
              }

              {
                quoteData?.QUOTE_MASTER?.response?.is_previous_policy_expire_date_visible &&
                <Grid item xs={12} md={6}>
                  <CommonDatePicker
                    label="Previous Policy Expiry Date"
                    value={selectedData.previousPolicyExpiryDate}
                    onChange={(newValue) => {
                      setSelectedData({
                        ...selectedData,
                        previousPolicyExpiryDate: newValue,
                      });
                    }}
                  />
                </Grid>
              }

              {
                quoteData?.QUOTE_MASTER?.response?.is_previous_policy_insurer_visible &&
                <Grid item xs={12} md={6}>
                  <CommonAutoComplete
                    disablePortal
                    options={fetchedInsurerOptions?.response}
                    onChange={(e, newValue) => {
                      setInsurer(newValue?.value || null); // only store the value
                      // console.log("Selected value:", newValue?.value);
                    }}
                    value={fetchedInsurerOptions?.response.find((option) => option.value === insurer) || null}
                    label="Previous Policy Insurer"
                    placeholder="Select Previous Policy Insurer"
                    getOptionLabel={(option) => option.label || ""}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    ListboxProps={{
                      style: { maxHeight: "100px", overflowY: "auto" },
                    }}
                  />
                </Grid>
              }


              {/* <Grid item xs={12} md={6}>
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
                  value={selectedData.ownershipTransferred}
                  onChange={() => {
                    setSelectedData({
                      ...selectedData,
                      ownershipTransferred: !selectedData.ownershipTransferred,
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
              </Grid> */}

            </Grid>

            {/* <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowTable(!showTable);
                }}
              >
                <Link component="button" variant="body2" underline="always">
                  What Should I Choose?{" "}
                </Link>
                <KeyboardArrowDownRounded
                  sx={{
                    marginRight: 20,
                    color: "black",
                    transform: showTable ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Box>
              {showTable && (
                <Box>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              background: "grey",
                              color: "white",
                              border: "1px solid white",
                            }}
                          >
                            Years without claim
                          </TableCell>
                          <TableCell
                            sx={{
                              background: "grey",
                              color: "white",
                              border: "1px solid white",
                            }}
                            align="right"
                          >
                            Existing NCB%
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData.map((item, i) => {
                          return (
                            <TableRow>
                              <StyledTableCell>{item.title}</StyledTableCell>
                              <StyledTableCell align="right">
                                {item.value}
                              </StyledTableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )} */}

            {globalError && (
              <Box mt={2}>
                <Typography variant="body2" color="error">
                  {globalError}
                </Typography>
              </Box>
            )}
          </Box>
        );
      }}
      onClose={() => {
        setOpenModal(false);
      }}
      modalWidth={800}
      actionFooter={() => {
        return (
          <Button onClick={handleSubmit} variant="text" color="primary">
            Update
          </Button>
        );
      }}
    />
  );
};

export default PolicyExpSecction;
