import styled from '@emotion/styled';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const BackgroundWrapper = styled(Box)(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: "url('/images/banner1.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -1
}));

const HDFCPaymentSuccess = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { reference_id, proposal_id, transaction_id } = router.query;

    useEffect(() => {
        if (reference_id && proposal_id && transaction_id) {
            const data = {
                proposal_id,
                reference_id,
                transaction_id: transaction_id,
                status: 'success'
            };
            console.log('API call for payment update:', data);
            // dispatch(actionGodigitPaymentUpdate(data));
        }
    }, [reference_id, proposal_id, transaction_id, dispatch]);

    if (!reference_id || !proposal_id || !transaction_id) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <BackgroundWrapper />
            <Box sx={{ position: 'relative', zIndex: 1, backgroundColor: 'transparent', minHeight: '100vh', py: 10 }}>
                <Container maxWidth="md">
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
                            THANK YOU!
                        </Typography>

                        <Grid container justifyContent="center" spacing={4}>
                            <Grid item xs={12} sm={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img
                                        src="/images/payment-success.jpg"
                                        alt="Payment Illustration"
                                        style={{ width: '100%', maxWidth: 220 }}
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={8}>
                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'green', mb: 4, fontSize: { xs: '1.5rem', sm: '2rem', md: '2rem' } }}>
                                    Payment Successful!
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    The payment has been successfully processed.
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
                                    Transaction Number: <strong>{transaction_id}</strong>
                                </Typography>
                                <Button
                                    type="button"
                                    variant="contained"
                                    sx={{ mt: 8 }}
                                    onClick={() => {
                                        localStorage.removeItem('tempFormData');
                                        localStorage.removeItem('QUOTE_ID');
                                        localStorage.removeItem('ADD_ONS');
                                        localStorage.removeItem('ADD_ONS');
                                        localStorage.removeItem('PA_COVER_SELECTED');
                                        localStorage.removeItem('PROPOSAL_ID');
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
    )
}

export default HDFCPaymentSuccess;