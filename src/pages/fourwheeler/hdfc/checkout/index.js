import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, FormControlLabel, Button, Checkbox, styled, Grid, Card, CardContent, CircularProgress, Autocomplete, } from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";

import { useForm, Controller } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import DatePicker from "react-datepicker";
import moment from "moment";

import CustomTextField from "src/@core/components/mui/text-field";
import CustomLabel from "src/views/components/custom_label";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

import { setProposalId, setQuoteId } from "src/store/urlReference";
import { useRouter } from "next/router";
import { ERROR, UNAUTHORIZED } from "src/common/constants";

import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import toast from "react-hot-toast";
import { actionGetProposal, actionKYCSubmit, resetProposal } from "src/store/hdfc_proposal";
import PolicyAndCarDetails from "src/pageComponents/PolicyDetails";
import { actionGetQuoteMaster, resetField } from "src/store/quoteDetails";

// Mapping validation logic and label for each document type
const documentValidationRules = {
    CKYC: {
        label: 'CKYC Number',
        rules: {
            required: 'CKYC Number is required',
            pattern: {
                value: /^\d{14}$/,
                message: 'CKYC Number must be exactly 14 digits'
            }
        },
        maxLength: 14
    },
    PAN: {
        label: 'PAN Number',
        rules: {
            required: 'PAN Number is required',
            pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: 'Invalid PAN format (e.g., ABCDE1234F)'
            }
        },
        maxLength: 10
    },
    AAADHAR: {
        label: 'AADHAR Number',
        rules: {
            required: 'AADHAR Number is required',
            pattern: {
                value: /^\d{12}$/,
                message: 'AADHAR must be exactly 12 digits'
            }
        },
        maxLength: 12
    },
    CIN: {
        label: 'CIN Number',
        rules: {
            required: 'CIN Number is required',
            pattern: {
                value: /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/,
                message: 'Invalid CIN format (e.g., U40100GJ2015PLC085448)'
            }
        },
        maxLength: 21
    }
};

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

// Custom styled components to match Vuexy template style
const StyledPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
}));

const StepContainer = styled(Box)(({ theme }) => ({
    borderBottom: "1px solid #eee",
    "&:last-child": {
        borderBottom: "none",
    },
}));

const StepHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "1.5rem",
    cursor: "pointer",
    position: "relative",
}));

const StepNumber = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: "50%",
    backgroundColor: "#f0f2f5",
    color: "#333",
    fontWeight: 500,
    marginRight: "1rem",
    border: "1px solid #ddd",
}));

const StepTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.25rem",
    fontWeight: 500,
    color: "#333",
}));

const EditButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    right: "1.5rem",
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    minWidth: "auto",
    "&:hover": {
        backgroundColor: "rgba(255, 112, 67, 0.04)",
    },
}));

const StepContent = styled(Box)(({ theme }) => ({
    padding: "0 1.5rem 1.5rem",
}));

const StyledFormGroup = styled(Box)(({ theme }) => ({
    marginBottom: "1.5rem",
}));

const FormLabel = styled(Typography)(({ theme }) => ({
    display: "block",
    marginBottom: "0.5rem",
    color: "#333",
    fontWeight: 400,
}));

const ReviewPaper = styled(Paper)(({ theme }) => ({
    width: "100%",
    maxWidth: 700,
    margin: "0 auto",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
}));

const ReviewHeader = styled(Box)(({ theme }) => ({
    padding: "1.5rem",
    textAlign: "center",
    borderBottom: "1px solid #eee",
}));

const ReviewSection = styled(Box)(({ theme }) => ({
    padding: "1.5rem",
    borderBottom: "1px solid #eee",
    position: "relative",
}));

const ReviewSectionTitle = styled(Typography)(({ theme }) => ({
    color: "#666",
    fontSize: "0.875rem",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
}));

const ReviewEditButton = styled(Button)(({ theme }) => ({
    position: "absolute",
    right: "1.5rem",
    top: "1.5rem",
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    padding: "0.25rem 0.75rem",
    fontSize: "0.75rem",
    minWidth: "auto",
    "&:hover": {
        backgroundColor: "rgba(255, 112, 67, 0.04)",
    },
}));

const InformationBox = styled(Box)(({ theme }) => ({
    marginBottom: "1rem",
}));

const CompleteKYCButton = styled(Button)(({ theme }) => ({
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

export default function CheckoutStepper() {
    const theme = useTheme();
    const router = useRouter();
    const { QUOTE_ID, PROPOSAL_ID } = useSelector((state) => state?.urlReferenceStore);
    const { getHDFCProposalDetails, kycSubmit, kycStatus } = useSelector((state) => state.hdfcProposalStore);
    const { QUOTE_MASTER } = useSelector((state) => state.quoteDetailsStore);

    // const [isRedirection, setIsRedirection] = useState(false);

    const [masterDetails, setMasterDetails] = useState(null);
    const [dropdownDocuments, setDropdownDocuments] = useState([]);
    const [dropdownEntType, setDropdownEntType] = useState([]);


    const {
        control: kycDetailsControl,
        handleSubmit: kycDetailsHandleSubmit,
        setValue: kycDetailsSetValue,
        watch: kycDetailsWatch,
        formState: { errors: kycDetailsErrors },
        reset: kycDetailsReset,
        setError: kycDetailsSetError,
        clearErrors: kycDetailsClearErrors,
    } = useForm();

    const [loading, setLoading] = useState(false);

    const minDate = moment().subtract(18, "years").startOf("day").toDate(); // 18 years ago at midnight

    // const [activeStep, setActiveStep] = useState(1);
    // const [showReview, setShowReview] = useState(false);

    const [proposalObjectDetails, setProposalObjectDetails] = useState(null);

    const dispatch = useDispatch();

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [kycAccepted, setKycAccepted] = useState(false);
    const formRef = useRef(null);

    const [selectedDocType, setSelectedDocType] = useState(null);
    const [refLabel, setRefLabel] = useState('Reference Number');
    const [refValidation, setRefValidation] = useState({});

    useEffect(() => {
        const label = selectedDocType?.label;
        if (label && documentValidationRules[label]) {
            setRefLabel(documentValidationRules[label].label);
            setRefValidation(documentValidationRules[label].rules);
        } else if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Individual') {
            setRefLabel('PAN Card Number');
            setRefValidation({
                required: 'PAN Card Number is required',
                pattern: {
                    value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                    message: 'Invalid PAN format (e.g., ABCDE1234F)'
                }
            });
        } else {
            setRefLabel('Reference Number');
            setRefValidation({
                required: 'Reference Number is required',
                pattern: {
                    value: /^[A-Z0-9]{5,15}$/,
                    message:
                        'Reference Number must be 5–15 uppercase letters and numbers (no special characters)'
                }
            });
        }
    }, [selectedDocType, proposalObjectDetails]);

    function transformGenderArray(inputArray, type) {
        const filteredGenders = inputArray?.filter(item => item.type === type);

        return filteredGenders.map((item) => {
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

    function transformKYCDocTypes(inputArray) {
        return inputArray.map((item) => {
            return {
                label: item.pjMasterKYCDocTypes.label,
                value: item.pjMasterKYCDocTypes.id,
            };
        });
    }


    // const handleToggleStep = (step) => {
    //     if (activeStep === step) {
    //         return;
    //     }
    //     setActiveStep(step);
    //     setShowReview(false);
    // };

    // const handleEditStep = (step) => {
    //     setActiveStep(step);
    //     setShowReview(false);
    // };

    // const handleCompleteKYC = () => {
    //     alert("KYC completed successfully!");
    // };





    useEffect(() => {
        if (kycSubmit) {
            setLoading(false);
            if (kycSubmit.status === 200) {
                toast.success(kycSubmit?.message);
                router.push({
                    pathname: "/fourwheeler/hdfc/proposal_checkout",
                    query: {
                        quoteId: QUOTE_ID,
                        proposalId: PROPOSAL_ID,
                    }
                })
            }
            else if (kycSubmit?.status === 401 && kycSubmit.response?.kyc_redirection_url) {
                // setIsRedirection(true);
                window.open(kycSubmit.response.kyc_redirection_url, '_blank');
                // window.location.href = kycSubmit.response.kyc_redirection_url;
            }
            else {
                toast.error(kycSubmit?.message)
            }
        }
    }, [kycSubmit]);


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

    // useEffect(() => {
    //     if (
    //         isRedirection &&
    //         formRef.current &&
    //         kycSubmit?.response?.kyc_redirection_url
    //     ) {
    //         // Set the correct action URL
    //         formRef.current.action = kycSubmit.response.kyc_redirection_url;

    //         // Submit the form automatically
    //         setTimeout(() => {
    //             formRef.current.submit();
    //         }, 1000); // 1 second delay to show the loading message
    //     }
    // }, [isRedirection, kycSubmit]);

    const submitKYCDetails = (data) => {
        let input = {
            kyc_reference_number: data.kyc_reference_number,
            date_of_birth: dayjs(data.date_of_birth).format("YYYY-MM-DD"),
            proposer_type: proposalObjectDetails?.pjCarQuotationDetails?.proposer_type,
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID,
        };

        if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Individual') {
            delete input.date_of_birth;
            input.date_of_incorporation = dayjs(data.date_of_incorporation).format("YYYY-MM-DD");
            input.kyc_type_id = data.kyc_type_id?.value;
            input.ent_type = data.ent_type?.value;
        }

        // console.log("KYC DATA", input);
        setLoading(true);
        dispatch(actionKYCSubmit(input));
    };

    // useEffect(() => {
    //     if (!QUOTE_ID) {
    //         const storedQuoteId = localStorage.getItem("QUOTE_ID");
    //         if (storedQuoteId) {
    //             dispatch(setQuoteId(storedQuoteId));
    //         }
    //     }
    //     if (!PROPOSAL_ID) {
    //         const storedProposalId = localStorage.getItem("PROPOSAL_ID");
    //         if (storedProposalId) {
    //             dispatch(setProposalId(storedProposalId));
    //         }
    //     }
    // }, [dispatch]);

    useEffect(() => {
        const { quoteId, proposalId } = router.query;

        if (!QUOTE_ID) {
            if (quoteId) {
                dispatch(setQuoteId(quoteId));
                localStorage.setItem("QUOTE_ID", quoteId);
            } else {
                const storedQuoteId = localStorage.getItem("QUOTE_ID");
                if (storedQuoteId) {
                    dispatch(setQuoteId(storedQuoteId));
                }
            }
        }

        if (!PROPOSAL_ID) {
            if (proposalId) {
                dispatch(setProposalId(proposalId));
                localStorage.setItem("PROPOSAL_ID", proposalId);
            } else {
                const storedProposalId = localStorage.getItem("PROPOSAL_ID");
                if (storedProposalId) {
                    dispatch(setProposalId(storedProposalId));
                }
            }
        }
    }, [router.query, dispatch]);

    useEffect(() => {
        if (QUOTE_ID && PROPOSAL_ID) {
            // router.push({
            //     pathname: "/fourwheeler/hdfc/checkout",
            //     query: {
            //         quoteId: QUOTE_ID,
            //         proposalId: PROPOSAL_ID,
            //     },
            // });
            router.push(
                {
                    pathname: "/fourwheeler/hdfc/checkout",
                    query: {
                        quoteId: QUOTE_ID,
                        proposalId: PROPOSAL_ID,
                    },
                },
                undefined,
                { shallow: true }
            );
            let params = {
                reference_id: QUOTE_ID,
                proposal_id: PROPOSAL_ID,
            };

            dispatch(actionGetProposal(params));
            dispatch(actionGetQuoteMaster({ reference_id: QUOTE_ID }));
        }
    }, [QUOTE_ID, PROPOSAL_ID]);


    useEffect(() => {
        if (kycStatus !== null && kycStatus !== undefined) {
            // console.log("KYC==", kycStatus);
            router.push({
                pathname: "/fourwheeler/hdfc/proposal_checkout",
                query: {
                    quoteId: QUOTE_ID,
                    proposalId: PROPOSAL_ID,
                }
            })
        }
    }, [kycStatus]);

    // const callKycStatusAPI = () => {
    //   dispatch(
    //     actionKYCStatus({
    //       reference_id: "ca9ec82323-15de-45d7-a40d-ffc66f602850",
    //       proposal_id: "prb76072cf-a05a-437b-8f9a-20a194924fa9",
    //     })
    //   );
    // };

    useEffect(() => {
        if (getHDFCProposalDetails !== null) {
            dispatch(resetProposal());
            if (getHDFCProposalDetails?.result == true) {
                setProposalObjectDetails(getHDFCProposalDetails?.response);

                let kycDocTypes = transformKYCDocTypes(
                    getHDFCProposalDetails?.response?.masters?.kyc_master
                );
                setDropdownDocuments(kycDocTypes);

                let entTypes = getHDFCProposalDetails?.response?.KYC_ENT_MASTER;
                setDropdownEntType(entTypes);
            } else {
                switch (getHDFCProposalDetails?.status) {
                    case UNAUTHORIZED:
                        break;
                    case ERROR:
                        console.error("An error occurred.");
                        break;
                    default:
                        console.warn("Unhandled status:", getHDFCProposalDetails?.status);
                }
            }
        }
    }, [getHDFCProposalDetails]);

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
                <PolicyAndCarDetails proposalObjectDetails={proposalObjectDetails} masterDetails={masterDetails} quoteId={QUOTE_ID} />
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

                    {/* {isRedirection ? (
                        <div style={{ textAlign: "center", marginTop: "50px" }}>
                            <p>
                                <strong>You are being redirected to KYC portal</strong>
                            </p>
                            <p style={{ color: "blue" }}>Please wait ...</p>
                            <p>(Please do not press 'Refresh' or 'Back' button)</p>

                            <form ref={formRef} id="KYCFailedFormTag" method="post" name="redirect" action="https://ekyc-uat.fggeneral.in/kyc-verification?access=25a8c3ac0a90ca08b41fcf6d5aafc5876aaa6d3dd0c84a2ee698c3394af634a474444f011149a61ed31964fa985f">
                                <input
                                    type="hidden"
                                    name="VISoF_KYC_Req_No"
                                    value={kycSubmit.proposal_id}
                                />

                                <input
                                    type="hidden"
                                    name="IC_KYC_No"
                                    value={kycSubmit.proposal_id}
                                />
                                <input
                                    type="hidden"
                                    name="VISoF_Return_URL"
                                    //   value="http://localhost:3000/fourwheeler/future_generali/checkout/?quoteId=ca5cf5c74c-2168-4756-b264-e5c51329f183&proposalId=pre6de1878-3be7-4410-b74b-ab4022c7212f"

                                    value={`http://localhost:3000/fourwheeler/hdfc/proposal_checkout/?quoteId=${QUOTE_ID}&proposalId=${PROPOSAL_ID}`}

                                // value={`https://car-insurance.kaitotech.com/fourwheeler/hdfc/proposal_checkout/?quoteId=${QUOTE_ID}&proposalId=${PROPOSAL_ID}`}
                                />
                                <input id="KYCFailedForm" type="submit" form="KYCFailedFormTag" value="Click me" />
                            </form>
                        </div>
                    ) : ( */}
                    <StyledPaper>
                        {/* Step 1: KYC Details */}
                        <StepContainer>
                            <StepHeader
                            // onClick={() => handleToggleStep(5)}
                            >
                                <StepNumber>1</StepNumber>
                                <StepTitle>KYC Details</StepTitle>
                                {/* {activeStep !== 5 && activeStep > 5 && (
                                        <EditButton onClick={() => handleEditStep(4)}>
                                            EDIT
                                        </EditButton>
                                    )} */}
                            </StepHeader>

                            <DatePickerWrapper>
                                <StepContent>
                                    <form onSubmit={kycDetailsHandleSubmit(submitKYCDetails)}>
                                        <Grid container spacing={5}>
                                            {/* <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="first_name"
                                                        control={kycDetailsControl}
                                                        rules={{
                                                            required: "First Name is required", // Required validation
                                                            pattern: {
                                                                value: /^[A-Za-z]{1,25}$/, // Only alphabets, minimum 2, maximum 25 characters, no spaces
                                                                message:
                                                                    "First Name must be 1-25 alphabets with no spaces",
                                                            },
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={
                                                                    <CustomLabel label="First Name" required />
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
                                                                placeholder="Enter First Name"
                                                                aria-describedby="validation-basic-first-name"
                                                                error={Boolean(kycDetailsErrors?.first_name)} // Pass boolean value for error
                                                                helperText={
                                                                    kycDetailsErrors?.first_name
                                                                        ? kycDetailsErrors.first_name.message
                                                                        : ""
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid> */}

                                            {/* <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="last_name"
                                                        control={kycDetailsControl}
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
                                                                error={Boolean(kycDetailsErrors.last_name)}
                                                                aria-describedby="validation-basic-last-name"
                                                                helperText={
                                                                    kycDetailsErrors?.last_name
                                                                        ? kycDetailsErrors.last_name.message
                                                                        : ""
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid> */}

                                            {/* <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="gender_master_id" // key name
                                                        control={kycDetailsControl} // control object from useForm
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
                                                                            kycDetailsErrors?.gender_master_id
                                                                                ? kycDetailsErrors.gender_master_id
                                                                                    .message
                                                                                : ""
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid> */}

                                            {
                                                proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Individual' &&
                                                <Grid item xs={12} sm={6}>
                                                    {/* <Controller
                                                        name="kyc_type_id" // key name
                                                        control={kycDetailsControl} // control object from useForm
                                                        rules={{ required: "Document Type is required" }}
                                                        render={({
                                                            field: { value, onChange },
                                                            fieldState: { error },
                                                        }) => (
                                                            <Autocomplete
                                                                options={dropdownDocuments} // Options for dropdown
                                                                value={value || null} // Bind value for single selection
                                                                onChange={(event, newValue) =>
                                                                    onChange(newValue)
                                                                } // Handle change
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option.label === value?.label
                                                                } // Match based on label
                                                                filterOptions={(
                                                                    dropdownDocuments,
                                                                    { inputValue }
                                                                ) =>
                                                                    dropdownDocuments.filter(
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
                                                                                label="Document Type"
                                                                                required
                                                                            />
                                                                        }
                                                                        variant="outlined"
                                                                        placeholder="Select Document Type"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={
                                                                            kycDetailsErrors?.kyc_type_id
                                                                                ? kycDetailsErrors
                                                                                    .kyc_type_id.message
                                                                                : ""
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    /> */}
                                                    <Controller
                                                        name="kyc_type_id"
                                                        control={kycDetailsControl}
                                                        rules={{ required: 'Document type is required' }}
                                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                            <Autocomplete
                                                                options={dropdownDocuments}
                                                                value={value || null}
                                                                onChange={(event, newValue) => {
                                                                    onChange(newValue);
                                                                    kycDetailsClearErrors()
                                                                    kycDetailsSetValue('ckycReferenceNumber', '')
                                                                    setSelectedDocType(newValue);
                                                                }}
                                                                isOptionEqualToValue={(option, value) => option.label === value?.label}
                                                                filterOptions={(options, { inputValue }) =>
                                                                    options.filter((option) =>
                                                                        option.label.toLowerCase().includes(inputValue.toLowerCase())
                                                                    )
                                                                }
                                                                renderInput={(params) => (
                                                                    <CustomTextField
                                                                        {...params}
                                                                        label={<CustomLabel label="Document Type" required />}
                                                                        variant="outlined"
                                                                        placeholder="Select Document Type"
                                                                        error={Boolean(error)}
                                                                        helperText={
                                                                            kycDetailsErrors?.kyc_type_id?.message || ''
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            }

                                            {/* <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="kyc_reference_number"
                                                    control={kycDetailsControl}
                                                    rules={{
                                                        required: "PAN Card No. is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9]{10}$/, // exactly 10 uppercase letters and/or digits
                                                            message: "PAN Card No. must be exactly 10 uppercase letters and numbers",
                                                        },
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={
                                                                <CustomLabel
                                                                    label="PAN Card No."
                                                                    required
                                                                />
                                                            }
                                                            inputProps={{
                                                                maxLength: 10, // limit input length
                                                                style: { textTransform: "uppercase" },
                                                            }}
                                                            sx={{
                                                                '& .MuiInputBase-input::placeholder': {
                                                                    textTransform: 'none'
                                                                }
                                                            }}
                                                            onChange={(e) => {
                                                                const cleaned = e.target.value
                                                                    .replace(/[^A-Za-z0-9]/g, "")
                                                                    .toUpperCase()
                                                                    .slice(0, 10); // ensure it doesn't exceed 10 characters
                                                                onChange(cleaned);
                                                            }}
                                                            placeholder="Enter PAN Card Number"
                                                            aria-describedby="validation-reference-number"
                                                            error={Boolean(
                                                                kycDetailsErrors?.kyc_reference_number
                                                            )}
                                                            helperText={
                                                                kycDetailsErrors?.kyc_reference_number?.message || ""
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid> */}

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="kyc_reference_number"
                                                    control={kycDetailsControl}
                                                    rules={refValidation}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label={refLabel} required />}
                                                            inputProps={{
                                                                maxLength:
                                                                    documentValidationRules[selectedDocType?.label]?.maxLength || 10,
                                                                style: { textTransform: 'uppercase' }
                                                            }}
                                                            sx={{
                                                                '& .MuiInputBase-input::placeholder': {
                                                                    textTransform: 'none'
                                                                }
                                                            }}
                                                            onChange={(e) => {
                                                                let cleaned = e.target.value;
                                                                const docType = selectedDocType?.label;

                                                                if (docType === 'PAN') {
                                                                    cleaned = cleaned.replace(/[^A-Z0-9]/gi, '').toUpperCase();
                                                                } else if (docType === 'CKYC' || docType === 'AAADHAR') {
                                                                    cleaned = cleaned.replace(/\D/g, '');
                                                                } else {
                                                                    cleaned = cleaned.replace(/[^A-Z0-9]/gi, '').toUpperCase();
                                                                }

                                                                onChange(cleaned);
                                                            }}
                                                            placeholder={`Enter ${refLabel}`}
                                                            error={Boolean(kycDetailsErrors?.kyc_reference_number)}
                                                            helperText={
                                                                kycDetailsErrors?.kyc_reference_number?.message || ''
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>


                                            {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Individual' &&
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="date_of_birth" // key name
                                                        control={kycDetailsControl}
                                                        rules={{ required: "Date of Birth is required" }}
                                                        render={({ field: { value, onChange } }) => {
                                                            // Convert value to a valid Date object
                                                            const selectedDate = value
                                                                ? new Date(value)
                                                                : null;

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
                                                                            error={Boolean(
                                                                                kycDetailsErrors.date_of_birth
                                                                            )}
                                                                            aria-describedby="validation-basic-dob"
                                                                            helperText={
                                                                                kycDetailsErrors?.date_of_birth
                                                                                    ? kycDetailsErrors.date_of_birth
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
                                            }

                                            {
                                                proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Individual' &&
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="date_of_incorporation" // key name
                                                        control={kycDetailsControl}
                                                        rules={{ required: "Date of Incorporation is required" }}
                                                        render={({ field: { value, onChange } }) => {
                                                            // Convert value to a valid Date object
                                                            const selectedDate = value
                                                                ? new Date(value)
                                                                : null;

                                                            return (
                                                                <DatePicker
                                                                    selected={selectedDate}
                                                                    onChange={onChange}
                                                                    placeholderText="DD/MM/YYYY"
                                                                    dateFormat="dd/MM/yyyy"
                                                                    maxDate={new Date()}
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
                                                                                    label="Date of Incorporation"
                                                                                    required
                                                                                />
                                                                            }
                                                                            error={Boolean(
                                                                                kycDetailsErrors.date_of_incorporation
                                                                            )}
                                                                            aria-describedby="validation-basic-dob"
                                                                            helperText={
                                                                                kycDetailsErrors?.date_of_incorporation
                                                                                    ? kycDetailsErrors.date_of_incorporation
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
                                            }

                                            {
                                                proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Individual' &&
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="ent_type" // key name
                                                        control={kycDetailsControl} // control object from useForm
                                                        rules={{ required: "Enterprise Type is required" }}
                                                        render={({
                                                            field: { value, onChange },
                                                            fieldState: { error },
                                                        }) => (
                                                            <Autocomplete
                                                                options={dropdownEntType} // Options for dropdown
                                                                value={value || null} // Bind value for single selection
                                                                onChange={(event, newValue) =>
                                                                    onChange(newValue)
                                                                } // Handle change
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option.label === value?.label
                                                                } // Match based on label
                                                                filterOptions={(
                                                                    dropdownEntType,
                                                                    { inputValue }
                                                                ) =>
                                                                    dropdownEntType.filter(
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
                                                                                label="Enterprise Type"
                                                                                required
                                                                            />
                                                                        }
                                                                        variant="outlined"
                                                                        placeholder="Select Enterprise Type"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={
                                                                            kycDetailsErrors?.ent_type
                                                                                ? kycDetailsErrors
                                                                                    .ent_type.message
                                                                                : ""
                                                                        }
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            }


                                            {/* <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="ckyc_doc_type_master_id" // key name
                                                        control={kycDetailsControl} // control object from useForm
                                                        rules={{ required: "Document Type is required" }}
                                                        render={({
                                                            field: { value, onChange },
                                                            fieldState: { error },
                                                        }) => (
                                                            <Autocomplete
                                                                options={dropdownDocuments} // Options for dropdown
                                                                value={value || null} // Bind value for single selection
                                                                onChange={(event, newValue) =>
                                                                    onChange(newValue)
                                                                } // Handle change
                                                                isOptionEqualToValue={(option, value) =>
                                                                    option.label === value?.label
                                                                } // Match based on label
                                                                filterOptions={(
                                                                    dropdownDocuments,
                                                                    { inputValue }
                                                                ) =>
                                                                    dropdownDocuments.filter(
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
                                                                                label="Document Type"
                                                                                required
                                                                            />
                                                                        }
                                                                        variant="outlined"
                                                                        placeholder="Select Document Type"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={
                                                                            kycDetailsErrors?.ckyc_doc_type_master_id
                                                                                ? kycDetailsErrors
                                                                                    .ckyc_doc_type_master_id.message
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
                                                        "Submit"
                                                    )}
                                                </Button>

                                                {/* <Button
                                                        disabled={loading}
                                                        sx={{ mr: 3 }}
                                                        startIcon={<CheckIcon />}
                                                        onClick={() => callKycStatusAPI()}
                                                        variant="contained"
                                                    >

                                                        Kyc Status
                                                    </Button> */}
                                            </Grid>
                                        </Grid>
                                    </form>
                                </StepContent>
                            </DatePickerWrapper>
                        </StepContainer>
                    </StyledPaper>
                    {/* )} */}
                </Box>
            </Grid>
        </Grid>
    );
}

