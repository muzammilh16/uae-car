import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { AuthContext } from 'src/context/AuthContext';
import { actionKYCStatus, actionKYCUpdate } from 'src/store/hdfc_proposal';
import { setProposalId, setQuoteId } from 'src/store/urlReference';

const BackgroundWrapper = styled(Box)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundImage: "url('/images/banner1.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
}));

const isInvalidParam = param => !param || param === 'null' || param === 'undefined';


const HDFCPaymentStatus = () => {
    const router = useRouter();
    const { isReady, query } = router;

    const dispatch = useDispatch();
    const { kycStatusDetails } = useSelector(state => state.hdfcProposalStore);
    const { setUser, setLoading } = useContext(AuthContext);

    const {
        txnId,
        status,
        kyc_id,
        quote_id,
        proposal_id
    } = query;

    const quoteId = quote_id; // mapping snake_case to camelCase
    const proposalId = proposal_id; // mapping snake_case to camelCase

    const isParamValid = (
        // !isInvalidParam(txnId) &&
        !isInvalidParam(status) &&
        !isInvalidParam(kyc_id) &&
        !isInvalidParam(quoteId) &&
        !isInvalidParam(proposalId)
    );

    // ✅ All hooks above this line
    useEffect(() => {
        if (!isReady || !isParamValid) return;

        localStorage.setItem('PROPOSAL_ID', proposalId);
        localStorage.setItem('QUOTE_ID', quoteId);
        dispatch(setProposalId(proposalId));
        dispatch(setQuoteId(quoteId));

        const data = {
            reference_id: quoteId,
            proposal_id: proposalId,
            kyc_id: kyc_id
        };

        console.log('Calling KYC update:', data);
        dispatch(actionKYCUpdate(data));
    }, [isReady, isParamValid]);

    useEffect(() => {
        if (!isReady || !isParamValid) return;

        if (kycStatusDetails !== null) {
            console.log('KYC STATUS UPDATE RESP:', kycStatusDetails);

            const route = kycStatusDetails.status === 200
                ? '/fourwheeler/hdfc/proposal_checkout'
                : '/fourwheeler/hdfc/checkout';

            router.replace({
                pathname: route,
                query: {
                    quoteId: quoteId,
                    proposalId: proposalId
                }
            });
        }
    }, [isReady, isParamValid, kycStatusDetails]);

    const handleCheckKycStatus = () => {
        const data = {
            reference_id: quoteId,
            proposal_id: proposalId
        };
        dispatch(actionKYCStatus(data));
    };


    useEffect(() => {
        if (kycStatusDetails !== null) {
            console.log("KYC STATUS UPDATE RESP:", kycStatusDetails);
            //! need to check for status code and then redirect user accordingly to proposal or kyc page
            if (kycStatusDetails.status === 200) {
                router.replace({
                    pathname: "/fourwheeler/hdfc/proposal_checkout",
                    query: {
                        quoteId: quoteId,
                        proposalId: proposalId,
                    }
                })
            }
            else {
                router.replace({
                    pathname: "/fourwheeler/hdfc/checkout",
                    query: {
                        quoteId: quoteId,
                        proposalId: proposalId,
                    }
                })
            }
        }
    }, [kycStatusDetails])



    return (
        <>
            <BackgroundWrapper />
            <Box sx={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', minHeight: '100vh', py: 10 }}>
                <Container maxWidth="md">

                    {/* Success Card */}
                    <Paper elevation={3} sx={{ mt: 2, py: 8, px: 4, textAlign: 'center' }}>
                        {status == 'approved' ?
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#f0f0f0',
                                    mb: 4,
                                    fontSize: { xs: '2.5rem', sm: '5rem', md: '7rem' },
                                }}
                            >
                                SUCCESS!
                            </Typography> : status == 'pending' ?
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#f0f0f0',
                                        mb: 4,
                                        fontSize: { xs: '2.5rem', sm: '5rem', md: '7rem' },
                                    }}
                                >
                                    PENDING!
                                </Typography> :
                                <Typography
                                    variant="h1"
                                    sx={{
                                        fontWeight: 'bold',
                                        color: '#f0f0f0',
                                        mb: 4,
                                        fontSize: { xs: '2.5rem', sm: '5rem', md: '7rem' },
                                    }}
                                >
                                    SORRY!
                                </Typography>
                        }

                        <Grid container justifyContent="center" sx={{ px: 12 }}>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img
                                        src={status == 'approved' ? "/images/payment-success.jpg" : "/images/payment-failure.jpg"}
                                        alt="KYC Illustration"
                                        style={{ width: '100%', maxWidth: 220 }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8}>

                                {status == 'approved' ?
                                    <>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'green', mb: 4 }}>
                                            KYC Successful!
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            Your KYC has been successfully Completed.
                                        </Typography>
                                    </> :
                                    status == 'pending' ?
                                        <>
                                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'orange', mb: 4 }}>
                                                KYC Verification Pending!
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                Your KYC is not verified. Please check your details and try again.
                                            </Typography>
                                        </> :
                                        <>
                                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'red', mb: 4 }}>
                                                KYC Failed!
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                Your KYC could not be Completed.
                                            </Typography>
                                        </>
                                }

                                <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
                                    KYC ID: <strong>{kyc_id}</strong>
                                </Typography>
                                {(status == 'approved') ?
                                    <Button
                                        type='button'
                                        variant="contained"
                                        sx={{ mt: 8 }}
                                        onClick={() => {
                                            handleCheckKycStatus();
                                        }}
                                    >
                                        Proceed To Proposal Details
                                    </Button>
                                    :
                                    <Button
                                        type='button'
                                        variant="contained"
                                        sx={{ mt: 8 }}
                                        onClick={() => {
                                            router.replace({
                                                pathname: "/fourwheeler/hdfc/checkout",
                                                query: {
                                                    quoteId: quoteId,
                                                    proposalId: proposalId,
                                                }
                                            })
                                        }}
                                    >
                                        Back To KYC Page
                                    </Button>
                                }
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </>
    )
}


export default HDFCPaymentStatus;
