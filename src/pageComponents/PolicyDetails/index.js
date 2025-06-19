import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { formatRuppee } from 'src/utility';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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

const PolicyAndCarDetails = ({ proposalObjectDetails, masterDetails, quoteId }) => {
    const router = useRouter();

    function getTitleById(data, id) {
        // const coverageOptions = masterDetails?.response?.addons || [];
        const item = data?.find(option => option.id === id);
        return item ? item?.title : null;
    }

    return (
        <Box>
            <Button
                variant="contained"
                sx={{ mb: 4, fontWeight: 500 }}
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                    // router.back();
                    if (quoteId) {
                        console.log("replaced")
                        router.replace({
                            pathname: "/car-insurance-list",
                            query: { quoteId: quoteId },
                        });
                    } else {
                        console.log("backed");
                        router.back();
                    }
                }}
            >
                Change Insurer
            </Button>

            <Typography variant="h5" fontWeight="bold" mb={0.5}>
                {proposalObjectDetails?.pjCarEnquiryDetails?.pjMasterCarVehicleDetails?.make_name}{" "}
                {proposalObjectDetails?.pjCarEnquiryDetails?.pjMasterCarVehicleDetails?.model_name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" mb={3}>
                {proposalObjectDetails?.pjCarEnquiryDetails?.pjMasterCarVehicleDetails?.fuel}{" "}
                {proposalObjectDetails?.pjCarEnquiryDetails?.pjMasterCarVehicleDetails?.variant_name}
            </Typography>

            <Card variant="outlined" sx={{ mb: 3, boxShadow: 2 }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Image style={{ objectFit: 'contain' }} src={proposalObjectDetails?.insurer_detail?.logo_url} alt="IC Company" width={100} height={40} />
                    </Box>

                    <Typography variant="h6" color="text.secondary">
                        Premium
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color="primary" my={1}>
                        {formatRuppee(proposalObjectDetails?.total_premium) || "-"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        (Price inclusive of GST)
                    </Typography>

                    <Box mt={2}>

                        {
                            proposalObjectDetails?.addon_covers &&
                            Object.entries(proposalObjectDetails?.addon_covers)
                                .filter(([key, value]) => value === true)  // Filter out only true values
                                .map(([key, value]) => {
                                    return (
                                        // <Typography key={key} variant="body2" color="text.primary">
                                        //     {displayText}
                                        // </Typography>
                                        <Typography variant="body2" color="text.primary">
                                            {"✓ "}{getTitleById(masterDetails?.addons, key)}
                                        </Typography>
                                    );
                                })
                        }

                        {proposalObjectDetails?.is_pa_opted == 1 &&
                            <Typography variant="body2" color="text.primary">{"✓ "}{"Personal Accident Cover"}</Typography>
                        }
                        {proposalObjectDetails?.is_driver_cover_opted == 1 &&
                            <Typography variant="body2" color="text.primary">{"✓ "}{"Driver Cover"}</Typography>
                        }
                        {proposalObjectDetails?.passenger_cover_value > 0 &&
                            <Typography variant="body2" color="text.primary">{"✓ "}{"Passenger Cover"}</Typography>
                        }
                    </Box>
                </CardContent>
            </Card>

            <Typography variant="body2" color="text.secondary" mb={3}>
                Policy not applicable for commercial cars
            </Typography>

            <Box>
                <InfoRow label="Coverage Type" value={proposalObjectDetails?.policy_type} />
                <InfoRow label="IDV" value={formatRuppee(proposalObjectDetails?.idv) || "-"} />
                <InfoRow label="Manufacturing Date"
                    value={proposalObjectDetails?.pjCarQuotationDetails?.manufacture_date
                        ? dayjs(proposalObjectDetails.pjCarQuotationDetails.manufacture_date).format('DD-MM-YYYY')
                        : '-'}
                />
                <InfoRow label="New Policy Start Date"
                    value={proposalObjectDetails?.policy_start_date
                        ? dayjs(proposalObjectDetails.pjCarQuotationDetails.policy_start_date).format('DD-MM-YYYY')
                        : '-'}
                />
                {/* <InfoRow label="Policy Tenure" value="3 years" /> */}
                {/* <InfoRow label="New Policy Start Date" value="29-04-2025" /> */}
            </Box>
        </Box>
    )
}

export default PolicyAndCarDetails
