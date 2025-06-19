import React, { forwardRef, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  Checkbox,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  styled,
  Grid,
  Divider,
  Card,
  CardContent,
  CircularProgress,
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";

import { useForm, Controller } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import DatePicker from "react-datepicker";
import moment from "moment";

import CustomTextField from "src/@core/components/mui/text-field";
import CustomLabel from "src/views/components/custom_label";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import dayjs from "dayjs";
import { getFormData } from "src/utility";
import { useDispatch, useSelector } from "react-redux";
import {
  actionFGMasterState,
  actionGetProposal,
  actionSubmitFGProposal,
  actionUpdateFGProposal,
  resetProposal,
  actionKYCStatus,
  actionFGMasterCity,
  actiFGtPaymentMake,
  resetSubmitFGProposal,
} from "src/store/future_generali_proposal";
import { setProposalId, setQuoteId } from "src/store/urlReference";
import { useRouter } from "next/router";
import { ERROR, UNAUTHORIZED } from "src/common/constants";
import Icon from "src/@core/components/icon";
import toast from "react-hot-toast";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { actionGetQuoteMaster, resetField } from "src/store/quoteDetails";
import BlankLayout from "src/@core/layouts/BlankLayout";
import PolicyAndCarDetails from "src/pageComponents/PolicyDetails";
import { isValid } from "date-fns";

// Custom styled components to match Vuexy template style
export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 700,
  margin: "0 auto",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "1.5rem",
}));

export const StepContainer = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #eee",
  "&:last-child": {
    borderBottom: "none",
  },
}));

// export const StepHeader = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: "1.5rem",
//   cursor: "pointer",
//   position: "relative",
// }));

// export const StepNumber = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   width: 32,
//   height: 32,
//   borderRadius: "50%",
//   backgroundColor: "#f0f2f5",
//   color: "#333",
//   fontWeight: 500,
//   marginRight: "1rem",
//   border: "1px solid #ddd",
// }));

// export const StepTitle = styled(Typography)(({ theme }) => ({
//   fontSize: "1.25rem",
//   fontWeight: 500,
//   color: "#333",
// }));

// export const EditButton = styled(Button)(({ theme }) => ({
//   position: "absolute",
//   right: "1.5rem",
//   backgroundColor: "transparent",
//   color: "red",
//   border: `1px solid red`,
//   // color: theme.palette.primary.main,
//   // border: `1px solid ${theme.palette.primary.main}`,
//   borderRadius: 4,
//   padding: "0.25rem 0.75rem",
//   fontSize: "0.75rem",
//   minWidth: "auto",
//   "&:hover": {
//     backgroundColor: "rgba(255, 112, 67, 0.04)",
//   },
// }));

const StepHeader = styled(Box)(({ theme }) => ({
  padding: '1.5rem',
  cursor: 'pointer',
  position: 'relative',
}));

const StepNumber = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: '50%',
  backgroundColor: '#f0f2f5',
  color: '#333',
  fontWeight: 500,
  border: '1px solid #ddd',
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 500,
  color: '#333',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'red',
  border: `1px solid red`,
  borderRadius: 4,
  padding: '0.25rem 0.75rem',
  fontSize: '0.75rem',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'rgba(255, 112, 67, 0.04)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '0.2rem 0.5rem',
    fontSize: '0.7rem',
  },
}));

export const StepContent = styled(Box)(({ theme }) => ({
  padding: "0 1.5rem 1.5rem",
}));

export const StyledFormGroup = styled(Box)(({ theme }) => ({
  marginBottom: "1.5rem",
}));

export const FormLabel = styled(Typography)(({ theme }) => ({
  display: "block",
  marginBottom: "0.5rem",
  color: "#333",
  fontWeight: 400,
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
}));

export const ValidationIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
  position: "absolute",
  right: "0.75rem",
  color: "#4caf50",
}));

export const ContinueButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff7043",
  color: "white",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  borderRadius: 4,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#f4511e",
  },
}));

export const DetailRow = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.5rem",
}));

export const DetailLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: "#666",
}));

export const DetailValue = styled(Typography)(({ theme }) => ({
  color: "#333",
}));

export const SummaryContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "0.5rem 1.5rem",
}));

export const SummarySection = styled(Box)(({ theme }) => ({
  // "& > *:first-of-type": {
  //   fontWeight: 500,
  //   marginBottom: "0.25rem",
  // },
}));

export const ReviewPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: 700,
  margin: "0 auto",
  borderRadius: 8,
  overflow: "hidden",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
}));

export const ReviewHeader = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  textAlign: "center",
  borderBottom: "1px solid #eee",
}));

export const ReviewSection = styled(Box)(({ theme }) => ({
  padding: "1.5rem",
  borderBottom: "1px solid #eee",
  position: "relative",
}));

// export const ReviewSectionTitle = styled(Typography)(({ theme }) => ({
//   color: "#666",
//   fontSize: "0.875rem",
//   textTransform: "uppercase",
//   marginBottom: "0.5rem",
// }));

// export const ReviewEditButton = styled(Button)(({ theme }) => ({
//   position: "absolute",
//   right: "1.5rem",
//   top: "1.5rem",
//   backgroundColor: "transparent",
//   color: theme.palette.primary.main,
//   border: `1px solid ${theme.palette.primary.main}`,
//   borderRadius: 4,
//   padding: "0.25rem 0.75rem",
//   fontSize: "0.75rem",
//   minWidth: "auto",
//   "&:hover": {
//     backgroundColor: "rgba(255, 112, 67, 0.04)",
//   },
// }));

const ReviewSectionTitle = styled(Typography)(({ theme }) => ({
  color: '#666',
  fontSize: '0.875rem',
  textTransform: 'uppercase',
}));

const ReviewEditButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  color: 'red',
  border: `1px solid red`,
  borderRadius: 4,
  padding: '0.25rem 0.75rem',
  fontSize: '0.75rem',
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: 'rgba(255, 112, 67, 0.04)',
  }
}));

export const InformationBox = styled(Box)(({ theme }) => ({
  marginBottom: "1rem",
}));

export const CompleteKYCButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "white",
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  borderRadius: 4,
  textTransform: "none",
  width: "100%",
  maxWidth: "300px",
  margin: "1rem auto",
  display: "block",
  "&:hover": {
    backgroundColor: "#f4511e",
  },
}));

const CustomInput = forwardRef(({ ...props }, ref) => {
  return (
    <CustomTextField
      fullWidth
      inputRef={ref}
      {...props}
      sx={{ width: "100%" }}
    />
  );
});

const CheckoutStepper = () => {
  const theme = useTheme();
  const router = useRouter();
  const { QUOTE_MASTER } = useSelector((state) => state.quoteDetailsStore);

  const { QUOTE_ID, PROPOSAL_ID } = useSelector(
    (state) => state?.urlReferenceStore
  );
  // const QUOTE_ID =  "ca9ec82323-15de-45d7-a40d-ffc66f602850"
  // const PROPOSAL_ID=  "prb76072cf-a05a-437b-8f9a-20a194924fa9"
  const {
    getFGProposalDetails,
    proposalFGUpdate,
    proposalFGSubmit,
    kycStatus,
    getFGMasterState,
    getFGMasterCity,
    getFGPaymentDetails
  } = useSelector((state) => state.futureGeneraliProposalStore);
  const {
    control: carOwnerDetailsControl,
    handleSubmit: carOwnerDetailsHandleSubmit,
    setValue: carOwnerDetailsSetValue,
    watch: carOwnerDetailsWatch,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm();
  const {
    control: communicationAddressControl,
    handleSubmit: communicationAddressHandleSubmit,
    setValue: communicationAddressSetValue,
    watch: communicationAddressWatch,
    formState: { errors: communicationAddressErrors },
    reset: communicationAddressReset,
    setError: communicationAddressSetError,
    clearErrors: communicationAddressClearErrors,
  } = useForm();
  const watchState = communicationAddressWatch("state");

  const {
    control: vehicleDetailsControl,
    handleSubmit: vehicleDetailsHandleSubmit,
    setValue: vehicleDetailsSetValue,
    watch: vehicleDetailsWatch,
    formState: { errors: vehicleDetailsErrors },
    reset: vehicleDetailsReset,
    setError: vehicleDetailsSetError,
    clearErrors: vehicleDetailsClearErrors,
  } = useForm();
  const {
    control: nomineeDetailsControl,
    handleSubmit: nomineeDetailsHandleSubmit,
    setValue: nomineeDetailsSetValue,
    watch: nomineeDetailsWatch,
    formState: { errors: nomineeDetailsErrors },
    reset: nomineeDetailsReset,
    setError: nomineeDetailsSetError,
    clearErrors: nomineeDetailsClearErrors,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);

  const [isKycStatusButtonDisabled, setIsKycStatusButtonDisabled] =
    useState(false);
  const [isMakePaymentButtonDisabled, setIsMakePaymentButtonDisabled] =
    useState(true);

  const [kycStatusButtonLoading, setKycStatusButtonLoading] = useState(false);

  const [isRegNoDisabled, setIsRegNoDisabled] = useState(false);


  const [dropdownGender, setDropDownGender] = useState([]);
  const [dropdownSalutation, setDropDownSalutation] = useState([]);
  const [dropdownMaritalStatus, setDropDownMaritalStatus] = useState([]);
  const [dropdownOccupation, setDropDownOccupation] = useState([]);
  const [dropDownCity, setDropDownCity] = useState([]);
  const [dropDownState, setDropDownState] = useState([]);

  const [masterDetails, setMasterDetails] = useState(null);


  const [dropdownMonth, setDropDownMonth] = useState([
    {
      label: "January",
      value: "1",
    },
    {
      label: "February",
      value: "2",
    },
    {
      label: "March",
      value: "3",
    },
    {
      label: "April",
      value: "4",
    },
    {
      label: "May",
      value: "5",
    },
    {
      label: "June",
      value: "6",
    },
    {
      label: "July",
      value: "7",
    },
    {
      label: "August",
      value: "8",
    },
    {
      label: "September",
      value: "9",
    },
    {
      label: "October",
      value: "10",
    },
    {
      label: "November",
      value: "11",
    },
    {
      label: "December",
      value: "12",
    },
  ]);

  const [dropdownYear, setDropDownYear] = useState([
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
    { label: "2017", value: "2017" },
    { label: "2016", value: "2016" },
    { label: "2015", value: "2015" },
    { label: "2014", value: "2014" },
    { label: "2013", value: "2013" },
    { label: "2012", value: "2012" },
    { label: "2011", value: "2011" },
    { label: "2010", value: "2010" },
  ]);


  useEffect(() => {
    if (watchState && watchState !== null) {
      dispatch(
        actionFGMasterCity({
          state_id: watchState.value,
        })
      );

      communicationAddressSetValue('city', '')
    }

  }, [watchState])

  useEffect(() => {
    console.log("KYC", kycStatus);
    if (kycStatus !== null && kycStatus !== undefined) {
      if (kycStatus.status === 200 || kycStatus?.message === 'Kyc is not submitted yet.') {
        setKycVerified(true);
        toast.success(kycStatus.message);
      } else {
        toast.error("KYC not verified");
        setKycVerified(false);
      }
      console.log("KYC", kycStatus.status);
    }
  }, [kycStatus]);

  const [dropdownNomineeRelation, setdropdownNomineeRelation] = useState([
    { label: "Father", value: "FATHER" },
    { label: "Mother", value: "MOTHER" },
    { label: "Brother", value: "BROTHER" },
    { label: "Sister", value: "SISTER" },
  ]);

  const [dropdownDocuments, setDropdownDocuments] = useState([
    { label: "Aadhar", value: "aadhar" },
    { label: "PAN", value: "PAN" },
    { label: "Driving License", value: "dirving licnese" },
  ]);

  const minDate = moment().subtract(18, "years").startOf("day").toDate(); // 18 years ago at midnight

  const [activeStep, setActiveStep] = useState(1);
  const [showReview, setShowReview] = useState(false);

  const [proposalObjectDetails, setProposalObjectDetails] = useState(null);

  const dispatch = useDispatch();

  const [termsAccepted, setTermsAccepted] = useState(false);

  function transformGenderArray(inputArray, type) {
    const filteredGenders = inputArray?.filter((item) => item.type === type);

    return filteredGenders?.map((item) => {
      return {
        label: item.pjMasterGeneral.label,
        value: item.pjMasterGeneral.id,
      };
    });
  }

  function transformNomineeRelationships(inputArray) {
    return inputArray.map((item) => {
      return {
        label: item.pjMasterNomineeRelationships.label,
        value: item.pjMasterNomineeRelationships.id,
      };
    });
  }

  function transFarmState(inputArray) {
    return inputArray.map((item) => {
      return {
        label: item.label,
        value: item.id,
      };
    });
  }

  function transFarmCity(inputArray) {
    return inputArray.map((item) => {
      return {
        label: item.masterCity.label,
        value: item.masterCity.id,
      };
    });
  }

  function transformOccupation(inputArray) {
    return inputArray.map((item) => {
      return {
        label: item.pjMasterOccupations.label,
        value: item.pjMasterOccupations.id,
      };
    });
  }

  function transformKYCDocTypes(inputArray) {
    return inputArray.map((item) => {
      return {
        label: item.pjMasterKYCDocTypes.label,
        value: item.pjMasterKYCDocTypes.id,
      };
    });
  }

  const handleToggleStep = (step) => {
    if (activeStep === step) {
      return;
    }
    setActiveStep(step);
    setShowReview(false);
  };

  const handleGoToStep = (step) => {
    setActiveStep(step);
    setShowReview(false);
  };

  const handleEditStep = (step) => {
    setActiveStep(step);
    setShowReview(false);
  };



  // useEffect(() => {
  //   if (proposalFGSubmit !== null) {
  //     if (proposalFGSubmit.status == 200) {
  //       setShowReview(true);
  //     } else {
  //       toast.error(proposalFGSubmit?.message?.message);
  //     }
  //     setLoading(false);
  //   }
  // }, [proposalFGSubmit]);

  const handleContinueToReview = () => {
    // setShowReview(true);

    setLoading(true);
    let input = {
      reference_id: QUOTE_ID,
      proposal_id: PROPOSAL_ID,
      salutation_master_id: carOwnerDetailsWatch("salutation_master_id")?.value,
      marital_status_master_id: carOwnerDetailsWatch("marital_status_master_id")?.value,
      occupation_master_id: carOwnerDetailsWatch("occupation_master_id")?.value,
      first_name: carOwnerDetailsWatch("first_name"),
      last_name: carOwnerDetailsWatch("last_name"),
      email_id: carOwnerDetailsWatch("email_id"),
      mobile_no: carOwnerDetailsWatch("mobile_no"),
      gender_master_id: carOwnerDetailsWatch("gender_master_id")?.value,
      date_of_birth: dayjs(carOwnerDetailsWatch("date_of_birth")).format(
        "YYYY-MM-DD"
      ),
      address_line_1: communicationAddressWatch("address_line_1"),
      pincode: communicationAddressWatch("pincode"),
      address_line_2: communicationAddressWatch("address_line_2"),
      city_master_id: communicationAddressWatch("city")?.value,
      state_mater_id: communicationAddressWatch("state")?.value,
      vehicle_registration_no: vehicleDetailsWatch("vehicle_registration_no"),
      engine_no: vehicleDetailsWatch("engine_no"),
      chassis_no: vehicleDetailsWatch("chassis_no"),
      is_car_financed: vehicleDetailsWatch("is_car_financed"),
      // financed_company: vehicleDetailsWatch("financed_company"),
      nominee_name: nomineeDetailsWatch("nominee_name"),
      nominee_dob: dayjs(nomineeDetailsWatch("nominee_dob")).format(
        "YYYY-MM-DD"
      ),
      nominee_relationship_master_id: nomineeDetailsWatch(
        "nominee_relationship_master_id"
      )?.value,
      proposer_type: proposalObjectDetails?.pjCarQuotationDetails?.proposer_type
    };



    if (vehicleDetailsWatch("is_car_financed") == "true") {
      input.financed_company = vehicleDetailsWatch("financed_company");
    }
    console.log(vehicleDetailsWatch("financed_company"));

    if (masterDetails?.is_previous_tp_policy_no_visible) {
      input.previous_tp_policy_no = vehicleDetailsWatch('previous_tp_policy_no')
    }
    if (masterDetails?.is_previous_policy_no_visible) {
      input.prev_policy_no = vehicleDetailsWatch('prev_policy_no')
    }

    if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Individual') {
      input.date_of_birth = null;
      input.gender_master_id = null;
      input.salutation_master_id = null;
      input.marital_status_master_id = null;
      input.occupation_master_id = null;
      input.last_name = null;
    }

    console.log("INPUT", input);

    dispatch(actionSubmitFGProposal(input));
  };

  const makePayment = () => {
    let params = {
      proposal_id: PROPOSAL_ID,
      reference_id: QUOTE_ID,
    };
    dispatch(actiFGtPaymentMake(params));
  };

  useEffect(() => {
    if (proposalFGUpdate !== null && proposalFGUpdate.status == 200) {
      activeStep < 4
        ? handleGoToStep(activeStep + 1)
        : handleContinueToReview();
      if (proposalFGUpdate?.message) {
        toast.success(proposalFGUpdate?.message);
      }
    } else {
      if (proposalFGUpdate?.message) {
        toast.error(proposalFGUpdate?.message);
      }
    }
  }, [proposalFGUpdate]);

  // useEffect(() => {
  //   if (proposalFGSubmit !== null) {
  //     if (proposalFGSubmit.status == 200) {
  //       setShowReview(true);
  //       // console.log("rohan set show review true here", proposalFGSubmit);
  //     } else {
  //       if (proposalFGSubmit?.message) {
  //         toast.error(proposalFGSubmit?.message);
  //       }
  //     }
  //     setLoading(false);
  //   }
  // }, [proposalFGSubmit]);

  useEffect(() => {
    if (proposalFGSubmit !== null) {
      dispatch(resetSubmitFGProposal())
      if (proposalFGSubmit?.result) {
        setShowReview(true);
        setLoading(false);
      } else {
        setLoading(false);
        toast.error(proposalFGSubmit?.message || "Some error occured");
      }

    }
  }, [proposalFGSubmit]);

  useEffect(() => {
    handleGoToStep(1);
    dispatch(actionFGMasterState());
    console.log("testing", QUOTE_ID, PROPOSAL_ID);
    if (QUOTE_ID !== null && PROPOSAL_ID !== null) {
      dispatch(
        actionKYCStatus({
          reference_id: QUOTE_ID,
          proposal_id: PROPOSAL_ID,
        })
      );
    }
  }, [QUOTE_ID, PROPOSAL_ID]);

  //master state api response
  useEffect(() => {
    if (getFGMasterState !== null && getFGMasterState !== undefined) {
      if (getFGMasterState.status === 200) {
        setDropDownState(transFarmState(getFGMasterState.response));
      } else {
        setDropDownState([]);
      }
    }
  }, [getFGMasterState]);

  //master city api response
  useEffect(() => {
    if (getFGMasterCity !== null && getFGMasterCity !== undefined) {
      if (getFGMasterCity.status === 200) {
        setDropDownCity(transFarmCity(getFGMasterCity.response));
      } else {
        setDropDownCity([]);
      }
    }
  }, [getFGMasterCity]);

  const submitCarOwnerDetails = (data) => {
    // console.log("dataaa", data);
    let params = {
      ...data,
      salutation_master_id: data.salutation_master_id?.value,
      marital_status_master_id: data.marital_status_master_id?.value,
      occupation_master_id: data.occupation_master_id?.value,
      date_of_birth: dayjs(data.date_of_birth).format("YYYY-MM-DD"),
      gender_master_id: data.gender_master_id?.value,
      section: "owner",
      proposal_id: PROPOSAL_ID,
      reference_id: QUOTE_ID,
      proposer_type: proposalObjectDetails?.pjCarQuotationDetails?.proposer_type,
    };

    if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Individual') {
      params.date_of_birth = null;
      params.gender_master_id = null;
      params.salutation_master_id = null;
      params.marital_status_master_id = null;
      params.occupation_master_id = null;
      params.last_name = null;
    }
    console.log(params);
    dispatch(actionUpdateFGProposal(params));
  };

  const submitAddressDetails = (data) => {
    let params = {
      address_line_1: data.address_line_1,
      address_line_2: data.address_line_2,
      pincode: data.pincode,
      city_master_id: data.city.value,
      state_mater_id: data.state.value,
      section: "address",
      proposal_id: PROPOSAL_ID,
      reference_id: QUOTE_ID,
    };
    console.log(params);
    dispatch(actionUpdateFGProposal(params));
    //  handleGoToStep(3);
  };

  const submitVehicleDetails = (data) => {
    let params = {
      vehicle_registration_no: data.vehicle_registration_no,
      engine_no: data.engine_no,
      chassis_no: data.chassis_no,
      is_car_financed: data.is_car_financed,
      section: "vehicle",
      proposal_id: PROPOSAL_ID,
      reference_id: QUOTE_ID,
    };

    if (data.is_car_financed == "true") {
      params.financed_company = data.financed_company;
    }

    if (masterDetails?.is_previous_tp_policy_no_visible) {
      params.previous_tp_policy_no = data.previous_tp_policy_no
    }

    if (masterDetails?.is_previous_policy_no_visible) {
      params.prev_policy_no = data.prev_policy_no
    }
    // console.log(test);
    dispatch(actionUpdateFGProposal(params));
  };

  const submitNomineeDetails = (data) => {
    let params = {
      ...data,
      nominee_dob: dayjs(data.nominee_dob).format("YYYY-MM-DD"),
      // appointee_relationship: data.appointee_relationship.value,
      nominee_relationship_master_id: data.nominee_relationship_master_id.value,
      section: "nominee",
      proposal_id: PROPOSAL_ID,
      reference_id: QUOTE_ID,
    };
    dispatch(actionUpdateFGProposal(params));
  };

  useEffect(() => {
    if (!QUOTE_ID) {
      const storedQuoteId = localStorage.getItem("QUOTE_ID");
      if (storedQuoteId) {
        dispatch(setQuoteId(storedQuoteId));
      }
    }
    if (!PROPOSAL_ID) {
      const storedProposalId = localStorage.getItem("PROPOSAL_ID");
      if (storedProposalId) {
        dispatch(setProposalId(storedProposalId));
      }
    }
  }, [dispatch, QUOTE_ID, PROPOSAL_ID]);

  useEffect(() => {
    if (QUOTE_ID && PROPOSAL_ID) {
      // router.push({
      //     pathname: "/fourwheeler/future_generali/proposal_checkout",
      //     query: {
      //         quoteId: QUOTE_ID,
      //         proposalId: PROPOSAL_ID
      //     },
      // });
      // fetchProposal();
      let params = {
        reference_id: QUOTE_ID,
        proposal_id: PROPOSAL_ID,
      };

      dispatch(actionGetProposal(params));
      dispatch(actionGetQuoteMaster({ reference_id: QUOTE_ID }));
    }
  }, [QUOTE_ID, PROPOSAL_ID]);

  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.gender_master_id &&
      dropdownGender?.length > 0
    ) {
      const matchedGender = dropdownGender.find(
        (gender) => gender?.value === proposalObjectDetails?.gender_master_id
      );
      if (matchedGender) {
        carOwnerDetailsSetValue("gender_master_id", matchedGender);
      }
    }
  }, [proposalObjectDetails, dropdownGender]);


  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.salutation_master_id &&
      dropdownSalutation?.length > 0
    ) {
      console.log("salutation_master_id", proposalObjectDetails?.salutation_master_id)
      console.log("salutation_master_id", dropdownSalutation)
      const matchedSalutation = dropdownSalutation.find(
        (salutation) => salutation?.value === proposalObjectDetails?.salutation_master_id
      );
      if (matchedSalutation) {
        console.log("salutation_master_id", matchedSalutation)

        carOwnerDetailsSetValue("salutation_master_id", matchedSalutation);
      }
    }
  }, [proposalObjectDetails, dropdownSalutation]);

  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.marital_status_master_id &&
      dropdownMaritalStatus?.length > 0
    ) {

      const matchedMaritual = dropdownMaritalStatus.find(
        (marriedStatus) => marriedStatus?.value === proposalObjectDetails?.marital_status_master_id
      );
      if (matchedMaritual) {
        carOwnerDetailsSetValue("marital_status_master_id", matchedMaritual);
      }
    }
  }, [proposalObjectDetails, dropdownMaritalStatus]);

  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.occupation_master_id &&
      dropdownOccupation?.length > 0
    ) {

      const matchedOcc = dropdownOccupation.find(
        (occupation) => occupation?.value === proposalObjectDetails?.occupation_master_id
      );
      if (matchedOcc) {
        carOwnerDetailsSetValue("occupation_master_id", matchedOcc);
      }
    }
  }, [proposalObjectDetails, dropdownOccupation]);

  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.state_id &&
      dropdownMaritalStatus?.length > 0
    ) {
      const matchedState = dropDownState.find(
        (state) => state?.value === proposalObjectDetails?.state_id
      );
      if (matchedState) {
        communicationAddressSetValue("state", matchedState);
      }
    }
  }, [proposalObjectDetails, dropDownState]);

  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.city_master_id &&
      dropdownMaritalStatus?.length > 0
    ) {

      const matchedCity = dropDownCity.find(
        (city) => city?.value === proposalObjectDetails?.city_master_id
      );
      if (matchedCity) {
        communicationAddressSetValue("city", matchedCity);
      }
    }
  }, [proposalObjectDetails, dropDownCity]);

  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.nominee_relationship_master_id &&
      dropdownNomineeRelation?.length > 0
    ) {
      const matchedNominee = dropdownNomineeRelation.find(
        (relation) =>
          relation?.value ===
          proposalObjectDetails?.nominee_relationship_master_id
      );
      if (matchedNominee) {
        nomineeDetailsSetValue(
          "nominee_relationship_master_id",
          matchedNominee
        );
      }
    }
  }, [proposalObjectDetails, dropdownNomineeRelation]);

  useEffect(() => {
    if (
      proposalObjectDetails !== null &&
      proposalObjectDetails !== undefined &&
      proposalObjectDetails?.kyc_json?.ckycReferenceDocId &&
      dropdownDocuments?.length > 0
    ) {
      const matchedDoc = dropdownDocuments.find(
        (doc) =>
          doc?.value === proposalObjectDetails?.kyc_json?.ckycReferenceDocId
      );
      if (matchedDoc) {
        kycDetailsSetValue("ckyc_doc_type_master_id", matchedDoc);
      }
    }
  }, [proposalObjectDetails, dropdownDocuments]);

  useEffect(() => {
    if (proposalObjectDetails !== null && proposalObjectDetails !== undefined) {
      if (proposalObjectDetails?.is_car_financed == 1) {
        vehicleDetailsSetValue("is_car_financed", "true");
      } else if (proposalObjectDetails?.is_car_financed == 0) {
        vehicleDetailsSetValue("is_car_financed", "false");
      }
    }
  }, [proposalObjectDetails]);

  useEffect(() => {
    if (QUOTE_MASTER !== null) {
      resetField('QUOTE_MASTER');
      if (QUOTE_MASTER?.result == true) {
        setMasterDetails(QUOTE_MASTER?.response);
      } else {
        switch (QUOTE_MASTER?.status) {
          case UNAUTHORIZED:
            break;
          case ERROR:
            console.error("An error occurred.");
            break;
          default:
            console.warn("Unhandled status:", QUOTE_MASTER?.status);
        }
      }
    }
  }, [QUOTE_MASTER])

  useEffect(() => {
    if (getFGProposalDetails !== null) {
      dispatch(resetProposal());
      // console.log("kfhskfh", getFGProposalDetails);
      if (getFGProposalDetails?.result == true) {
        setProposalObjectDetails(getFGProposalDetails?.response);

        carOwnerDetailsSetValue(
          "first_name",
          getFGProposalDetails?.response?.first_name || ""
        );
        carOwnerDetailsSetValue(
          "last_name",
          getFGProposalDetails?.response?.last_name || ""
        );
        // carOwnerDetailsSetValue('gender_master_id', getFGProposalDetails?.response?.gender_master_id || '');
        carOwnerDetailsSetValue(
          "email_id",
          getFGProposalDetails?.response?.email_id || ""
        );
        carOwnerDetailsSetValue(
          "mobile_no",
          getFGProposalDetails?.response?.mobile_no || ""
        );
        carOwnerDetailsSetValue(
          "date_of_birth",
          getFGProposalDetails?.response?.date_of_birth || ""
        );

        communicationAddressSetValue(
          "address_line_1",
          getFGProposalDetails?.response?.address_line_1 || ""
        );
        communicationAddressSetValue(
          "address_line_2",
          getFGProposalDetails?.response?.address_line_2 || ""
        );
        communicationAddressSetValue(
          "pincode",
          getFGProposalDetails?.response?.pincode || ""
        );

        vehicleDetailsSetValue(
          "vehicle_registration_no",
          getFGProposalDetails?.response?.vehicle_registration_no || ""
        );
        vehicleDetailsSetValue(
          "engine_no",
          getFGProposalDetails?.response?.engine_no || ""
        );
        vehicleDetailsSetValue(
          "chassis_no",
          getFGProposalDetails?.response?.chassis_no || ""
        );
        vehicleDetailsSetValue(
          "previous_tp_policy_no",
          getFGProposalDetails?.response?.previous_tp_policy_no || ""
        );
        vehicleDetailsSetValue(
          "prev_policy_no",
          getFGProposalDetails?.response?.prev_policy_no || ""
        );
        // vehicleDetailsSetValue('is_car_financed', getFGProposalDetails?.response?.is_car_financed || '');
        vehicleDetailsSetValue(
          "financed_company",
          getFGProposalDetails?.response?.financed_company || ""
        );
        // vehicleDetailsSetValue(
        //   "manufactured_month",
        //   getFGProposalDetails?.response?.manufactured_month || ""
        // );
        // vehicleDetailsSetValue(
        //   "manufactured_year",
        //   getFGProposalDetails?.response?.manufactured_year || ""
        // );

        nomineeDetailsSetValue(
          "nominee_name",
          getFGProposalDetails?.response?.nominee_name || ""
        );
        nomineeDetailsSetValue(
          "nominee_dob",
          getFGProposalDetails?.response?.nominee_dob || ""
        );
        nomineeDetailsSetValue(
          "nominee_relationship_master_id",
          getFGProposalDetails?.response?.nominee_relationship_master_id || ""
        );

        let genders = transformGenderArray(
          getFGProposalDetails?.response?.masters?.general_master,
          "gender"
        );
        setDropDownGender(genders);

        let salutation = transformGenderArray(
          getFGProposalDetails?.response?.masters?.general_master,
          "salutation"
        );
        setDropDownSalutation(salutation);

        let marital_status = transformGenderArray(
          getFGProposalDetails?.response?.masters?.general_master,
          "marital_status"
        );
        setDropDownMaritalStatus(marital_status);

        let nomineeRelationships = transformNomineeRelationships(
          getFGProposalDetails?.response?.masters?.nominee_master
        );
        setdropdownNomineeRelation(nomineeRelationships);

        let occupationMaster = transformOccupation(
          getFGProposalDetails?.response?.masters?.occupation_master
        );
        setDropDownOccupation(occupationMaster);
      } else {
        switch (getFGProposalDetails?.status) {
          case UNAUTHORIZED:
            break;
          case ERROR:
            console.error("An error occurred.");
            break;
          default:
            console.warn("Unhandled status:", getFGProposalDetails?.status);
        }
      }
    }
  }, [getFGProposalDetails]);


  useEffect(() => {
    if (getFGPaymentDetails !== null) {
      if (getFGPaymentDetails?.status == 200) {
        // console.log("rohanrana", getFGPaymentDetails);
        const container = document.createElement('div');
        container.innerHTML = getFGPaymentDetails?.response?.content;

        // Append it to the body
        document.body.appendChild(container);

        // Find the form and submit it
        const form = container.querySelector('form');
        if (form) {
          form.submit();
        }
      }
    }
  }, [getFGPaymentDetails])

  useEffect(() => {
    if (proposalObjectDetails !== null && proposalObjectDetails !== undefined) {
      if (proposalObjectDetails?.pjCarEnquiryDetails?.insurance_type == 'new') {
        setIsRegNoDisabled(true);
        vehicleDetailsSetValue('vehicle_registration_no', "NEW")
      }
    }
  }, [proposalObjectDetails])


  if (showReview) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // padding: "2rem",
          padding: {
            xs: '1rem',
            sm: '2rem'
          },
          backgroundColor: "#f0f2f5",
          minHeight: "100vh",
          fontFamily: '"Roboto", sans-serif',
        }}
      >
        <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, color: "#333", marginBottom: "0.5rem" }}
          >
            CHECKOUT
          </Typography>
          <Typography variant="body1" sx={{ color: "#666" }}>
            Fill the form below → Review details → Get policy
          </Typography>
        </Box>

        <ReviewPaper>
          <ReviewHeader>
            <Typography variant="h5" sx={{ fontWeight: 500 }}>
              IMPORTANT DETAILS TO REVIEW BEFORE PAYMENT
            </Typography>
          </ReviewHeader>

          {/* Car Owner Section */}
          <ReviewSection>
            {/* <ReviewSectionTitle>CAR OWNER DETAILS</ReviewSectionTitle>
            <ReviewEditButton onClick={() => handleEditStep(1)}>
              EDIT
            </ReviewEditButton> */}
            <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
              <Grid item xs={8} sm={9} md={10}>
                <ReviewSectionTitle>
                  CAR OWNER DETAILS
                </ReviewSectionTitle>
              </Grid>
              <Grid item xs={4} sm={3} md={2}>
                <ReviewEditButton
                  onClick={() => handleEditStep(1)}
                  fullWidth
                  sx={{
                    // Additional responsive styles
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    padding: { xs: '0.2rem 0.5rem', sm: '0.25rem 0.75rem' }
                  }}
                >
                  EDIT
                </ReviewEditButton>
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Name
                    </Typography>
                    <Typography variant="body2">
                      {carOwnerDetailsWatch("salutation_master_id")?.label + " " + carOwnerDetailsWatch("first_name") + " " + carOwnerDetailsWatch("last_name")}
                    </Typography>
                  </InformationBox>
                }

                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization' &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Company Name
                    </Typography>
                    <Typography variant="body2">
                      {carOwnerDetailsWatch("first_name")}
                    </Typography>
                  </InformationBox>
                }

                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Phone
                  </Typography>
                  <Typography variant="body2">
                    {carOwnerDetailsWatch("mobile_no")}
                  </Typography>
                </InformationBox>

                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Gender
                    </Typography>
                    <Typography variant="body2">
                      {carOwnerDetailsWatch()?.gender_master_id?.label}
                    </Typography>
                  </InformationBox>
                }

                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Occupation
                    </Typography>
                    <Typography variant="body2">
                      {carOwnerDetailsWatch()?.occupation_master_id?.label}
                    </Typography>
                  </InformationBox>
                }
              </Grid>

              <Grid item xs={12} sm={6}>
                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Email
                  </Typography>
                  <Typography variant="body2">
                    {carOwnerDetailsWatch("email_id")}
                  </Typography>
                </InformationBox>

                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Date of Birth
                    </Typography>
                    <Typography variant="body2">
                      {carOwnerDetailsWatch()?.date_of_birth
                        ? dayjs(carOwnerDetailsWatch()?.date_of_birth).format(
                          "DD-MM-YYYY"
                        )
                        : ""}
                    </Typography>
                  </InformationBox>
                }

                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Marital Status
                    </Typography>
                    <Typography variant="body2">
                      {carOwnerDetailsWatch()?.marital_status_master_id?.label}
                    </Typography>
                  </InformationBox>
                }
              </Grid>
            </Grid>
          </ReviewSection>

          <ReviewSection>
            {/* <ReviewSectionTitle>COMMUNICATION ADDRESS</ReviewSectionTitle>
            <ReviewEditButton onClick={() => handleEditStep(2)}>
              EDIT
            </ReviewEditButton> */}
            <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
              <Grid item xs={8} sm={9} md={10}>
                <ReviewSectionTitle>
                  COMMUNICATION ADDRESS
                </ReviewSectionTitle>
              </Grid>
              <Grid item xs={4} sm={3} md={2}>
                <ReviewEditButton
                  onClick={() => handleEditStep(2)}
                  fullWidth
                  sx={{
                    // Additional responsive styles
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    padding: { xs: '0.2rem 0.5rem', sm: '0.25rem 0.75rem' }
                  }}
                >
                  EDIT
                </ReviewEditButton>
              </Grid>
            </Grid>

            <Typography variant="body2">
              {communicationAddressWatch("address_line_1")}{", "}{communicationAddressWatch("address_line_2")}{", "}{communicationAddressWatch("city")?.label}{", "}{communicationAddressWatch("state")?.label} - {communicationAddressWatch("pincode")}
            </Typography>
          </ReviewSection>

          {/* Vehicle Details Section */}
          <ReviewSection>
            {/* <ReviewSectionTitle>VEHICLE DETAILS</ReviewSectionTitle>
            <ReviewEditButton onClick={() => handleEditStep(3)}>
              EDIT
            </ReviewEditButton> */}
            <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
              <Grid item xs={8} sm={9} md={10}>
                <ReviewSectionTitle>
                  VEHICLE DETAILS
                </ReviewSectionTitle>
              </Grid>
              <Grid item xs={4} sm={3} md={2}>
                <ReviewEditButton
                  onClick={() => handleEditStep(3)}
                  fullWidth
                  sx={{
                    // Additional responsive styles
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    padding: { xs: '0.2rem 0.5rem', sm: '0.25rem 0.75rem' }
                  }}
                >
                  EDIT
                </ReviewEditButton>
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Registration Number
                  </Typography>
                  <Typography variant="body2">
                    {vehicleDetailsWatch("vehicle_registration_no")}
                  </Typography>
                </InformationBox>
                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Chassis Number
                  </Typography>
                  <Typography variant="body2">
                    {vehicleDetailsWatch("chassis_no")}
                  </Typography>
                </InformationBox>

                {masterDetails?.is_previous_tp_policy_no_visible &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Previous TP Policy Number
                    </Typography>
                    <Typography variant="body2">
                      {vehicleDetailsWatch("previous_tp_policy_no")}
                    </Typography>
                  </InformationBox>
                }

                {masterDetails?.is_previous_policy_no_visible &&
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                    >
                      Previous Policy Number
                    </Typography>
                    <Typography variant="body2">
                      {vehicleDetailsWatch("prev_policy_no")}
                    </Typography>
                  </InformationBox>
                }
              </Grid>
              <Grid item xs={12} sm={6}>
                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Engine Number
                  </Typography>
                  <Typography variant="body2">
                    {vehicleDetailsWatch("engine_no")}
                  </Typography>
                </InformationBox>



                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Is Car Financed
                  </Typography>
                  <Typography variant="body2">
                    {vehicleDetailsWatch()?.is_car_financed == "true"
                      ? "Yes"
                      : "No"}
                  </Typography>
                </InformationBox>
                {vehicleDetailsWatch()?.is_car_financed == "true" && (
                  <InformationBox>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      Financing Company
                    </Typography>
                    <Typography variant="body2">
                      {vehicleDetailsWatch("financed_company")}
                    </Typography>
                  </InformationBox>
                )}
              </Grid>
            </Grid>
          </ReviewSection>

          {/* Nominee Details Section */}
          <ReviewSection>
            {/* <ReviewSectionTitle>NOMINEE DETAILS</ReviewSectionTitle>
            <ReviewEditButton onClick={() => handleEditStep(4)}>
              EDIT
            </ReviewEditButton> */}
            <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
              <Grid item xs={8} sm={9} md={10}>
                <ReviewSectionTitle>
                  NOMINEE DETAILS
                </ReviewSectionTitle>
              </Grid>
              <Grid item xs={4} sm={3} md={2}>
                <ReviewEditButton
                  onClick={() => handleEditStep(4)}
                  fullWidth
                  sx={{
                    // Additional responsive styles
                    fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    padding: { xs: '0.2rem 0.5rem', sm: '0.25rem 0.75rem' }
                  }}
                >
                  EDIT
                </ReviewEditButton>
              </Grid>
            </Grid>

            <Grid container columnSpacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Nominee Name
                  </Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                    {nomineeDetailsWatch("nominee_name")}
                  </Typography>
                </InformationBox>
                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Nominee Date of Birth
                  </Typography>
                  <Typography variant="body2">
                    {nomineeDetailsWatch()?.nominee_dob
                      ? dayjs(nomineeDetailsWatch()?.nominee_dob).format(
                        "DD-MM-YYYY"
                      )
                      : ""}
                  </Typography>
                </InformationBox>
              </Grid>
              <Grid item xs={12} sm={6}>
                <InformationBox>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                  >
                    Nominee Relation
                  </Typography>
                  <Typography variant="body2">
                    {
                      nomineeDetailsWatch()?.nominee_relationship_master_id
                        ?.label
                    }
                  </Typography>
                </InformationBox>
              </Grid>
            </Grid>
          </ReviewSection>

          {/* Terms and Conditions */}
          <Box sx={{ padding: "1.5rem" }}>
            <Button variant="contained" onClick={makePayment}>
              Make Payment
            </Button>
          </Box>
        </ReviewPaper>
      </Box>
    );
  }

  const InfoRow = ({ label, value }) => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      sx={{ borderBottom: "1px solid #eee" }}
    >
      <Typography variant="body2" color="text.primary">
        {label}
      </Typography>
      <Typography variant="body2" fontWeight="bold" color="text.primary">
        {value}
      </Typography>
    </Box>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <PolicyAndCarDetails
          proposalObjectDetails={proposalObjectDetails}
          masterDetails={masterDetails}
          quoteId={QUOTE_ID}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // padding: "2rem",
            padding: {
              xs: '1rem',
              sm: '2rem'
            },
            backgroundColor: "#f0f2f5",
            minHeight: "100vh",
            fontFamily: '"Roboto", sans-serif',
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 500, color: "#333", marginBottom: "0.5rem" }}
            >
              CHECKOUT
            </Typography>
            <Typography variant="body1" sx={{ color: "#666" }}>
              Fill the form below → Review details → Get policy
            </Typography>
          </Box>

          {kycVerified ? (
            <StyledPaper>
              {/* Step 1: Car Owner Details */}
              <StepContainer>
                {/* <StepHeader onClick={() => handleToggleStep(1)}>
                  <StepNumber>1</StepNumber>
                  <StepTitle>Car Owner Details</StepTitle>
                  {activeStep !== 1 && (
                    <EditButton onClick={() => handleEditStep(1)}>
                      EDIT
                    </EditButton>
                  )}
                </StepHeader> */}
                <StepHeader onClick={() => handleToggleStep(1)}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs="auto">
                      <StepNumber>1</StepNumber>
                    </Grid>
                    <Grid item xs>
                      <StepTitle>Car Owner Details</StepTitle>
                    </Grid>
                    {activeStep !== 1 && activeStep > 1 && (
                      <Grid item xs="auto">
                        <EditButton onClick={() => handleEditStep(1)}>EDIT</EditButton>
                      </Grid>
                    )}
                  </Grid>
                </StepHeader>

                {activeStep === 1 ? (
                  <DatePickerWrapper>
                    <StepContent>
                      <form onSubmit={carOwnerDetailsHandleSubmit(submitCarOwnerDetails)}>

                        <Grid container spacing={5}>
                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="salutation_master_id" // key name
                                control={carOwnerDetailsControl} // control object from useForm
                                rules={{ required: "Salutation is required" }}
                                render={({
                                  field: { value, onChange },
                                  fieldState: { error },
                                }) => (
                                  <Autocomplete
                                    options={dropdownSalutation} // Options for dropdown
                                    value={value || null} // Bind value for single selection
                                    onChange={(event, newValue) =>
                                      onChange(newValue)
                                    } // Handle change
                                    isOptionEqualToValue={(option, value) =>
                                      option.label === value?.label
                                    } // Match based on label
                                    filterOptions={(
                                      dropdownGender,
                                      { inputValue }
                                    ) =>
                                      dropdownGender.filter(
                                        (option) =>
                                          option.label
                                            .toLowerCase()
                                            .includes(inputValue.toLowerCase()) // Filter options by search input
                                      )
                                    }
                                    renderInput={(params) => (
                                      <CustomTextField
                                        {...params}
                                        label={
                                          <CustomLabel
                                            label="Salutation"
                                            required
                                          />
                                        }
                                        variant="outlined"
                                        placeholder="Select Salutation"
                                        error={Boolean(error)} // Display error if validation fails
                                        helperText={
                                          errors?.salutation_master_id
                                            ? errors.salutation_master_id.message
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                          }

                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name='first_name'
                                control={carOwnerDetailsControl}
                                rules={{
                                  required: "Company Name is required",
                                }}
                                render={({ field: { value, onChange } }) => (
                                  <CustomTextField
                                    fullWidth
                                    value={value}
                                    label={<CustomLabel label="Company Name" required />}
                                    inputProps={{
                                      maxLength: 50,
                                    }}
                                    onChange={onChange}
                                    placeholder='Enter Company Name'
                                    aria-describedby='validation-basic-company-name'
                                    error={Boolean(errors?.first_name)} // Pass boolean value for error
                                    helperText={errors?.first_name ? errors.first_name.message : ""}
                                  />
                                )}
                              />
                            </Grid>
                          }

                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name='first_name'
                                control={carOwnerDetailsControl}
                                rules={{
                                  required: "First Name is required", // Required validation
                                  ...(proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Individual' && {
                                    pattern: {
                                      value: /^[A-Za-z]{1,25}$/, // Only alphabets, 1–25 characters, no spaces
                                      message: "First Name must be 1-25 alphabets with no spaces"
                                    }
                                  })
                                }}
                                render={({ field: { value, onChange } }) => (
                                  <CustomTextField
                                    fullWidth
                                    value={value}
                                    label={<CustomLabel label="First Name" required />}
                                    inputProps={{
                                      maxLength: 25,
                                    }}
                                    onChange={onChange}
                                    onInput={(e) => {
                                      // Optional: Only restrict input for individuals, not organizations
                                      if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Individual') {
                                        e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                                      }
                                    }}
                                    placeholder='Enter First Name'
                                    aria-describedby='validation-basic-first-name'
                                    error={Boolean(errors?.first_name)} // Pass boolean value for error
                                    helperText={errors?.first_name ? errors.first_name.message : ""}
                                  />
                                )}
                              />
                            </Grid>
                          }

                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="last_name"
                                control={carOwnerDetailsControl}
                                rules={{
                                  required: "Last Name is required", // Required validation
                                  pattern: {
                                    value: /^[A-Za-z]{2,25}$/, // Only alphabets, minimum 2, maximum 25 characters, no spaces
                                    message:
                                      "Last Name must be 2-25 alphabets with no spaces",
                                  },
                                }}
                                render={({ field: { value, onChange } }) => (
                                  <CustomTextField
                                    fullWidth
                                    value={value}
                                    label={
                                      <CustomLabel label="Last Name" required />
                                    }
                                    inputProps={{
                                      maxLength: 25,
                                    }}
                                    onChange={onChange}
                                    onInput={(e) => {
                                      e.target.value = e.target.value.replace(
                                        /[^A-Za-z]/g,
                                        ""
                                      );
                                    }}
                                    placeholder="Enter Last Name"
                                    error={Boolean(errors.last_name)}
                                    aria-describedby="validation-basic-last-name"
                                    helperText={
                                      errors?.last_name
                                        ? errors.last_name.message
                                        : ""
                                    }
                                  />
                                )}
                              />
                            </Grid>
                          }

                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="gender_master_id" // key name
                                control={carOwnerDetailsControl} // control object from useForm
                                rules={{ required: "Gender is required" }}
                                render={({
                                  field: { value, onChange },
                                  fieldState: { error },
                                }) => (
                                  <Autocomplete
                                    options={dropdownGender} // Options for dropdown
                                    value={value || null} // Bind value for single selection
                                    onChange={(event, newValue) =>
                                      onChange(newValue)
                                    } // Handle change
                                    isOptionEqualToValue={(option, value) =>
                                      option.label === value?.label
                                    } // Match based on label
                                    filterOptions={(
                                      dropdownGender,
                                      { inputValue }
                                    ) =>
                                      dropdownGender.filter(
                                        (option) =>
                                          option.label
                                            .toLowerCase()
                                            .includes(inputValue.toLowerCase()) // Filter options by search input
                                      )
                                    }
                                    renderInput={(params) => (
                                      <CustomTextField
                                        {...params}
                                        label={
                                          <CustomLabel label="Gender" required />
                                        }
                                        variant="outlined"
                                        placeholder="Select Gender"
                                        error={Boolean(error)} // Display error if validation fails
                                        helperText={
                                          errors?.gender_master_id
                                            ? errors.gender_master_id.message
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                          }

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="email_id"
                              control={carOwnerDetailsControl}
                              rules={{
                                required: "Email Id is required", // Custom message for required validation
                                minLength: {
                                  value: 6,
                                  message:
                                    "Email Id must be at least 6 characters long",
                                },
                                maxLength: {
                                  value: 70,
                                  message:
                                    "Email Id cannot exceed 70 characters",
                                },
                                pattern: {
                                  value:
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email regex
                                  message: "Please enter a valid email Id",
                                },
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={
                                    <CustomLabel label="Email Id" required />
                                  }
                                  onChange={onChange}
                                  inputProps={{
                                    maxLength: 70,
                                  }}
                                  placeholder="Enter email Id"
                                  error={Boolean(errors?.email_id)}
                                  aria-describedby="validation-basic-first-name"
                                  helperText={
                                    errors?.email_id
                                      ? errors.email_id.message
                                      : ""
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="mobile_no"
                              control={carOwnerDetailsControl}
                              rules={{
                                required: "Mobile Number is required", // Custom message for required validation
                                pattern: {
                                  value: /^[6-9][0-9]{9}$/, // Validates exactly 10 digits
                                  message: "Please enter valid mobile number",
                                },
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={
                                    <CustomLabel
                                      label="Mobile Number"
                                      required
                                    />
                                  }
                                  onChange={onChange}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                  }}
                                  placeholder="Enter mobile number"
                                  aria-describedby="validation-basic-mobile"
                                  inputProps={{
                                    inputMode: "numeric", // Enables numeric input mode for better behavior on mobile
                                    maxLength: 10, // Limit input to 10 digits
                                  }}
                                  error={Boolean(errors?.mobile_no)}
                                  helperText={
                                    errors?.mobile_no
                                      ? errors.mobile_no.message
                                      : ""
                                  }
                                />
                              )}
                            />
                          </Grid>

                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="date_of_birth" // key name
                                control={carOwnerDetailsControl}
                                rules={{ required: "Date of Birth is required" }}
                                render={({ field: { value, onChange } }) => {
                                  // Convert value to a valid Date object
                                  // const selectedDate = value
                                  //   ? new Date(value)
                                  //   : null;

                                  const parsedDate = value ? new Date(value) : null;
                                  const selectedDate = isValid(parsedDate) ? parsedDate : null;

                                  return (
                                    <DatePicker
                                      selected={selectedDate}
                                      onChange={onChange}
                                      placeholderText="DD/MM/YYYY"
                                      dateFormat="dd/MM/yyyy"
                                      maxDate={minDate}
                                      isClearable
                                      showYearDropdown
                                      showMonthDropdown
                                      scrollableYearDropdown
                                      yearDropdownItemNumber={10}
                                      customInput={
                                        <CustomInput
                                          value={selectedDate}
                                          onChange={onChange}
                                          label={
                                            <CustomLabel
                                              label="Date of Birth"
                                              required
                                            />
                                          }
                                          error={Boolean(errors.date_of_birth)}
                                          aria-describedby="validation-basic-dob"
                                          helperText={
                                            errors?.date_of_birth
                                              ? errors.date_of_birth.message
                                              : ""
                                          }
                                        />
                                      }
                                    />
                                  );
                                }}
                              />
                            </Grid>
                          }

                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="marital_status_master_id" // key name
                                control={carOwnerDetailsControl} // control object from useForm
                                rules={{ required: "Marital status is required" }}
                                render={({
                                  field: { value, onChange },
                                  fieldState: { error },
                                }) => (
                                  <Autocomplete
                                    options={dropdownMaritalStatus} // Options for dropdown
                                    value={value || null} // Bind value for single selection
                                    onChange={(event, newValue) =>
                                      onChange(newValue)
                                    } // Handle change
                                    isOptionEqualToValue={(option, value) =>
                                      option.label === value?.label
                                    } // Match based on label
                                    filterOptions={(
                                      dropdownGender,
                                      { inputValue }
                                    ) =>
                                      dropdownGender.filter(
                                        (option) =>
                                          option.label
                                            .toLowerCase()
                                            .includes(inputValue.toLowerCase()) // Filter options by search input
                                      )
                                    }
                                    renderInput={(params) => (
                                      <CustomTextField
                                        {...params}
                                        label={
                                          <CustomLabel
                                            label="Marital Status"
                                            required
                                          />
                                        }
                                        variant="outlined"
                                        placeholder="Select Marital status"
                                        error={Boolean(error)} // Display error if validation fails
                                        helperText={
                                          errors?.marital_status_master_id
                                            ? errors.marital_status_master_id
                                              .message
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                          }

                          {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                            <Grid item xs={12} sm={6}>
                              <Controller
                                name="occupation_master_id" // key name
                                control={carOwnerDetailsControl} // control object from useForm
                                rules={{ required: "Occupation is required" }}
                                render={({
                                  field: { value, onChange },
                                  fieldState: { error },
                                }) => (
                                  <Autocomplete
                                    options={dropdownOccupation} // Options for dropdown
                                    value={value || null} // Bind value for single selection
                                    onChange={(event, newValue) =>
                                      onChange(newValue)
                                    } // Handle change
                                    isOptionEqualToValue={(option, value) =>
                                      option.label === value?.label
                                    } // Match based on label
                                    filterOptions={(
                                      dropdownGender,
                                      { inputValue }
                                    ) =>
                                      dropdownGender.filter(
                                        (option) =>
                                          option.label
                                            .toLowerCase()
                                            .includes(inputValue.toLowerCase()) // Filter options by search input
                                      )
                                    }
                                    renderInput={(params) => (
                                      <CustomTextField
                                        {...params}
                                        label={
                                          <CustomLabel
                                            label="Occupation"
                                            required
                                          />
                                        }
                                        variant="outlined"
                                        placeholder="Select Occupation"
                                        error={Boolean(error)} // Display error if validation fails
                                        helperText={
                                          errors?.occupation_master_id
                                            ? errors.occupation_master_id.message
                                            : ""
                                        }
                                      />
                                    )}
                                  />
                                )}
                              />
                            </Grid>
                          }

                          <Grid item xs={12}>
                            <Button
                              disabled={loading}
                              sx={{ mr: 3 }}
                              startIcon={<CheckIcon />}
                              type="submit"
                              variant="contained"
                            >
                              {loading ? (
                                <CircularProgress size={18} />
                              ) : (
                                "Continue to Address Details"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </StepContent>
                  </DatePickerWrapper>
                ) : (
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 3 }}
                    sx={{
                      padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem', md: '0.5rem 1.5rem' }
                    }}
                  >

                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} >
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Full Name:</Typography>
                          <Typography variant="body2">
                            {carOwnerDetailsWatch()?.salutation_master_id
                              ?.label || ""}
                          </Typography>
                          <Typography variant="body2">
                            {carOwnerDetailsWatch()?.first_name || ""}
                          </Typography>
                          <Typography variant="body2">
                            {carOwnerDetailsWatch()?.last_name || ""}
                          </Typography>
                        </Box>
                      </Grid>
                    }

                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization' &&
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} >
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Company Name:</Typography>
                          <Typography variant="body2">
                            {carOwnerDetailsWatch()?.first_name || ""}
                          </Typography>
                        </Box>
                      </Grid>
                    }

                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Gender:</Typography>
                          <Typography variant="body2">
                            {carOwnerDetailsWatch()?.gender_master_id?.label}
                          </Typography>
                        </Box>
                      </Grid>
                    }

                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Date of Birth:</Typography>
                          <Typography variant="body2">
                            {carOwnerDetailsWatch()?.date_of_birth ? dayjs(carOwnerDetailsWatch()?.date_of_birth).format("DD-MM-YYYY") : ""}
                          </Typography>
                        </Box>
                      </Grid>
                    }

                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Occupation:</Typography>
                          <Typography variant="body2">
                            {carOwnerDetailsWatch()?.occupation_master_id?.label}
                          </Typography>
                        </Box>
                      </Grid>
                    }

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: '500' }}>Email:</Typography>
                        <Typography variant="body2">
                          {carOwnerDetailsWatch()?.email_id || ""}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: '500' }}>Mobile:</Typography>
                        <Typography variant="body2">
                          {carOwnerDetailsWatch()?.mobile_no || ""}
                        </Typography>
                      </Box>
                    </Grid>

                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Marital Status:</Typography>
                          <Typography variant="body2">{carOwnerDetailsWatch()?.marital_status_master_id?.label}</Typography>
                        </Box>
                      </Grid>
                    }

                  </Grid>
                )}
              </StepContainer>

              {/* Step 2: Communication Address */}
              <StepContainer>
                {/* <StepHeader onClick={() => handleToggleStep(2)}>
                  <StepNumber>2</StepNumber>
                  <StepTitle>Communication Address</StepTitle>
                  {activeStep !== 2 && activeStep > 2 && (
                    <EditButton onClick={() => handleEditStep(2)}>
                      EDIT
                    </EditButton>
                  )}
                </StepHeader> */}
                <StepHeader onClick={() => handleToggleStep(2)}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs="auto">
                      <StepNumber>2</StepNumber>
                    </Grid>
                    <Grid item xs>
                      <StepTitle>Address Details</StepTitle>
                    </Grid>
                    {activeStep !== 2 && activeStep > 2 && (
                      <Grid item xs="auto">
                        <EditButton onClick={() => handleEditStep(2)}>EDIT</EditButton>
                      </Grid>
                    )}
                  </Grid>
                </StepHeader>

                {activeStep === 2 ? (
                  <DatePickerWrapper>
                    <StepContent>
                      <form
                        onSubmit={communicationAddressHandleSubmit(
                          submitAddressDetails
                        )}
                      >
                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="address_line_1"
                              control={communicationAddressControl}
                              rules={{
                                required: "Address is required",
                                // pattern: {
                                //   value: /^[A-Za-z0-9\s,.-]{5,100}$/, // Allows letters, numbers, spaces, commas, dots, hyphens
                                //   message:
                                //     "Address must be 5–100 characters and contain only valid characters",
                                // },
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={
                                    <CustomLabel label="Address Line 1" required />
                                  }
                                  inputProps={{
                                    maxLength: 100,
                                  }}
                                  onChange={onChange}
                                  // onInput={(e) => {
                                  //   // Optional sanitization: remove invalid characters in real time
                                  //   e.target.value = e.target.value.replace(
                                  //     /[^A-Za-z0-9\s,.-]/g,
                                  //     ""
                                  //   );
                                  // }}
                                  placeholder="Enter Address"
                                  aria-describedby="validation-address"
                                  error={Boolean(
                                    communicationAddressErrors?.address_line_1
                                  )}
                                  helperText={
                                    communicationAddressErrors?.address_line_1
                                      ?.message || ""
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="address_line_2"
                              control={communicationAddressControl}
                              rules={{
                                // No pattern validation, all characters allowed
                                required: "Address is required",
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={<CustomLabel label="Address Line 2" required />}
                                  inputProps={{
                                    maxLength: 100,
                                  }}
                                  onChange={onChange}
                                  // Removed onInput sanitization
                                  placeholder="Enter Address"
                                  aria-describedby="validation-address"
                                  error={Boolean(communicationAddressErrors?.address_line_2)}
                                  helperText={
                                    communicationAddressErrors?.address_line_2?.message || ""
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="pincode"
                              control={communicationAddressControl}
                              rules={{
                                required: "Pincode is required", // Required validation
                                pattern: {
                                  value: /^[0-9]{6}$/, // Ensure it's exactly 6 digits
                                  message: "Pincode must be a 6-digit number",
                                },
                                validate: (value) =>
                                  value.length === 6 ||
                                  "Pincode must be exactly 6 digits",
                              }}
                              render={({
                                field: { value, onChange },
                                fieldState: { error },
                              }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={
                                    <CustomLabel label="Pincode" required />
                                  }
                                  onChange={onChange}
                                  // onChange={(e) => {
                                  //     const rawValue = e.target.value.replace(/[^0-9]/g, "");
                                  //     // Only update the form if value is <= 6
                                  //     if (rawValue.length <= 6) {
                                  //         onChange(rawValue);
                                  //         // Dispatch API when pincode is exactly 6 digits
                                  //         if (rawValue.length === 6) {
                                  //             fetchPincodeDetails(rawValue);
                                  //         }
                                  //     }
                                  // }}
                                  onInput={(e) => {
                                    e.target.value = e.target.value.replace(
                                      /[^0-9]/g,
                                      ""
                                    );
                                  }}
                                  inputProps={{
                                    inputMode: "numeric", // Enables numeric input mode for better behavior on mobile
                                    maxLength: 6, // Limit input to 10 digits
                                  }}
                                  placeholder="Enter Pincode"
                                  error={Boolean(error)}
                                  aria-describedby="validation-basic-mobile"
                                  helperText={
                                    communicationAddressErrors?.pincode
                                      ? communicationAddressErrors.pincode
                                        .message
                                      : ""
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="state" // key name
                              control={communicationAddressControl} // control object from useForm
                              rules={{ required: "State is required" }}
                              render={({
                                field: { value, onChange },
                                fieldState: { error },
                              }) => (
                                <Autocomplete
                                  options={dropDownState} // Options for dropdown
                                  value={value || null} // Bind value for single selection
                                  onChange={(event, newValue) => {
                                    onChange(newValue);
                                    // console.log("fdsf", newValue);
                                    // dispatch(
                                    //   actionFGMasterCity({
                                    //     state_id: newValue.value,
                                    //   })
                                    // );
                                  }} // Handle change
                                  isOptionEqualToValue={(option, value) =>
                                    option.label === value?.label
                                  } // Match based on label
                                  filterOptions={(
                                    dropdownGender,
                                    { inputValue }
                                  ) =>
                                    dropdownGender.filter(
                                      (option) =>
                                        option.label
                                          .toLowerCase()
                                          .includes(inputValue.toLowerCase()) // Filter options by search input
                                    )
                                  }
                                  renderInput={(params) => (
                                    <CustomTextField
                                      {...params}
                                      label={
                                        <CustomLabel label="State" required />
                                      }
                                      variant="outlined"
                                      placeholder="Select State"
                                      error={Boolean(error)} // Display error if validation fails
                                      helperText={
                                        communicationAddressErrors?.state
                                          ? communicationAddressErrors.state
                                            .message
                                          : ""
                                      }
                                    />
                                  )}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="city" // key name
                              control={communicationAddressControl} // control object from useForm
                              rules={{ required: "City is required" }}
                              render={({
                                field: { value, onChange },
                                fieldState: { error },
                              }) => (
                                <Autocomplete
                                  options={dropDownCity} // Options for dropdown
                                  value={value || null} // Bind value for single selection
                                  onChange={(event, newValue) =>
                                    onChange(newValue)
                                  } // Handle change
                                  isOptionEqualToValue={(option, value) =>
                                    option.label === value?.label
                                  } // Match based on label
                                  filterOptions={(
                                    dropdownGender,
                                    { inputValue }
                                  ) =>
                                    dropdownGender.filter(
                                      (option) =>
                                        option.label
                                          .toLowerCase()
                                          .includes(inputValue.toLowerCase()) // Filter options by search input
                                    )
                                  }
                                  renderInput={(params) => (
                                    <CustomTextField
                                      {...params}
                                      label={
                                        <CustomLabel label="City" required />
                                      }
                                      variant="outlined"
                                      placeholder="Select City"
                                      error={Boolean(error)} // Display error if validation fails
                                      helperText={
                                        communicationAddressErrors?.city
                                          ? communicationAddressErrors.city
                                            .message
                                          : ""
                                      }
                                    />
                                  )}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              disabled={loading}
                              sx={{ mr: 3 }}
                              startIcon={<CheckIcon />}
                              type="submit"
                              variant="contained"
                            >
                              {loading ? (
                                <CircularProgress size={18} />
                              ) : (
                                "Continue to Vehicle Details"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    </StepContent>
                  </DatePickerWrapper>
                ) : (
                  activeStep > 2 && (
                    <Grid
                      container
                      spacing={{ xs: 2, sm: 3 }}
                      sx={{
                        padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem', md: '0.5rem 1.5rem' }
                      }}
                    >
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Communication Address:{" "}</Typography>
                          <Typography variant="body2">
                            {communicationAddressWatch()?.address_line_1}{", "}
                            {communicationAddressWatch()?.address_line_2}{", "}
                            {communicationAddressWatch("city")?.label}{", "}
                            {communicationAddressWatch("state")?.label}{"-"}
                            {communicationAddressWatch()?.pincode}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  )
                )}
              </StepContainer>

              {/* Step 3: Vehicle Details */}
              <StepContainer>
                {/* <StepHeader onClick={() => handleToggleStep(3)}>
                  <StepNumber>3</StepNumber>
                  <StepTitle>Vehicle Details</StepTitle>
                  {activeStep !== 3 && activeStep > 3 && (
                    <EditButton onClick={() => handleEditStep(2)}>
                      EDIT
                    </EditButton>
                  )}
                </StepHeader> */}
                <StepHeader onClick={() => handleToggleStep(3)}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs="auto">
                      <StepNumber>3</StepNumber>
                    </Grid>
                    <Grid item xs>
                      <StepTitle>Vehicle Details</StepTitle>
                    </Grid>
                    {activeStep !== 3 && activeStep > 3 && (
                      <Grid item xs="auto">
                        <EditButton onClick={() => handleEditStep(3)}>EDIT</EditButton>
                      </Grid>
                    )}
                  </Grid>
                </StepHeader>

                {activeStep === 3 ? (
                  <StepContent>
                    <form
                      onSubmit={vehicleDetailsHandleSubmit(
                        submitVehicleDetails
                      )}
                    >
                      <Grid container spacing={5}>
                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="vehicle_registration_no"
                            control={vehicleDetailsControl}
                            rules={{
                              required: "Registration Number is required",
                              pattern: {
                                value: /^[A-Z0-9]{3,12}$/, // Allows uppercase letters and numbers, 3–12 characters
                                message:
                                  "Registration Number must be 3–12 characters long, using only uppercase letters and numbers",
                              },
                            }}
                            render={({ field: { value, onChange } }) => (
                              <CustomTextField
                                fullWidth
                                value={value}
                                label={
                                  <CustomLabel
                                    label="Registration Number"
                                    required
                                  />
                                }
                                inputProps={{
                                  maxLength: 12, // Updated max length
                                  style: { textTransform: "uppercase" }, // Visually uppercase
                                }}
                                sx={{
                                  '& .MuiInputBase-input::placeholder': {
                                    textTransform: 'none'
                                  }
                                }}
                                onChange={(e) => {
                                  const cleaned = e.target.value
                                    .replace(/[^A-Za-z0-9]/g, "") // Remove non-alphanumeric
                                    .toUpperCase(); // Force uppercase
                                  onChange(cleaned);
                                }}
                                disabled={isRegNoDisabled}
                                placeholder="Enter Car Registration Number"
                                aria-describedby="validation-vehicle-registration"
                                error={Boolean(vehicleDetailsErrors?.vehicle_registration_no)}
                                helperText={
                                  vehicleDetailsErrors?.vehicle_registration_no?.message || ""
                                }
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="engine_no"
                            control={vehicleDetailsControl}
                            rules={{
                              required: "Engine Number is required",
                              pattern: {
                                value: /^[A-Z0-9]{11,17}$/, // Only uppercase alphanumeric, 11–17 characters
                                message: "Engine Number must be 11–17 uppercase alphanumeric characters"
                              }
                            }}
                            render={({ field: { value, onChange } }) => (
                              <CustomTextField
                                fullWidth
                                value={value}
                                label={<CustomLabel label="Engine Number" required />}
                                inputProps={{
                                  maxLength: 17,
                                  inputMode: 'text',
                                }}
                                onChange={(e) => {
                                  const cleaned = e.target.value
                                    .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric
                                    .toUpperCase(); // Convert to uppercase
                                  onChange(cleaned);
                                }}
                                placeholder="Enter Engine Number"
                                aria-describedby="validation-engine-no"
                                error={Boolean(vehicleDetailsErrors?.engine_no)}
                                helperText={vehicleDetailsErrors?.engine_no?.message || ""}
                              />
                            )}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <Controller
                            name="chassis_no"
                            control={vehicleDetailsControl}
                            rules={{
                              required: "Chassis number is required",
                              validate: (value) => {
                                const cleaned = value?.toUpperCase();
                                if (!/^[A-Z0-9]{17}$/.test(cleaned)) {
                                  return "Chassis number must be exactly 17 alphanumeric characters";
                                }
                                if (
                                  !/[A-Z]/.test(cleaned) ||
                                  !/[0-9]/.test(cleaned)
                                ) {
                                  return "Chassis number must contain both letters and numbers";
                                }
                                return true;
                              },
                            }}
                            render={({ field: { value, onChange } }) => (
                              <CustomTextField
                                fullWidth
                                value={value}
                                label={
                                  <CustomLabel
                                    label="Chassis Number"
                                    required
                                  />
                                }
                                inputProps={{
                                  maxLength: 17,
                                  style: { textTransform: "uppercase" },
                                }}
                                // Added this to override placeholder styling:
                                sx={{
                                  '& .MuiInputBase-input::placeholder': {
                                    textTransform: 'none'
                                  }
                                }}
                                onChange={(e) => {
                                  const cleaned = e.target.value
                                    .replace(/[^A-Za-z0-9]/g, "")
                                    .toUpperCase();
                                  onChange(cleaned);
                                }}
                                placeholder="Enter Chassis Number"
                                aria-describedby="validation-chassis-no"
                                error={Boolean(
                                  vehicleDetailsErrors?.chassis_no
                                )}
                                helperText={
                                  vehicleDetailsErrors?.chassis_no?.message ||
                                  ""
                                }
                              />
                            )}
                          />
                        </Grid>

                        {masterDetails?.is_previous_policy_no_visible &&
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="prev_policy_no"
                              control={vehicleDetailsControl}
                              rules={{
                                required: "Previous policy number is required",
                                pattern: {
                                  value: /^[A-Z0-9]{7,30}$/, // Only uppercase letters and numbers, 7-30 characters
                                  message: "Previous policy number must be 7–30 uppercase letters and numbers (no spaces or special characters)"
                                }
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={<CustomLabel label="Previous Policy Number" required />}
                                  inputProps={{
                                    maxLength: 30,
                                    style: { textTransform: 'uppercase' } // Visual capitalization
                                  }}
                                  sx={{
                                    '& .MuiInputBase-input::placeholder': {
                                      textTransform: 'none'
                                    }
                                  }}
                                  onChange={(e) => {
                                    const cleaned = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); // Clean + uppercase
                                    onChange(cleaned);
                                  }}
                                  placeholder="Enter Previous Policy Number"
                                  aria-describedby="validation-prev-policy-number"
                                  error={Boolean(vehicleDetailsErrors?.prev_policy_no)}
                                  helperText={vehicleDetailsErrors?.prev_policy_no?.message || ""}
                                />
                              )}
                            />
                          </Grid>
                        }

                        {masterDetails?.is_previous_tp_policy_no_visible &&
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="previous_tp_policy_no"
                              control={vehicleDetailsControl}
                              rules={{
                                required: "Previous TP policy number is required",
                                pattern: {
                                  value: /^[A-Z0-9]{7,30}$/, // Only uppercase letters and numbers, 7-30 characters
                                  message: "Previous TP policy number must be 7–30 uppercase letters and numbers (no spaces or special characters)"
                                }
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={<CustomLabel label="Previous TP Policy Number" required />}
                                  inputProps={{
                                    maxLength: 30,
                                    style: { textTransform: 'uppercase' } // Visual capitalization
                                  }}
                                  sx={{
                                    '& .MuiInputBase-input::placeholder': {
                                      textTransform: 'none'
                                    }
                                  }}
                                  onChange={(e) => {
                                    const cleaned = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); // Clean + uppercase
                                    onChange(cleaned);
                                  }}
                                  placeholder="Enter Previous TP Policy Number"
                                  aria-describedby="validation-prev-tp-policy-number"
                                  error={Boolean(vehicleDetailsErrors?.previous_tp_policy_no)}
                                  helperText={vehicleDetailsErrors?.previous_tp_policy_no?.message || ""}
                                />
                              )}
                            />
                          </Grid>
                        }

                        <Grid item xs={12} sm={6}>
                          <FormControl
                            component="fieldset"
                            error={Boolean(
                              vehicleDetailsErrors?.is_car_financed
                            )}
                          >
                            <FormLabel component="legend">
                              <CustomLabel
                                label="Is the car financed?"
                                required
                              />
                            </FormLabel>

                            <Controller
                              name="is_car_financed"
                              control={vehicleDetailsControl}
                              rules={{
                                required:
                                  "Please select if the car is financed",
                              }}
                              render={({ field }) => (
                                <RadioGroup row {...field}>
                                  <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label="Yes"
                                  />
                                  <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label="No"
                                  />
                                </RadioGroup>
                              )}
                            />

                            {vehicleDetailsErrors?.is_car_financed && (
                              <FormHelperText>
                                {vehicleDetailsErrors.is_car_financed.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>

                        {vehicleDetailsWatch()?.is_car_financed === "true" && (
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="financed_company"
                              control={vehicleDetailsControl}
                              rules={{
                                required: "Financing Company Name is required", // Required validation
                                // pattern: {
                                //   value: /^[A-Za-z]{1,25}$/, // Only alphabets, minimum 2, maximum 25 characters, no spaces
                                //   message:
                                //     "Company Name must be 1-25 alphabets with no spaces",
                                // },
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={
                                    <CustomLabel
                                      label="Financing Company"
                                      required
                                    />
                                  }
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                  onChange={onChange}
                                  // onInput={(e) => {
                                  //   e.target.value = e.target.value.replace(
                                  //     /[^A-Za-z]/g,
                                  //     ""
                                  //   );
                                  // }}
                                  placeholder="Enter financing company name"
                                  aria-describedby="validation-financing-company-name"
                                  error={Boolean(
                                    vehicleDetailsErrors?.financed_company
                                  )} // Pass boolean value for error
                                  helperText={
                                    vehicleDetailsErrors?.financed_company
                                      ? vehicleDetailsErrors.financed_company
                                        .message
                                      : ""
                                  }
                                />
                              )}
                            />
                          </Grid>
                        )}

                        {/* <Grid item xs={12} sm={6}>
                          <Controller
                            name="manufactured_month" // key name
                            control={vehicleDetailsControl} // control object from useForm
                            rules={{
                              required: "Manufacturing month is required",
                            }}
                            render={({
                              field: { value, onChange },
                              fieldState: { error },
                            }) => (
                              <Autocomplete
                                options={dropdownMonth} // Options for dropdown
                                value={value || null} // Bind value for single selection
                                onChange={(event, newValue) =>
                                  onChange(newValue)
                                } // Handle change
                                isOptionEqualToValue={(option, value) =>
                                  option.label === value?.label
                                } // Match based on label
                                filterOptions={(
                                  dropdownMonth,
                                  { inputValue }
                                ) =>
                                  dropdownMonth.filter(
                                    (option) =>
                                      option.label
                                        .toLowerCase()
                                        .includes(inputValue.toLowerCase()) // Filter options by search input
                                  )
                                }
                                renderInput={(params) => (
                                  <CustomTextField
                                    {...params}
                                    label={
                                      <CustomLabel
                                        label="Manufacturing Month"
                                        required
                                      />
                                    }
                                    variant="outlined"
                                    placeholder="Select Manufacturing Month"
                                    error={Boolean(error)} // Display error if validation fails
                                    helperText={
                                      vehicleDetailsErrors?.manufactured_month
                                        ? vehicleDetailsErrors
                                          .manufactured_month.message
                                        : ""
                                    }
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid> */}

                        {/* <Grid item xs={12} sm={6}>
                          <Controller
                            name="manufactured_year" // key name
                            control={vehicleDetailsControl} // control object from useForm
                            rules={{
                              required: "Manufacturing year is required",
                            }}
                            render={({
                              field: { value, onChange },
                              fieldState: { error },
                            }) => (
                              <Autocomplete
                                options={dropdownYear} // Options for dropdown
                                value={value || null} // Bind value for single selection
                                onChange={(event, newValue) =>
                                  onChange(newValue)
                                } // Handle change
                                isOptionEqualToValue={(option, value) =>
                                  option.label === value?.label
                                } // Match based on label
                                filterOptions={(dropdownYear, { inputValue }) =>
                                  dropdownYear.filter(
                                    (option) =>
                                      option.label
                                        .toLowerCase()
                                        .includes(inputValue.toLowerCase()) // Filter options by search input
                                  )
                                }
                                renderInput={(params) => (
                                  <CustomTextField
                                    {...params}
                                    label={
                                      <CustomLabel
                                        label="Manufacturing Year"
                                        required
                                      />
                                    }
                                    variant="outlined"
                                    placeholder="Select Manufacturing Year"
                                    error={Boolean(error)} // Display error if validation fails
                                    helperText={
                                      vehicleDetailsErrors?.manufactured_year
                                        ? vehicleDetailsErrors.manufactured_year
                                          .message
                                        : ""
                                    }
                                  />
                                )}
                              />
                            )}
                          />
                        </Grid> */}

                        <Grid item xs={12}>
                          <Button
                            disabled={loading}
                            sx={{ mr: 3 }}
                            startIcon={<CheckIcon />}
                            type="submit"
                            variant="contained"
                          >
                            {loading ? (
                              <CircularProgress size={18} />
                            ) : (
                              "Continue to Nominee Details"
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </StepContent>
                ) : (
                  activeStep > 3 && (
                    <Grid
                      container
                      spacing={{ xs: 2, sm: 3 }}
                      sx={{
                        padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem', md: '0.5rem 1.5rem' }
                      }}
                    >
                      <Grid item xs={12} sm={6}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          gap: 1
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Registration Number:</Typography>
                          <Typography variant="body2">{vehicleDetailsWatch()?.vehicle_registration_no}</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          gap: 1
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Engine Number:</Typography>
                          <Typography variant="body2">{vehicleDetailsWatch()?.engine_no}</Typography>
                        </Box>
                      </Grid>

                      {
                        masterDetails?.is_previous_tp_policy_no_visible &&
                        <Grid item xs={12} sm={6}>
                          <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 1
                          }}>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Previous TP Policy Number:</Typography>
                            <Typography variant="body2">{vehicleDetailsWatch()?.previous_tp_policy_no}</Typography>
                          </Box>
                        </Grid>
                      }

                      {
                        masterDetails?.is_previous_policy_no_visible &&
                        <Grid item xs={12} sm={6}>
                          <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 1
                          }}>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Previous Policy Number:</Typography>
                            <Typography variant="body2">{vehicleDetailsWatch()?.prev_policy_no}</Typography>
                          </Box>
                        </Grid>
                      }

                      {/* <Typography variant="body2">
                          Manufactured Month/Year:{" "}
                          {vehicleDetailsWatch()?.manufactured_month?.label}/
                          {vehicleDetailsWatch()?.manufactured_year?.label}
                        </Typography> */}
                      {/* <Typography variant="body2">Manufactured Year: {vehicleDetailsWatch()?.manufactured_year?.label}</Typography> */}


                      <Grid item xs={12} sm={6}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          gap: 1
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Chassis Number:</Typography>
                          <Typography variant="body2">{vehicleDetailsWatch()?.chassis_no}</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          gap: 1
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Car Financed:</Typography>
                          <Typography variant="body2">{vehicleDetailsWatch()?.is_car_financed == "true" ? "Yes" : "No"}</Typography>
                        </Box>
                      </Grid>

                      {vehicleDetailsWatch()?.is_car_financed == "true" && (
                        <Grid item xs={12} sm={6}>
                          <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: 1
                          }}>
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Financing Company:</Typography>
                            <Typography variant="body2">{vehicleDetailsWatch()?.financed_company}</Typography>
                          </Box>
                        </Grid>
                      )}

                    </Grid>
                  )
                )}
              </StepContainer>

              {/* Step 4: Nominee Details */}
              <StepContainer>
                {/* <StepHeader onClick={() => handleToggleStep(4)}>
                  <StepNumber>4</StepNumber>
                  <StepTitle>Nominee Details</StepTitle>
                  {activeStep !== 4 && activeStep > 4 && (
                    <EditButton onClick={() => handleEditStep(4)}>
                      EDIT
                    </EditButton>
                  )}
                </StepHeader> */}

                <StepHeader onClick={() => handleToggleStep(4)}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs="auto">
                      <StepNumber>4</StepNumber>
                    </Grid>
                    <Grid item xs>
                      <StepTitle>Nominee Details</StepTitle>
                    </Grid>
                    {activeStep !== 4 && activeStep > 4 && (
                      <Grid item xs="auto">
                        <EditButton onClick={() => handleEditStep(4)}>EDIT</EditButton>
                      </Grid>
                    )}
                  </Grid>
                </StepHeader>

                {activeStep === 4 ? (
                  <DatePickerWrapper>
                    <StepContent>
                      <form
                        onSubmit={nomineeDetailsHandleSubmit(
                          submitNomineeDetails
                        )}
                      >
                        <Grid container spacing={5}>
                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="nominee_name"
                              control={nomineeDetailsControl}
                              rules={{
                                required: "Nominee name is required",
                                pattern: {
                                  value: /^[A-Za-z\s]{2,50}$/, // Allows letters and spaces, 2 to 50 characters
                                  message:
                                    "Nominee name must contain only letters and spaces (2–50 characters)",
                                },
                              }}
                              render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                  fullWidth
                                  value={value}
                                  label={
                                    <CustomLabel
                                      label="Nominee Name"
                                      required
                                    />
                                  }
                                  inputProps={{
                                    maxLength: 50,
                                  }}
                                  onChange={(e) => {
                                    const cleaned = e.target.value.replace(
                                      /[^A-Za-z\s]/g,
                                      ""
                                    ); // Only letters + spaces
                                    onChange(cleaned);
                                  }}
                                  placeholder="Enter nominee name"
                                  aria-describedby="validation-nominee-name"
                                  error={Boolean(
                                    nomineeDetailsErrors?.nominee_name
                                  )}
                                  helperText={
                                    nomineeDetailsErrors?.nominee_name
                                      ?.message || ""
                                  }
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="nominee_dob"
                              control={nomineeDetailsControl}
                              rules={{
                                required: "Nominee Date of Birth is required",
                              }}
                              render={({ field: { value, onChange } }) => {
                                // Convert value to a valid Date object
                                // const selectedDate = value
                                //   ? new Date(value)
                                //   : null;

                                const parsedDate = value ? new Date(value) : null;
                                const selectedDate = isValid(parsedDate) ? parsedDate : null;

                                return (
                                  <DatePicker
                                    selected={selectedDate}
                                    onChange={onChange}
                                    placeholderText="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={minDate}
                                    isClearable
                                    showYearDropdown
                                    showMonthDropdown
                                    scrollableYearDropdown
                                    yearDropdownItemNumber={10}
                                    customInput={
                                      <CustomInput
                                        value={selectedDate}
                                        onChange={onChange}
                                        label={
                                          <CustomLabel
                                            label="Nominee Date of Birth"
                                            required
                                          />
                                        }
                                        error={Boolean(
                                          nomineeDetailsErrors.nominee_dob
                                        )}
                                        aria-describedby="validation-nominee-dob"
                                        helperText={
                                          nomineeDetailsErrors?.nominee_dob
                                            ? nomineeDetailsErrors.nominee_dob
                                              .message
                                            : ""
                                        }
                                      />
                                    }
                                  />
                                );
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <Controller
                              name="nominee_relationship_master_id" // key name
                              control={nomineeDetailsControl} // control object from useForm
                              rules={{
                                required: "Nominee Relation is required",
                              }}
                              render={({
                                field: { value, onChange },
                                fieldState: { error },
                              }) => (
                                <Autocomplete
                                  options={dropdownNomineeRelation} // Options for dropdown
                                  value={value || null} // Bind value for single selection
                                  onChange={(event, newValue) =>
                                    onChange(newValue)
                                  } // Handle change
                                  isOptionEqualToValue={(option, value) =>
                                    option.label === value?.label
                                  } // Match based on label
                                  filterOptions={(
                                    dropdownNomineeRelation,
                                    { inputValue }
                                  ) =>
                                    dropdownNomineeRelation.filter(
                                      (option) =>
                                        option.label
                                          .toLowerCase()
                                          .includes(inputValue.toLowerCase()) // Filter options by search input
                                    )
                                  }
                                  renderInput={(params) => (
                                    <CustomTextField
                                      {...params}
                                      label={
                                        <CustomLabel
                                          label="Nominee Relation"
                                          required
                                        />
                                      }
                                      variant="outlined"
                                      placeholder="Select Nominee Relation"
                                      error={Boolean(error)} // Display error if validation fails
                                      helperText={
                                        nomineeDetailsErrors?.nominee_relationship_master_id
                                          ? nomineeDetailsErrors
                                            .nominee_relationship_master_id
                                            .message
                                          : ""
                                      }
                                    />
                                  )}
                                />
                              )}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              disabled={loading}
                              sx={{ mr: 3 }}
                              startIcon={<CheckIcon />}
                              type="submit"
                              variant="contained"
                            >
                              {loading ? (
                                <CircularProgress size={18} />
                              ) : (
                                "Review All Details"
                              )}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                      {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                        <ContinueButton onClick={handleContinueToReview}>
                                            Review All Details
                                        </ContinueButton>
                                    </Box> */}
                    </StepContent>
                  </DatePickerWrapper>
                ) : (
                  activeStep > 4 && (
                    <Grid
                      container
                      spacing={{ xs: 2, sm: 3 }}
                      sx={{
                        padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem', md: '0.5rem 1.5rem' }
                      }}
                    >

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Nominee Name:</Typography>
                          <Typography variant="body2">{nomineeDetailsWatch()?.nominee_name}</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Nominee Date of Birth:</Typography>
                          <Typography variant="body2">{nomineeDetailsWatch()?.nominee_dob ? dayjs(nomineeDetailsWatch()?.nominee_dob).format("DD-MM-YYYY") : ""}</Typography>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: '500' }}>Nominee Relation:</Typography>
                          <Typography variant="body2">{nomineeDetailsWatch()?.nominee_relationship_master_id?.label}</Typography>
                        </Box>
                      </Grid>
                      {/* <Typography variant="body2">Apointee Name: {nomineeDetailsWatch()?.appointee_name}</Typography> */}
                      {/* <Typography variant="body2">Apointee Relation: {nomineeDetailsWatch()?.appointee_relationship?.label}</Typography> */}

                    </Grid>
                  )
                )}
              </StepContainer>
            </StyledPaper>
          ) : (
            <Grid item xs={12}>
              <Button
                disabled={loading}
                sx={{ mr: 3 }}
                startIcon={<CheckIcon />}
                onClick={() => {
                  router.replace({
                    pathname: "/fourwheeler/future_generali/checkout",
                    query: {
                      quoteId: QUOTE_ID,
                      proposalId: PROPOSAL_ID,
                    },
                  });
                }}
                variant="contained"
              >
                Go To KYC Page
              </Button>
            </Grid>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

CheckoutStepper.getLayout = page => <BlankLayout>{page}</BlankLayout>;
CheckoutStepper.guestGuard = true;

export default CheckoutStepper;
