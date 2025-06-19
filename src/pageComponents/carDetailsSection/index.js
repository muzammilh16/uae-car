import { EditOutlined } from "@mui/icons-material";
import { Divider, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useSelector } from "react-redux";

const CarDetailsSection = ({ carDetails, hideEdit = false, setOpenPolicyExpModel, quotePolicyTypes, quotePreviousPolicyTypes, quoteDetailsObj }) => {
  const router = useRouter();
  const tempFormData = useSelector((state) => state.tempFormDataStore);
  const quoteData = useSelector((state) => state.quoteDetailsStore);
  const fetchedInsurerOptions = useSelector((state) => state.formFieldOptionsStore.INSURER_MASTER_OPTIONS);

  const topSectionGrid = {
    xs: 12,
    md: 3,
    lg: 3,
  };

  const ft = tempFormData?.FORM_TYPE;

  const handleNavigation = () => {
    // if (typeof window != "undefined") {
    // const getData = JSON.parse(window.localStorage.getItem("carEnquiry"));

    // setGlobalState((prev) => ({
    //   ...prev,
    //   key: "carEnquiry",
    //   value: getData,
    // }));
    // router.push("/car-enquiry");
    // router.push({ pathname: "/carInsurance", query: { ft: tempFormData?.FORM_TYPE, fs: "FALLBACK_RTO" } });
    // router.push({ pathname: "/carInsurance", query: { ft: tempFormData?.FORM_TYPE, fs: "FALLBACK_VERIFICATION" } });
    // console.log("ft", ft, quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type);
    router.push({ pathname: "/carInsurance", query: { ft: quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type == 'used' ? "OLD" : "NEW", fs: "FALLBACK_VERIFICATION" } });


    // }
  };
  return (
    <Grid
      item
      xs={12}
      my={6}
      mb={0}
      borderRadius={2}
      borderColor={"#E0E0E0"}
      boxShadow={10}
      sx={{ pt: 2 }}
    >
      <Grid container p={2} spacing={2} position={"relative"}>
        {/* <Grid item xs={12} sm={4} lg={3} p={0} m={0}>
                  
                  <Box display="flex" alignItems="center">
                    <KeyboardBackspaceOutlined sx={{ mr: 1 }} fontSize={"small"}  />
                    <Typography variant="h6" fontSize={12} >
                      Back
                    </Typography>
                  </Box>

                </Grid> */}
        {!hideEdit && (
          <Tooltip title="Edit Enquiry">
            <IconButton
              sx={{ position: "absolute", top: -1, right: 0 }}
              onClick={handleNavigation}
            >
              <EditOutlined fontSize="small" color="primary" />
            </IconButton>
          </Tooltip>
        )}

        {/* {
          quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.vehicle_registration_no &&
          <Grid item xs={12} sm={3} lg={3}>
            <Typography variant="h6" fontSize={12}>
              Vehicle Reg. No.:{" "}
              <span style={{ fontWeight: "bold" }}>
                {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.vehicle_registration_no || "N/A"}
              </span>
            </Typography>
          </Grid>
        } */}

        {/* <Grid item xs={12} sm={3} lg={3}>
          <Typography variant="h6" fontSize={12}>
            RTO Location:{" "}
            <span style={{ fontWeight: "bold" }}>{quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.pjMasterMotorRtoLocations?.code || "N/A"}</span>
          </Typography>
        </Grid> */}

        <Grid item xs={12} sm={3} lg={3}>
          <Typography variant="h6" fontSize={12}>
            Make-Model:{" "}
            <span style={{ fontWeight: "bold" }}>
              {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.pjMasterCarVehicleDetails?.make_name || "N/A"} {"-" + quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.pjMasterCarVehicleDetails?.model_name || "N/A"}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <Typography variant="h6" fontSize={12}>
            Variant:{" "}
            <span style={{ fontWeight: "bold" }}>
              {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.pjMasterCarVehicleDetails?.variant_name || "N/A"}
            </span>
          </Typography>
        </Grid>
        {/* <Grid
                  item
                  xs={topSectionGrid.xs}
                  sm={topSectionGrid.md}
                  lg={topSectionGrid?.lg}
                >
                  <Typography variant="h6" fontSize={12}>
                    Fuel Type:{" "}
                    <span style={{ fontWeight: "bold" }}>
                      {carDetails?.fuelType}
                    </span>
                  </Typography>
                </Grid> */}
        {/* <Grid
                    item
                    xs={topSectionGrid.xs}
                    sm={topSectionGrid.md}
                    lg={topSectionGrid?.lg}
                  >
                    <Typography variant="h6" fontSize={12}>
                      Variant:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {carDetails?.carVariant}
                      </span>
                    </Typography>
                  </Grid> */}
        <Grid
          item
          xs={topSectionGrid.xs}
          sm={topSectionGrid.md}
          lg={topSectionGrid?.lg}
        >
          <Typography variant="h6" fontSize={12}>
            Specification:{" "}
            <span style={{ fontWeight: "bold" }}>GCC Spec</span>
          </Typography>
        </Grid>

        <Grid
          item
          xs={topSectionGrid.xs}
          sm={topSectionGrid.md}
          lg={topSectionGrid?.lg}
        >
          <Typography variant="h6" fontSize={12}>
            Country:{" "}
            <span style={{ fontWeight: "bold" }}>USA</span>
          </Typography>
        </Grid>

        <Grid
          item
          xs={topSectionGrid.xs}
          sm={topSectionGrid.md}
          lg={topSectionGrid?.lg}
        >
          <Typography variant="h6" fontSize={12}>
            City:{" "}
            <span style={{ fontWeight: "bold" }}>Dubai</span>
          </Typography>
        </Grid>

        <Grid
          item
          xs={topSectionGrid.xs}
          sm={topSectionGrid.md}
          lg={topSectionGrid?.lg}
        >
          <Typography variant="h6" fontSize={12}>
            New Car? :{" "}
            <span style={{ fontWeight: "bold" }}>Yes</span>
          </Typography>
        </Grid>

        <Grid
          item
          xs={topSectionGrid.xs}
          sm={topSectionGrid.md}
          lg={topSectionGrid?.lg}
        >
          <Typography variant="h6" fontSize={12}>
            UAE Driving Exp. :{" "}
            <span style={{ fontWeight: "bold" }}>0 - 6 Months</span>
          </Typography>
        </Grid>

        <Grid
          item
          xs={topSectionGrid.xs}
          sm={topSectionGrid.md}
          lg={topSectionGrid?.lg}
        >
          <Typography variant="h6" fontSize={12}>
            International Driving Exp. :{" "}
            <span style={{ fontWeight: "bold" }}>0 - 6 Months</span>
          </Typography>
        </Grid>

        <Divider sx={{ my: 3, width: "100%" }} />

        <Grid container spacing={2} p={2} pt={0} position={"relative"} >
          {!hideEdit && (
            <Tooltip title="Edit Personal Details">
              <IconButton
                sx={{ position: "absolute", top: -5, right: -8 }}
                onClick={() => setOpenPolicyExpModel(true)}
              >
                <EditOutlined fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
          )}

          {/* <Grid
                    item
                    xs={topSectionGrid.xs}
                    sm={topSectionGrid.md}
                    lg={topSectionGrid?.lg}
                  >
                    <Typography variant="h6" fontSize={12}>
                      Vehicle Reg Date:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {carDetails?.carRegistrationYear}
                      </span>
                    </Typography>
                  </Grid> */}
          {/* <Grid
                    item
                    xs={topSectionGrid.xs}
                    sm={topSectionGrid.md}
                    lg={topSectionGrid?.lg}
                  >
                    <Typography variant="h6" fontSize={12}>
                      Previous OD Policy Expiry Date:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {carDetails?.policyExpiryDate}
                      </span>
                    </Typography>
                  </Grid> */}
          {/* <Grid
                    item
                    xs={topSectionGrid.xs}
                    sm={topSectionGrid.md}
                    lg={topSectionGrid?.lg}
                  >
                    <Typography variant="h6" fontSize={12}>
                      Previous TP Policy Expiry Date:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {carDetails?.previousPolicyTPExpiryDate}
                      </span>
                    </Typography>
                  </Grid> */}

          <Grid
            item
            xs={topSectionGrid.xs}
            sm={topSectionGrid.md}
            lg={topSectionGrid?.lg}
          >
            <Typography variant="h6" fontSize={12}>
              Last car Accident:{" "}
              <span style={{ fontWeight: "bold" }}>Never</span>
            </Typography>
          </Grid>

          <Grid
            item
            xs={topSectionGrid.xs}
            sm={topSectionGrid.md}
            lg={topSectionGrid?.lg}
          >
            <Typography variant="h6" fontSize={12}>
              Policy Holder Type:{" "}
              <span style={{ fontWeight: "bold" }}>
                {/* {quoteData?.QUOTES?.response?.policy_type == 'od' ? 'Own Damage' : quoteData?.QUOTES?.response?.policy_type || 'N/A'} */}
                {quoteData?.QUOTES?.response?.proposer_type || "N/A"}
              </span>
            </Typography>
          </Grid>

          {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.insurance_type == "used" &&
            <Grid
              item
              xs={topSectionGrid.xs}
              sm={topSectionGrid.md}
              lg={topSectionGrid?.lg}
            >
              <Typography variant="h6" fontSize={12}>
                Previous Policy Type:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {/* {quoteData?.QUOTES?.response?.policy_type == 'od' ? 'Own Damage' : quoteData?.QUOTES?.response?.policy_type || 'N/A'} */}
                  {/* {quotePolicyTypes?.find((type) => type.value == quoteData?.QUOTES?.response?.policy_type)?.label || "N/A"} */}
                  {/* {quotePolicyTypes?.find((type) => type.value == quoteData?.QUOTES?.response?.previous_policy_type)?.label || "N/A"} */}
                  {quotePreviousPolicyTypes?.find((type) => type.value == quoteData?.QUOTES?.response?.previous_policy_type)?.label || "N/A"}
                </span>
              </Typography>
            </Grid>
          }

          <Grid
            item
            xs={topSectionGrid.xs}
            sm={topSectionGrid.md}
            lg={topSectionGrid?.lg}
          >
            <Typography variant="h6" fontSize={12}>
              Manufacturing Month-Year:{" "}
              <span style={{ fontWeight: "bold" }}>
                {/* {carDetails?.manufacturingMonth || ""}

                {carDetails?.manufacturingYear
                  ? "-" + carDetails?.manufacturingYear
                  : ""} */}
                {/* {quoteData?.QUOTES?.response?.manufacture_date || "N/A"} */}
                {dayjs(quoteData?.QUOTES?.response?.manufacture_date).format("MM-YYYY") || "N/A"}
              </span>
            </Typography>
          </Grid>
          <Grid
            item
            xs={topSectionGrid.xs}
            sm={topSectionGrid.md}
            lg={topSectionGrid?.lg}
          >
            <Typography variant="h6" fontSize={12}>
              Vehicle Reg. Date:{" "}
              <span style={{ fontWeight: "bold" }}>
                {/* {carDetails?.carRegistrationDate
                  ? carDetails?.carRegistrationDate.includes("-")
                    ? dayjs(carDetails?.carRegistrationDate).format(
                      "DD-MM-YYYY"
                    )
                    : carDetails?.carRegistrationDate
                  : carDetails?.carRegistrationYear} */}
                {/* {dayjs(carDetails?.carRegistrationDate).format(
                          "DD-MM-YYYY"
                        )} */}
                {/* {quoteData?.QUOTES?.response?.registration_date || "N/A"} */}
                {dayjs(quoteData?.QUOTES?.response?.registration_date).format("DD-MM-YYYY") || "N/A"}
              </span>
            </Typography>
          </Grid>

          {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.insurance_type == "used" &&
            <Grid
              item
              xs={topSectionGrid.xs}
              sm={topSectionGrid.md}
              lg={topSectionGrid?.lg}
            >
              <Typography variant="h6" fontSize={12}>
                Ownership Transferred: {" "}
                <span style={{ fontWeight: "bold" }}>
                  {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.ownership_transferred == 1 ? "Yes" : "No"}
                </span>
              </Typography>
            </Grid>
          }

          {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.insurance_type == "used" && (quoteData?.QUOTE_MASTER?.response?.is_previous_od_policy_insurer_visible || quoteData?.QUOTE_MASTER?.response?.is_previous_policy_insurer_visible) &&
            <Grid
              item
              xs={topSectionGrid.xs}
              sm={topSectionGrid.md}
              lg={topSectionGrid?.lg}
            >
              <Typography variant="h6" fontSize={12}>
                {quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible ? "Previous OD Insurer: " : "Previous Insurer: "}
                {/* Previous Insurer:{" "} */}
                <span style={{ fontWeight: "bold" }}>
                  {/* {quoteData?.QUOTES?.response?.previous_policy_insurer_id} */}
                  {fetchedInsurerOptions?.response?.find((option) => option.value == quoteData?.QUOTES?.response?.previous_policy_insurer_id)?.label || "N/A"}
                </span>
              </Typography>
            </Grid>
          }

          {
            quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.insurance_type == "used" && (quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible || quoteData?.QUOTE_MASTER?.response?.is_previous_policy_expire_date_visible) &&
            <Grid
              item
              xs={topSectionGrid.xs}
              sm={topSectionGrid.md}
              lg={topSectionGrid?.lg}
            >
              <Typography variant="h6" fontSize={12}>
                {quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible ? "Previous OD Policy Expiry Date:" : "Previous Policy Expiry Date:"}{" "}
                <span style={{ fontWeight: "bold" }}>
                  {dayjs(quoteData?.QUOTES?.response?.previous_policy_expire_date).format("DD-MM-YYYY") || "N/A"}
                </span>
              </Typography>
            </Grid>
          }


          {quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.insurance_type == "used" && quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_insurer_visible &&
            <Grid
              item
              xs={topSectionGrid.xs}
              sm={topSectionGrid.md}
              lg={topSectionGrid?.lg}
            >
              <Typography variant="h6" fontSize={12}>
                Previous TP Insurer:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {/* {quoteData?.QUOTES?.response?.previous_policy_insurer_id} */}
                  {fetchedInsurerOptions?.response?.find((option) => option.value == quoteData?.QUOTES?.response?.previous_tp_policy_insurer_id)?.label || "N/A"}
                </span>
              </Typography>
            </Grid>
          }

          {
            quoteData?.QUOTES?.response?.pjCarEnquiryDetails?.insurance_type == "used" && quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_expire_date_visible &&
            <Grid
              item
              xs={topSectionGrid.xs}
              sm={topSectionGrid.md}
              lg={topSectionGrid?.lg}
            >
              <Typography variant="h6" fontSize={12}>
                Previous TP Policy Expiry Date:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {dayjs(quoteData?.QUOTES?.response?.previous_tp_policy_expire_date).format("DD-MM-YYYY") || "N/A"}
                </span>
              </Typography>
            </Grid>
          }

          {/* <Grid
                    item
                    xs={topSectionGrid.xs}
                    sm={topSectionGrid.md}
                    lg={topSectionGrid?.lg}
                  >
                    <Typography variant="h6" fontSize={12}>
                      Last Year Claim?:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {carDetails?.isClaimMade ? "Yes" : "No"}
                      </span>
                    </Typography>
                  </Grid> */}
          {/* <Grid
                    item
                    xs={topSectionGrid.xs}
                    sm={topSectionGrid.md}
                    lg={topSectionGrid?.lg}
                  >
                    <Typography variant="h6" fontSize={12}>
                      Previous NCB:{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {carDetails?.ncbPercentage}
                      </span>
                    </Typography>
                  </Grid> */}




        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarDetailsSection;
