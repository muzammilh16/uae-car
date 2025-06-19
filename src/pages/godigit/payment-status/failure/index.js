// pages/godigit/payment-status/success.js
import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { actionGodigitPaymentUpdate } from 'src/store/godigit_proposal';
import authConfig from 'src/configs/auth'
import { AuthContext } from 'src/context/AuthContext';
import BlankLayout from 'src/@core/layouts/BlankLayout';

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

const PaymentFailure = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { setUser, setLoading } = useContext(AuthContext);


    const { reference_id, proposal_id, errorMsg } = router.query;

    // const [params, setParams] = useState({
    //     reference_id: '',
    //     proposal_id: '',
    //     // transactionNumber: '',
    //     errorMsg: ''
    // });

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const storedData = localStorage.getItem('paymentData');
    //         if (storedData) {
    //             try {
    //                 const parsed = JSON.parse(storedData);
    //                 setParams({
    //                     reference_id: parsed.reference_id || '',
    //                     proposal_id: parsed.proposal_id || '',
    //                     // transactionNumber: parsed.transactionNumber || '',
    //                     errorMsg: parsed.errorMsg || '',
    //                 });
    //             } catch (err) {
    //                 console.error('Invalid JSON in localStorage');
    //             }
    //         }
    //     }
    // }, []);

    useEffect(() => {
        if (reference_id !== '' && proposal_id !== '' && errorMsg !== '') {
            let data = {
                "proposal_id": proposal_id,
                "reference_id": reference_id,
                "error_msg": errorMsg,
                "status": "failure"
            }
            console.log("API call for payment update", data);
            dispatch(actionGodigitPaymentUpdate(data))
        }
    }, [reference_id, proposal_id, errorMsg, dispatch])


    if (!reference_id && !proposal_id && !errorMsg) {
        return <p>Loading...</p>;
    }

    return (
        // <div>
        //     <h1>Payment Successful!</h1>
        //     <p>Reference ID: {params.reference_id}</p>
        //     <p>Proposal ID: {params.proposal_id}</p>
        //     <p>Transaction Number: {params.transactionNumber}</p>
        // </div>
        <>
            <BackgroundWrapper />
            <Box sx={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', minHeight: '100vh', py: 10 }}>
                <Container maxWidth="md">

                    {/* Failure Card */}
                    <Paper elevation={3} sx={{ mt: 2, py: 8, px: 4, textAlign: 'center' }}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontWeight: 'bold',
                                color: '#f0f0f0',
                                mb: 4,
                                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' }
                            }}
                        >
                            SORRY!
                        </Typography>

                        <Grid container justifyContent="center" sx={{ px: 12 }}>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img
                                        src="/images/payment-failure.jpg"
                                        alt="Payment Illustration"
                                        style={{ width: '100%', maxWidth: 220 }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'red', mb: 4, fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' } }}>
                                    Payment Failed!
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    We are unable to process your payment. Please try again later
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
                                    Error Message: <strong>{errorMsg}</strong>
                                </Typography>
                                <Button
                                    type='button'
                                    variant="contained"
                                    sx={{ mt: 8 }}
                                    onClick={() => {
                                        // const userData = {
                                        //     id: 1,
                                        //     role: 'admin',
                                        //     fullName: 'SSO User',
                                        //     username: 'sso_user',
                                        //     email: 'sso@example.com'
                                        // };

                                        // setUser(userData);
                                        // window.localStorage.setItem('userData', JSON.stringify(userData));
                                        // localStorage.removeItem(authConfig.storageTokenKeyName);
                                        localStorage.removeItem('tempFormData');
                                        localStorage.removeItem('QUOTE_ID');
                                        localStorage.removeItem('ADD_ONS');
                                        localStorage.removeItem('ADD_ONS');
                                        localStorage.removeItem('PA_COVER_SELECTED');
                                        localStorage.removeItem('PROPOSAL_ID');
                                        // setLoading(false);

                                        router.replace('/carInsurance');
                                    }}
                                >
                                    Go to Home
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </>

    );
};


export default PaymentFailure;

