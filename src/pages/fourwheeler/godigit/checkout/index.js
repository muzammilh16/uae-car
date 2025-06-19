import React, { forwardRef, useEffect, useState } from 'react';
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
    FormHelperText
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Image from 'next/image';
import { useTheme } from "@mui/material/styles";

import { useForm, Controller } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import DatePicker from 'react-datepicker';
import moment from "moment";

import CustomTextField from 'src/@core/components/mui/text-field';
import CustomLabel from 'src/views/components/custom_label';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import dayjs from 'dayjs';
import { formatRuppee, getFormData } from 'src/utility';
import { useDispatch, useSelector } from 'react-redux';
import { actionGetGodigitPincodeMaster, actionGetProposal, actionGodigitKYCStatus, actionGodigitPaymentMake, actionSubmitProposal, actionUpdateProposal, resetKycStatusDetails, resetPincodeDetails, resetProposal, resetSubmitProposal } from 'src/store/godigit_proposal';
import { setProposalId, setQuoteId } from 'src/store/urlReference';
import { useRouter } from 'next/router';
import { ERROR, UNAUTHORIZED } from 'src/common/constants';
import Icon from "src/@core/components/icon";
import toast from 'react-hot-toast';
import { actionGetQuoteMaster, resetField } from 'src/store/quoteDetails';
import InformationDialog from 'src/views/components/dialog_information';
import PolicyAndCarDetails from 'src/pageComponents/PolicyDetails';
import { isValid } from 'date-fns';


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
    }
};

const CustomInput = forwardRef(({ ...props }, ref) => {
    return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})

// Custom styled components to match Vuexy template style
const StyledPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: 700,
    margin: '0 auto',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
}));

const StepContainer = styled(Box)(({ theme }) => ({
    borderBottom: '1px solid #eee',
    '&:last-child': {
        borderBottom: 'none',
    }
}));

// const StepHeader = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     padding: '1.5rem',
//     cursor: 'pointer',
//     position: 'relative',
// }));

// const StepNumber = styled(Box)(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 32,
//     height: 32,
//     borderRadius: '50%',
//     backgroundColor: '#f0f2f5',
//     color: '#333',
//     fontWeight: 500,
//     marginRight: '1rem',
//     border: '1px solid #ddd',
// }));

// const StepTitle = styled(Typography)(({ theme }) => ({
//     fontSize: '1.25rem',
//     fontWeight: 500,
//     color: '#333',
// }));


// const EditButton = styled(Button)(({ theme }) => ({
//     position: 'absolute',
//     right: '1.5rem',
//     backgroundColor: 'transparent',
//     // color: theme.palette.primary.main,
//     // border: `1px solid ${theme.palette.primary.main}`,
//     color: 'red',
//     border: `1px solid red`,
//     borderRadius: 4,
//     padding: '0.25rem 0.75rem',
//     fontSize: '0.75rem',
//     minWidth: 'auto',
//     '&:hover': {
//         backgroundColor: 'rgba(255, 112, 67, 0.04)',
//     }
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

const StepContent = styled(Box)(({ theme }) => ({
    padding: '0 1.5rem 1.5rem',
}));

const StyledFormGroup = styled(Box)(({ theme }) => ({
    marginBottom: '1.5rem',
}));

const FormLabel = styled(Typography)(({ theme }) => ({
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: 400,
}));

const InputContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
}));

const ValidationIcon = styled(CheckCircleOutlineIcon)(({ theme }) => ({
    position: 'absolute',
    right: '0.75rem',
    color: '#4caf50',
}));

const ContinueButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#ff7043',
    color: 'white',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: 4,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: '#f4511e',
    }
}));

const DetailRow = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
}));

const DetailLabel = styled(Typography)(({ theme }) => ({
    fontWeight: 500,
    color: '#666',
}));

const DetailValue = styled(Typography)(({ theme }) => ({
    color: '#333',
}));

const SummaryContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 1.5rem',
}));

const SummarySection = styled(Box)(({ theme }) => ({
    // '& > *:first-of-type': {
    //     fontWeight: 500,
    //     marginBottom: '0.25rem',
    // }
}));

const ReviewPaper = styled(Paper)(({ theme }) => ({
    width: '100%',
    maxWidth: 700,
    margin: '0 auto',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}));

const ReviewHeader = styled(Box)(({ theme }) => ({
    padding: '1.5rem',
    textAlign: 'center',
    borderBottom: '1px solid #eee',
}));

const ReviewSection = styled(Box)(({ theme }) => ({
    padding: '1.5rem',
    borderBottom: '1px solid #eee',
    position: 'relative',
}));

// const ReviewSectionTitle = styled(Typography)(({ theme }) => ({
//     color: '#666',
//     fontSize: '0.875rem',
//     textTransform: 'uppercase',
//     marginBottom: '0.5rem',
// }));

// const ReviewEditButton = styled(Button)(({ theme }) => ({
//     position: 'absolute',
//     right: '1.5rem',
//     top: '1.5rem',
//     backgroundColor: 'transparent',
//     // color: theme.palette.primary.main,
//     // border: `1px solid ${theme.palette.primary.main}`,
//     color: 'red',
//     border: `1px solid red`,
//     borderRadius: 4,
//     padding: '0.25rem 0.75rem',
//     fontSize: '0.75rem',
//     minWidth: 'auto',
//     '&:hover': {
//         backgroundColor: 'rgba(255, 112, 67, 0.04)',
//     }
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

const VehicleInfoSection = styled(Box)(({ theme }) => ({
    padding: '1.5rem',
    backgroundColor: '#fafafa',
    borderBottom: '1px solid #eee',
}));

const InformationBox = styled(Box)(({ theme }) => ({
    marginBottom: '1rem',
}));

const CompleteKYCButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: 4,
    textTransform: 'none',
    width: '100%',
    maxWidth: '300px',
    margin: '1rem auto',
    display: 'block',
    '&:hover': {
        backgroundColor: '#f4511e',
    }
}));

export default function CheckoutStepper() {

    const theme = useTheme();
    const router = useRouter();
    const { QUOTE_ID, PROPOSAL_ID } = useSelector((state) => state?.urlReferenceStore);
    const { getProposalDetails, getPincodeDetails, proposalUpdate, proposalSubmit, kycStatusDetails, paymentMakeDetails } = useSelector((state) => state.godigitProposalStore);
    const { QUOTE_MASTER } = useSelector((state) => state.quoteDetailsStore);


    const { control: carOwnerDetailsControl, handleSubmit: carOwnerDetailsHandleSubmit, setValue: carOwnerDetailsSetValue, watch: carOwnerDetailsWatch, formState: { errors }, reset, setError, clearErrors } = useForm();

    const { control: communicationAddressControl, handleSubmit: communicationAddressHandleSubmit, setValue: communicationAddressSetValue, watch: communicationAddressWatch, formState: { errors: communicationAddressErrors }, reset: communicationAddressReset, setError: communicationAddressSetError, clearErrors: communicationAddressClearErrors } = useForm();

    const { control: vehicleDetailsControl, handleSubmit: vehicleDetailsHandleSubmit, setValue: vehicleDetailsSetValue, watch: vehicleDetailsWatch, formState: { errors: vehicleDetailsErrors }, reset: vehicleDetailsReset, setError: vehicleDetailsSetError, clearErrors: vehicleDetailsClearErrors } = useForm();

    const { control: nomineeDetailsControl, handleSubmit: nomineeDetailsHandleSubmit, setValue: nomineeDetailsSetValue, watch: nomineeDetailsWatch, formState: { errors: nomineeDetailsErrors }, reset: nomineeDetailsReset, setError: nomineeDetailsSetError, clearErrors: nomineeDetailsClearErrors } = useForm();

    const { control: kycDetailsControl, handleSubmit: kycDetailsHandleSubmit, setValue: kycDetailsSetValue, watch: kycDetailsWatch, formState: { errors: kycDetailsErrors }, reset: kycDetailsReset, setError: kycDetailsSetError, clearErrors: kycDetailsClearErrors } = useForm();

    const watchPincode = communicationAddressWatch("pincode");


    const [loading, setLoading] = useState(false);

    const [isKycStatusButtonDisabled, setIsKycStatusButtonDisabled] = useState(false);
    const [isMakePaymentButtonDisabled, setIsMakePaymentButtonDisabled] = useState(true);
    const [informationDialogOpen, setInformationDialogOpen] = useState(false);
    const [infoDialogContent, setInfoDialogContent] = useState("");

    const [kycStatusButtonLoading, setKycStatusButtonLoading] = useState(false);

    const [dropdownGender, setDropDownGender] = useState([
        {
            "label": "Male",
            "value": "male"
        },
        {
            "label": "Female",
            "value": "female"
        },
        {
            "label": "Other",
            "value": "other"
        }
    ]);

    const [dropdownMonth, setDropDownMonth] = useState([
        {
            "label": "January",
            "value": "1"
        },
        {
            "label": "February",
            "value": "2"
        },
        {
            "label": "March",
            "value": "3"
        },
        {
            "label": "April",
            "value": "4"
        },
        {
            "label": "May",
            "value": "5"
        },
        {
            "label": "June",
            "value": "6"
        },
        {
            "label": "July",
            "value": "7"
        },
        {
            "label": "August",
            "value": "8"
        },
        {
            "label": "September",
            "value": "9"
        },
        {
            "label": "October",
            "value": "10"
        },
        {
            "label": "November",
            "value": "11"
        },
        {
            "label": "December",
            "value": "12"
        }
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
        { label: "2010", value: "2010" }
    ]);

    const [dropdownRelation, setdropdownRelation] = useState([
        { label: "Father", value: "FATHER" },
        { label: "Mother", value: "MOTHER" },
        { label: "Brother", value: "BROTHER" },
        { label: "Sister", value: "SISTER" },
    ])

    const [dropdownNomineeRelation, setdropdownNomineeRelation] = useState([
        { label: "Father", value: "FATHER" },
        { label: "Mother", value: "MOTHER" },
        { label: "Brother", value: "BROTHER" },
        { label: "Sister", value: "SISTER" },
    ])

    const [dropdownDocuments, setDropdownDocuments] = useState([
        { label: "Aadhar", value: "aadhar" },
        { label: "PAN", value: "PAN" },
        { label: "Driving License", value: "dirving licnese" },
    ])

    const minDate = moment().subtract(18, 'years').startOf('day').toDate(); // 18 years ago at midnight


    const [activeStep, setActiveStep] = useState(1);
    const [showReview, setShowReview] = useState(false);
    const [carOwnerDetails, setCarOwnerDetails] = useState({
        companyRegistered: 'no',
        ownerName: 'KAITO RETAIL',
        email: 'a**i@gmail.com',
        mobileNumber: '+91 9********99',
        gender: "Male",
        dob: '07-02-1991',
    });
    const [personalDetails, setPersonalDetails] = useState({
        gender: 'female',
        married: 'no',
        dateOfBirth: {
            day: '07',
            month: 'February',
            year: '1991'
        },
        panNumber: 'BXGPR1288D',
        noPan: false,
        nominee: {
            name: 'TEST',
            age: '20',
            relation: 'Daughter'
        }
    });
    const [communicationAddress, setCommunicationAddress] = useState({
        address: 'Pune, BhosariTets',
        pincode: '282006'
    });
    const [vehicleDetails, setVehicleDetails] = useState({
        engineNumber: '8686868686868686',
        chassisNumber: '323232323232332323232323232',
        car: {
            make: 'Ford',
            model: 'Aspire TI-VCT Titanium',
            year: '1194 CC',
            fuel: 'Petrol'
        },
        rto: 'AN-01 Port Blair',
        idv: 'Rs. 5,98,899',
        manufactureDate: '01-04-2025',
        zeroDepreciation: 'No',
        additionalCovers: 'Personal Accident Cover',
        loanProvider: 'Car not on Loan',
        financedCompany: 'HDFC Bank',
        isCarFinanced: true,
        registrationNumber: 'MH 12 AB 1234',
        manufacturedYear: '2025',
        manufacturedMonth: 'Feb',
    });

    const [nomineeDetails, setNomineeDetails] = useState({
        "nominee_name": "Rohan Rana",
        "nominee_dob": "2007-01-17",
        "nominee_relationship": "Father",
        "appointee_name": "Shivam",
        "appointee_relationship": "Brother",
        "section": "nominee",
        "proposal_id": "",
        "reference_id": ""
    })

    const [kycDetails, setKycDetails] = useState({
        "document_type": "Aadhar",
        "reference_number": "123456789012",
        "document_file": "file.pdf",
    })

    const [proposalObjectDetails, setProposalObjectDetails] = useState(null);
    const [masterDetails, setMasterDetails] = useState(null);

    const [documentFile, setDocumentFile] = useState(null);
    const dispatch = useDispatch();

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [kycAccepted, setKycAccepted] = useState(false);

    const [isRegNoDisabled, setIsRegNoDisabled] = useState(false);


    const [selectedDocType, setSelectedDocType] = useState(null);
    const [refLabel, setRefLabel] = useState('Reference Number');
    const [refValidation, setRefValidation] = useState({});

    useEffect(() => {
        const label = selectedDocType?.label;
        if (label && documentValidationRules[label]) {
            setRefLabel(documentValidationRules[label].label);
            setRefValidation(documentValidationRules[label].rules);
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
    }, [selectedDocType]);


    function transformGenderArray(inputArray) {
        return inputArray.map(item => {
            return {
                label: item.pjMasterGeneral.label,
                value: item.pjMasterGeneral.id
            };
        });
    }

    function transformNomineeRelationships(inputArray) {
        return inputArray.map(item => {
            return {
                label: item.pjMasterNomineeRelationships.label,
                value: item.pjMasterNomineeRelationships.id
            };
        });
    }

    function transformKYCDocTypes(inputArray) {
        return inputArray.map(item => {
            return {
                label: item.pjMasterKYCDocTypes.label,
                value: item.pjMasterKYCDocTypes.id
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

    const handleCarOwnerChange = (field, value) => {
        setCarOwnerDetails({
            ...carOwnerDetails,
            [field]: value
        });
    };

    const handlePersonalDetailsChange = (field, value) => {
        setPersonalDetails({
            ...personalDetails,
            [field]: value
        });
    };

    const handleDateChange = (field, value) => {
        setPersonalDetails({
            ...personalDetails,
            dateOfBirth: {
                ...personalDetails.dateOfBirth,
                [field]: value
            }
        });
    };

    const handleNomineeChange = (field, value) => {
        setPersonalDetails({
            ...personalDetails,
            nominee: {
                ...personalDetails.nominee,
                [field]: value
            }
        });
    };

    const handleContinueToReview = () => {
        setLoading(true);
        let input = {
            reference_id: QUOTE_ID,
            proposal_id: PROPOSAL_ID,
            first_name: carOwnerDetailsWatch('first_name'),
            last_name: carOwnerDetailsWatch('last_name'),
            email_id: carOwnerDetailsWatch('email_id'),
            mobile_no: carOwnerDetailsWatch('mobile_no'),
            gender_master_id: carOwnerDetailsWatch('gender_master_id')?.value,
            date_of_birth: dayjs(carOwnerDetailsWatch('date_of_birth')).format("YYYY-MM-DD"),
            address_line_1: communicationAddressWatch('address_line_1'),
            address_line_2: communicationAddressWatch('address_line_2'),
            pincode: communicationAddressWatch('pincode'),
            vehicle_registration_no: vehicleDetailsWatch('vehicle_registration_no'),
            engine_no: vehicleDetailsWatch('engine_no'),
            chassis_no: vehicleDetailsWatch('chassis_no'),
            is_car_financed: vehicleDetailsWatch('is_car_financed'),
            // financed_company: vehicleDetailsWatch('financed_company'),
            nominee_name: nomineeDetailsWatch('nominee_name'),
            nominee_dob: dayjs(nomineeDetailsWatch('nominee_dob')).format("YYYY-MM-DD"),
            nominee_relationship_master_id: nomineeDetailsWatch('nominee_relationship_master_id')?.value,
            ckycReferenceNumber: kycDetailsWatch('ckycReferenceNumber'),
            ckyc_doc_type_master_id: kycDetailsWatch('ckyc_doc_type_master_id')?.value,
        }

        if (vehicleDetailsWatch('is_car_financed') == "true") {
            input.financed_company = vehicleDetailsWatch('financed_company')
        }
        // console.log(vehicleDetailsWatch('financed_company'))
        // dispatch(actionSubmitProposal(params));

        if (masterDetails?.is_previous_tp_policy_no_visible) {
            input.previous_tp_policy_no = vehicleDetailsWatch('previous_tp_policy_no')
        }
        if (masterDetails?.is_previous_policy_no_visible) {
            input.prev_policy_no = vehicleDetailsWatch('prev_policy_no')
        }

        if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization') {
            input.last_name = null;
            input.date_of_birth = null;
            input.gender_master_id = null;
            input.proposer_type = proposalObjectDetails?.pjCarQuotationDetails?.proposer_type
        }

        // if (vehicleDetailsWatch('vehicle_registration_no') != 'NEW') {
        //     input.vehicle_registration_no = vehicleDetailsWatch('vehicle_registration_no')
        // }

        var objFormData = getFormData(input, [
            documentFile ? { title: "document", data: documentFile } : null,
        ]);

        console.log(input);
        dispatch(actionSubmitProposal(objFormData));
        // setShowReview(true);
    };

    const handleCompleteKYC = () => {
        alert('KYC completed successfully!');
    };

    const checkKycStatus = () => {
        setKycStatusButtonLoading(true);
        setIsKycStatusButtonDisabled(true);
        let params = {
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID
        }
        dispatch(actionGodigitKYCStatus(params));
    }

    const makePayment = () => {
        let params = {
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID
        }
        dispatch(actionGodigitPaymentMake(params));
    }

    const handleFetchKycStatus = () => {
        let params = {
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID
        }
        dispatch(actionGodigitKYCStatus(params));
    }

    useEffect(() => {
        if (paymentMakeDetails !== null && paymentMakeDetails.status == 200) {
            const redirectUrl = paymentMakeDetails?.response?.full_request;
            if (redirectUrl) {
                // Redirect to the full_request URL
                window.location.href = redirectUrl;
            } else {
                console.error('Redirect URL not found in response');
            }
        }
    }, [paymentMakeDetails])


    useEffect(() => {
        if (kycStatusDetails !== null) {
            // console.log("gfhfhfhghf",kycStatusDetails?.response?.kyc_status);
            // dispatch(resetKycStatusDetails());
            if (kycStatusDetails?.response?.kyc_status == "success") {
                setIsKycStatusButtonDisabled(true);
                setIsMakePaymentButtonDisabled(false);
                if (kycStatusDetails?.status == 425) {
                    setInfoDialogContent(kycStatusDetails?.response?.reason);
                    setInformationDialogOpen(true);
                }
                else {
                    toast.success(kycStatusDetails?.message);
                }

            }
            else {
                setIsKycStatusButtonDisabled(false);
                setIsMakePaymentButtonDisabled(true);
                if (showReview) {
                    toast.error(kycStatusDetails?.message);
                    if (kycStatusDetails?.response?.kyc_redirection_url && kycStatusDetails?.response?.kyc_redirection_url !== "") {
                        // Open the URL in a new tab
                        window.open(kycStatusDetails.response.kyc_redirection_url, "_blank");
                    }
                }

            }
        }
        setKycStatusButtonLoading(false);
    }, [kycStatusDetails])

    useEffect(() => {
        if (proposalUpdate !== null && proposalUpdate.status == 200) {
            activeStep < 5 ? handleGoToStep(activeStep + 1) : handleContinueToReview();
            if (proposalUpdate?.message) {
                toast.success(proposalUpdate?.message);
            }
        }
        else {
            if (proposalUpdate?.message) {
                toast.error(proposalUpdate?.message);
            }
        }
    }, [proposalUpdate])

    // useEffect(() => {
    //     if (proposalSubmit !== null) {
    //         if (proposalSubmit.status == 200) {
    //             setShowReview(true);
    //             handleFetchKycStatus();
    //         }
    //         else {
    //             toast.error(proposalSubmit?.message?.message || "Some Error Occured!");
    //         }
    //         setLoading(false);
    //     }
    // }, [proposalSubmit])


    useEffect(() => {
        if (proposalSubmit !== null) {
            dispatch(resetSubmitProposal())
            if (proposalSubmit?.result) {
                setShowReview(true);
                handleFetchKycStatus();
                setLoading(false);
            } else {
                setLoading(false);
                toast.error(proposalSubmit?.message || "Some error occured");

            }
        }
    }, [proposalSubmit])



    useEffect(() => {
        handleGoToStep(1);
    }, [])



    const submitCarOwnerDetails = (data) => {
        let params = {
            ...data,
            // date_of_birth: dayjs(data.date_of_birth).format("YYYY-MM-DD"),
            date_of_birth: null,
            // gender_master_id: data.gender_master_id.value,
            gender_master_id: null,
            last_name: null,
            section: "owner",
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID,
        }


        if (data?.gender_master_id?.value) {
            params.gender_master_id = data.gender_master_id.value
        }
        if (data?.date_of_birth) {
            params.date_of_birth = dayjs(data.date_of_birth).format("YYYY-MM-DD")
        }
        if (data?.last_name) {
            params.last_name = data?.last_name
        }

        if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization') {
            params.proposer_type = proposalObjectDetails?.pjCarQuotationDetails?.proposer_type;
            params.gender_master_id = null;
            params.date_of_birth = null;
        }

        console.log(params);
        dispatch(actionUpdateProposal(params));
        // handleGoToStep(2);
    }

    const submitAddressDetails = (data) => {
        let params = {
            // ...data,
            address_line_1: data.address_line_1,
            address_line_2: data.address_line_2,
            pincode: data.pincode,
            section: "address",
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID,
        }
        console.log(params);
        dispatch(actionUpdateProposal(params));
        // handleGoToStep(3);
    }

    const submitVehicleDetails = (data) => {
        // let params = {
        //     ...data,
        //     // manufactured_year: data.manufactured_year.value,
        //     // manufactured_month: data.manufactured_month.value,
        //     section: "vehicle",
        //     proposal_id: PROPOSAL_ID,
        //     reference_id: QUOTE_ID,
        // }
        let params = {
            vehicle_registration_no: data.vehicle_registration_no,
            engine_no: data.engine_no,
            chassis_no: data.chassis_no,
            is_car_financed: data.is_car_financed,
            section: "vehicle",
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID,
        }

        if (data.is_car_financed == "true") {
            params.financed_company = data.financed_company;
        }

        if (masterDetails?.is_previous_tp_policy_no_visible) {
            params.previous_tp_policy_no = data.previous_tp_policy_no
        }

        if (masterDetails?.is_previous_policy_no_visible) {
            params.prev_policy_no = data.prev_policy_no
        }

        // if (data.vehicle_registration_no != 'NEW') {
        //     params.vehicle_registration_no = data.vehicle_registration_no
        // }
        console.log(params);
        dispatch(actionUpdateProposal(params));
        // handleGoToStep(4);
    }

    const submitNomineeDetails = (data) => {
        let params = {
            ...data,
            nominee_dob: dayjs(data.nominee_dob).format("YYYY-MM-DD"),
            // appointee_relationship: data.appointee_relationship.value,
            nominee_relationship_master_id: data.nominee_relationship_master_id.value,
            section: "nominee",
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID,
        }
        console.log(params);
        dispatch(actionUpdateProposal(params));
        // handleGoToStep(5);
    }

    const submitKYCDetails = (data) => {
        // let params = {
        //     ...data,
        //     section: "ckyc",
        //     proposal_id: "",
        //     reference_id: "",
        // }
        // console.log(params);
        delete data.document_file;

        let input = {
            ...data,
            ckyc_doc_type_master_id: data.ckyc_doc_type_master_id.value,
            section: "ckyc",
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID,
        }

        var objFormData = getFormData(input, [
            documentFile ? { title: "document", data: documentFile } : null,
        ]);

        dispatch(actionUpdateProposal(objFormData));

        // console.log(objFormData);
    }

    const fetchPincodeDetails = (pincode) => {
        console.log("API call for pincode:", pincode);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setDocumentFile(file);
        }
    };

    const MAX_FILE_SIZE = 100 * 1024 * 1024;


    const validateFile = (file) => {
        if (!file) {
            if (proposalObjectDetails?.kyc_profile) {
                return
            }
            else {
                return "Please upload a document file (PDF or Image)"
            }
        }
        // if (!file) {
        //     return "Please upload a document file (PDF or Image)"
        // }

        const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/jpg", "image/webp"];

        // if (file.type !== "application/pdf") {
        //   return "Only PDF files are allowed.";
        // }
        if (!allowedTypes.includes(file.type)) {
            return "Only PDF and Images are allowed"
        }
        if (file.size > MAX_FILE_SIZE) {
            return "File size should not exceed 100MB.";
        }
        return true;
    };

    // useEffect(() => {
    //     router.push({
    //         pathname: "/fourwheeler/godigit/checkout",
    //         query: {
    //             quoteId: QUOTE_ID,
    //             proposalId: PROPOSAL_ID
    //         },
    //     });
    // }, [QUOTE_ID, PROPOSAL_ID]);

    // useEffect(() => {
    //     if (QUOTE_ID === null) {
    //         const storedQuoteId = localStorage.getItem('QUOTE_ID');
    //         if (storedQuoteId) {
    //             dispatch(setQuoteId(storedQuoteId));
    //         }
    //     }
    //     if (PROPOSAL_ID === null) {
    //         const storedProposalId = localStorage.getItem('PROPOSAL_ID');
    //         if (storedProposalId) {
    //             dispatch(setProposalId(storedProposalId));
    //         }
    //     }
    // }, [QUOTE_ID, PROPOSAL_ID, dispatch]);

    // const fetchProposal = async () => {
    //     try {
    //         const params = {
    //             reference_id: QUOTE_ID,
    //             proposal_id: PROPOSAL_ID
    //         };

    //         const response = await dispatch(actionGetProposal(params)).unwrap();
    //         console.log("Proposal response:", response);
    //     } catch (error) {
    //         console.error("Failed to fetch proposal:", error);
    //     }
    // };

    useEffect(() => {
        if (!QUOTE_ID) {
            const storedQuoteId = localStorage.getItem('QUOTE_ID');
            if (storedQuoteId) {
                dispatch(setQuoteId(storedQuoteId));
            }
        }
        if (!PROPOSAL_ID) {
            const storedProposalId = localStorage.getItem('PROPOSAL_ID');
            if (storedProposalId) {
                dispatch(setProposalId(storedProposalId));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        if (QUOTE_ID && PROPOSAL_ID) {
            router.push({
                pathname: "/fourwheeler/godigit/checkout",
                query: {
                    quoteId: QUOTE_ID,
                    proposalId: PROPOSAL_ID
                },
            });
            // fetchProposal();
            let params = {
                reference_id: QUOTE_ID,
                proposal_id: PROPOSAL_ID
            };

            dispatch(actionGetProposal(params));
            dispatch(actionGetQuoteMaster({ reference_id: QUOTE_ID }));
        }
    }, [QUOTE_ID, PROPOSAL_ID]);



    useEffect(() => {
        if (proposalObjectDetails !== null && proposalObjectDetails !== undefined && proposalObjectDetails?.gender_master_id && dropdownGender?.length > 0) {
            const matchedGender = dropdownGender.find(gender => gender?.value === proposalObjectDetails?.gender_master_id);
            if (matchedGender) {
                carOwnerDetailsSetValue('gender_master_id', matchedGender);
            }
        }
    }, [proposalObjectDetails, dropdownGender])

    useEffect(() => {
        if (proposalObjectDetails !== null && proposalObjectDetails !== undefined && proposalObjectDetails?.nominee_relationship_master_id && dropdownNomineeRelation?.length > 0) {
            const matchedNominee = dropdownNomineeRelation.find(relation => relation?.value === proposalObjectDetails?.nominee_relationship_master_id);
            if (matchedNominee) {
                nomineeDetailsSetValue('nominee_relationship_master_id', matchedNominee);
            }
        }
    }, [proposalObjectDetails, dropdownNomineeRelation])

    useEffect(() => {
        if (proposalObjectDetails !== null && proposalObjectDetails !== undefined && proposalObjectDetails?.kyc_json?.ckycReferenceDocId && dropdownDocuments?.length > 0) {
            const matchedDoc = dropdownDocuments.find(doc => doc?.value === proposalObjectDetails?.kyc_json?.ckycReferenceDocId);
            if (matchedDoc) {
                setSelectedDocType(matchedDoc)
                kycDetailsSetValue('ckyc_doc_type_master_id', matchedDoc);
            }
        }
    }, [proposalObjectDetails, dropdownDocuments])

    useEffect(() => {
        if (proposalObjectDetails !== null && proposalObjectDetails !== undefined) {
            if (proposalObjectDetails?.is_car_financed == 1) {
                vehicleDetailsSetValue('is_car_financed', "true");
            }
            else if (proposalObjectDetails?.is_car_financed == 0) {
                vehicleDetailsSetValue('is_car_financed', "false");
            }
        }
    }, [proposalObjectDetails])


    // useEffect(() => {
    //     if (proposalObjectDetails === null || proposalObjectDetails === undefined) return;

    //     // Handle gender matching
    //     if (proposalObjectDetails?.gender_master_id && dropdownGender?.length > 0) {
    //         const matchedGender = dropdownGender.find(gender =>
    //             gender?.value === proposalObjectDetails?.gender_master_id);
    //         if (matchedGender) {
    //             carOwnerDetailsSetValue('gender_master_id', matchedGender);
    //         }
    //     }

    //     // Handle nominee relationship matching
    //     if (proposalObjectDetails?.nominee_relationship_master_id && dropdownNomineeRelation?.length > 0) {
    //         const matchedNominee = dropdownNomineeRelation.find(relation =>
    //             relation?.value === proposalObjectDetails?.nominee_relationship_master_id);
    //         if (matchedNominee) {
    //             nomineeDetailsSetValue('nominee_relationship_master_id', matchedNominee);
    //         }
    //     }

    //     // Handle document matching
    //     if (proposalObjectDetails?.kyc_json?.ckycReferenceDocId && dropdownDocuments?.length > 0) {
    //         const matchedDoc = dropdownDocuments.find(doc =>
    //             doc?.value === proposalObjectDetails?.kyc_json?.ckycReferenceDocId);
    //         if (matchedDoc) {
    //             kycDetailsSetValue('ckyc_doc_type_master_id', matchedDoc);
    //         }
    //     }

    //     // Handle car financing
    //     if (proposalObjectDetails?.is_car_financed === 1) {
    //         vehicleDetailsSetValue('is_car_financed', "true");
    //     } else if (proposalObjectDetails?.is_car_financed === 0) {
    //         vehicleDetailsSetValue('is_car_financed', "false");
    //     }

    // }, [proposalObjectDetails, dropdownGender, dropdownNomineeRelation, dropdownDocuments]);

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
        if (getProposalDetails !== null) {
            dispatch(resetProposal());
            // console.log("kfhskfh", getProposalDetails);
            if (getProposalDetails?.result == true) {

                setProposalObjectDetails(getProposalDetails?.response);

                carOwnerDetailsSetValue('first_name', getProposalDetails?.response?.first_name || '');
                carOwnerDetailsSetValue('last_name', getProposalDetails?.response?.last_name || '');
                // carOwnerDetailsSetValue('gender_master_id', getProposalDetails?.response?.gender_master_id || '');
                carOwnerDetailsSetValue('email_id', getProposalDetails?.response?.email_id || '');
                carOwnerDetailsSetValue('mobile_no', getProposalDetails?.response?.mobile_no || '');
                carOwnerDetailsSetValue('date_of_birth', getProposalDetails?.response?.date_of_birth || '');

                communicationAddressSetValue('address_line_1', getProposalDetails?.response?.address_line_1 || '');
                communicationAddressSetValue('address_line_2', getProposalDetails?.response?.address_line_2 || '');
                communicationAddressSetValue('pincode', getProposalDetails?.response?.pincode || '');

                vehicleDetailsSetValue('vehicle_registration_no', getProposalDetails?.response?.vehicle_registration_no || '');
                vehicleDetailsSetValue('engine_no', getProposalDetails?.response?.engine_no || '');
                vehicleDetailsSetValue('chassis_no', getProposalDetails?.response?.chassis_no || '');
                vehicleDetailsSetValue('previous_tp_policy_no', getProposalDetails?.response?.previous_tp_policy_no || '');
                vehicleDetailsSetValue('prev_policy_no', getProposalDetails?.response?.prev_policy_no || '');
                // vehicleDetailsSetValue('is_car_financed', getProposalDetails?.response?.is_car_financed || '');
                vehicleDetailsSetValue('financed_company', getProposalDetails?.response?.financed_company || '');
                // vehicleDetailsSetValue('manufactured_month', getProposalDetails?.response?.manufactured_month || '');
                // vehicleDetailsSetValue('manufactured_year', getProposalDetails?.response?.manufactured_year || '');

                nomineeDetailsSetValue('nominee_name', getProposalDetails?.response?.nominee_name || '');
                nomineeDetailsSetValue('nominee_dob', getProposalDetails?.response?.nominee_dob || '');
                // nomineeDetailsSetValue('nominee_relationship_master_id', getProposalDetails?.response?.nominee_relationship_master_id || '');

                // nomineeDetailsSetValue('appointee_name', getProposalDetails?.response?.appointee_name || '');
                // nomineeDetailsSetValue('appointee_relationship', getProposalDetails?.response?.appointee_relationship || '');

                // kycDetailsSetValue('ckyc_doc_type_master_id', getProposalDetails?.response?.kyc_json?.ckycReferenceDocId || '');
                kycDetailsSetValue('ckycReferenceNumber', getProposalDetails?.response?.kyc_json?.ckycReferenceNumber || '');

                let genders = transformGenderArray(getProposalDetails?.response?.masters?.general_master);
                setDropDownGender(genders);


                let nomineeRelationships = transformNomineeRelationships(getProposalDetails?.response?.masters?.nominee_master);
                setdropdownNomineeRelation(nomineeRelationships);

                let kycDocTypes = transformKYCDocTypes(getProposalDetails?.response?.masters?.kyc_master);
                console.log('kycDocTypes', kycDocTypes)
                setDropdownDocuments(kycDocTypes);

                dispatch(actionGetGodigitPincodeMaster({ pincode: getProposalDetails?.response?.pincode?.toString() || "" }))

            } else {
                switch (getProposalDetails?.status) {
                    case UNAUTHORIZED:
                        break;
                    case ERROR:
                        console.error("An error occurred.");
                        break;
                    default:
                        console.warn("Unhandled status:", getProposalDetails?.status);
                }
            }
        }
    }, [getProposalDetails]);

    useEffect(() => {
        if (watchPincode !== undefined && watchPincode !== null && watchPincode.length === 6) {
            dispatch(actionGetGodigitPincodeMaster({ pincode: watchPincode }))
        }
    }, [watchPincode]);

    useEffect(() => {
        if (getPincodeDetails) {
            dispatch(resetPincodeDetails());
            if (getPincodeDetails.result) {
                // Clear errors for city and state
                communicationAddressClearErrors('city');
                communicationAddressClearErrors('state');

                communicationAddressSetValue("state", getPincodeDetails?.response?.pjMasterGodigitState?.state_name || '')
                communicationAddressSetValue("city", getPincodeDetails?.response?.city || '');
                // setValue("city", getPincode?.response?.city?.label || '')
            } else {
                communicationAddressSetValue("state", '')
                communicationAddressSetValue("city", '')
                // setError("pincode", { message: getPincodeDetails?.message })
                switch (getPincodeDetails.status) {
                    case UNAUTHORIZED:
                        // auth.logout();
                        break;
                    case ERROR:
                        console.error("An error occurred.");
                        break;
                    default:
                        console.warn("Unhandled status:", getPincodeDetails.status);
                }
            }
        }
    }, [getPincodeDetails]);

    // useEffect(() => {
    //     if (proposalData?.response) {
    //         const data = proposalData.response;

    //         carOwnerDetailsSetValue('first_name', data.first_name || '');
    //         carOwnerDetailsSetValue('last_name', data.last_name || '');
    //         carOwnerDetailsSetValue('email_id', data.email_id || '');
    //         carOwnerDetailsSetValue('mobile_no', data.mobile_no || '');
    //         carOwnerDetailsSetValue('gender', data.gender || '');
    //         carOwnerDetailsSetValue('date_of_birth', data.date_of_birth || '');

    //         // console.log("data", data);
    //     }
    // }, [proposalData, reset]);

    function getTitleById(data, id) {
        // const coverageOptions = masterDetails?.response?.addons || [];
        const item = data.find(option => option.id === id);
        return item ? item.title : null;
    }

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
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // padding: '2rem',
                padding: {
                    xs: '1rem',
                    sm: '2rem'
                },
                backgroundColor: '#f0f2f5',
                minHeight: '100vh',
                fontFamily: '"Roboto", sans-serif'
            }}>
                <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Typography variant="h4" sx={{ fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>
                        CHECKOUT
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#666' }}>
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
                        <ReviewEditButton onClick={() => handleEditStep(1)}>EDIT</ReviewEditButton> */}
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
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Name</Typography>
                                        <Typography variant="body2">{carOwnerDetailsWatch('first_name') + " " + carOwnerDetailsWatch('last_name')}</Typography>
                                    </InformationBox>
                                }

                                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization' &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Company Name</Typography>
                                        <Typography variant="body2">{carOwnerDetailsWatch('first_name')}</Typography>
                                    </InformationBox>
                                }

                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Phone</Typography>
                                    <Typography variant="body2">{carOwnerDetailsWatch('mobile_no')}</Typography>
                                </InformationBox>

                                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Gender</Typography>
                                        <Typography variant="body2">{carOwnerDetailsWatch()?.gender_master_id?.label}</Typography>
                                    </InformationBox>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Email</Typography>
                                    <Typography variant="body2">{carOwnerDetailsWatch('email_id')}</Typography>
                                </InformationBox>

                                {
                                    proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Date of Birth</Typography>
                                        <Typography variant="body2">{carOwnerDetailsWatch()?.date_of_birth ? dayjs(carOwnerDetailsWatch()?.date_of_birth).format("DD-MM-YYYY") : ""}</Typography>
                                    </InformationBox>
                                }

                            </Grid>
                        </Grid>

                    </ReviewSection>

                    <ReviewSection>
                        {/* <ReviewSectionTitle>COMMUNICATION ADDRESS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(2)}>EDIT</ReviewEditButton> */}
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

                        <Typography variant="body2" sx={{ mt: 3 }}>
                            {/* {communicationAddressWatch('address_line_1')}, {communicationAddressWatch('address_line_2')} - {communicationAddressWatch('pincode')} */}
                            {communicationAddressWatch()?.address_line_1}{communicationAddressWatch()?.address_line_2 !== "" && ", "} {communicationAddressWatch()?.address_line_2}{", "}{communicationAddressWatch()?.city}{", "}{communicationAddressWatch()?.state}{" - "}{communicationAddressWatch()?.pincode}
                        </Typography>
                    </ReviewSection>

                    {/* Vehicle Details Section */}
                    <ReviewSection>
                        {/* <ReviewSectionTitle>VEHICLE DETAILS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(3)}>EDIT</ReviewEditButton> */}

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
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Registration Number</Typography>
                                    <Typography variant="body2">{vehicleDetailsWatch('vehicle_registration_no')}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Chassis Number</Typography>
                                    <Typography variant="body2">{vehicleDetailsWatch('chassis_no')}</Typography>
                                </InformationBox>
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
                                {/* <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Manufactured Month-Year</Typography>
                                    <Typography variant="body2">{vehicleDetails.manufacturedMonth + "-" + vehicleDetails.manufacturedYear}</Typography>
                                </InformationBox> */}
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Engine Number</Typography>
                                    <Typography variant="body2">{vehicleDetailsWatch('engine_no')}</Typography>
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

                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Is Car Financed</Typography>
                                    <Typography variant="body2">{vehicleDetailsWatch()?.is_car_financed == "true" ? "Yes" : "No"}</Typography>
                                </InformationBox>
                                {vehicleDetailsWatch()?.is_car_financed == "true" &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Financing Company</Typography>
                                        <Typography variant="body2">{vehicleDetailsWatch('financed_company')}</Typography>
                                    </InformationBox>
                                }
                            </Grid>
                        </Grid>
                    </ReviewSection>

                    {/* Nominee Details Section */}
                    <ReviewSection>
                        {/* <ReviewSectionTitle>NOMINEE DETAILS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(4)}>EDIT</ReviewEditButton> */}

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
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Nominee Name</Typography>
                                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{nomineeDetailsWatch('nominee_name')}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Nominee Date of Birth</Typography>
                                    <Typography variant="body2">{nomineeDetailsWatch()?.nominee_dob ? dayjs(nomineeDetailsWatch()?.nominee_dob).format("DD-MM-YYYY") : ""}</Typography>
                                </InformationBox>
                                {/* <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Apointee</Typography>
                                    <Typography variant="body2">{nomineeDetails.appointee_name}</Typography>
                                </InformationBox> */}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Relation with Nominee</Typography>
                                    <Typography variant="body2">{nomineeDetailsWatch()?.nominee_relationship_master_id?.label}</Typography>
                                </InformationBox>
                                {/* <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Relation with Apointee</Typography>
                                    <Typography variant="body2">{nomineeDetails.appointee_relationship}</Typography>
                                </InformationBox> */}
                            </Grid>
                        </Grid>
                    </ReviewSection>


                    {/* KYC Details Section */}
                    <ReviewSection>
                        {/* <ReviewSectionTitle>KYC DETAILS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(5)}>EDIT</ReviewEditButton> */}

                        <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
                            <Grid item xs={8} sm={9} md={10}>
                                <ReviewSectionTitle>
                                    KYC DETAILS
                                </ReviewSectionTitle>
                            </Grid>
                            <Grid item xs={4} sm={3} md={2}>
                                <ReviewEditButton
                                    onClick={() => handleEditStep(5)}
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
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Document</Typography>
                                    <Typography variant="body2">{kycDetailsWatch('ckyc_doc_type_master_id')?.label}</Typography>
                                </InformationBox>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Document Number</Typography>
                                    <Typography variant="body2">{kycDetailsWatch('ckycReferenceNumber')}</Typography>
                                </InformationBox>
                            </Grid>
                        </Grid>
                    </ReviewSection>


                    {/* Vehicle Info Section */}
                    {/* <VehicleInfoSection>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#666' }}>YOUR CAR</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                    {vehicleDetails.car.make} {vehicleDetails.car.model} ({vehicleDetails.car.year})
                                </Typography>
                                <Typography variant="body2">{vehicleDetails.car.fuel}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" sx={{ color: '#666' }}>RTO</Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>{vehicleDetails.rto}</Typography>
                            </Grid>
                        </Grid>

                        <Box sx={{ mt: 3 }}>
                            <ReviewEditButton onClick={() => handleEditStep(4)} sx={{ top: 'auto' }}>EDIT</ReviewEditButton>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>IDV</Typography>
                                    <Typography variant="body2">{vehicleDetails.idv}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>MANUFACTURING DATE</Typography>
                                    <Typography variant="body2">{vehicleDetails.manufactureDate}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>ZERO DEPRECIATION</Typography>
                                    <Typography variant="body2">{vehicleDetails.zeroDepreciation}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>ADDITIONAL COVERS</Typography>
                                    <Typography variant="body2">{vehicleDetails.additionalCovers}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>LOAN PROVIDER</Typography>
                                    <Typography variant="body2">{vehicleDetails.loanProvider}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="caption" sx={{ color: '#666' }}>ENGINE NUMBER</Typography>
                                    <Typography variant="body2">{vehicleDetails.engineNumber}</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="caption" sx={{ color: '#666' }}>CHASSIS NUMBER</Typography>
                            <Typography variant="body2">{vehicleDetails.chassisNumber}</Typography>
                        </Box>
                    </VehicleInfoSection> */}

                    {/* Terms and Conditions */}
                    <Box sx={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        justifyContent: {
                            xs: 'center', // Center on extra-small screens
                            sm: 'flex-start', // Default (or change as needed) for small and up
                        },
                    }}>
                        {/* <StyledFormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={termsAccepted}
                                        onChange={(e) => setTermsAccepted(e.target.checked)}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        I declare that the information provided above is true and accept that if it is found to be false, it may impact claims. I agree to following Terms & Conditions. I authorize Coverfox Insurance Broking Pvt. Ltd. to represent me at insurance companies for my insurance needs.
                                    </Typography>
                                }
                            />
                        </StyledFormGroup> */}

                        {/* <StyledFormGroup sx={{ mt: 2 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={kycAccepted}
                                        onChange={(e) => setKycAccepted(e.target.checked)}
                                    />
                                }
                                label={
                                    <Typography variant="body2">
                                        I understand that the KYC details will be verified as per the mandatory IRDAI Master Guidelines on Anti-Money Laundering/ Counter Financing of Terrorism (AML/CFT), 2022, and the details will be shared with the Insurer for policy issuance.
                                    </Typography>
                                }
                            />
                        </StyledFormGroup> */}

                        {/* <CompleteKYCButton onClick={handleCompleteKYC}>
                            Check KYC Status
                        </CompleteKYCButton> */}

                        <Button sx={{}} variant='contained' onClick={checkKycStatus} disabled={isKycStatusButtonDisabled}>
                            {kycStatusButtonLoading ? <CircularProgress size={18} /> : 'Check KYC Status'}
                        </Button>

                        <Button sx={{}} variant='contained' onClick={makePayment} disabled={isMakePaymentButtonDisabled}>
                            Make Payment
                        </Button>

                        {/* <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mt: 1 }}>
                            Please wait for the final validation of your proposal. This could take a few seconds.
                        </Typography> */}
                    </Box>
                </ReviewPaper>
                <InformationDialog
                    opeen={informationDialogOpen}
                    title={'KYC Status'}
                    content={infoDialogContent}
                    onConfirm={() => {
                        setInformationDialogOpen(false)
                        // router.push({
                        //     pathname: '/otp-verification'
                        // });
                    }}
                />
            </Box>
        );
    }




    const InfoRow = ({ label, value }) => (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
            sx={{ borderBottom: '1px solid #eee' }}
        >
            <Typography variant="body2" color="text.primary">
                {label}
            </Typography>
            <Typography variant="body2" fontWeight="bold" color="text.primary" sx={{ textAlign: 'right' }}>
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
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // padding: '2rem',
                    padding: {
                        xs: '1rem',
                        sm: '2rem'
                    },
                    backgroundColor: '#f0f2f5',
                    minHeight: '100vh',
                    fontFamily: '"Roboto", sans-serif'
                }}>
                    <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <Typography variant="h4" sx={{ fontWeight: 500, color: '#333', marginBottom: '0.5rem' }}>
                            CHECKOUT
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#666' }}>
                            Fill the form below → Review details → Get policy
                        </Typography>
                    </Box>

                    <StyledPaper>
                        {/* Step 1: Car Owner Details */}
                        <StepContainer>
                            {/* <StepHeader onClick={() => handleToggleStep(1)}>
                                <StepNumber>1</StepNumber>
                                <StepTitle>Car Owner Details</StepTitle>
                                {activeStep !== 1 && <EditButton onClick={() => handleEditStep(1)}>EDIT</EditButton>}
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

                                                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization' &&
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name='first_name'
                                                            control={carOwnerDetailsControl}
                                                            rules={{
                                                                required: "Company Name is required",
                                                                // pattern: {
                                                                //     value: /^[A-Za-z ]{1,25}$/, // Allow alphabets and spaces, 1 to 25 characters
                                                                //     message: "Company Name must be 1-25 characters, letters and spaces only"
                                                                // }
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
                                                                    // onInput={(e) => {
                                                                    //     e.target.value = e.target.value.replace(/[^A-Za-z ]/g, ''); // Allow letters and spaces
                                                                    // }}
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

                                                {
                                                    proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name='last_name'
                                                            control={carOwnerDetailsControl}
                                                            rules={{
                                                                required: "Last Name is required", // Required validation
                                                                pattern: {
                                                                    value: /^[A-Za-z]{2,25}$/, // Only alphabets, minimum 2, maximum 25 characters, no spaces
                                                                    message: "Last Name must be 2-25 alphabets with no spaces"
                                                                }
                                                            }}
                                                            render={({ field: { value, onChange } }) => (
                                                                <CustomTextField
                                                                    fullWidth
                                                                    value={value}
                                                                    label={<CustomLabel label='Last Name' required />}
                                                                    inputProps={{
                                                                        maxLength: 25,
                                                                    }}
                                                                    onChange={onChange}
                                                                    onInput={(e) => {
                                                                        e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                                                                    }}
                                                                    placeholder='Enter Last Name'
                                                                    error={Boolean(errors.last_name)}
                                                                    aria-describedby='validation-basic-last-name'
                                                                    helperText={errors?.last_name ? errors.last_name.message : ""}

                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                }

                                                {
                                                    proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name="gender_master_id" // key name
                                                            control={carOwnerDetailsControl} // control object from useForm
                                                            rules={{ required: 'Gender is required' }}
                                                            render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                                <Autocomplete
                                                                    options={dropdownGender} // Options for dropdown
                                                                    value={value || null} // Bind value for single selection
                                                                    onChange={(event, newValue) => onChange(newValue)} // Handle change
                                                                    isOptionEqualToValue={(option, value) => option.label === value?.label} // Match based on label
                                                                    filterOptions={(dropdownGender, { inputValue }) =>
                                                                        dropdownGender.filter(option =>
                                                                            option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filter options by search input
                                                                        )
                                                                    }
                                                                    renderInput={(params) => (
                                                                        <CustomTextField
                                                                            {...params}
                                                                            label={<CustomLabel label="Gender" required />}
                                                                            variant="outlined"
                                                                            placeholder="Select Gender"
                                                                            error={Boolean(error)} // Display error if validation fails
                                                                            helperText={errors?.gender_master_id ? errors.gender_master_id.message : ""}
                                                                        />
                                                                    )}
                                                                />
                                                            )}
                                                        />
                                                    </Grid>
                                                }

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name='email_id'
                                                        control={carOwnerDetailsControl}
                                                        rules={{
                                                            required: "Email Id is required", // Custom message for required validation
                                                            minLength: {
                                                                value: 6,
                                                                message: "Email Id must be at least 6 characters long"
                                                            },
                                                            maxLength: {
                                                                value: 70,
                                                                message: "Email Id cannot exceed 70 characters"
                                                            },
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email regex
                                                                message: "Please enter a valid email Id"
                                                            }
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label='Email Id' required />}
                                                                onChange={onChange}
                                                                inputProps={{
                                                                    maxLength: 70,
                                                                }}
                                                                placeholder='Enter Email Id'
                                                                error={Boolean(errors?.email_id)}
                                                                aria-describedby='validation-basic-first-name'
                                                                helperText={errors?.email_id ? errors.email_id.message : ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name='mobile_no'
                                                        control={carOwnerDetailsControl}
                                                        rules={{
                                                            required: "Mobile number is required", // Custom message for required validation
                                                            pattern: {
                                                                value: /^[6-9][0-9]{9}$/, // Validates exactly 10 digits
                                                                message: "Please enter valid mobile number"
                                                            }
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label='Mobile Number' required />}
                                                                onChange={onChange}
                                                                onInput={(e) => {
                                                                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                                }}
                                                                placeholder='Enter Mobile Number'
                                                                aria-describedby='validation-basic-mobile'
                                                                inputProps={{
                                                                    inputMode: "numeric", // Enables numeric input mode for better behavior on mobile
                                                                    maxLength: 10, // Limit input to 10 digits
                                                                }}
                                                                error={Boolean(errors?.mobile_no)}
                                                                helperText={errors?.mobile_no ? errors.mobile_no.message : ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                {
                                                    proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                                    <Grid item xs={12} sm={6}>
                                                        <Controller
                                                            name="date_of_birth" // key name
                                                            control={carOwnerDetailsControl}
                                                            rules={{ required: 'Date of Birth is required' }}
                                                            render={({ field: { value, onChange } }) => {
                                                                // Convert value to a valid Date object
                                                                // const selectedDate = value ? new Date(value) : null;

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
                                                                                label={<CustomLabel label="Date of Birth" required />}
                                                                                error={Boolean(errors.date_of_birth)}
                                                                                aria-describedby="validation-basic-dob"
                                                                                helperText={errors?.date_of_birth ? errors.date_of_birth.message : ""}
                                                                            />
                                                                        }
                                                                    />
                                                                );
                                                            }}
                                                        />
                                                    </Grid>
                                                }

                                                <Grid item xs={12}>
                                                    <Button
                                                        disabled={loading}
                                                        sx={{ mr: 3 }}
                                                        startIcon={<CheckIcon />}
                                                        type='submit'
                                                        variant='contained'>
                                                        {loading ? <CircularProgress size={18} /> : 'Continue to Address Details'}
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        </form>
                                    </StepContent>
                                </DatePickerWrapper>
                            ) : (
                                // <SummaryContainer>
                                //     <SummarySection>
                                //         {
                                //             proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                //                 <Typography variant="body2">Full Name:</Typography>
                                //                 <Typography variant="body2">{carOwnerDetailsWatch()?.first_name || ""}</Typography>
                                //                 <Typography variant="body2">{carOwnerDetailsWatch()?.last_name || ""}</Typography>
                                //             </Box>
                                //         }
                                //         {
                                //             proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization' &&
                                //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                //                 <Typography variant="body2">Company Name:</Typography>
                                //                 <Typography variant="body2">{carOwnerDetailsWatch()?.first_name || ""}</Typography>
                                //             </Box>
                                //         }
                                //         {
                                //             proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                //                 <Typography variant="body2">Gender:</Typography>
                                //                 <Typography variant="body2">{carOwnerDetailsWatch()?.gender_master_id?.label}</Typography>
                                //             </Box>
                                //         }
                                //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                //             <Typography variant="body2">Mobile:</Typography>
                                //             <Typography variant="body2">{carOwnerDetailsWatch()?.mobile_no || ""}</Typography>
                                //         </Box>
                                //     </SummarySection>
                                //     <SummarySection>
                                //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                //             <Typography variant="body2">Email:</Typography>
                                //             <Typography variant="body2">{carOwnerDetailsWatch()?.email_id || ""}</Typography>
                                //         </Box>
                                //         {
                                //             proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                //                 <Typography variant="body2">Date of Birth:</Typography>
                                //                 <Typography variant="body2">{carOwnerDetailsWatch()?.date_of_birth ? dayjs(carOwnerDetailsWatch()?.date_of_birth).format("DD-MM-YYYY") : ""}</Typography>
                                //             </Box>
                                //         }
                                //     </SummarySection>
                                // </SummaryContainer>
                                <Grid
                                    container
                                    spacing={{ xs: 2, sm: 3 }}
                                    sx={{
                                        padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem', md: '0.5rem 1.5rem' }
                                    }}
                                >
                                    {/* Full Name / Company Name */}
                                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' ? (
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Full Name:</Typography>
                                                <Typography variant="body2">{carOwnerDetailsWatch()?.first_name || ""}</Typography>
                                                <Typography variant="body2">{carOwnerDetailsWatch()?.last_name || ""}</Typography>
                                            </Box>
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Company Name:</Typography>
                                                <Typography variant="body2">{carOwnerDetailsWatch()?.first_name || ""}</Typography>
                                            </Box>
                                        </Grid>
                                    )}

                                    {/* Email */}
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Email:</Typography>
                                            <Typography variant="body2">{carOwnerDetailsWatch()?.email_id || ""}</Typography>
                                        </Box>
                                    </Grid>

                                    {/* Gender - Only for non-organization */}
                                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' && (
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Gender:</Typography>
                                                <Typography variant="body2">{carOwnerDetailsWatch()?.gender_master_id?.label}</Typography>
                                            </Box>
                                        </Grid>
                                    )}

                                    {/* Mobile */}
                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Mobile:</Typography>
                                            <Typography variant="body2">{carOwnerDetailsWatch()?.mobile_no || ""}</Typography>
                                        </Box>
                                    </Grid>

                                    {/* Date of Birth - Only for non-organization */}
                                    {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' && (
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Date of Birth:</Typography>
                                                <Typography variant="body2">
                                                    {carOwnerDetailsWatch()?.date_of_birth ? dayjs(carOwnerDetailsWatch()?.date_of_birth).format("DD-MM-YYYY") : ""}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    )}
                                </Grid>
                            )}
                        </StepContainer>

                        {/* Step 2: Communication Address */}
                        <StepContainer>
                            {/* <StepHeader onClick={() => handleToggleStep(2)}>
                                <StepNumber>2</StepNumber>
                                <StepTitle>Communication Address</StepTitle>
                                {activeStep !== 2 && activeStep > 2 && <EditButton onClick={() => handleEditStep(2)}>EDIT</EditButton>}
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
                                        <form onSubmit={communicationAddressHandleSubmit(submitAddressDetails)}>
                                            <Grid container spacing={5}>
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="address_line_1"
                                                        control={communicationAddressControl}
                                                        rules={{
                                                            required: "Address is required",
                                                            minLength: {
                                                                value: 3,
                                                                message: "Address must be at least 3 characters",
                                                            },
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Address Line 1" required />}
                                                                inputProps={{
                                                                    maxLength: 20, // enforce 20 character limit at input level
                                                                }}
                                                                onChange={onChange}
                                                                placeholder="Enter Address"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(communicationAddressErrors?.address_line_1)}
                                                                helperText={communicationAddressErrors?.address_line_1?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="address_line_2"
                                                        control={communicationAddressControl}
                                                        rules={{
                                                            // No 'required' rule – makes it optional
                                                            // pattern: {
                                                            //     value: /^[A-Za-z0-9\s,.-]{0,30}$/, // 0 to 30 valid characters
                                                            //     message: "Address must be up to 30 characters and contain only valid characters"
                                                            // }
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Address Line 2" />} // Removed 'required' indicator
                                                                inputProps={{
                                                                    maxLength: 50 // Set max length
                                                                }}
                                                                onChange={onChange}
                                                                placeholder="Enter Address"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(communicationAddressErrors?.address_line_2)}
                                                                helperText={communicationAddressErrors?.address_line_2?.message || ""}
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
                                                                message: "Pincode must be a 6-digit number"
                                                            },
                                                            validate: value => value.length === 6 || "Pincode must be exactly 6 digits"
                                                        }}
                                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Pincode" required />}
                                                                onChange={onChange}
                                                                onInput={(e) => {
                                                                    e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                                                }}
                                                                inputProps={{
                                                                    inputMode: "numeric", // Enables numeric input mode for better behavior on mobile
                                                                    maxLength: 6, // Limit input to 10 digits
                                                                }}
                                                                placeholder="Enter Pincode"
                                                                error={Boolean(error)}
                                                                aria-describedby="validation-basic-mobile"
                                                                helperText={communicationAddressErrors?.pincode ? communicationAddressErrors.pincode.message : ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name='city'
                                                        control={communicationAddressControl}
                                                        rules={{ required: 'City is required' }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="City" required />}
                                                                onChange={onChange}
                                                                placeholder='City'
                                                                disabled={true}
                                                                error={Boolean(communicationAddressErrors?.city)}
                                                                aria-describedby='validation-city'
                                                                helperText={communicationAddressErrors?.city ? communicationAddressErrors.city.message : ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name='state'
                                                        control={communicationAddressControl}
                                                        rules={{ required: 'State is required' }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label='State' required />}
                                                                onChange={onChange}
                                                                placeholder="State"
                                                                error={Boolean(communicationAddressErrors.state)}
                                                                disabled={true}
                                                                aria-describedby='validation-state'
                                                                helperText={communicationAddressErrors?.state ? communicationAddressErrors.state.message : ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <Button
                                                        disabled={loading}
                                                        sx={{ mr: 3 }}
                                                        startIcon={<CheckIcon />}
                                                        type='submit'
                                                        variant='contained'>
                                                        {loading ? <CircularProgress size={18} /> : 'Continue to Vehicle Details'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </StepContent>
                                </DatePickerWrapper>
                            ) : (
                                activeStep > 2 && (
                                    // <SummaryContainer>
                                    //     <Box>
                                    //         <Typography variant="body2">Communication Address: {communicationAddressWatch()?.address_line_1}{communicationAddressWatch()?.address_line_2 !== "" && ", "} {communicationAddressWatch()?.address_line_2}{", "}{communicationAddressWatch()?.city}{", "}{communicationAddressWatch()?.state}{" - "}{communicationAddressWatch()?.pincode}</Typography>
                                    //     </Box>
                                    // </SummaryContainer>
                                    <Grid
                                        container
                                        spacing={{ xs: 2, sm: 3 }}
                                        sx={{
                                            padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem', md: '0.5rem 1.5rem' }
                                        }}
                                    >
                                        <Grid item xs={12}>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Communication Address:</Typography>
                                                <Typography variant="body2">{communicationAddressWatch()?.address_line_1}{communicationAddressWatch()?.address_line_2 !== "" && ", "} {communicationAddressWatch()?.address_line_2}{", "}{communicationAddressWatch()?.city}{", "}{communicationAddressWatch()?.state}{" - "}{communicationAddressWatch()?.pincode}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )
                            )}
                        </StepContainer>

                        {/* Step 2: Personal Details */}
                        <StepContainer>
                            {/* <StepHeader onClick={() => handleToggleStep(3)}>
                                <StepNumber>3</StepNumber>
                                <StepTitle>Vehicle Details</StepTitle>
                                {activeStep !== 3 && activeStep > 3 && <EditButton onClick={() => handleEditStep(2)}>EDIT</EditButton>}
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
                                    <form onSubmit={vehicleDetailsHandleSubmit(submitVehicleDetails)}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="vehicle_registration_no"
                                                    control={vehicleDetailsControl}
                                                    rules={{
                                                        required: "Registration Number is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9]{3,12}$/, // Updated pattern to allow 3–12 characters (uppercase letters and numbers)
                                                            message:
                                                                "Registration Number must be 3–12 characters long, using only uppercase letters and numbers",
                                                        },
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Registration Number" required />}
                                                            inputProps={{
                                                                maxLength: 12, // Max length of 12 characters
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
                                                        required: "Chassis Number is required",
                                                        validate: (value) => {
                                                            const cleaned = value?.toUpperCase();
                                                            if (!/^[A-Z0-9]{17}$/.test(cleaned)) {
                                                                return "Chassis Number must be exactly 17 alphanumeric characters";
                                                            }
                                                            if (!/[A-Z]/.test(cleaned) || !/[0-9]/.test(cleaned)) {
                                                                return "Chassis Number must contain both letters and numbers";
                                                            }
                                                            return true;
                                                        }
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Chassis Number" required />}
                                                            inputProps={{
                                                                maxLength: 17,
                                                                style: { textTransform: 'uppercase' }
                                                            }}
                                                            // Added this to override placeholder styling:
                                                            sx={{
                                                                '& .MuiInputBase-input::placeholder': {
                                                                    textTransform: 'none'
                                                                }
                                                            }}
                                                            onChange={(e) => {
                                                                const cleaned = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
                                                                onChange(cleaned);
                                                            }}
                                                            placeholder="Enter Chassis Number"
                                                            aria-describedby="validation-chassis-no"
                                                            error={Boolean(vehicleDetailsErrors?.chassis_no)}
                                                            helperText={vehicleDetailsErrors?.chassis_no?.message || ""}
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
                                                            required: "Previous Policy Number is required",
                                                            pattern: {
                                                                value: /^[A-Z0-9]{7,30}$/, // Only uppercase letters and numbers, 7-30 characters
                                                                message: "Previous Policy Number must be 7–30 uppercase letters and numbers (no spaces or special characters)"
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
                                                                // Added this to override placeholder styling:
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
                                                            required: "Previous TP Policy Number is required",
                                                            pattern: {
                                                                value: /^[A-Z0-9]{7,30}$/, // Only uppercase letters and numbers, 7-30 characters
                                                                message: "Previous TP Policy Number must be 7–30 uppercase letters and numbers (no spaces or special characters)"
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
                                                                // Added this to override placeholder styling:
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
                                                <FormControl component="fieldset" error={Boolean(vehicleDetailsErrors?.is_car_financed)}>
                                                    <FormLabel component="legend">
                                                        <CustomLabel label="Is the car financed?" required />
                                                    </FormLabel>

                                                    <Controller
                                                        name="is_car_financed"
                                                        control={vehicleDetailsControl}
                                                        rules={{ required: "Please select if the car is financed" }}
                                                        render={({ field }) => (
                                                            <RadioGroup row {...field}>
                                                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                <FormControlLabel value="false" control={<Radio />} label="No" />
                                                            </RadioGroup>
                                                        )}
                                                    />

                                                    {vehicleDetailsErrors?.is_car_financed && (
                                                        <FormHelperText>{vehicleDetailsErrors.is_car_financed.message}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>

                                            {vehicleDetailsWatch()?.is_car_financed === "true" &&
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name='financed_company'
                                                        control={vehicleDetailsControl}
                                                        rules={{
                                                            required: "Financing company name is required", // Required validation
                                                            // pattern: {
                                                            //     value: /^[A-Za-z\s]{1,25}$/, // Allow alphabets and spaces, 1 to 25 characters
                                                            //     message: "Company Name must be 1-25 alphabets with no special characters"
                                                            // }
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Financing Company" required />}
                                                                inputProps={{
                                                                    maxLength: 50,
                                                                }}
                                                                onChange={onChange}
                                                                // onInput={(e) => {
                                                                //     // Allow only letters and spaces
                                                                //     e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '');
                                                                // }}
                                                                placeholder='Enter Financing Company Name'
                                                                aria-describedby='validation-financing-company-name'
                                                                error={Boolean(vehicleDetailsErrors?.financed_company)} // Pass boolean value for error
                                                                helperText={vehicleDetailsErrors?.financed_company ? vehicleDetailsErrors.financed_company.message : ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                            }

                                            {/* <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="manufactured_month" // key name
                                                    control={vehicleDetailsControl} // control object from useForm
                                                    rules={{ required: 'Manufacturing month is required' }}
                                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                        <Autocomplete
                                                            options={dropdownMonth} // Options for dropdown
                                                            value={value || null} // Bind value for single selection
                                                            onChange={(event, newValue) => onChange(newValue)} // Handle change
                                                            isOptionEqualToValue={(option, value) => option.label === value?.label} // Match based on label
                                                            filterOptions={(dropdownMonth, { inputValue }) =>
                                                                dropdownMonth.filter(option =>
                                                                    option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filter options by search input
                                                                )
                                                            }
                                                            renderInput={(params) => (
                                                                <CustomTextField
                                                                    {...params}
                                                                    label={<CustomLabel label="Manufacturing Month" required />}
                                                                    variant="outlined"
                                                                    placeholder="Select Manufacturing Month"
                                                                    error={Boolean(error)} // Display error if validation fails
                                                                    helperText={vehicleDetailsErrors?.manufactured_month ? vehicleDetailsErrors.manufactured_month.message : ""}
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
                                                    rules={{ required: 'Manufacturing year is required' }}
                                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                        <Autocomplete
                                                            options={dropdownYear} // Options for dropdown
                                                            value={value || null} // Bind value for single selection
                                                            onChange={(event, newValue) => onChange(newValue)} // Handle change
                                                            isOptionEqualToValue={(option, value) => option.label === value?.label} // Match based on label
                                                            filterOptions={(dropdownYear, { inputValue }) =>
                                                                dropdownYear.filter(option =>
                                                                    option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filter options by search input
                                                                )
                                                            }
                                                            renderInput={(params) => (
                                                                <CustomTextField
                                                                    {...params}
                                                                    label={<CustomLabel label="Manufacturing Year" required />}
                                                                    variant="outlined"
                                                                    placeholder="Select Manufacturing Year"
                                                                    error={Boolean(error)} // Display error if validation fails
                                                                    helperText={vehicleDetailsErrors?.manufactured_year ? vehicleDetailsErrors.manufactured_year.message : ""}
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
                                                    type='submit'
                                                    variant='contained'>
                                                    {loading ? <CircularProgress size={18} /> : 'Continue to Nominee Details'}
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


                                        {masterDetails?.is_previous_tp_policy_no_visible &&
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: { xs: 'column', sm: 'row' },
                                                    alignItems: { xs: 'flex-start', sm: 'center' },
                                                    gap: 1
                                                }}>
                                                    <Typography variant="body2" sx={{ fontWeight: '500' }}>
                                                        Previous TP Policy No:
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        {vehicleDetailsWatch()?.previous_tp_policy_no}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        }


                                        {masterDetails?.is_previous_policy_no_visible &&
                                            <Grid item xs={12} sm={6}>
                                                <Box sx={{
                                                    display: 'flex',
                                                    flexDirection: { xs: 'column', sm: 'row' },
                                                    alignItems: { xs: 'flex-start', sm: 'center' },
                                                    gap: 1
                                                }}>
                                                    <Typography variant="body2" sx={{ fontWeight: '500' }}>Previous Policy No:</Typography>
                                                    <Typography variant="body2">{vehicleDetailsWatch()?.prev_policy_no}</Typography>
                                                </Box>
                                            </Grid>
                                        }

                                        {/* <Typography variant="body2">Manufactured Month: {vehicleDetailsWatch()?.manufactured_month?.label}</Typography> */}
                                        {/* <Typography variant="body2">Manufactured Year: {vehicleDetailsWatch()?.manufactured_year?.label}</Typography> */}



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

                                        {vehicleDetailsWatch()?.is_car_financed == "true" &&
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
                                        }
                                    </Grid>
                                )
                            )}
                        </StepContainer>

                        {/* Step 4: Nominee Details */}
                        <StepContainer>
                            {/* <StepHeader onClick={() => handleToggleStep(4)}>
                                <StepNumber>4</StepNumber>
                                <StepTitle>Nominee Details</StepTitle>
                                {activeStep !== 4 && activeStep > 4 && <EditButton onClick={() => handleEditStep(4)}>EDIT</EditButton>}
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
                                        <form onSubmit={nomineeDetailsHandleSubmit(submitNomineeDetails)}>
                                            <Grid container spacing={5}>
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="nominee_name"
                                                        control={nomineeDetailsControl}
                                                        rules={{
                                                            required: "Nominee Name is required",
                                                            pattern: {
                                                                value: /^[A-Za-z\s]{2,50}$/, // Allows letters and spaces, 2 to 50 characters
                                                                message: "Nominee Name must contain only letters and spaces (2–50 characters)"
                                                            }
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Nominee Name" required />}
                                                                inputProps={{
                                                                    maxLength: 50,
                                                                }}
                                                                onChange={(e) => {
                                                                    const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only letters + spaces
                                                                    onChange(cleaned);
                                                                }}
                                                                placeholder="Enter Nominee Name"
                                                                aria-describedby="validation-nominee-name"
                                                                error={Boolean(nomineeDetailsErrors?.nominee_name)}
                                                                helperText={nomineeDetailsErrors?.nominee_name?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="nominee_dob"
                                                        control={nomineeDetailsControl}
                                                        rules={{ required: 'Nominee date of birth is required' }}
                                                        render={({ field: { value, onChange } }) => {
                                                            // Convert value to a valid Date object
                                                            // const selectedDate = value ? new Date(value) : null;

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
                                                                            label={<CustomLabel label="Nominee Date of Birth" required />}
                                                                            error={Boolean(nomineeDetailsErrors.nominee_dob)}
                                                                            aria-describedby="validation-nominee-dob"
                                                                            helperText={nomineeDetailsErrors?.nominee_dob ? nomineeDetailsErrors.nominee_dob.message : ""}
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
                                                        rules={{ required: 'Nominee relation is required' }}
                                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                            <Autocomplete
                                                                options={dropdownNomineeRelation} // Options for dropdown
                                                                value={value || null} // Bind value for single selection
                                                                onChange={(event, newValue) => onChange(newValue)} // Handle change
                                                                isOptionEqualToValue={(option, value) => option.label === value?.label} // Match based on label
                                                                filterOptions={(dropdownNomineeRelation, { inputValue }) =>
                                                                    dropdownNomineeRelation.filter(option =>
                                                                        option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filter options by search input
                                                                    )
                                                                }
                                                                renderInput={(params) => (
                                                                    <CustomTextField
                                                                        {...params}
                                                                        label={<CustomLabel label="Nominee Relation" required />}
                                                                        variant="outlined"
                                                                        placeholder="Select Nominee Relation"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={nomineeDetailsErrors?.nominee_relationship_master_id ? nomineeDetailsErrors.nominee_relationship_master_id.message : ""}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                {/* <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="appointee_name"
                                                        control={nomineeDetailsControl}
                                                        rules={{
                                                            required: "Apointee name is required",
                                                            pattern: {
                                                                value: /^[A-Za-z\s]{2,50}$/, // Allows letters and spaces, 2 to 50 characters
                                                                message: "Apointee name must contain only letters and spaces (2–50 characters)"
                                                            }
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Apointee Name" required />}
                                                                inputProps={{
                                                                    maxLength: 50,
                                                                }}
                                                                onChange={(e) => {
                                                                    const cleaned = e.target.value.replace(/[^A-Za-z\s]/g, ''); // Only letters + spaces
                                                                    onChange(cleaned);
                                                                }}
                                                                placeholder="Enter apointee name"
                                                                aria-describedby="validation-apointee-name"
                                                                error={Boolean(nomineeDetailsErrors?.appointee_name)}
                                                                helperText={nomineeDetailsErrors?.appointee_name?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid> */}

                                                {/* <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="appointee_relationship" // key name
                                                        control={nomineeDetailsControl} // control object from useForm
                                                        rules={{ required: 'Apointee Relation is required' }}
                                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                            <Autocomplete
                                                                options={dropdownRelation} // Options for dropdown
                                                                value={value || null} // Bind value for single selection
                                                                onChange={(event, newValue) => onChange(newValue)} // Handle change
                                                                isOptionEqualToValue={(option, value) => option.label === value?.label} // Match based on label
                                                                filterOptions={(dropdownRelation, { inputValue }) =>
                                                                    dropdownRelation.filter(option =>
                                                                        option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filter options by search input
                                                                    )
                                                                }
                                                                renderInput={(params) => (
                                                                    <CustomTextField
                                                                        {...params}
                                                                        label={<CustomLabel label="Apointee Relation" required />}
                                                                        variant="outlined"
                                                                        placeholder="Select Nominee Relation"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={nomineeDetailsErrors?.appointee_relationship ? nomineeDetailsErrors.appointee_relationship.message : ""}
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
                                                        type='submit'
                                                        variant='contained'>
                                                        {loading ? <CircularProgress size={18} /> : 'Continue to KYC Details'}
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

                        {/* Step 5: KYC Details */}
                        <StepContainer>
                            {/* <StepHeader onClick={() => handleToggleStep(5)}>
                                <StepNumber>5</StepNumber>
                                <StepTitle>KYC Details</StepTitle>
                                {activeStep !== 5 && activeStep > 5 && <EditButton onClick={() => handleEditStep(4)}>EDIT</EditButton>}
                            </StepHeader> */}

                            <StepHeader onClick={() => handleToggleStep(5)}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs="auto">
                                        <StepNumber>5</StepNumber>
                                    </Grid>
                                    <Grid item xs>
                                        <StepTitle>KYC Details</StepTitle>
                                    </Grid>
                                    {activeStep !== 5 && activeStep > 5 && (
                                        <Grid item xs="auto">
                                            <EditButton onClick={() => handleEditStep(5)}>EDIT</EditButton>
                                        </Grid>
                                    )}
                                </Grid>
                            </StepHeader>

                            {activeStep === 5 ? (
                                <StepContent>
                                    <form onSubmit={kycDetailsHandleSubmit(submitKYCDetails)}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="ckyc_doc_type_master_id"
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
                                                                        kycDetailsErrors?.ckyc_doc_type_master_id?.message || ''
                                                                    }
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="ckycReferenceNumber"
                                                    control={kycDetailsControl}
                                                    rules={refValidation}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label={refLabel} required />}
                                                            inputProps={{
                                                                maxLength:
                                                                    documentValidationRules[selectedDocType?.label]?.maxLength || 15,
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
                                                            error={Boolean(kycDetailsErrors?.ckycReferenceNumber)}
                                                            helperText={
                                                                kycDetailsErrors?.ckycReferenceNumber?.message || ''
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>



                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="document_file"
                                                    control={kycDetailsControl}
                                                    rules={{ validate: validateFile }}
                                                    render={({ field: { onChange }, fieldState: { error } }) => (
                                                        <FormControl fullWidth>
                                                            <FormLabel>Upload Document</FormLabel>

                                                            {/* Show File Preview */}
                                                            {documentFile && (
                                                                <Typography variant="body2" sx={{ mt: 2 }}>
                                                                    Selected File: {documentFile.name}
                                                                </Typography>
                                                            )}

                                                            <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                                                                {proposalObjectDetails?.kyc_profile &&
                                                                    <>
                                                                        <Icon
                                                                            onClick={() => window.open(proposalObjectDetails?.kyc_profile, '_blank')}
                                                                            icon="tabler:file-text"
                                                                            fontSize="2rem"
                                                                            color="teal"
                                                                            sx={{ cursor: 'pointer', mr: 1 }}
                                                                        />
                                                                        <Button
                                                                            variant="outlined"
                                                                            color="primary"
                                                                            size="small"
                                                                            sx={{ ml: 2 }}
                                                                            onClick={() => window.open(proposalObjectDetails?.kyc_profile, '_blank')}
                                                                        >
                                                                            Preview
                                                                        </Button>
                                                                    </>
                                                                }
                                                            </Box>

                                                            {/* File Input */}
                                                            <input
                                                                type="file"
                                                                accept="application/pdf,image/jpeg,image/png,image/webp"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    handleFileChange(e);
                                                                    onChange(file); // Pass file to React Hook Form
                                                                }}
                                                            />

                                                            {/* Error Message */}
                                                            {error && (
                                                                <Typography variant="body2" color="error">
                                                                    {error.message}
                                                                </Typography>
                                                            )}
                                                        </FormControl>
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button
                                                    disabled={loading}
                                                    sx={{ mr: 3 }}
                                                    startIcon={<CheckIcon />}
                                                    type='submit'
                                                    variant='contained'>
                                                    {loading ? <CircularProgress size={18} /> : 'Review All Details'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>

                                </StepContent>
                            ) : (
                                activeStep > 5 && (
                                    <Grid
                                        container
                                        spacing={{ xs: 2, sm: 3 }}
                                        sx={{
                                            padding: { xs: '0.5rem 0.75rem', sm: '0.5rem 1rem', md: '0.5rem 1.5rem' }
                                        }}
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Document:</Typography>
                                                <Typography variant="body2">{kycDetailsWatch()?.ckyc_doc_type_master_id?.label}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>File:</Typography>
                                                <Typography variant="body2">{kycDetails.document_file}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Reference Number:</Typography>
                                                <Typography variant="body2">{kycDetails.reference_number}</Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                )
                            )}
                        </StepContainer>

                    </StyledPaper>
                </Box>
            </Grid>
        </Grid>
    );
}
