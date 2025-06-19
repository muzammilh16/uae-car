import styled from "@emotion/styled";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BlankLayout from "src/@core/layouts/BlankLayout";
import BasicDetails from "src/pageComponents/basicDetails";
import CarDetails from "src/pageComponents/carDetails";
import PolicyDetails from "src/pageComponents/poilicyDetails";
import { actionGetInsurerMaster, actionGetMakeModels, actionGetRTOs } from "src/store/formFieldOptions";
import { resetAll } from "src/store/tempFormData";
import Navbar from "src/views/components/navbar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// Styled background wrapper
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

// Centered content container
const ContentWrapper = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: 'start',
  padding: theme.spacing(4),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(10),
  },
}));

const CarInsurancePage = () => {
  const router = useRouter();
  const { token } = router.query;

  const dispatch = useDispatch();

  const { ft } = router.query;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (token) {
      console.log('Received token:', token);
      // Optionally store token in localStorage or context
      localStorage.setItem('accessToken', token);
    }
  }, [token]);


  useEffect(() => {
    // dispatch(actionGetRTOs());
    // dispatch(actionGetMakeModels());
    // dispatch(actionGetInsurerMaster());
  }, []);


  return (
    <>
      <Navbar />
      <BackgroundWrapper />
      <ContentWrapper>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Box
              sx={{
                borderLeft: `4px solid ${theme.palette.primary.main}`,
                pl: 2,
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                Compare and Buy the Best Plan for Your Car
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Card
              sx={{
                borderRadius: 4,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 4, md: 6 },
                  pt: { md: 4 },
                }}
              >
                {
                  ft && <Button variant="text" color="primary" sx={{ mb: 1 }} onClick={() => router.back()} startIcon={<ArrowBackIcon />}>
                    Back
                  </Button>
                }
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    {!ft ? <BasicDetails /> : <CarDetails />}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ContentWrapper>
    </>
  );
};

CarInsurancePage.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default CarInsurancePage;


