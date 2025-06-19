import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import authConfig from 'src/configs/auth'
import { AuthContext } from 'src/context/AuthContext';
import { actionFGPaymentStatusUpdate } from 'src/store/future_generali_proposal';

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

const PaymentStatus = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const { setUser, setLoading } = useContext(AuthContext);


    const { reference_id,
        proposal_id,
        transction_id,
        WS_P_ID,
        TID,
        PGID,
        Premium,
        Response, } = router.query;

    useEffect(() => {
        if (reference_id && proposal_id && transction_id && WS_P_ID && TID && PGID && Premium && Response) {
            const data = {
                "reference_id": reference_id,
                "proposal_id": proposal_id,
                "transaction_id": transction_id,
                "fg_transaction_id": TID,
                "fg_pg_transaction_id": PGID,
                "fg_ws_p_id": WS_P_ID,
                "premium": Premium,
                "payment_status": Response


            };
            console.log('API call for payment update:', data);
            dispatch(actionFGPaymentStatusUpdate(data));
        }

    }, [reference_id, proposal_id, transction_id, WS_P_ID, TID, PGID, Premium, Response])


    return (
        <>
            <BackgroundWrapper />
            <Box sx={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', minHeight: '100vh', py: 10 }}>
                <Container maxWidth="md">

                    {/* Success Card */}
                    <Paper elevation={3} sx={{ mt: 2, py: 8, px: 4, textAlign: 'center' }}>
                        {Response == 'Success' ?
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
                            </Typography> :
                            Response == "Failed" ?
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
                                    OOPS!
                                </Typography>
                        }

                        <Grid container justifyContent="center" sx={{ px: 12 }}>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img
                                        src={Response == 'Success' ? "/images/payment-success.jpg" : "/images/payment-failure.jpg"}
                                        alt="KYC Illustration"
                                        style={{ width: '100%', maxWidth: 220 }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8}>

                                {Response == 'Success' ?
                                    <>
                                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'green', mb: 4 }}>
                                            Payment Successful!
                                        </Typography>
                                        <Typography variant="body1" sx={{ mt: 1 }}>
                                            Your Payment has been successfully Completed.
                                        </Typography>
                                    </> :
                                    Response == 'Failed' ?
                                        <>
                                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'red', mb: 4 }}>
                                                Payment Failed!
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                Your Payment could not be Completed.
                                            </Typography>
                                        </> :
                                        <>
                                            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'red', mb: 4 }}>
                                                Some Error Occured!
                                            </Typography>
                                            <Typography variant="body1" sx={{ mt: 1 }}>
                                                Your Payment could not be Completed.
                                            </Typography>
                                        </>
                                }

                                <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary', wordBreak: 'break-word' }}>
                                    Transaction ID: <strong>{transction_id}</strong>
                                </Typography>


                                {Response == 'Success' ?
                                    <Button
                                        type='button'
                                        variant="contained"
                                        sx={{ mt: 8 }}
                                        onClick={() => {
                                            const userData = {
                                                id: 1,
                                                role: 'admin',
                                                fullName: 'SSO User',
                                                username: 'sso_user',
                                                email: 'sso@example.com'
                                            };

                                            setUser(userData);
                                            window.localStorage.setItem('userData', JSON.stringify(userData));
                                            localStorage.removeItem(authConfig.storageTokenKeyName);
                                            localStorage.removeItem('tempFormData');
                                            localStorage.removeItem('QUOTE_ID');
                                            localStorage.removeItem('ADD_ONS');
                                            localStorage.removeItem('ADD_ONS');
                                            localStorage.removeItem('PA_COVER_SELECTED');
                                            localStorage.removeItem('PROPOSAL_ID');
                                            setLoading(false);

                                            router.replace('/carInsurance');
                                        }}

                                    >
                                        Go to Home
                                    </Button> :

                                    <Button
                                        type='button'
                                        variant="contained"
                                        sx={{ mt: 8 }}
                                        onClick={() => {
                                            const userData = {
                                                id: 1,
                                                role: 'admin',
                                                fullName: 'SSO User',
                                                username: 'sso_user',
                                                email: 'sso@example.com'
                                            };

                                            setUser(userData);
                                            window.localStorage.setItem('userData', JSON.stringify(userData));
                                            localStorage.removeItem(authConfig.storageTokenKeyName);
                                            localStorage.removeItem('tempFormData');
                                            localStorage.removeItem('QUOTE_ID');
                                            localStorage.removeItem('ADD_ONS');
                                            localStorage.removeItem('ADD_ONS');
                                            localStorage.removeItem('PA_COVER_SELECTED');
                                            localStorage.removeItem('PROPOSAL_ID');
                                            setLoading(false);

                                            router.replace('/carInsurance');
                                        }}
                                    >
                                        Go to Home
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

PaymentStatus.getLayout = page => <BlankLayout>{page}</BlankLayout>;
PaymentStatus.guestGuard = true;

export default PaymentStatus;
