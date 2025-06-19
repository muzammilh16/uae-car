import React, { forwardRef, useState } from 'react';
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
import { getFormData } from 'src/utility';
import { useDispatch } from 'react-redux';
import { actionUpdateProposal } from 'src/store/godigit_proposal';


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

const StepHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
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
    marginRight: '1rem',
    border: '1px solid #ddd',
}));

const StepTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 500,
    color: '#333',
}));

const EditButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    right: '1.5rem',
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 4,
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    minWidth: 'auto',
    '&:hover': {
        backgroundColor: 'rgba(255, 112, 67, 0.04)',
    }
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
    '& > *:first-of-type': {
        fontWeight: 500,
        marginBottom: '0.25rem',
    }
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

const ReviewSectionTitle = styled(Typography)(({ theme }) => ({
    color: '#666',
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    marginBottom: '0.5rem',
}));

const ReviewEditButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    right: '1.5rem',
    top: '1.5rem',
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
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

    const { control: carOwnerDetailsControl, handleSubmit: carOwnerDetailsHandleSubmit, setValue: carOwnerDetailsSetValue, watch: carOwnerDetailsWatch, formState: { errors }, reset, setError, clearErrors } = useForm();

    const { control: communicationAddressControl, handleSubmit: communicationAddressHandleSubmit, setValue: communicationAddressSetValue, watch: communicationAddressWatch, formState: { errors: communicationAddressErrors }, reset: communicationAddressReset, setError: communicationAddressSetError, clearErrors: communicationAddressClearErrors } = useForm();

    const { control: vehicleDetailsControl, handleSubmit: vehicleDetailsHandleSubmit, setValue: vehicleDetailsSetValue, watch: vehicleDetailsWatch, formState: { errors: vehicleDetailsErrors }, reset: vehicleDetailsReset, setError: vehicleDetailsSetError, clearErrors: vehicleDetailsClearErrors } = useForm();

    const { control: nomineeDetailsControl, handleSubmit: nomineeDetailsHandleSubmit, setValue: nomineeDetailsSetValue, watch: nomineeDetailsWatch, formState: { errors: nomineeDetailsErrors }, reset: nomineeDetailsReset, setError: nomineeDetailsSetError, clearErrors: nomineeDetailsClearErrors } = useForm();

    const { control: kycDetailsControl, handleSubmit: kycDetailsHandleSubmit, setValue: kycDetailsSetValue, watch: kycDetailsWatch, formState: { errors: kycDetailsErrors }, reset: kycDetailsReset, setError: kycDetailsSetError, clearErrors: kycDetailsClearErrors } = useForm();


    const [loading, setLoading] = useState(false);
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

    const [documentFile, setDocumentFile] = useState(null);
    const dispatch = useDispatch();

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [kycAccepted, setKycAccepted] = useState(false);

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
        setShowReview(true);
    };

    const handleCompleteKYC = () => {
        alert('KYC completed successfully!');
    };

    const submitCarOwnerDetails = (data) => {
        let params = {
            ...data,
            date_of_birth: dayjs(data.dob).format("YYYY-MM-DD"),
            gender: data.gender.value,
            section: "owner",
            proposal_id: "",
            reference_id: "",
        }
        console.log(params);
        dispatch(actionUpdateProposal(params));
        handleGoToStep(2);
    }

    const submitAddressDetails = (data) => {
        let params = {
            ...data,
            section: "address",
            proposal_id: "",
            reference_id: "",
        }
        console.log(params);
        dispatch(actionUpdateProposal(params));
        handleGoToStep(3);
    }

    const submitVehicleDetails = (data) => {
        let params = {
            ...data,
            manufactured_year: data.manufactured_year.value,
            manufactured_month: data.manufactured_month.value,
            section: "vehicle",
            proposal_id: "",
            reference_id: "",
        }
        console.log(params);
        dispatch(actionUpdateProposal(params));
        handleGoToStep(4);
    }

    const submitNomineeDetails = (data) => {
        let params = {
            ...data,
            nominee_dob: dayjs(data.nominee_dob).format("YYYY-MM-DD"),
            appointee_relationship: data.appointee_relationship.value,
            nominee_relationship: data.nominee_relationship.value,
            section: "nominee",
            proposal_id: "",
            reference_id: "",
        }
        console.log(params);
        dispatch(actionUpdateProposal(params));
        handleGoToStep(5);
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
            section: "ckyc",
            proposal_id: "",
            reference_id: "",
        }

        var objFormData = getFormData(input, [
            documentFile ? { title: "document", data: documentFile } : null,
        ]);

        dispatch(actionUpdateProposal(objFormData));

        console.log(objFormData);
        handleContinueToReview();
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
            return "Please upload a document file (PDF or Image)"
        }

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

    if (showReview) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
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
                        <ReviewSectionTitle>CAR OWNER DETAILS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(1)}>EDIT</ReviewEditButton>
                        <Grid container spacing={4} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Name</Typography>
                                    <Typography variant="body2">{carOwnerDetails.ownerName}</Typography>
                                </InformationBox>

                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Phone</Typography>
                                    <Typography variant="body2">{carOwnerDetails.mobileNumber}</Typography>
                                </InformationBox>

                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Gender</Typography>
                                    <Typography variant="body2">{carOwnerDetails.gender}</Typography>
                                </InformationBox>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Email</Typography>
                                    <Typography variant="body2">{carOwnerDetails.email}</Typography>
                                </InformationBox>

                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Date of Birth</Typography>
                                    <Typography variant="body2">{carOwnerDetails.dob}</Typography>
                                </InformationBox>

                            </Grid>
                        </Grid>

                    </ReviewSection>

                    <ReviewSection>
                        <ReviewSectionTitle>COMMUNICATION ADDRESS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(2)}>EDIT</ReviewEditButton>
                        <Typography variant="body2">
                            {communicationAddress.address} - {communicationAddress.pincode}
                        </Typography>
                    </ReviewSection>

                    {/* Vehicle Details Section */}
                    <ReviewSection>
                        <ReviewSectionTitle>VEHICLE DETAILS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(3)}>EDIT</ReviewEditButton>
                        <Grid container spacing={4} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Registration Number</Typography>
                                    <Typography variant="body2">{vehicleDetails.registrationNumber}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Chassis Number</Typography>
                                    <Typography variant="body2">{vehicleDetails.engineNumber}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Engine Number</Typography>
                                    <Typography variant="body2">{vehicleDetails.chassisNumber}</Typography>
                                </InformationBox>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Manufactured Month-Year</Typography>
                                    <Typography variant="body2">{vehicleDetails.manufacturedMonth + "-" + vehicleDetails.manufacturedYear}</Typography>
                                </InformationBox>
                                {vehicleDetails?.isCarFinanced &&
                                    <InformationBox>
                                        <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Old Financer</Typography>
                                        <Typography variant="body2">{vehicleDetails.financedCompany}</Typography>
                                    </InformationBox>
                                }
                            </Grid>
                        </Grid>
                    </ReviewSection>

                    {/* Nominee Details Section */}
                    <ReviewSection>
                        <ReviewSectionTitle>NOMINEE DETAILS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(4)}>EDIT</ReviewEditButton>
                        <Grid container spacing={4} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Nominee</Typography>
                                    <Typography variant="body2">{nomineeDetails.nominee_name}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Apointee</Typography>
                                    <Typography variant="body2">{nomineeDetails.appointee_name}</Typography>
                                </InformationBox>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Relation with Nominee</Typography>
                                    <Typography variant="body2">{nomineeDetails.nominee_relationship}</Typography>
                                </InformationBox>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Relation with Apointee</Typography>
                                    <Typography variant="body2">{nomineeDetails.appointee_relationship}</Typography>
                                </InformationBox>
                            </Grid>
                        </Grid>
                    </ReviewSection>


                    {/* Personal Details Section */}
                    <ReviewSection>
                        <ReviewSectionTitle>KYC DETAILS</ReviewSectionTitle>
                        <ReviewEditButton onClick={() => handleEditStep(5)}>EDIT</ReviewEditButton>
                        <Grid container spacing={4} sx={{ mt: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Document</Typography>
                                    <Typography variant="body2">{kycDetails.document_type}</Typography>
                                </InformationBox>

                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <InformationBox>
                                    <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>Document Number</Typography>
                                    <Typography variant="body2">{kycDetails.reference_number}</Typography>
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
                    <Box sx={{ padding: '1.5rem' }}>
                        <StyledFormGroup>
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
                        </StyledFormGroup>

                        <StyledFormGroup sx={{ mt: 2 }}>
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
                        </StyledFormGroup>

                        <CompleteKYCButton onClick={handleCompleteKYC}>
                            Complete KYC
                        </CompleteKYCButton>

                        <Typography variant="body2" sx={{ textAlign: 'center', color: '#666', mt: 1 }}>
                            Please wait for the final validation of your proposal. This could take a few seconds.
                        </Typography>
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
            sx={{ borderBottom: '1px solid #eee' }}
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
                <Box>
                    <Button
                        variant="text"
                        sx={{ mb: 2, p: 0, minHeight: 'auto', color: 'primary.main', fontWeight: 500 }}
                    >
                        Change Insurer
                    </Button>

                    <Typography variant="h5" fontWeight="bold" mb={0.5}>
                        Ford Aspire
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" mb={3}>
                        Petrol TI-VCT Titanium (1194 CC)
                    </Typography>

                    <Card variant="outlined" sx={{ mb: 3, boxShadow: 2 }}>
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                            <Box display="flex" justifyContent="center" mb={2}>
                                <Image src="/united-insurance-logo.png" alt="United India" width={100} height={40} />
                            </Box>

                            <Typography variant="h6" color="text.secondary">
                                Premium
                            </Typography>
                            <Typography variant="h4" fontWeight="bold" color="primary" my={1}>
                                Rs. 14,212
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                (Price exclusive of GST)
                            </Typography>

                            <Box mt={2}>
                                <Typography variant="body2" color="text.primary">
                                    ✓ Personal Accident Cover
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Typography variant="body2" color="text.secondary" mb={3}>
                        Policy not applicable for commercial cars
                    </Typography>

                    <Box>
                        <InfoRow label="Coverage Type" value="Comprehensive for 1st Year" />
                        <InfoRow label="IDV" value="Rs. 5,98,899" />
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
                    padding: '2rem',
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
                            <StepHeader onClick={() => handleToggleStep(1)}>
                                <StepNumber>1</StepNumber>
                                <StepTitle>Car Owner Details</StepTitle>
                                {activeStep !== 1 && <EditButton onClick={() => handleEditStep(1)}>EDIT</EditButton>}
                            </StepHeader>

                            {activeStep === 1 ? (
                                <DatePickerWrapper>
                                    <StepContent>
                                        <form onSubmit={carOwnerDetailsHandleSubmit(submitCarOwnerDetails)}>
                                            {/* <StyledFormGroup>
                                            <FormLabel>Car Registered In Company Name?</FormLabel>
                                            <RadioGroup
                                                row
                                                name="companyRegistered"
                                                value={carOwnerDetails.companyRegistered}
                                                onChange={(e) => handleCarOwnerChange('companyRegistered', e.target.value)}
                                                sx={{ gap: '2rem' }}
                                            >
                                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                                <FormControlLabel value="no" control={<Radio />} label="No" />
                                            </RadioGroup>
                                        </StyledFormGroup>

                                        <StyledFormGroup>
                                            <FormLabel>Car owner name, as in your RC copy</FormLabel>
                                            <InputContainer>
                                                <TextField
                                                    fullWidth
                                                    value={carOwnerDetails.ownerName}
                                                    onChange={(e) => handleCarOwnerChange('ownerName', e.target.value)}
                                                    placeholder="Enter car owner name"
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { paddingRight: '2.5rem' } }}
                                                />
                                                {carOwnerDetails.ownerName && <ValidationIcon />}
                                            </InputContainer>
                                        </StyledFormGroup>

                                        <StyledFormGroup>
                                            <FormLabel>Email Address</FormLabel>
                                            <InputContainer>
                                                <TextField
                                                    fullWidth
                                                    type="email"
                                                    value={carOwnerDetails.email}
                                                    onChange={(e) => handleCarOwnerChange('email', e.target.value)}
                                                    placeholder="Enter email address"
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { paddingRight: '2.5rem' } }}
                                                />
                                                {carOwnerDetails.email && <ValidationIcon />}
                                            </InputContainer>
                                        </StyledFormGroup>

                                        <StyledFormGroup>
                                            <FormLabel>10 Digit Mobile Number</FormLabel>
                                            <InputContainer>
                                                <TextField
                                                    fullWidth
                                                    type="tel"
                                                    value={carOwnerDetails.mobileNumber}
                                                    onChange={(e) => handleCarOwnerChange('mobileNumber', e.target.value)}
                                                    placeholder="Enter mobile number"
                                                    variant="outlined"
                                                    sx={{ '& .MuiOutlinedInput-root': { paddingRight: '2.5rem' } }}
                                                />
                                                {carOwnerDetails.mobileNumber && <ValidationIcon />}
                                            </InputContainer>
                                        </StyledFormGroup>

                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                            <ContinueButton onClick={() => handleGoToStep(2)}>
                                                Continue to Personal Details
                                            </ContinueButton>
                                        </Box> */}

                                            <Grid container spacing={5}>
                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name='first_name'
                                                        control={carOwnerDetailsControl}
                                                        rules={{
                                                            required: "First Name is required", // Required validation
                                                            pattern: {
                                                                value: /^[A-Za-z]{1,25}$/, // Only alphabets, minimum 2, maximum 25 characters, no spaces
                                                                message: "First Name must be 1-25 alphabets with no spaces"
                                                            }
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
                                                                    e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                                                                }}
                                                                placeholder='Enter First Name'
                                                                aria-describedby='validation-basic-first-name'
                                                                error={Boolean(errors?.first_name)} // Pass boolean value for error
                                                                helperText={errors?.first_name ? errors.first_name.message : ""}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

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

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="gender" // key name
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
                                                                        helperText={errors?.gender ? errors.gender.message : ""}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

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
                                                                placeholder='Enter email Id'
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
                                                            required: "Mobile Number is required", // Custom message for required validation
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
                                                                placeholder='Enter mobile number'
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

                                                <Grid item xs={12} sm={6}>
                                                    <Controller
                                                        name="dob"
                                                        control={carOwnerDetailsControl}
                                                        rules={{ required: 'Date of Birth is required' }}
                                                        render={({ field: { value, onChange } }) => {
                                                            // Convert value to a valid Date object
                                                            const selectedDate = value ? new Date(value) : null;

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
                                                                            error={Boolean(errors.dob)}
                                                                            aria-describedby="validation-basic-dob"
                                                                            helperText={errors?.dob ? errors.dob.message : ""}
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
                                                        {loading ? <CircularProgress size={18} /> : 'Continue to Address Details'}
                                                    </Button>
                                                </Grid>

                                            </Grid>
                                        </form>
                                    </StepContent>
                                </DatePickerWrapper>
                            ) : (
                                <SummaryContainer>
                                    <SummarySection>
                                        {/* <Typography variant="body2">Company Owned:</Typography>
                                        <Typography variant="body1">{carOwnerDetails.companyRegistered === 'yes' ? 'Yes' : 'No'}</Typography> */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2">Full Name:</Typography>
                                            <Typography variant="body1">{carOwnerDetails.ownerName}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2">Gender:</Typography>
                                            <Typography variant="body1">{carOwnerDetails.gender}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2">Date of Birth:</Typography>
                                            <Typography variant="body1">{carOwnerDetails.dob}</Typography>
                                        </Box>
                                    </SummarySection>
                                    <SummarySection>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2">Email:</Typography>
                                            <Typography variant="body1">{carOwnerDetails.email}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Typography variant="body2">Mobile:</Typography>
                                            <Typography variant="body1">{carOwnerDetails.mobileNumber}</Typography>
                                        </Box>
                                    </SummarySection>
                                </SummaryContainer>
                            )}
                        </StepContainer>

                        {/* Step 2: Personal Details */}
                        {/* <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(2)}>
                                <StepNumber>2</StepNumber>
                                <StepTitle>Personal Details</StepTitle>
                                {activeStep !== 2 && activeStep > 2 && <EditButton onClick={() => handleEditStep(2)}>EDIT</EditButton>}
                            </StepHeader>

                            {activeStep === 2 && (
                                <StepContent>
                                    <StyledFormGroup>
                                        <FormLabel>GENDER</FormLabel>
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={personalDetails.gender}
                                            onChange={(e) => handlePersonalDetailsChange('gender', e.target.value)}
                                            sx={{ gap: '2rem' }}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>MARRIED</FormLabel>
                                        <RadioGroup
                                            row
                                            name="married"
                                            value={personalDetails.married}
                                            onChange={(e) => handlePersonalDetailsChange('married', e.target.value)}
                                            sx={{ gap: '2rem' }}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>DATE OF BIRTH</FormLabel>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <TextField
                                                value={personalDetails.dateOfBirth.day}
                                                onChange={(e) => handleDateChange('day', e.target.value)}
                                                placeholder="DD"
                                                variant="outlined"
                                                sx={{ width: '80px' }}
                                            />
                                            <FormControl sx={{ minWidth: 120 }}>
                                                <Select
                                                    value={personalDetails.dateOfBirth.month}
                                                    onChange={(e) => handleDateChange('month', e.target.value)}
                                                >
                                                    <MenuItem value="January">January</MenuItem>
                                                    <MenuItem value="February">February</MenuItem>
                                                    <MenuItem value="March">March</MenuItem>
                                                    <MenuItem value="April">April</MenuItem>
                                                    <MenuItem value="May">May</MenuItem>
                                                    <MenuItem value="June">June</MenuItem>
                                                    <MenuItem value="July">July</MenuItem>
                                                    <MenuItem value="August">August</MenuItem>
                                                    <MenuItem value="September">September</MenuItem>
                                                    <MenuItem value="October">October</MenuItem>
                                                    <MenuItem value="November">November</MenuItem>
                                                    <MenuItem value="December">December</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                value={personalDetails.dateOfBirth.year}
                                                onChange={(e) => handleDateChange('year', e.target.value)}
                                                placeholder="YYYY"
                                                variant="outlined"
                                                sx={{ width: '100px' }}
                                            />
                                            <ValidationIcon />
                                        </Box>
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>PAN DETAILS</FormLabel>
                                        <Typography variant="caption" sx={{ color: '#666', mb: 1 }}>
                                            KYC is mandatory as per recent IRDAI guidelines
                                        </Typography>
                                        <InputContainer>
                                            <TextField
                                                fullWidth
                                                value={personalDetails.panNumber}
                                                onChange={(e) => handlePersonalDetailsChange('panNumber', e.target.value)}
                                                placeholder="PAN number"
                                                variant="outlined"
                                                sx={{ '& .MuiOutlinedInput-root': { paddingRight: '2.5rem' } }}
                                            />
                                            {personalDetails.panNumber && <ValidationIcon />}
                                        </InputContainer>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={personalDetails.noPan}
                                                    onChange={(e) => handlePersonalDetailsChange('noPan', e.target.checked)}
                                                />
                                            }
                                            label="I don't have my PAN details"
                                        />
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>NOMINEE DETAILS</FormLabel>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <InputContainer>
                                                    <TextField
                                                        fullWidth
                                                        value={personalDetails.nominee.name}
                                                        onChange={(e) => handleNomineeChange('name', e.target.value)}
                                                        placeholder="Nominee Name"
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { paddingRight: '2.5rem' } }}
                                                    />
                                                    {personalDetails.nominee.name && <ValidationIcon />}
                                                </InputContainer>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    fullWidth
                                                    value={personalDetails.nominee.age}
                                                    onChange={(e) => handleNomineeChange('age', e.target.value)}
                                                    placeholder="Age"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={personalDetails.nominee.relation}
                                                        onChange={(e) => handleNomineeChange('relation', e.target.value)}
                                                    >
                                                        <MenuItem value="Daughter">Daughter</MenuItem>
                                                        <MenuItem value="Son">Son</MenuItem>
                                                        <MenuItem value="Spouse">Spouse</MenuItem>
                                                        <MenuItem value="Father">Father</MenuItem>
                                                        <MenuItem value="Mother">Mother</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="caption" sx={{ color: 'error.main', mt: 1 }}>
                                            Your daughter should be at least 18 years younger to you.
                                        </Typography>
                                    </StyledFormGroup>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                        <ContinueButton onClick={() => handleGoToStep(3)}>
                                            Continue to Address Details
                                        </ContinueButton>
                                    </Box>
                                </StepContent>
                            )}
                        </StepContainer> */}

                        {/* Step 2: Communication Address */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(2)}>
                                <StepNumber>2</StepNumber>
                                <StepTitle>Communication Address</StepTitle>
                                {activeStep !== 2 && activeStep > 2 && <EditButton onClick={() => handleEditStep(2)}>EDIT</EditButton>}
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
                                                            pattern: {
                                                                value: /^[A-Za-z0-9\s,.-]{5,100}$/, // Allows letters, numbers, spaces, commas, dots, hyphens
                                                                message: "Address must be 5–100 characters and contain only valid characters"
                                                            }
                                                        }}
                                                        render={({ field: { value, onChange } }) => (
                                                            <CustomTextField
                                                                fullWidth
                                                                value={value}
                                                                label={<CustomLabel label="Address" required />}
                                                                inputProps={{
                                                                    maxLength: 100
                                                                }}
                                                                onChange={onChange}
                                                                onInput={(e) => {
                                                                    // Optional sanitization: remove invalid characters in real time
                                                                    e.target.value = e.target.value.replace(/[^A-Za-z0-9\s,.-]/g, '');
                                                                }}
                                                                placeholder="Enter full address"
                                                                aria-describedby="validation-address"
                                                                error={Boolean(communicationAddressErrors?.address_line_1)}
                                                                helperText={communicationAddressErrors?.address_line_1?.message || ""}
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
                                    <SummaryContainer>
                                        <Box>
                                            <Typography variant="body2">Communication Address: {communicationAddress.address}</Typography>
                                            <Typography variant="body2">Pincode: {communicationAddress.pincode}</Typography>
                                        </Box>
                                    </SummaryContainer>
                                )
                            )}
                        </StepContainer>

                        {/* Step 2: Personal Details */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(3)}>
                                <StepNumber>3</StepNumber>
                                <StepTitle>Vehicle Details</StepTitle>
                                {activeStep !== 3 && activeStep > 3 && <EditButton onClick={() => handleEditStep(2)}>EDIT</EditButton>}
                            </StepHeader>

                            {activeStep === 3 ? (
                                <StepContent>
                                    {/* <StyledFormGroup>
                                        <FormLabel>GENDER</FormLabel>
                                        <RadioGroup
                                            row
                                            name="gender"
                                            value={personalDetails.gender}
                                            onChange={(e) => handlePersonalDetailsChange('gender', e.target.value)}
                                            sx={{ gap: '2rem' }}
                                        >
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        </RadioGroup>
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>MARRIED</FormLabel>
                                        <RadioGroup
                                            row
                                            name="married"
                                            value={personalDetails.married}
                                            onChange={(e) => handlePersonalDetailsChange('married', e.target.value)}
                                            sx={{ gap: '2rem' }}
                                        >
                                            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio />} label="No" />
                                        </RadioGroup>
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>DATE OF BIRTH</FormLabel>
                                        <Box sx={{ display: 'flex', gap: 2 }}>
                                            <TextField
                                                value={personalDetails.dateOfBirth.day}
                                                onChange={(e) => handleDateChange('day', e.target.value)}
                                                placeholder="DD"
                                                variant="outlined"
                                                sx={{ width: '80px' }}
                                            />
                                            <FormControl sx={{ minWidth: 120 }}>
                                                <Select
                                                    value={personalDetails.dateOfBirth.month}
                                                    onChange={(e) => handleDateChange('month', e.target.value)}
                                                >
                                                    <MenuItem value="January">January</MenuItem>
                                                    <MenuItem value="February">February</MenuItem>
                                                    <MenuItem value="March">March</MenuItem>
                                                    <MenuItem value="April">April</MenuItem>
                                                    <MenuItem value="May">May</MenuItem>
                                                    <MenuItem value="June">June</MenuItem>
                                                    <MenuItem value="July">July</MenuItem>
                                                    <MenuItem value="August">August</MenuItem>
                                                    <MenuItem value="September">September</MenuItem>
                                                    <MenuItem value="October">October</MenuItem>
                                                    <MenuItem value="November">November</MenuItem>
                                                    <MenuItem value="December">December</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <TextField
                                                value={personalDetails.dateOfBirth.year}
                                                onChange={(e) => handleDateChange('year', e.target.value)}
                                                placeholder="YYYY"
                                                variant="outlined"
                                                sx={{ width: '100px' }}
                                            />
                                            <ValidationIcon />
                                        </Box>
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>PAN DETAILS</FormLabel>
                                        <Typography variant="caption" sx={{ color: '#666', mb: 1 }}>
                                            KYC is mandatory as per recent IRDAI guidelines
                                        </Typography>
                                        <InputContainer>
                                            <TextField
                                                fullWidth
                                                value={personalDetails.panNumber}
                                                onChange={(e) => handlePersonalDetailsChange('panNumber', e.target.value)}
                                                placeholder="PAN number"
                                                variant="outlined"
                                                sx={{ '& .MuiOutlinedInput-root': { paddingRight: '2.5rem' } }}
                                            />
                                            {personalDetails.panNumber && <ValidationIcon />}
                                        </InputContainer>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={personalDetails.noPan}
                                                    onChange={(e) => handlePersonalDetailsChange('noPan', e.target.checked)}
                                                />
                                            }
                                            label="I don't have my PAN details"
                                        />
                                    </StyledFormGroup>

                                    <StyledFormGroup>
                                        <FormLabel>NOMINEE DETAILS</FormLabel>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <InputContainer>
                                                    <TextField
                                                        fullWidth
                                                        value={personalDetails.nominee.name}
                                                        onChange={(e) => handleNomineeChange('name', e.target.value)}
                                                        placeholder="Nominee Name"
                                                        variant="outlined"
                                                        sx={{ '& .MuiOutlinedInput-root': { paddingRight: '2.5rem' } }}
                                                    />
                                                    {personalDetails.nominee.name && <ValidationIcon />}
                                                </InputContainer>
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    fullWidth
                                                    value={personalDetails.nominee.age}
                                                    onChange={(e) => handleNomineeChange('age', e.target.value)}
                                                    placeholder="Age"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        value={personalDetails.nominee.relation}
                                                        onChange={(e) => handleNomineeChange('relation', e.target.value)}
                                                    >
                                                        <MenuItem value="Daughter">Daughter</MenuItem>
                                                        <MenuItem value="Son">Son</MenuItem>
                                                        <MenuItem value="Spouse">Spouse</MenuItem>
                                                        <MenuItem value="Father">Father</MenuItem>
                                                        <MenuItem value="Mother">Mother</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <Typography variant="caption" sx={{ color: 'error.main', mt: 1 }}>
                                            Your daughter should be at least 18 years younger to you.
                                        </Typography>
                                    </StyledFormGroup>

                                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                                        <ContinueButton onClick={() => handleGoToStep(3)}>
                                            Continue to Address Details
                                        </ContinueButton>
                                    </Box> */}

                                    <form onSubmit={vehicleDetailsHandleSubmit(submitVehicleDetails)}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="vehicle_registration_no"
                                                    control={vehicleDetailsControl}
                                                    rules={{
                                                        required: "Registration number is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9]{5,15}$/, // Only uppercase letters and numbers, 5-15 characters
                                                            message: "Registration number must be 5–15 uppercase letters and numbers (no spaces or special characters)"
                                                        }
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Registration Number" required />}
                                                            inputProps={{
                                                                maxLength: 15,
                                                                style: { textTransform: 'uppercase' } // Visual capitalization
                                                            }}
                                                            onChange={(e) => {
                                                                const cleaned = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); // Clean + uppercase
                                                                onChange(cleaned);
                                                            }}
                                                            placeholder="Enter car registration number"
                                                            aria-describedby="validation-vehicle-registration"
                                                            error={Boolean(vehicleDetailsErrors?.vehicle_registration_no)}
                                                            helperText={vehicleDetailsErrors?.vehicle_registration_no?.message || ""}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="engine_no"
                                                    control={vehicleDetailsControl}
                                                    rules={{
                                                        required: "Engine number is required",
                                                        pattern: {
                                                            value: /^[0-9]{5,25}$/, // Only digits, 5–25 characters
                                                            message: "Engine number must be 5–25 digits"
                                                        }
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Engine Number" required />}
                                                            inputProps={{
                                                                maxLength: 25,
                                                                inputMode: 'numeric',
                                                            }}
                                                            onChange={(e) => {
                                                                const cleaned = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
                                                                onChange(cleaned);
                                                            }}
                                                            placeholder="Enter engine number"
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
                                                        pattern: {
                                                            value: /^[0-9]{5,25}$/, // Only digits, 5–25 characters
                                                            message: "Chassis number must be 5–25 digits"
                                                        }
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Chassis Number" required />}
                                                            inputProps={{
                                                                maxLength: 25,
                                                                inputMode: 'numeric',
                                                            }}
                                                            onChange={(e) => {
                                                                const cleaned = e.target.value.replace(/[^0-9]/g, ''); // Allow only digits
                                                                onChange(cleaned);
                                                            }}
                                                            placeholder="Enter chassis number"
                                                            aria-describedby="validation-chassis-no"
                                                            error={Boolean(vehicleDetailsErrors?.chassis_no)}
                                                            helperText={vehicleDetailsErrors?.chassis_no?.message || ""}
                                                        />
                                                    )}
                                                />
                                            </Grid>

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

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name='financed_company'
                                                    control={vehicleDetailsControl}
                                                    rules={{
                                                        required: "Financing Company Name is required", // Required validation
                                                        pattern: {
                                                            value: /^[A-Za-z]{1,25}$/, // Only alphabets, minimum 2, maximum 25 characters, no spaces
                                                            message: "Company Name must be 1-25 alphabets with no spaces"
                                                        }
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Financing Company" required />}
                                                            inputProps={{
                                                                maxLength: 25,
                                                            }}
                                                            onChange={onChange}
                                                            onInput={(e) => {
                                                                e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                                                            }}
                                                            placeholder='Enter financing company name'
                                                            aria-describedby='validation-financing-company-name'
                                                            error={Boolean(vehicleDetailsErrors?.financed_company)} // Pass boolean value for error
                                                            helperText={vehicleDetailsErrors?.financed_company ? vehicleDetailsErrors.financed_company.message : ""}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
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
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
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
                                            </Grid>


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
                                    <SummaryContainer>
                                        <SummarySection>
                                            <Typography variant="body2">Registration Number: {vehicleDetails.registrationNumber}</Typography>
                                            <Typography variant="body2">Engine Number: {vehicleDetails.engineNumber}</Typography>
                                            <Typography variant="body2">Manufactured Month: {vehicleDetails.manufacturedMonth}</Typography>
                                            <Typography variant="body2">Manufactured Year: {vehicleDetails.manufacturedYear}</Typography>
                                        </SummarySection>
                                        <SummarySection>
                                            <Typography variant="body2">Chassis Number: {vehicleDetails.chassisNumber}</Typography>
                                            <Typography variant="body2">Car Financed: {vehicleDetails.isCarFinanced ? "Yes" : "No"}</Typography>
                                            <Typography variant="body2">Financing Company: {vehicleDetails.financedCompany ? "Yes" : "No"}</Typography>
                                        </SummarySection>
                                    </SummaryContainer>
                                )
                            )}
                        </StepContainer>

                        {/* Step 4: Nominee Details */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(4)}>
                                <StepNumber>4</StepNumber>
                                <StepTitle>Nominee Details</StepTitle>
                                {activeStep !== 4 && activeStep > 4 && <EditButton onClick={() => handleEditStep(4)}>EDIT</EditButton>}
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
                                                            required: "Nominee name is required",
                                                            pattern: {
                                                                value: /^[A-Za-z\s]{2,50}$/, // Allows letters and spaces, 2 to 50 characters
                                                                message: "Nominee name must contain only letters and spaces (2–50 characters)"
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
                                                                placeholder="Enter nominee name"
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
                                                        rules={{ required: 'Nominee Date of Birth is required' }}
                                                        render={({ field: { value, onChange } }) => {
                                                            // Convert value to a valid Date object
                                                            const selectedDate = value ? new Date(value) : null;

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
                                                        name="nominee_relationship" // key name
                                                        control={nomineeDetailsControl} // control object from useForm
                                                        rules={{ required: 'Nominee Relation is required' }}
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
                                                                        label={<CustomLabel label="Nominee Relation" required />}
                                                                        variant="outlined"
                                                                        placeholder="Select Nominee Relation"
                                                                        error={Boolean(error)} // Display error if validation fails
                                                                        helperText={nomineeDetailsErrors?.nominee_relationship ? nomineeDetailsErrors.nominee_relationship.message : ""}
                                                                    />
                                                                )}
                                                            />
                                                        )}
                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
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
                                                </Grid>

                                                <Grid item xs={12} sm={6}>
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
                                                </Grid>

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
                                    <SummaryContainer>
                                        <SummarySection>
                                            <Typography variant="body2">Nominee Name: {nomineeDetails.nominee_name}</Typography>
                                            <Typography variant="body2">Nominee Date of Birth: {nomineeDetails.nominee_dob}</Typography>
                                        </SummarySection>

                                        <SummarySection>
                                            <Typography variant="body2">Nominee Relation: {nomineeDetails.nominee_relationship}</Typography>
                                            <Typography variant="body2">Apointee Name: {nomineeDetails.appointee_name}</Typography>
                                            <Typography variant="body2">Apointee Relation: {nomineeDetails.appointee_relationship}</Typography>
                                        </SummarySection>
                                    </SummaryContainer>
                                )
                            )}
                        </StepContainer>

                        {/* Step 5: KYC Details */}
                        <StepContainer>
                            <StepHeader onClick={() => handleToggleStep(5)}>
                                <StepNumber>5</StepNumber>
                                <StepTitle>KYC Details</StepTitle>
                                {activeStep !== 5 && activeStep > 5 && <EditButton onClick={() => handleEditStep(4)}>EDIT</EditButton>}
                            </StepHeader>

                            {activeStep === 5 ? (
                                <StepContent>
                                    <form onSubmit={kycDetailsHandleSubmit(submitKYCDetails)}>
                                        <Grid container spacing={5}>
                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="ckycReferenceNumber"
                                                    control={kycDetailsControl}
                                                    rules={{
                                                        required: "Reference number is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9]{5,15}$/, // Only uppercase letters and numbers, 5-15 characters
                                                            message: "Reference number must be 5–15 uppercase letters and numbers (no spaces or special characters)"
                                                        }
                                                    }}
                                                    render={({ field: { value, onChange } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            value={value}
                                                            label={<CustomLabel label="Reference Number" required />}
                                                            inputProps={{
                                                                maxLength: 15,
                                                                style: { textTransform: 'uppercase' } // Visual capitalization
                                                            }}
                                                            onChange={(e) => {
                                                                const cleaned = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase(); // Clean + uppercase
                                                                onChange(cleaned);
                                                            }}
                                                            placeholder="Enter reference number"
                                                            aria-describedby="validation-reference-number"
                                                            error={Boolean(kycDetailsErrors?.ckycReferenceNumber)}
                                                            helperText={kycDetailsErrors?.ckycReferenceNumber?.message || ""}
                                                        />
                                                    )}
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <Controller
                                                    name="ckycReferenceDocId" // key name
                                                    control={kycDetailsControl} // control object from useForm
                                                    rules={{ required: 'Document Type is required' }}
                                                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                                                        <Autocomplete
                                                            options={dropdownDocuments} // Options for dropdown
                                                            value={value || null} // Bind value for single selection
                                                            onChange={(event, newValue) => onChange(newValue)} // Handle change
                                                            isOptionEqualToValue={(option, value) => option.label === value?.label} // Match based on label
                                                            filterOptions={(dropdownDocuments, { inputValue }) =>
                                                                dropdownDocuments.filter(option =>
                                                                    option.label.toLowerCase().includes(inputValue.toLowerCase()) // Filter options by search input
                                                                )
                                                            }
                                                            renderInput={(params) => (
                                                                <CustomTextField
                                                                    {...params}
                                                                    label={<CustomLabel label="Document Type" required />}
                                                                    variant="outlined"
                                                                    placeholder="Select Document Type"
                                                                    error={Boolean(error)} // Display error if validation fails
                                                                    helperText={kycDetailsErrors?.ckycReferenceDocId ? kycDetailsErrors.ckycReferenceDocId.message : ""}
                                                                />
                                                            )}
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
                                    <SummaryContainer>
                                        <SummarySection>
                                            <Typography variant="body2">Document: {kycDetails.document_type}</Typography>
                                            <Typography variant="body2">File: {kycDetails.document_file}</Typography>
                                        </SummarySection>

                                        <SummarySection>
                                            <Typography variant="body2">Reference Number: {kycDetails.reference_number}</Typography>
                                        </SummarySection>
                                    </SummaryContainer>
                                )
                            )}
                        </StepContainer>

                    </StyledPaper>
                </Box>
            </Grid>
        </Grid>
    );
}
