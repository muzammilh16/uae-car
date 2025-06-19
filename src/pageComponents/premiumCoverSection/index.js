import {
  ArrowDownward,
  ArrowForward,
  CalculateOutlined,
  GarageOutlined,
  PictureAsPdfOutlined,
  Share,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  Grid,
  Link,
  List,
  ListItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { formatAED, formatRuppee } from "src/utility";
import CommonDrawer from "../CommonDrawer";
import Image from "next/image";
import { formatKeyName } from "src/common/constants";
import CheckIcon from '@mui/icons-material/Check';

const PremiumCoverSection = ({
  quoteData,
  CarPoliciesData,
  addOnsSelected,
  selectedPremiumBreakup,
  setSelectedPremiumBreakup,
  filtersData,
  quoteDetailsObj,
  handleBuyInsurance,
  getTitleById,
  quoteMaster
}) => {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const [displayData, setDisplayData] = useState({
    "Base cover": [
      {
        title: "Basic Own Damage Premium",
        price: quoteData?.basic_od_premium,
      },
      {
        title: "Third Party Cover Premium",
        price: quoteData?.basic_tp_premium,
      },
    ],
    "Addon & Accessories ": [],
    Discounts: [
      {
        title: "No-Claim Bonus",
        price: 6792,
      },
      {
        title: "Other Discounts",
        price: 5094,
      },
    ],
    "Premium Details": {
      gstPrecentage: 18,
      data: [
        {
          title: "Total Premium",
          price: 20000,
        },
        {
          title: "GST",
          price: 5000,
        },
      ],
    },
  });

  useLayoutEffect(() => {
    let data = displayData;
    const filterSelected = filtersData?.reduce((acc, parent) => {
      const selectedChildren = parent.filterList?.filter(
        (child) => child.isSelected
      );
      if (selectedChildren.length > 0) {
        acc.push({
          ...parent,
          filterList: selectedChildren,
        });
      }
      return acc;
    }, []);

    console.log("CarPoliciesData--->", CarPoliciesData);
    if (addOnsSelected) {
      data["Addon & Accessories "] = addOnsSelected?.map((item) => {
        return {
          title: item.title,
          price: item.price,
        };
      });
    }

    console.log(quoteData);

    const baseCoverSum = data["Base cover"].reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    const addOnsSum = data["Addon & Accessories "]?.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    const discountsSum = data.Discounts.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    const totalPremium = baseCoverSum + addOnsSum - discountsSum;
    const gstAmount =
      (totalPremium * data["Premium Details"].gstPrecentage) / 100;

    setDisplayData((prev) => ({
      ...data,
      "Premium Details": {
        ...prev["Premium Details"],
        data: [
          {
            title: "Total Premium",
            price: totalPremium,
          },
          {
            title: "GST",
            price: gstAmount,
          },
        ],
      },
    }));
  }, []);


  function getTotalWithGST(quoteData, gstRate = 18) {
    const baseTotal =
      (quoteData?.total_premium || 0) +
      (quoteData?.applicable_personal_accident_cover?.amount || 0) +
      (quoteData?.cng_lpg?.cng_lpg_kit || 0) +
      (quoteData?.cng_lpg?.cng_lpg_tp_kit || 0) +
      (quoteData?.applicable_driver_cover?.amount || 0) +
      (quoteData?.applicable_passenger_cover?.amount || 0) +
      (quoteData?.applicable_electrical_kit?.amount || 0) +
      (quoteData?.applicable_non_electrical_kit?.amount || 0) -
      (quoteData?.ncb || 0);

    const gstAmount = (baseTotal * gstRate) / 100;
    const totalWithGST = baseTotal + gstAmount;

    return totalWithGST;
  }
  function getGSTAmount(quoteData, gstRate = 18) {
    const baseTotal =
      (quoteData?.total_premium || 0) +
      (quoteData?.applicable_personal_accident_cover?.amount || 0) +
      (quoteData?.cng_lpg?.cng_lpg_kit || 0) +
      (quoteData?.cng_lpg?.cng_lpg_tp_kit || 0) +
      (quoteData?.applicable_driver_cover?.amount || 0) +
      (quoteData?.applicable_passenger_cover?.amount || 0) +
      (quoteData?.applicable_electrical_kit?.amount || 0) +
      (quoteData?.applicable_non_electrical_kit?.amount || 0) -
      (quoteData?.ncb || 0);

    return (baseTotal * gstRate) / 100;
  }



  return (
    <CommonDrawer
      open={Boolean(selectedPremiumBreakup)}
      direction="left"
      anchor={"right"}
      Header={"Premium Breakup"}
      onClose={() => setSelectedPremiumBreakup(null)}
      fullScreen={isMobile}
      actionSection={() => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            py: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // column on mobile, row on desktop
              alignItems: "center",
              justifyContent: { xs: "center", sm: "space-between" },
              gap: 2,
              width: "100%",
              px: 3,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <img
              src={
                quoteData?.pjSubProductInsurerPlanPackages?.pjSubProductInsurerPlanDetails?.pjSubProductInsurerMapping?.logo_url ||
                "/images/company_logo/icici.png"
              }
              width={50}
              height={50}
              alt="Company Logo"
            />

            {quoteMaster?.is_idv_visible &&
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body2">IDV</Typography>
                <Typography variant="body2">
                  {typeof window !== "undefined" &&
                    formatAED(
                      quoteData?.idv ? quoteData?.idv : quoteData?.min_idv
                    )}
                </Typography>
              </Box>
            }

            {/* <Box>
              <Typography variant="body2">Total Payable Amount</Typography>
              <Typography variant="body2">
                {formatRuppee(
                  (quoteData?.total_premium || 0) +
                  (quoteData?.applicable_personal_accident_cover?.amount || 0) +
                  (quoteData?.cng_lpg?.cng_lpg_kit || 0) +
                  (quoteData?.cng_lpg?.cng_lpg_tp_kit || 0) +
                  (quoteData?.applicable_driver_cover?.amount || 0) +
                  (quoteData?.applicable_passenger_cover?.amount || 0) +
                  quoteData?.service_tax
                )}
              </Typography>
            </Box> */}

            <Box
              sx={{
                background: theme.palette.primary.main,
                color: theme.palette.common.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                px: 2,
                borderRadius: "5px",
                cursor: "pointer",
                border: 1,
                width: { xs: "100%", sm: "auto" }, // full width on mobile
              }}
              onClick={() => {
                setSelectedPremiumBreakup(null);
                handleBuyInsurance(selectedPremiumBreakup);
              }}
            >

              <Typography variant="body2" sx={{ mr: 1 }}>Buy Now</Typography>
              <Typography variant="body2">
                {formatAED(getTotalWithGST(quoteData))}
              </Typography>
              <ArrowForward sx={{ ml: 2 }} />
            </Box>
          </Box>
        </Box>
      )}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2} px={4}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
              {Object.keys(displayData)?.[0]}
            </Typography>
            <List sx={{ m: 0, p: 0 }}>

              {quoteData?.basic_od_premium !== null && quoteData?.basic_od_premium > 0 &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', p: 0, m: 0, mb: 2 }}>
                  <Typography variant="body2">{"Basic Own Damage Premium"}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {quoteData?.basic_od_premium > 0 ? formatAED(quoteData?.basic_od_premium) : "-"}
                  </Typography>
                </Box>
              }

              {quoteData?.basic_tp_premium !== null && quoteData?.basic_tp_premium > 0 &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', p: 0, m: 0, mb: 2 }}>
                  <Typography variant="body2">Third Party Cover Premium</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {quoteData?.basic_tp_premium > 0 ? formatAED(quoteData?.basic_tp_premium) : "-"}
                  </Typography>
                </Box>
              }

              {/* {quoteData?.applicable_electrical_kit &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', p: 0, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_electrical_kit?.label} {`(${formatRuppee(quoteData?.applicable_electrical_kit?.selected_amount)})`}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatRuppee(quoteData?.applicable_electrical_kit?.amount) || "-"}
                  </Typography>
                </Box>
              }
              {quoteData?.applicable_non_electrical_kit &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', p: 0, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_non_electrical_kit?.label} {`(${formatRuppee(quoteData?.applicable_non_electrical_kit?.selected_amount) || "-"})`}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatRuppee(quoteData?.applicable_non_electrical_kit?.amount) || "-"}
                  </Typography>
                </Box>
              } */}
              {quoteData?.applicable_cng_lpg_kit &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', p: 0, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_cng_lpg_kit?.label}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatAED(quoteData?.applicable_cng_lpg_kit?.amount) || "-"}
                  </Typography>
                </Box>
              }
              {quoteData?.applicable_cng_lpg_tp_kit &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', p: 0, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_cng_lpg_tp_kit?.label}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatAED(quoteData?.applicable_cng_lpg_tp_kit?.amount) || "-"}
                  </Typography>
                </Box>
              }
            </List>
          </Grid>

          <Divider sx={{ my: 0, width: "100%" }} />
          {(quoteData?.applicable_addons_summary && Object.entries(quoteData?.applicable_addons_summary)?.length > 0) ||
            (quoteData?.applicable_personal_accident_cover) ||
            (quoteData?.applicable_driver_cover) ||
            (quoteData?.applicable_passenger_cover) ||
            (quoteData?.applicable_electrical_kit) ||
            (quoteData?.applicable_non_electrical_kit) ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 0 }}>
                  {/* {Object.keys(displayData)?.[1]} */}
                  Addons
                </Typography>
                {(quoteData?.applicable_addons_summary && Object.entries(quoteData?.applicable_addons_summary)?.length > 0) &&
                  <List sx={{ m: 0, p: 0 }}>
                    {Object.entries(quoteData?.applicable_addons_summary)?.map(([key, value]) => {
                      return (
                        <ListItem sx={{ display: "flex", flexDirection: 'column', justifyContent: "space-between", p: 0, m: 0, my: 2 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="body2">
                              {/* {formatKeyName(key)} */}
                              {getTitleById(key)}
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 2 }}>
                              {formatAED(value?.addons_total) || "-"}
                            </Typography>
                          </Box>
                          <List dense sx={{ pl: 1, pb: 0, width: '100%' }}>
                            {value.values.map((addon, idx) => (
                              <ListItem key={idx} sx={{ py: 0, px: 1, display: 'flex', justifyContent: 'space-between' }} disableGutters>
                                <Typography variant="body2">
                                  {/* {formatKeyName(addon)} */}
                                  {getTitleById(addon)}
                                </Typography>
                                <CheckIcon fontSize="small" sx={{ ml: 4, color: 'green' }} />
                              </ListItem>
                            ))}
                            {/* List that shows unavailable addOns */}
                          </List>
                        </ListItem>
                      )
                    })}
                  </List>
                }
              </Grid>

              {quoteData?.applicable_personal_accident_cover &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', pl: 2, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_personal_accident_cover?.label}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatAED(quoteData?.applicable_personal_accident_cover?.amount) || "-"}
                  </Typography>
                </Box>
              }

              {quoteData?.applicable_driver_cover &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', pl: 2, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_driver_cover?.label}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatAED(quoteData?.applicable_driver_cover?.amount) || "-"}
                  </Typography>
                </Box>
              }

              {quoteData?.applicable_passenger_cover &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', pl: 2, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_passenger_cover?.label} {`(${formatAED(quoteData?.applicable_passenger_cover?.selected_amount)})`}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatAED(quoteData?.applicable_passenger_cover?.amount) || "-"}
                  </Typography>
                </Box>
              }

              {quoteData?.applicable_electrical_kit &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', pl: 2, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_electrical_kit?.label} {`(${formatAED(quoteData?.applicable_electrical_kit?.selected_amount)})`}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatAED(quoteData?.applicable_electrical_kit?.amount) || "-"}
                  </Typography>
                </Box>
              }
              {quoteData?.applicable_non_electrical_kit &&
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', pl: 2, m: 0, mb: 2 }}>
                  <Typography variant="body2">{quoteData?.applicable_non_electrical_kit?.label} {`(${formatAED(quoteData?.applicable_non_electrical_kit?.selected_amount) || "-"})`}</Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formatAED(quoteData?.applicable_non_electrical_kit?.amount) || "-"}
                  </Typography>
                </Box>
              }
              <Divider sx={{ my: 0, width: "100%" }} />
            </>
          ) : null
          }

          {((quoteDetailsObj?.previous_ncb_percentage !== null && quoteDetailsObj?.previous_ncb_percentage > 0) || quoteDetailsObj?.discounts !== null && quoteDetailsObj?.discounts > 0) &&
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, mt: 0 }}>
                {/* {Object.keys(displayData)?.[2]} */}
                Discounts
              </Typography>
              <List sx={{ m: 0, p: 0 }}>

                {
                  quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type === 'used' && quoteDetailsObj?.previous_ncb_percentage !== null && quoteDetailsObj?.previous_ncb_percentage > 0 &&
                  <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 0, m: 0, my: 2 }}>
                    {/* <Typography variant="body2">{`No Claim Bonus (${quoteDetailsObj?.previous_ncb_percentage}%)`}</Typography> */}
                    <Typography variant="body2">{`No Claim Bonus`}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 2, color: theme.palette.success.main }}
                    >
                      {formatAED(quoteData?.ncb || 0)}
                    </Typography>
                  </ListItem>
                }

                {quoteData?.discounts !== null &&
                  <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 0, m: 0, my: 2 }}>
                    <Typography variant="body2">Other Discounts</Typography>
                    <Typography
                      variant="body2"
                      sx={{ ml: 2, color: theme.palette.success.main }}
                    >
                      {formatAED(quoteData?.discounts || 0)}
                    </Typography>
                  </ListItem>
                }
              </List>
            </Grid>}

          <Divider sx={{ my: 0, width: "100%" }} />
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 0 }}>
              Premium Details
            </Typography>
            <List sx={{ m: 0, p: 0 }}>
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 0,
                  m: 0,
                  my: 2,
                }}
              >
                <Typography variant="body2">
                  Net Premium
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    ml: 2,
                    color: theme.palette.error.main
                  }}
                >
                  {formatAED(
                    (quoteData?.total_premium || 0) +
                    (quoteData?.applicable_personal_accident_cover?.amount || 0) +
                    (quoteData?.cng_lpg?.cng_lpg_kit || 0) +
                    (quoteData?.cng_lpg?.cng_lpg_tp_kit || 0) +
                    (quoteData?.applicable_driver_cover?.amount || 0) +
                    (quoteData?.applicable_passenger_cover?.amount || 0) +
                    (quoteData?.applicable_electrical_kit?.amount || 0) +
                    (quoteData?.applicable_non_electrical_kit?.amount || 0) -
                    (quoteData?.ncb || 0)
                  )}

                </Typography>
              </ListItem>
              <ListItem sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 0, m: 0, my: 2 }}>
                <Typography variant="body2">GST@18%</Typography>
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {formatAED(getGSTAmount(quoteData))}
                </Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <List
              sx={{
                m: 0,
                p: 2,
                borderRadius: 1,
                background: theme.palette.grey[100],
              }}
            >
              <ListItem
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 0,
                  m: 0,
                  my: 2,
                }}
              >
                <Box>
                  <Typography variant="body2">Total Payable Amount</Typography>
                  <Typography
                    variant="body2"
                    color={theme.palette.success.main}
                  >
                    Total savings{" "}
                    {formatAED(quoteData?.discounts || 0)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.error.main }}>
                    {formatAED(getTotalWithGST(quoteData))}
                  </Typography>
                  <Typography variant="body2">GST inc.</Typography>
                </Box>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </CommonDrawer >
  );
};

export default PremiumCoverSection;
