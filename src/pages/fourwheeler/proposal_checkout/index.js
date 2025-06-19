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


    const { control: additionalDetailsControl, handleSubmit: AdditionalDetailsHandleSubmit, setValue: carOwnerDetailsSetValue, watch: additionalDetailsWatch, formState: { errors }, reset, setError, clearErrors } = useForm();

    const { control: emiratesIdControl, handleSubmit: emiratedIdHandleSubmit, setValue: communicationAddressSetValue, watch: emiratesIdWatch, formState: { errors: emiratesIdErrors }, reset: communicationAddressReset, setError: communicationAddressSetError, clearErrors: communicationAddressClearErrors } = useForm();

    const { control: mulkiyaDetailsControl, handleSubmit: mulkiyaDetailsHandleSubmit, setValue: vehicleDetailsSetValue, watch: mulkiyaDetailsWatch, formState: { errors: mulkiyaDetailsErrors }, reset: vehicleDetailsReset, setError: vehicleDetailsSetError, clearErrors: vehicleDetailsClearErrors } = useForm();

    const { control: drivingLicenseDetailsControl, handleSubmit: drivingLicenseHandleSubmit, setValue: nomineeDetailsSetValue, watch: licenseNumberDetailsWatch, formState: { errors: LicenseNumberDetailsErrors }, reset: nomineeDetailsReset, setError: nomineeDetailsSetError, clearErrors: nomineeDetailsClearErrors } = useForm();

    const { control: documentDetailsControl, handleSubmit: DocumentDetailsHandleSubmit, setValue: kycDetailsSetValue, watch: kycDetailsWatch, formState: { errors: kycDetailsErrors }, reset: kycDetailsReset, setError: kycDetailsSetError, clearErrors: kycDetailsClearErrors } = useForm();

    const watchPincode = emiratesIdWatch("pincode");


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
    const [emiratedIdFile, setEmiratesIdFile] = useState(null);
    const [mulkiyaFile, setMulkiyaFile] = useState(null);
    const [transferPaperFile, setTransferPaperFile] = useState(null);
    const [carPictureFile, setCarPictureFile] = useState(null);
    const [vehicleCertificateFile, setVehicleCertificateFile] = useState(null);
    const dispatch = useDispatch();

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [kycAccepted, setKycAccepted] = useState(false);

    const [isRegNoDisabled, setIsRegNoDisabled] = useState(false);


    const [selectedDocType, setSelectedDocType] = useState(null);
    const [refLabel, setRefLabel] = useState('Reference Number');
    const [refValidation, setRefValidation] = useState({});

    // useEffect(() => {
    //     const label = selectedDocType?.label;
    //     if (label && documentValidationRules[label]) {
    //         setRefLabel(documentValidationRules[label].label);
    //         setRefValidation(documentValidationRules[label].rules);
    //     } else {
    //         setRefLabel('Reference Number');
    //         setRefValidation({
    //             required: 'Reference Number is required',
    //             pattern: {
    //                 value: /^[A-Z0-9]{5,15}$/,
    //                 message:
    //                     'Reference Number must be 5–15 uppercase letters and numbers (no special characters)'
    //             }
    //         });
    //     }
    // }, [selectedDocType]);


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
            first_name: additionalDetailsWatch('first_name'),
            last_name: additionalDetailsWatch('last_name'),
            email_id: additionalDetailsWatch('email_id'),
            mobile_no: additionalDetailsWatch('mobile_no'),
            gender_master_id: additionalDetailsWatch('gender_master_id')?.value,
            date_of_birth: dayjs(additionalDetailsWatch('date_of_birth')).format("YYYY-MM-DD"),
            address_line_1: emiratesIdWatch('address_line_1'),
            address_line_2: emiratesIdWatch('address_line_2'),
            pincode: emiratesIdWatch('pincode'),
            vehicle_registration_no: mulkiyaDetailsWatch('vehicle_registration_no'),
            engine_no: mulkiyaDetailsWatch('engine_no'),
            chassis_no: mulkiyaDetailsWatch('chassis_no'),
            is_car_financed: mulkiyaDetailsWatch('is_car_financed'),
            // financed_company: mulkiyaDetailsWatch('financed_company'),
            nominee_name: licenseNumberDetailsWatch('nominee_name'),
            nominee_dob: dayjs(licenseNumberDetailsWatch('nominee_dob')).format("YYYY-MM-DD"),
            nominee_relationship_master_id: licenseNumberDetailsWatch('nominee_relationship_master_id')?.value,
            ckycReferenceNumber: kycDetailsWatch('ckycReferenceNumber'),
            ckyc_doc_type_master_id: kycDetailsWatch('ckyc_doc_type_master_id')?.value,
        }

        if (mulkiyaDetailsWatch('is_car_financed') == "true") {
            input.financed_company = mulkiyaDetailsWatch('financed_company')
        }
        // console.log(mulkiyaDetailsWatch('financed_company'))
        // dispatch(actionSubmitProposal(params));

        if (masterDetails?.is_previous_tp_policy_no_visible) {
            input.previous_tp_policy_no = mulkiyaDetailsWatch('previous_tp_policy_no')
        }
        if (masterDetails?.is_previous_policy_no_visible) {
            input.prev_policy_no = mulkiyaDetailsWatch('prev_policy_no')
        }

        if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization') {
            input.last_name = null;
            input.date_of_birth = null;
            input.gender_master_id = null;
            input.proposer_type = proposalObjectDetails?.pjCarQuotationDetails?.proposer_type
        }

        // if (mulkiyaDetailsWatch('vehicle_registration_no') != 'NEW') {
        //     input.vehicle_registration_no = mulkiyaDetailsWatch('vehicle_registration_no')
        // }

        var objFormData = getFormData(input, [
            documentFile ? { title: "document", data: documentFile } : null,
        ]);

        console.log(input);
        // dispatch(actionSubmitProposal(objFormData));
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
        // dispatch(actionGodigitKYCStatus(params));
    }

    const makePayment = () => {
        let params = {
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID
        }
        // dispatch(actionGodigitPaymentMake(params));
    }

    const handleFetchKycStatus = () => {
        let params = {
            proposal_id: PROPOSAL_ID,
            reference_id: QUOTE_ID
        }
        // dispatch(actionGodigitKYCStatus(params));
    }

    // useEffect(() => {
    //     if (paymentMakeDetails !== null && paymentMakeDetails.status == 200) {
    //         const redirectUrl = paymentMakeDetails?.response?.full_request;
    //         if (redirectUrl) {
    //             // Redirect to the full_request URL
    //             window.location.href = redirectUrl;
    //         } else {
    //             console.error('Redirect URL not found in response');
    //         }
    //     }
    // }, [paymentMakeDetails])


    // useEffect(() => {
    //     if (kycStatusDetails !== null) {
    //         // console.log("gfhfhfhghf",kycStatusDetails?.response?.kyc_status);
    //         // dispatch(resetKycStatusDetails());
    //         if (kycStatusDetails?.response?.kyc_status == "success") {
    //             setIsKycStatusButtonDisabled(true);
    //             setIsMakePaymentButtonDisabled(false);
    //             if (kycStatusDetails?.status == 425) {
    //                 setInfoDialogContent(kycStatusDetails?.response?.reason);
    //                 setInformationDialogOpen(true);
    //             }
    //             else {
    //                 toast.success(kycStatusDetails?.message);
    //             }

    //         }
    //         else {
    //             setIsKycStatusButtonDisabled(false);
    //             setIsMakePaymentButtonDisabled(true);
    //             if (showReview) {
    //                 toast.error(kycStatusDetails?.message);
    //                 if (kycStatusDetails?.response?.kyc_redirection_url && kycStatusDetails?.response?.kyc_redirection_url !== "") {
    //                     // Open the URL in a new tab
    //                     window.open(kycStatusDetails.response.kyc_redirection_url, "_blank");
    //                 }
    //             }

    //         }
    //     }
    //     setKycStatusButtonLoading(false);
    // }, [kycStatusDetails])

    // useEffect(() => {
    //     if (proposalUpdate !== null && proposalUpdate.status == 200) {
    //         activeStep < 5 ? handleGoToStep(activeStep + 1) : handleContinueToReview();
    //         if (proposalUpdate?.message) {
    //             toast.success(proposalUpdate?.message);
    //         }
    //     }
    //     else {
    //         if (proposalUpdate?.message) {
    //             toast.error(proposalUpdate?.message);
    //         }
    //     }
    // }, [proposalUpdate])

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


    // useEffect(() => {
    //     if (proposalSubmit !== null) {
    //         dispatch(resetSubmitProposal())
    //         if (proposalSubmit?.result) {
    //             setShowReview(true);
    //             handleFetchKycStatus();
    //             setLoading(false);
    //         } else {
    //             setLoading(false);
    //             toast.error(proposalSubmit?.message || "Some error occured");

    //         }
    //     }
    // }, [proposalSubmit])



    useEffect(() => {
        handleGoToStep(1);
    }, [])



    const submitAdditionalDetails = (data) => {
        // let params = {
        //     ...data,
        //     // date_of_birth: dayjs(data.date_of_birth).format("YYYY-MM-DD"),
        //     date_of_birth: null,
        //     // gender_master_id: data.gender_master_id.value,
        //     gender_master_id: null,
        //     last_name: null,
        //     section: "owner",
        //     proposal_id: PROPOSAL_ID,
        //     reference_id: QUOTE_ID,
        // }


        // if (data?.gender_master_id?.value) {
        //     params.gender_master_id = data.gender_master_id.value
        // }
        // if (data?.date_of_birth) {
        //     params.date_of_birth = dayjs(data.date_of_birth).format("YYYY-MM-DD")
        // }
        // if (data?.last_name) {
        //     params.last_name = data?.last_name
        // }

        // if (proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization') {
        //     params.proposer_type = proposalObjectDetails?.pjCarQuotationDetails?.proposer_type;
        //     params.gender_master_id = null;
        //     params.date_of_birth = null;
        // }

        // console.log(params);
        // dispatch(actionUpdateProposal(params));
        handleGoToStep(2);
    }

    const submitEmiratesIdDetails = (data) => {
        // let params = {
        //     // ...data,
        //     address_line_1: data.address_line_1,
        //     address_line_2: data.address_line_2,
        //     pincode: data.pincode,
        //     section: "address",
        //     proposal_id: PROPOSAL_ID,
        //     reference_id: QUOTE_ID,
        // }
        // console.log(params);
        // dispatch(actionUpdateProposal(params));
        handleGoToStep(3);
    }

    const submitMulkiyaDetails = (data) => {
        // let params = {
        //     ...data,
        //     // manufactured_year: data.manufactured_year.value,
        //     // manufactured_month: data.manufactured_month.value,
        //     section: "vehicle",
        //     proposal_id: PROPOSAL_ID,
        //     reference_id: QUOTE_ID,
        // }
        // let params = {
        //     vehicle_registration_no: data.vehicle_registration_no,
        //     engine_no: data.engine_no,
        //     chassis_no: data.chassis_no,
        //     is_car_financed: data.is_car_financed,
        //     section: "vehicle",
        //     proposal_id: PROPOSAL_ID,
        //     reference_id: QUOTE_ID,
        // }

        // if (data.is_car_financed == "true") {
        //     params.financed_company = data.financed_company;
        // }

        // if (masterDetails?.is_previous_tp_policy_no_visible) {
        //     params.previous_tp_policy_no = data.previous_tp_policy_no
        // }

        // if (masterDetails?.is_previous_policy_no_visible) {
        //     params.prev_policy_no = data.prev_policy_no
        // }

        // if (data.vehicle_registration_no != 'NEW') {
        //     params.vehicle_registration_no = data.vehicle_registration_no
        // }
        // console.log(params);
        // dispatch(actionUpdateProposal(params));
        handleGoToStep(4);
    }

    const submitDrivingLicenseDetails = (data) => {
        // let params = {
        //     ...data,
        //     nominee_dob: dayjs(data.nominee_dob).format("YYYY-MM-DD"),
        //     // appointee_relationship: data.appointee_relationship.value,
        //     nominee_relationship_master_id: data.nominee_relationship_master_id.value,
        //     section: "nominee",
        //     proposal_id: PROPOSAL_ID,
        //     reference_id: QUOTE_ID,
        // }
        // console.log(params);
        // dispatch(actionUpdateProposal(params));
        handleGoToStep(5);
    }

    const submitDocumentDetails = (data) => {
        // let params = {
        //     ...data,
        //     section: "ckyc",
        //     proposal_id: "",
        //     reference_id: "",
        // }
        // console.log(params);
        // delete data.document_file;

        // let input = {
        //     ...data,
        //     ckyc_doc_type_master_id: data.ckyc_doc_type_master_id.value,
        //     section: "ckyc",
        //     proposal_id: PROPOSAL_ID,
        //     reference_id: QUOTE_ID,
        // }

        // var objFormData = getFormData(input, [
        //     documentFile ? { title: "document", data: documentFile } : null,
        // ]);

        // dispatch(actionUpdateProposal(objFormData));

        // console.log(objFormData);

        toast.success("Your details have been submitted!");
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

    const handleEmiratesIdFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setEmiratesIdFile(file);
        }
    };

    const handleMulkiyaFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setMulkiyaFile(file);
        }
    };

    const handleTransferPaperFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setTransferPaperFile(file);
        }
    };

    const handleCarPictureFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setCarPictureFile(file);
        }
    };
    const handleVehicleCertificateFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVehicleCertificateFile(file);
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

    // useEffect(() => {
    //     if (!QUOTE_ID) {
    //         const storedQuoteId = localStorage.getItem('QUOTE_ID');
    //         if (storedQuoteId) {
    //             dispatch(setQuoteId(storedQuoteId));
    //         }
    //     }
    //     if (!PROPOSAL_ID) {
    //         const storedProposalId = localStorage.getItem('PROPOSAL_ID');
    //         if (storedProposalId) {
    //             dispatch(setProposalId(storedProposalId));
    //         }
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     if (QUOTE_ID && PROPOSAL_ID) {
    //         router.push({
    //             pathname: "/fourwheeler/godigit/checkout",
    //             query: {
    //                 quoteId: QUOTE_ID,
    //                 proposalId: PROPOSAL_ID
    //             },
    //         });
    //         // fetchProposal();
    //         let params = {
    //             reference_id: QUOTE_ID,
    //             proposal_id: PROPOSAL_ID
    //         };

    //         dispatch(actionGetProposal(params));
    //         dispatch(actionGetQuoteMaster({ reference_id: QUOTE_ID }));
    //     }
    // }, [QUOTE_ID, PROPOSAL_ID]);



    // useEffect(() => {
    //     if (proposalObjectDetails !== null && proposalObjectDetails !== undefined && proposalObjectDetails?.gender_master_id && dropdownGender?.length > 0) {
    //         const matchedGender = dropdownGender.find(gender => gender?.value === proposalObjectDetails?.gender_master_id);
    //         if (matchedGender) {
    //             carOwnerDetailsSetValue('gender_master_id', matchedGender);
    //         }
    //     }
    // }, [proposalObjectDetails, dropdownGender])

    // useEffect(() => {
    //     if (proposalObjectDetails !== null && proposalObjectDetails !== undefined && proposalObjectDetails?.nominee_relationship_master_id && dropdownNomineeRelation?.length > 0) {
    //         const matchedNominee = dropdownNomineeRelation.find(relation => relation?.value === proposalObjectDetails?.nominee_relationship_master_id);
    //         if (matchedNominee) {
    //             nomineeDetailsSetValue('nominee_relationship_master_id', matchedNominee);
    //         }
    //     }
    // }, [proposalObjectDetails, dropdownNomineeRelation])

    // useEffect(() => {
    //     if (proposalObjectDetails !== null && proposalObjectDetails !== undefined && proposalObjectDetails?.kyc_json?.ckycReferenceDocId && dropdownDocuments?.length > 0) {
    //         const matchedDoc = dropdownDocuments.find(doc => doc?.value === proposalObjectDetails?.kyc_json?.ckycReferenceDocId);
    //         if (matchedDoc) {
    //             setSelectedDocType(matchedDoc)
    //             kycDetailsSetValue('ckyc_doc_type_master_id', matchedDoc);
    //         }
    //     }
    // }, [proposalObjectDetails, dropdownDocuments])

    // useEffect(() => {
    //     if (proposalObjectDetails !== null && proposalObjectDetails !== undefined) {
    //         if (proposalObjectDetails?.is_car_financed == 1) {
    //             vehicleDetailsSetValue('is_car_financed', "true");
    //         }
    //         else if (proposalObjectDetails?.is_car_financed == 0) {
    //             vehicleDetailsSetValue('is_car_financed', "false");
    //         }
    //     }
    // }, [proposalObjectDetails])


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

    // useEffect(() => {
    //     if (QUOTE_MASTER !== null) {
    //         resetField('QUOTE_MASTER');
    //         if (QUOTE_MASTER?.result == true) {
    //             setMasterDetails(QUOTE_MASTER?.response);
    //         } else {
    //             switch (QUOTE_MASTER?.status) {
    //                 case UNAUTHORIZED:
    //                     break;
    //                 case ERROR:
    //                     console.error("An error occurred.");
    //                     break;
    //                 default:
    //                     console.warn("Unhandled status:", QUOTE_MASTER?.status);
    //             }
    //         }
    //     }
    // }, [QUOTE_MASTER])


    // useEffect(() => {
    //     if (getProposalDetails !== null) {
    //         dispatch(resetProposal());
    //         // console.log("kfhskfh", getProposalDetails);
    //         if (getProposalDetails?.result == true) {

    //             setProposalObjectDetails(getProposalDetails?.response);

    //             carOwnerDetailsSetValue('first_name', getProposalDetails?.response?.first_name || '');
    //             carOwnerDetailsSetValue('last_name', getProposalDetails?.response?.last_name || '');
    //             // carOwnerDetailsSetValue('gender_master_id', getProposalDetails?.response?.gender_master_id || '');
    //             carOwnerDetailsSetValue('email_id', getProposalDetails?.response?.email_id || '');
    //             carOwnerDetailsSetValue('mobile_no', getProposalDetails?.response?.mobile_no || '');
    //             carOwnerDetailsSetValue('date_of_birth', getProposalDetails?.response?.date_of_birth || '');

    //             communicationAddressSetValue('address_line_1', getProposalDetails?.response?.address_line_1 || '');
    //             communicationAddressSetValue('address_line_2', getProposalDetails?.response?.address_line_2 || '');
    //             communicationAddressSetValue('pincode', getProposalDetails?.response?.pincode || '');

    //             vehicleDetailsSetValue('vehicle_registration_no', getProposalDetails?.response?.vehicle_registration_no || '');
    //             vehicleDetailsSetValue('engine_no', getProposalDetails?.response?.engine_no || '');
    //             vehicleDetailsSetValue('chassis_no', getProposalDetails?.response?.chassis_no || '');
    //             vehicleDetailsSetValue('previous_tp_policy_no', getProposalDetails?.response?.previous_tp_policy_no || '');
    //             vehicleDetailsSetValue('prev_policy_no', getProposalDetails?.response?.prev_policy_no || '');
    //             // vehicleDetailsSetValue('is_car_financed', getProposalDetails?.response?.is_car_financed || '');
    //             vehicleDetailsSetValue('financed_company', getProposalDetails?.response?.financed_company || '');
    //             // vehicleDetailsSetValue('manufactured_month', getProposalDetails?.response?.manufactured_month || '');
    //             // vehicleDetailsSetValue('manufactured_year', getProposalDetails?.response?.manufactured_year || '');

    //             nomineeDetailsSetValue('nominee_name', getProposalDetails?.response?.nominee_name || '');
    //             nomineeDetailsSetValue('nominee_dob', getProposalDetails?.response?.nominee_dob || '');
    //             // nomineeDetailsSetValue('nominee_relationship_master_id', getProposalDetails?.response?.nominee_relationship_master_id || '');

    //             // nomineeDetailsSetValue('appointee_name', getProposalDetails?.response?.appointee_name || '');
    //             // nomineeDetailsSetValue('appointee_relationship', getProposalDetails?.response?.appointee_relationship || '');

    //             // kycDetailsSetValue('ckyc_doc_type_master_id', getProposalDetails?.response?.kyc_json?.ckycReferenceDocId || '');
    //             kycDetailsSetValue('ckycReferenceNumber', getProposalDetails?.response?.kyc_json?.ckycReferenceNumber || '');

    //             let genders = transformGenderArray(getProposalDetails?.response?.masters?.general_master);
    //             setDropDownGender(genders);


    //             let nomineeRelationships = transformNomineeRelationships(getProposalDetails?.response?.masters?.nominee_master);
    //             setdropdownNomineeRelation(nomineeRelationships);

    //             let kycDocTypes = transformKYCDocTypes(getProposalDetails?.response?.masters?.kyc_master);
    //             console.log('kycDocTypes', kycDocTypes)
    //             setDropdownDocuments(kycDocTypes);

    //             dispatch(actionGetGodigitPincodeMaster({ pincode: getProposalDetails?.response?.pincode?.toString() || "" }))

    //         } else {
    //             switch (getProposalDetails?.status) {
    //                 case UNAUTHORIZED:
    //                     break;
    //                 case ERROR:
    //                     console.error("An error occurred.");
    //                     break;
    //                 default:
    //                     console.warn("Unhandled status:", getProposalDetails?.status);
    //             }
    //         }
    //     }
    // }, [getProposalDetails]);

    // useEffect(() => {
    //     if (watchPincode !== undefined && watchPincode !== null && watchPincode.length === 6) {
    //         dispatch(actionGetGodigitPincodeMaster({ pincode: watchPincode }))
    //     }
    // }, [watchPincode]);

    // useEffect(() => {
    //     if (getPincodeDetails) {
    //         dispatch(resetPincodeDetails());
    //         if (getPincodeDetails.result) {
    //             // Clear errors for city and state
    //             communicationAddressClearErrors('city');
    //             communicationAddressClearErrors('state');

    //             communicationAddressSetValue("state", getPincodeDetails?.response?.pjMasterGodigitState?.state_name || '')
    //             communicationAddressSetValue("city", getPincodeDetails?.response?.city || '');
    //             // setValue("city", getPincode?.response?.city?.label || '')
    //         } else {
    //             communicationAddressSetValue("state", '')
    //             communicationAddressSetValue("city", '')
    //             // setError("pincode", { message: getPincodeDetails?.message })
    //             switch (getPincodeDetails.status) {
    //                 case UNAUTHORIZED:
    //                     // auth.logout();
    //                     break;
    //                 case ERROR:
    //                     console.error("An error occurred.");
    //                     break;
    //                 default:
    //                     console.warn("Unhandled status:", getPincodeDetails.status);
    //             }
    //         }
    //     }
    // }, [getPincodeDetails]);

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

    // useEffect(() => {
    //     if (proposalObjectDetails !== null && proposalObjectDetails !== undefined) {
    //         if (proposalObjectDetails?.pjCarEnquiryDetails?.insurance_type == 'new') {
    //             setIsRegNoDisabled(true);
    //             vehicleDetailsSetValue('vehicle_registration_no', "NEW")
    //         }
    //     }
    // }, [proposalObjectDetails])



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
                                        <Typography variant="body2">{additionalDetailsWatch('first_name') + " " + additionalDetailsWatch('last_name')}</Typography>
                                    </InformationBox>
                                }

                                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type == 'Organization' &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Company Name</Typography>
                                        <Typography variant="body2">{additionalDetailsWatch('first_name')}</Typography>
                                    </InformationBox>
                                }

                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Phone</Typography>
                                    <Typography variant="body2">{additionalDetailsWatch('mobile_no')}</Typography>
                                </InformationBox>

                                {proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Gender</Typography>
                                        <Typography variant="body2">{additionalDetailsWatch()?.gender_master_id?.label}</Typography>
                                    </InformationBox>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Email</Typography>
                                    <Typography variant="body2">{additionalDetailsWatch('email_id')}</Typography>
                                </InformationBox>

                                {
                                    proposalObjectDetails?.pjCarQuotationDetails?.proposer_type !== 'Organization' &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Date of Birth</Typography>
                                        <Typography variant="body2">{additionalDetailsWatch()?.date_of_birth ? dayjs(additionalDetailsWatch()?.date_of_birth).format("DD-MM-YYYY") : ""}</Typography>
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
                            {/* {emiratesIdWatch('address_line_1')}, {emiratesIdWatch('address_line_2')} - {emiratesIdWatch('pincode')} */}
                            {emiratesIdWatch()?.address_line_1}{emiratesIdWatch()?.address_line_2 !== "" && ", "} {emiratesIdWatch()?.address_line_2}{", "}{emiratesIdWatch()?.city}{", "}{emiratesIdWatch()?.state}{" - "}{emiratesIdWatch()?.pincode}
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
                                    <Typography variant="body2">{mulkiyaDetailsWatch('vehicle_registration_no')}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Chassis Number</Typography>
                                    <Typography variant="body2">{mulkiyaDetailsWatch('chassis_no')}</Typography>
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
                                            {mulkiyaDetailsWatch("prev_policy_no")}
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
                                    <Typography variant="body2">{mulkiyaDetailsWatch('engine_no')}</Typography>
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
                                            {mulkiyaDetailsWatch("previous_tp_policy_no")}
                                        </Typography>
                                    </InformationBox>
                                }

                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Is Car Financed</Typography>
                                    <Typography variant="body2">{mulkiyaDetailsWatch()?.is_car_financed == "true" ? "Yes" : "No"}</Typography>
                                </InformationBox>
                                {mulkiyaDetailsWatch()?.is_car_financed == "true" &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Financing Company</Typography>
                                        <Typography variant="body2">{mulkiyaDetailsWatch('financed_company')}</Typography>
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
                                    <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{licenseNumberDetailsWatch('nominee_name')}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Nominee Date of Birth</Typography>
                                    <Typography variant="body2">{licenseNumberDetailsWatch()?.nominee_dob ? dayjs(licenseNumberDetailsWatch()?.nominee_dob).format("DD-MM-YYYY") : ""}</Typography>
                                </InformationBox>
                                {/* <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Apointee</Typography>
                                    <Typography variant="body2">{nomineeDetails.appointee_name}</Typography>
                                </InformationBox> */}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Relation with Nominee</Typography>
                                    <Typography variant="body2">{licenseNumberDetailsWatch()?.nominee_relationship_master_id?.label}</Typography>
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
                {/* <PolicyAndCarDetails proposalObjectDetails={proposalObjectDetails} masterDetails={masterDetails} quoteId={QUOTE_ID} /> */}
                <Box>
                    <Button
                        variant="text"
                        sx={{ mb: 2, p: 0, minHeight: 'auto', color: 'primary.main', fontWeight: 500 }}
                        onClick={() => {
                            router.back()
                        }}
                    >
                        Change Insurer
                    </Button>

                    <Typography variant="h5" fontWeight="bold" mb={0.5}>
                        Honda Civic
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" mb={3}>
                        Sport (GCC Spec)
                    </Typography>

                    <Card variant="outlined" sx={{ mb: 3, boxShadow: 2 }}>
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                            <Box display="flex" justifyContent="center" mb={2}>
                                <Image src="/images/adamjee.png" alt="United India" width={100} height={40} />
                            </Box>

                            <Typography variant="body2" fontWeight={500} sx={{ mb: 3 }}>
                                Adamjee Insurance Comprehensive (Garage)
                            </Typography>

                            <Typography variant="h6" color="text.secondary">
                                Premium
                            </Typography>

                            <Typography variant="h4" fontWeight="bold" color="primary" my={1}>
                                AED 14,212
                            </Typography>
                            {/* <Typography variant="caption" color="text.secondary">
                                (Price exclusive of GST)
                            </Typography> */}

                            <Box mt={2}>
                                <Typography variant="body2" color="text.primary">
                                    ✓ Replacement of Vehicle
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    ✓ Road Side Assistance
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    ✓ Natural Calamities
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    ✓ Driver Cover
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Policy not applicable for commercial cars
                    </Typography>

                    <Box>
                        <InfoRow label="Coverage Type" value="Comprehensive for 1st Year" />
                        <InfoRow label="Car Value" value="AED 598,899" />
                        <InfoRow label="Excess Amount" value="AED 750" />
                        <InfoRow label="Manufacturing Date" value="01-04-2025" />
                        <InfoRow label="Policy Tenure" value="3 years" />
                        <InfoRow label="New Policy Start Date" value="29-04-2025" />
                    </Box>
                </Box>
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
                        {/* Step 1: Additional Details */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(1)}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs="auto">
                                        <StepNumber>1</StepNumber>
                                    </Grid>
                                    <Grid item xs>
                                        <StepTitle>Additional Details</StepTitle>
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
                                        <form onSubmit={AdditionalDetailsHandleSubmit(submitAdditionalDetails)}>

                                            <Grid container spacing={5}>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="insurance_reason" // key name
                                                        control={additionalDetailsControl} // control object from useForm
                                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                            <Autocomplete
                                                                options={[
                                                                    {
                                                                        "label": "New vehicle Registration",
                                                                        "value": "1001"
                                                                    },
                                                                    {
                                                                        "label": "Change Vehicle Ownership/Year",
                                                                        "value": "1002"
                                                                    },
                                                                    {
                                                                        "label": "Vehicle Renewal",
                                                                        "value": "other"
                                                                    }
                                                                ]} // Options for dropdown
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
                                                                        label={<CustomLabel label="Why are you buying car insurance?" />}
                                                                        variant="outlined"
                                                                        placeholder="Select Option"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={errors?.insurance_reason ? errors.insurance_reason.message : ""}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="date_of_reg" // key name
                                                        control={additionalDetailsControl}
                                                        render={({ field: { value, onChange } }) => {
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
                                                                            label={<CustomLabel label="When do you want to register your car?" />}
                                                                            error={Boolean(errors.date_of_reg)}
                                                                            aria-describedby="validation-basic-dob"
                                                                            helperText={errors?.date_of_reg ? errors.date_of_reg.message : ""}
                                                                        />
                                                                    }
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <FormControl component="fieldset" error={Boolean(errors?.proposer_type)}>
                                                        <FormLabel component="legend">
                                                            <CustomLabel label="How is your vehicle registered or going to be registered?" />
                                                        </FormLabel>

                                                        <Controller
                                                            name="proposer_type"
                                                            control={additionalDetailsControl}
                                                            render={({ field }) => (
                                                                <RadioGroup row {...field}>
                                                                    <FormControlLabel value="individual" control={<Radio />} label="An Individual" />
                                                                    <FormControlLabel value="company" control={<Radio />} label="A Company" />
                                                                </RadioGroup>
                                                            )}
                                                        />

                                                        {errors?.proposer_type && (
                                                            <FormHelperText>{errors.proposer_type.message}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <FormControl component="fieldset" error={Boolean(errors?.is_car_financed)}>
                                                        <FormLabel component="legend">
                                                            <CustomLabel label="Is this vehicle currently financed?" />
                                                        </FormLabel>

                                                        <Controller
                                                            name="is_car_financed"
                                                            control={additionalDetailsControl}
                                                            render={({ field }) => (
                                                                <RadioGroup row {...field}>
                                                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                                                </RadioGroup>
                                                            )}
                                                        />

                                                        {errors?.is_car_financed && (
                                                            <FormHelperText>{errors.is_car_financed.message}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="gender_master_id" // key name
                                                        control={additionalDetailsControl} // control object from useForm
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
                                                                        label={<CustomLabel label="Gender" />}
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

                                                <Grid item xs={12} sm={6}>
                                                    <FormControl component="fieldset" error={Boolean(errors?.will_you_drive)}>
                                                        <FormLabel component="legend">
                                                            <CustomLabel label="Are you going to drive the car?" />
                                                        </FormLabel>

                                                        <Controller
                                                            name="will_you_drive"
                                                            control={additionalDetailsControl}
                                                            render={({ field }) => (
                                                                <RadioGroup row {...field}>
                                                                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                                                    <FormControlLabel value="false" control={<Radio />} label="No" />
                                                                </RadioGroup>
                                                            )}
                                                        />

                                                        {errors?.will_you_drive && (
                                                            <FormHelperText>{errors.will_you_drive.message}</FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="reg_city" // key name
                                                        control={additionalDetailsControl} // control object from useForm
                                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                            <Autocomplete
                                                                options={[
                                                                    {
                                                                        "value": 1001,
                                                                        "label": "Dubai"
                                                                    },
                                                                    {
                                                                        "value": 1002,
                                                                        "label": "Sharjah"
                                                                    },
                                                                    {
                                                                        "value": 1003,
                                                                        "label": "Abu Dhabi"
                                                                    },
                                                                    {
                                                                        "value": 1004,
                                                                        "label": "Ras Al Khaimah"
                                                                    },
                                                                    {
                                                                        "value": 1005,
                                                                        "label": "Al Ain"
                                                                    },
                                                                    {
                                                                        "value": 1006,
                                                                        "label": "Ajman"
                                                                    },
                                                                    {
                                                                        "value": 1007,
                                                                        "label": "Fujairah"
                                                                    },
                                                                    {
                                                                        "value": 1008,
                                                                        "label": "Umm Al Quwain"
                                                                    }
                                                                ]} // Options for dropdown
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
                                                                        label={<CustomLabel label="Where do you want to register your car?" />}
                                                                        variant="outlined"
                                                                        placeholder="Select Option"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={errors?.reg_city ? errors.reg_city.message : ""}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="owner_tcf"
                                                        control={additionalDetailsControl}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                onChange={onChange}

                                                                value={value}
                                                                label={<CustomLabel label="Owner TCF from RTA/Murror" />}
                                                                placeholder="Enter Owner TCF from RTA/Murror"
                                                                aria-describedby="validation-engine-no"
                                                                error={Boolean(errors?.engine_no)}
                                                                helperText={errors?.engine_no?.message || ""}
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
                                                        {loading ? <CircularProgress size={18} /> : 'Continue to Emirates ID'}
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

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Why are you buying car insurance?</Typography>
                                            <Typography variant="body2">{additionalDetailsWatch()?.insurance_reason?.label || ""}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>When do you want to register you car?</Typography>
                                            <Typography variant="body2">
                                                {additionalDetailsWatch()?.date_of_reg ? dayjs(additionalDetailsWatch()?.date_of_reg).format("DD-MM-YYYY") : ""}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1
                                        }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>How is your vehicle registered or going to be registered ?
                                            </Typography>
                                            <Typography variant="body2">{additionalDetailsWatch()?.proposer_type == "individual" ? "An Individual" : "A Company"}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1
                                        }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Is Car Financed</Typography>
                                            <Typography variant="body2">{additionalDetailsWatch()?.is_car_financed == "true" ? "Yes" : "No"}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Gender</Typography>
                                            <Typography variant="body2">{additionalDetailsWatch()?.gender_master_id?.label}</Typography>
                                        </Box>
                                    </Grid>


                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 1
                                        }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Are you going to drive the car?</Typography>
                                            <Typography variant="body2">{additionalDetailsWatch()?.will_you_drive == "true" ? "Yes" : "No"}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Where do you want to register you car?</Typography>
                                            <Typography variant="body2">{additionalDetailsWatch()?.reg_city?.label}</Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                            <Typography variant="body2" sx={{ fontWeight: '500' }}>Owner TCF from RTA/Murror</Typography>
                                            <Typography variant="body2">{additionalDetailsWatch()?.owner_tcf}</Typography>
                                        </Box>
                                    </Grid>

                                </Grid>
                            )}
                        </StepContainer>

                        {/* Step 2: Emirates ID */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(2)}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs="auto">
                                        <StepNumber>2</StepNumber>
                                    </Grid>
                                    <Grid item xs>
                                        <StepTitle>Emirates ID</StepTitle>
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
                                        <form onSubmit={emiratedIdHandleSubmit(submitEmiratesIdDetails)}>
                                            <Grid container spacing={5}>
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="emirates_id_file"
                                                        control={emiratesIdControl}
                                                        // rules={{ validate: validateFile }}
                                                        render={({ field: { onChange }, fieldState: { error } }) => (
                                                            <FormControl fullWidth>
                                                                <FormLabel>Emirates ID</FormLabel>

                                                                {/* Show File Preview */}
                                                                {emiratedIdFile && (
                                                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                                                        Selected File: {emiratedIdFile.name}
                                                                    </Typography>
                                                                )}

                                                                {/* File Input */}
                                                                <input
                                                                    type="file"
                                                                    accept="application/pdf,image/jpeg,image/png,image/webp"
                                                                    onChange={(e) => {
                                                                        const file = e.target.files[0];
                                                                        handleEmiratesIdFileChange(e);
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

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="first_name"
                                                        control={emiratesIdControl}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="First Name" />} // Removed 'required' indicator
                                                                onChange={onChange}
                                                                placeholder="Enter First name"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(emiratesIdErrors?.first_name)}
                                                                helperText={emiratesIdErrors?.first_name?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>


                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="middle_name"
                                                        control={emiratesIdControl}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Middle Name" />} // Removed 'required' indicator
                                                                onChange={onChange}
                                                                placeholder="Enter Middle Name"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(emiratesIdErrors?.middle_name)}
                                                                helperText={emiratesIdErrors?.middle_name?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="last_name"
                                                        control={emiratesIdControl}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Last Name" />} // Removed 'required' indicator
                                                                onChange={onChange}
                                                                placeholder="Enter Last Name"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(emiratesIdErrors?.last_name)}
                                                                helperText={emiratesIdErrors?.last_name?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="emirates_id_exp_date" // key name
                                                        control={emiratesIdControl}
                                                        render={({ field: { value, onChange } }) => {
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
                                                                            label={<CustomLabel label="Emirates ID expiry date" />}
                                                                            error={Boolean(emiratesIdErrors.emirates_id_exp_date)}
                                                                            aria-describedby="validation-basic-dob"
                                                                            helperText={emiratesIdErrors?.emirates_id_exp_date ? emiratesIdErrors.emirates_id_exp_date.message : ""}
                                                                        />
                                                                    }
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="emirates_id_no"
                                                        control={emiratesIdControl}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Emirates ID number" />} // Removed 'required' indicator
                                                                onChange={onChange}
                                                                placeholder="Enter Emirates Id Number"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(emiratesIdErrors?.emirates_id_no)}
                                                                helperText={emiratesIdErrors?.emirates_id_no?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="employer_name"
                                                        control={emiratesIdControl}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Employer" />} // Removed 'required' indicator
                                                                onChange={onChange}
                                                                placeholder="Enter Employer Name"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(emiratesIdErrors?.employer_name)}
                                                                helperText={emiratesIdErrors?.employer_name?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="occupation" // key name
                                                        control={emiratesIdControl} // control object from useForm
                                                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                            <Autocomplete
                                                                options={[
                                                                    {
                                                                        "label": "Accountant",
                                                                        "value": "1001"
                                                                    },
                                                                    {
                                                                        "label": "Software Engineer",
                                                                        "value": "1002"
                                                                    },
                                                                    {
                                                                        "label": "Graphic Designer",
                                                                        "value": "1003"
                                                                    },
                                                                    {
                                                                        "label": "Marketing Manager",
                                                                        "value": "1004"
                                                                    },
                                                                    {
                                                                        "label": "Data Analyst",
                                                                        "value": "1005"
                                                                    },
                                                                    {
                                                                        "label": "Mechanical Engineer",
                                                                        "value": "1006"
                                                                    },
                                                                    {
                                                                        "label": "Project Manager",
                                                                        "value": "1007"
                                                                    },
                                                                    {
                                                                        "label": "Nurse",
                                                                        "value": "1008"
                                                                    }
                                                                ]} // Options for dropdown
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
                                                                        label={<CustomLabel label="Occupation" />}
                                                                        variant="outlined"
                                                                        placeholder="Select Option"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={emiratesIdErrors?.occupation ? emiratesIdErrors.occupation.message : ""}
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
                                                        type='submit'
                                                        variant='contained'>
                                                        {loading ? <CircularProgress size={18} /> : 'Continue to Mulkiya'}
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

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Emirates ID File</Typography>
                                                {emiratedIdFile && (
                                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                                        {emiratedIdFile.name}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>First Name</Typography>
                                                <Typography variant="body2">{emiratesIdWatch()?.first_name || ""}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Middle Name</Typography>
                                                <Typography variant="body2">{emiratesIdWatch()?.middle_name == "" ? "-" : emiratesIdWatch()?.middle_name}</Typography>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Last Name</Typography>
                                                <Typography variant="body2">{emiratesIdWatch()?.last_name || ""}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Emirates ID Number</Typography>
                                                <Typography variant="body2">{emiratesIdWatch()?.emirates_id_no || ""}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Emirates ID Expiry Date</Typography>
                                                <Typography variant="body2">
                                                    {emiratesIdWatch()?.emirates_id_exp_date ? dayjs(emiratesIdWatch()?.emirates_id_exp_date).format("DD-MM-YYYY") : ""}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Employer</Typography>
                                                <Typography variant="body2">{emiratesIdWatch()?.employer_name || ""}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Occupation</Typography>
                                                <Typography variant="body2">{emiratesIdWatch()?.occupation?.label || ""}</Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                )
                            )}
                        </StepContainer>

                        {/* Step 3: Mulkiya Details */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(3)}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs="auto">
                                        <StepNumber>3</StepNumber>
                                    </Grid>
                                    <Grid item xs>
                                        <StepTitle>Mulkiya</StepTitle>
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
                                    <form onSubmit={mulkiyaDetailsHandleSubmit(submitMulkiyaDetails)}>
                                        <Grid container spacing={5}>


                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="mulkiya_file"
                                                    control={emiratesIdControl}
                                                    // rules={{ validate: validateFile }}
                                                    render={({ field: { onChange }, fieldState: { error } }) => (
                                                        <FormControl fullWidth>
                                                            <FormLabel>Mulkiya</FormLabel>

                                                            {/* Show File Preview */}
                                                            {mulkiyaFile && (
                                                                <Typography variant="body2" sx={{ mt: 2 }}>
                                                                    Selected File: {mulkiyaFile.name}
                                                                </Typography>
                                                            )}

                                                            {/* File Input */}
                                                            <input
                                                                type="file"
                                                                accept="application/pdf,image/jpeg,image/png,image/webp"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    handleMulkiyaFileChange(e);
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



                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="plate_no"
                                                    control={mulkiyaDetailsControl}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Plate Number" />}
                                                            onChange={onChange}
                                                            placeholder="Enter Plate Number"
                                                            aria-describedby="validation-vehicle-registration"
                                                            error={Boolean(mulkiyaDetailsErrors?.plate_no)}
                                                            helperText={
                                                                mulkiyaDetailsErrors?.plate_no?.message || ""
                                                            }
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="engine_no"
                                                    control={mulkiyaDetailsControl}

                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Engine Number" />}
                                                            inputProps={{
                                                                maxLength: 17,
                                                                inputMode: 'text',
                                                            }}
                                                            onChange={onChange}
                                                            placeholder="Enter Engine Number"
                                                            aria-describedby="validation-engine-no"
                                                            error={Boolean(mulkiyaDetailsErrors?.engine_no)}
                                                            helperText={mulkiyaDetailsErrors?.engine_no?.message || ""}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="chassis_no"
                                                    control={mulkiyaDetailsControl}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Chassis Number" />}
                                                            onChange={onChange}
                                                            placeholder="Enter Chassis Number"
                                                            aria-describedby="validation-chassis-no"
                                                            error={Boolean(mulkiyaDetailsErrors?.chassis_no)}
                                                            helperText={mulkiyaDetailsErrors?.chassis_no?.message || ""}
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
                                                    {loading ? <CircularProgress size={18} /> : 'Continue to Driving License'}
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
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Mulkiya File</Typography>
                                                {mulkiyaFile && (
                                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                                        {mulkiyaFile.name}
                                                    </Typography>
                                                )}
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Plate Number</Typography>
                                                <Typography variant="body2">{mulkiyaDetailsWatch()?.plate_no || ""}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Engine Number</Typography>
                                                <Typography variant="body2">{mulkiyaDetailsWatch()?.engine_no}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Chassis Number</Typography>
                                                <Typography variant="body2">{mulkiyaDetailsWatch()?.chassis_no}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                )
                            )}
                        </StepContainer>

                        {/* Step 4: Driving License Details */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(4)}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs="auto">
                                        <StepNumber>4</StepNumber>
                                    </Grid>
                                    <Grid item xs>
                                        <StepTitle>Driving License</StepTitle>
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
                                        <form onSubmit={drivingLicenseHandleSubmit(submitDrivingLicenseDetails)}>
                                            <Grid container spacing={5}>
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="license_no"
                                                        control={drivingLicenseDetailsControl}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="License Number" />}
                                                                onChange={onChange}
                                                                placeholder="Enter License Number"
                                                                aria-describedby="validation-nominee-name"
                                                                error={Boolean(LicenseNumberDetailsErrors?.license_no)}
                                                                helperText={LicenseNumberDetailsErrors?.license_no?.message || ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="issue_date"
                                                        control={drivingLicenseDetailsControl}
                                                        render={({ field: { value, onChange } }) => {
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
                                                                            label={<CustomLabel label="Issuing Date" />}
                                                                            error={Boolean(LicenseNumberDetailsErrors.issue_date)}
                                                                            aria-describedby="validation-nominee-dob"
                                                                            helperText={LicenseNumberDetailsErrors?.issue_date ? LicenseNumberDetailsErrors.issue_date.message : ""}
                                                                        />
                                                                    }
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </Grid>


                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="expiry_date"
                                                        control={drivingLicenseDetailsControl}
                                                        render={({ field: { value, onChange } }) => {
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
                                                                            label={<CustomLabel label="Driving License Expiry Date" />}
                                                                            error={Boolean(LicenseNumberDetailsErrors.expiry_date)}
                                                                            aria-describedby="validation-nominee-dob"
                                                                            helperText={LicenseNumberDetailsErrors?.expiry_date ? LicenseNumberDetailsErrors.expiry_date.message : ""}
                                                                        />
                                                                    }
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </Grid>


                                                <Grid item xs={12}>
                                                    <Button
                                                        disabled={loading}
                                                        sx={{ mr: 3 }}
                                                        startIcon={<CheckIcon />}
                                                        type='submit'
                                                        variant='contained'>
                                                        {loading ? <CircularProgress size={18} /> : 'Continue to Documents'}
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
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
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>License Number</Typography>
                                                <Typography variant="body2">{licenseNumberDetailsWatch()?.license_no}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>Issue Date</Typography>
                                                <Typography variant="body2">{licenseNumberDetailsWatch()?.issue_date ? dayjs(licenseNumberDetailsWatch()?.issue_date).format("DD-MM-YYYY") : ""}</Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} sm={6}>
                                            <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                <Typography variant="body2" sx={{ fontWeight: '500' }}>License Expiry Date</Typography>
                                                <Typography variant="body2">{licenseNumberDetailsWatch()?.expiry_date ? dayjs(licenseNumberDetailsWatch()?.expiry_date).format("DD-MM-YYYY") : ""}</Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                )
                            )}
                        </StepContainer>

                        {/* Step 5: Document Details */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(5)}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs="auto">
                                        <StepNumber>5</StepNumber>
                                    </Grid>
                                    <Grid item xs>
                                        <StepTitle>Documents</StepTitle>
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
                                    <form onSubmit={DocumentDetailsHandleSubmit(submitDocumentDetails)}>
                                        <Grid container spacing={5}>

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="transfer_paper_file"
                                                    control={documentDetailsControl}
                                                    render={({ field: { onChange }, fieldState: { error } }) => (
                                                        <FormControl fullWidth>
                                                            <FormLabel>Transfer Paper/Previous Owner Mulikya</FormLabel>

                                                            {/* Show File Preview */}
                                                            {transferPaperFile && (
                                                                <Typography variant="body2" sx={{ mt: 2 }}>
                                                                    Selected File: {transferPaperFile.name}
                                                                </Typography>
                                                            )}

                                                            {/* File Input */}
                                                            <input
                                                                type="file"
                                                                accept="application/pdf,image/jpeg,image/png,image/webp"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    handleTransferPaperFileChange(e);
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

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="car_photo_file"
                                                    control={documentDetailsControl}
                                                    render={({ field: { onChange }, fieldState: { error } }) => (
                                                        <FormControl fullWidth>
                                                            <FormLabel>Current Dated Car Pictures</FormLabel>

                                                            {/* Show File Preview */}
                                                            {carPictureFile && (
                                                                <Typography variant="body2" sx={{ mt: 2 }}>
                                                                    Selected File: {carPictureFile.name}
                                                                </Typography>
                                                            )}

                                                            {/* File Input */}
                                                            <input
                                                                type="file"
                                                                accept="application/pdf,image/jpeg,image/png,image/webp"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    handleCarPictureFileChange(e);
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

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="vehicle_certificate_file"
                                                    control={documentDetailsControl}
                                                    render={({ field: { onChange }, fieldState: { error } }) => (
                                                        <FormControl fullWidth>
                                                            <FormLabel>Vehicle Passing Certificate</FormLabel>

                                                            {/* Show File Preview */}
                                                            {vehicleCertificateFile && (
                                                                <Typography variant="body2" sx={{ mt: 2 }}>
                                                                    Selected File: {vehicleCertificateFile.name}
                                                                </Typography>
                                                            )}

                                                            {/* File Input */}
                                                            <input
                                                                type="file"
                                                                accept="application/pdf,image/jpeg,image/png,image/webp"
                                                                onChange={(e) => {
                                                                    const file = e.target.files[0];
                                                                    handleVehicleCertificateFileChange(e);
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
                                                    {loading ? <CircularProgress size={18} /> : 'Proceed'}
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
                                        {/* <Grid item xs={12} sm={6}>
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
                                        </Grid> */}

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
