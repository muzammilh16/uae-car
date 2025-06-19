import {
  ArrowBackOutlined, ArrowDownward, ArrowForward, ArrowRightAlt, ArrowRightTwoTone, CalculateOutlined, CheckCircleOutline, Edit, EditOutlined, EmailOutlined, GarageOutlined, Info, InfoOutlined, KeyboardBackspaceOutlined, PictureAsPdfOutlined, PictureAsPdfSharp, Share,
} from "@mui/icons-material";
import {
  Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, Card, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, IconButton, InputAdornment, InputLabel, Link, List, ListItem, ListItemText, MenuItem, Select, TextField, Tooltip, tooltipClasses, Typography, InfoOutlineIcon
} from "@mui/material";
import { Box, useMediaQuery } from "@mui/system";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import BlankLayout from "src/@core/layouts/BlankLayout";
import Navbar from "src/views/components/navbar";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import TuneIcon from "@mui/icons-material/Tune";
import { addonsData, CarPoliciesData } from "src/mockData/policiesData";
import { formatAED, formatRuppee } from "src/utility";
import Dialog from "src/@core/theme/overrides/dialog";
import CommonDialog from "src/pageComponents/commonModal";
import NcbSection from "src/pageComponents/ncbSection";
import { useRouter } from "next/router";
import PolicyExpSecction from "../../pageComponents/policyExpSection";

import { useTheme } from "@mui/material/styles";
import IdvModal from "src/pageComponents/openIdvModal";
import CarDisplayList from "src/pageComponents/carDisplayList";
import dayjs from "dayjs";
import { CommonDropdown } from "src/views/components/commonDropdown";
import { CommonTextField } from "src/views/components/commonTextField";
import CompareBoxList from "src/pageComponents/compareBoxList";
import CarDetailsSection from "src/pageComponents/carDetailsSection";
import { commonAddons } from "src/mockData/commonData";
import { useDispatch, useSelector } from "react-redux";
import { actionGetQuoteMaster, actionGetQuotes, actionUpdateQuoteDetails, setCheckedAddons, setPaCoverSelected, setPassengerCoverAmount } from "src/store/quoteDetails";
import { useRef } from "react";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import toast from "react-hot-toast";
import { actionGetInsurerMaster } from "src/store/formFieldOptions";
import styled from "@emotion/styled";
import { setAddons, setQuoteId } from "src/store/urlReference";
import UploadIcon from '@mui/icons-material/Upload';

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} arrow />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#000",
    color: "rgba(255, 254, 254, 0.87)",
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
    // cursor: "pointer",
  },
}));


const CarInsuranceList = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const theme = useTheme();

  const hasDispatchedRef = useRef(false);

  const isMobile = useMediaQuery("(max-width: 1000px)");
  const isSmallScreen = useMediaQuery("(max-width: 1300px)");
  const pessangerCoverOptions = [50000, 100000, 200000];
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [openNcbModal, setOpenNcbModel] = useState(false);
  const [openIdvModal, setOpenIdvModel] = useState(false);
  const [openpolicyExpModal, setOpenPolicyExpModel] = useState(false);
  const [quoteAddOns, setQuoteAddOns] = useState([]);
  const [quotePolicyTypes, setQuotePolicyTypes] = useState([]);
  const [quotePreviousPolicyTypes, setQuotePreviousPolicyTypes] = useState([]);
  const [quoteDudictibles, setQuoteDudictibles] = useState([]);
  const [quoteAccessories, setQuoteAccessories] = useState([]);

  const [quoteDetails, setQuoteDetails] = useState([]);
  const [quoteDetailsObj, setQuoteDetailsObj] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [PACoverSelected, setPACoverSelected] = useState(false);

  const [globalIdvValue, setGlobalIdvValue] = useState(986138);

  const [selectedAddons, setSelectedAddons] = useState([]);


  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [isCompareSelected, setIsCompareSelected] = useState([]);

  const [filtersData, setFiltersData] = useState([
    // {
    //   id: 1,
    //   title: "Quick Filters",
    //   filterList: [
    //     {
    //       title: "Third Party Plans",
    //       isChecked: false,
    //     },
    //   ],
    // },
    {
      id: 2,
      title: "Deductible",
      filterList: [
        {
          title: "None",
          isChecked: false,
        },
        {
          title: "2500 Voluntary Deductible",
          isChecked: false,
        },
        {
          title: "5000 Voluntary Deductible",
          isChecked: false,
        },
        {
          title: "10000 Voluntary Deductible",
          isChecked: false,
        },
        {
          title: "25000 Voluntary Deductible",
          isChecked: false,
        },
      ],
    },
    {
      id: 3,
      title: "Accident Cover",
      filterList: [
        {
          title: "Owner-Driver PA Cover",
          isChecked: false,
        },
        {
          title: "Paid Driver Cover",
          isChecked: false,
        },
        {
          title: "1 lac Unnamed Passenger Cover",
          isChecked: false,
        },
      ],
    },
    {
      id: 4,
      title: "Accessories",
      filterList: [
        {
          title: "Bio-Fuel Kit",
          isChecked: false,
        },
        {
          title: "Electric Accessories",
          isChecked: false,
          // value: 0,
          amount: true,
        },
        {
          title: "Non-Electric Accessories",
          isChecked: false,
          // value: 0,
          amount: true,
        },
      ],
      totalAmount: 0,
      minValue: 1000,
      maxValue: 50000,
    },
  ]);
  const [carDetails, setCarDetails] = useState(null);

  const quoteData = useSelector((state) => state.quoteDetailsStore);

  const { ADD_ONS, QUOTE_ID } = useSelector((state) => state?.urlReferenceStore)


  const { quoteId } = router.query;

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 2000; // 2 seconds

  const fetchQuotesWithRetry = async (referenceId) => {
    setQuoteLoading(true);
    // for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    //   try {
    //     console.log(`🔁 Attempt ${attempt}: Fetching quotes...`);

    //     const response = await dispatch(actionGetQuotes({ reference_id: referenceId })).unwrap();
    //     const premiums = response?.response?.premiums || [];

    //     // console.log(`✅ Attempt ${attempt}: Premiums length: ${premiums.length}`);
    //   } catch (error) {
    //     // console.error(`❌ Attempt ${attempt} failed:`, error);
    //   }

    //   if (attempt < MAX_RETRIES) {
    //     await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    //   }
    // }
    // toast.success("✅ Finished quote fetch attempts.");
    setQuoteLoading(false);
  };

  useEffect(() => {
    // dispatch(actionGetInsurerMaster());
  }, []);


  useEffect(() => {
    if (QUOTE_ID !== null && !hasDispatchedRef.current) {
      fetchQuotesWithRetry(QUOTE_ID);
      // dispatch(actionGetQuoteMaster({ reference_id: QUOTE_ID }));
      hasDispatchedRef.current = true;

    }
  }, [QUOTE_ID])


  useEffect(() => {
    if (quoteAddOns !== null && quoteAddOns?.length > 0 && quoteDetailsObj !== null) {
      const selectedAddOns = quoteAddOns.filter(item => item.selected).map(item => item.id);

      const addElectricalKits = (premium) => {
        const updated = { ...premium };

        if (quoteDetailsObj?.electrical_kit_value !== null) {

          updated.applicable_electrical_kit = {
            label: 'Electrical Accessories',
            amount: premium.electrical_accessories,
            selected_amount: parseInt(quoteDetailsObj?.electrical_kit_value, 10)
          };
        }

        if (quoteDetailsObj?.non_electrical_kit_value !== null) {
          updated.applicable_non_electrical_kit = {
            label: 'Non Electrical Accessories',
            amount: premium.non_electrical_accessories,
            selected_amount: parseInt(quoteDetailsObj?.non_electrical_kit_value, 10)
          };
        }

        // ✅ New logic for CNG/LPG kit
        const cngLpg = premium?.cng_lpg || {};
        if (cngLpg?.cng_lpg_kit > 0) {
          updated.applicable_cng_lpg_kit = {
            label: 'CNG/LPG Kit Premium',
            amount: cngLpg.cng_lpg_kit
          };
        }

        if (cngLpg?.cng_lpg_tp_kit > 0) {
          updated.applicable_cng_lpg_tp_kit = {
            label: 'CNG/LPG Kit TP Premium',
            amount: cngLpg.cng_lpg_tp_kit
          };
        }

        return updated;
      };


      if (selectedAddOns.length === 0) {
        const basicPremiums = quoteDetailsObj?.premiums
          ?.filter(premium => premium.pjSubProductInsurerPlanPackages?.name === "basic")
          ?.map(premium => {
            const od = parseFloat(premium.basic_od_premium || 0);
            const tp = parseFloat(premium.basic_tp_premium || 0);

            let result = {
              ...premium,
              total_premium: od + tp,
              ...(quoteData?.PA_COVER_SELECTED === true && premium?.pa_cover
                ? {
                  applicable_personal_accident_cover: {
                    label: 'Personal accident cover',
                    amount: premium.pa_cover
                  }
                }
                : quoteData?.PA_COVER_SELECTED === true && !premium?.pa_cover
                  ? {
                    not_applicable_personal_accident_cover: true
                  }
                  : {}),
              ...(quoteAddOns?.some(addon => addon.id === 'driver_cover' && addon.selected && !addon.is_disabled) && premium?.legal_liability_driver != null
                ? {
                  applicable_driver_cover: {
                    label: 'Driver cover',
                    amount: premium.legal_liability_driver
                  }
                }
                : {})
            };

            return addElectricalKits(result);
          });

        setQuoteDetails(basicPremiums);
      } else {
        const updatedPremiums = quoteDetailsObj?.premiums?.map(premium => {
          const od = parseFloat(premium.basic_od_premium || 0);
          const tp = parseFloat(premium.basic_tp_premium || 0);

          const addonCoverData = premium.addon_covers || {};
          const dependentData = premium.pjSubProductInsurerPlanPackages?.dependent_addon_covers || {};
          const addonCovers = premium.pjSubProductInsurerPlanPackages?.addon_covers || [];

          let addonTotal = 0;
          const applicableAddonsSummary = {};
          const notApplicableAddonsSummary = [];
          const alreadyIncludedDeps = new Set();


          selectedAddOns.forEach(addon => {
            if (!addonCovers.includes(addon)) {
              if (addon !== 'driver_cover' && addon !== 'passenger_cover') {
                notApplicableAddonsSummary.push(addon);
              }
              return;
            }

            if (addon in dependentData) {
              const dependencies = dependentData[addon];
              const hasConflict = dependencies.some(dep => alreadyIncludedDeps.has(dep));
              if (hasConflict) return;

              let sum = 0;
              const values = [];

              // Include the main addon value if not already counted
              const mainValue = parseFloat(addonCoverData[addon] || 0);
              if (mainValue > 0 && !alreadyIncludedDeps.has(addon)) {
                sum += mainValue;
                addonTotal += mainValue;
                values.push(addon);
                alreadyIncludedDeps.add(addon);
              }

              dependencies.forEach((dep, index) => {
                const depValue = parseFloat(addonCoverData[dep] || 0);
                sum += depValue;
                addonTotal += depValue;
                values.push(dep);
                alreadyIncludedDeps.add(dep);
              });

              applicableAddonsSummary[addon] = {
                values: dependencies,
                addons_total: sum
              };
            } else if (addonCoverData[addon] && !alreadyIncludedDeps.has(addon)) {
              const depValue = parseFloat(addonCoverData[addon] || 0);
              addonTotal += depValue;
              alreadyIncludedDeps.add(addon);
            }
          });

          let applicablePassengerCover = null;
          let notApplicablePassengerCover = false;

          const passengerCoverAddon = quoteAddOns?.find(addon => addon.id === 'passenger_cover' && addon.selected && !addon.is_disabled);
          if (passengerCoverAddon) {
            const selectedCoverValue = parseInt(passengerCoverAddon.value, 10);

            const matchedCover = premium.passenger_cover?.find(pc => parseInt(pc.cover, 10) === selectedCoverValue);
            if (matchedCover) {
              applicablePassengerCover = {
                label: 'Passenger Cover',
                amount: matchedCover.premium,
                selected_amount: parseInt(passengerCoverAddon.value, 10)
              };
            } else {
              notApplicablePassengerCover = true;
            }
          }

          let result = {
            ...premium,
            total_premium: od + tp + addonTotal,
            applicable_addons_summary: applicableAddonsSummary,
            not_applicable_addons_summary: notApplicableAddonsSummary,
            ...(quoteData?.PA_COVER_SELECTED === true && premium?.pa_cover
              ? {
                applicable_personal_accident_cover: {
                  label: 'Personal Accident Cover',
                  amount: premium.pa_cover
                }
              }
              : quoteData?.PA_COVER_SELECTED === true && !premium?.pa_cover
                ? {
                  not_applicable_personal_accident_cover: true
                }
                : {}),
            ...(quoteAddOns?.some(addon => addon.id === 'driver_cover' && addon.selected && !addon.is_disabled) && premium?.legal_liability_driver != null
              ? {
                applicable_driver_cover: {
                  label: 'Driver cover',
                  amount: premium.legal_liability_driver
                }
              }
              : {}),
            ...(applicablePassengerCover ? {
              applicable_passenger_cover: applicablePassengerCover
            } : notApplicablePassengerCover ? {
              not_applicable_passenger_cover: true
            } : {})
          };

          return addElectricalKits(result);
        });

        const updatedArray = updatedPremiums?.filter(premium => {
          const isBasic = premium.pjSubProductInsurerPlanPackages?.name === "basic";
          const hasAddons = Object.keys(premium.applicable_addons_summary || {}).length !== 0;
          return isBasic || hasAddons;
        });

        console.log('DATA123', updatedArray);
        setQuoteDetails(updatedArray);
      }
    }
  }, [quoteAddOns, quoteDetailsObj, quoteData?.PA_COVER_SELECTED]);




  useEffect(() => {
    if (quoteData) {
      setQuoteDudictibles(quoteData?.QUOTE_MASTER?.response?.voluntary_deductible);
      setQuoteAccessories(quoteData?.QUOTE_MASTER?.response?.accessories);
      setQuoteDetailsObj(quoteData?.QUOTES?.response);
      setQuotePolicyTypes(quoteData?.QUOTE_MASTER?.response?.policyType);
      setQuotePreviousPolicyTypes(quoteData?.QUOTE_MASTER?.response?.previousPolicyType);
    }
  }, [quoteData]);

  useEffect(() => {
    setQuoteAccessories([
      {
        "title": "Electrical Accessories",
        "id": "electrical_accessories",
        "value": quoteDetailsObj?.electrical_kit_value || 0,
        "selected": quoteDetailsObj?.electrical_kit_value && quoteDetailsObj?.electrical_kit_value !== 0 ? true : false
      },
      {
        "title": "Non Electrical Accessories",
        "id": "non_electrical_accessories",
        "value": quoteDetailsObj?.non_electrical_kit_value || 0,
        "selected": quoteDetailsObj?.non_electrical_kit_value ? true : false
      }
    ])
  }, [quoteDetailsObj])


  const dummyLoading = () => {
    setQuoteLoading(true);
    setTimeout(() => {
      setQuoteLoading(false);
    }, 2000);
  }


  const handleApplyAccessories = async (unselectedId = null) => {
    // console.log("quoteAccessories", quoteAccessories);

    let params = {
      reference_id: quoteDetailsObj?.quote_id,
      policy_type: quoteDetailsObj?.policy_type,
      idv: quoteDetailsObj?.idv,
      manufacture_date: quoteDetailsObj?.manufacture_date,
      registration_date: quoteDetailsObj?.registration_date,
      // electrical_kit_value: quoteAccessories?.find(obj => obj.id == "electrical_accessories")?.value == 0 ? null : quoteAccessories?.find(obj => obj.id == "electrical_accessories")?.value,
      // non_electrical_kit_value: quoteAccessories?.find(obj => obj.id == "non_electrical_accessories")?.value == 0 ? null : quoteAccessories?.find(obj => obj.id == "non_electrical_accessories")?.value,
      non_electrical_kit_value: null,
      electrical_kit_value: null,
      proposer_type: quoteDetailsObj?.proposer_type
    };

    if (quoteAccessories?.find(obj => obj.id == "electrical_accessories")?.selected) {
      params.electrical_kit_value = quoteAccessories?.find(obj => obj.id == "electrical_accessories")?.value == 0 ? null : quoteAccessories?.find(obj => obj.id == "electrical_accessories")?.value
    }

    if (quoteAccessories?.find(obj => obj.id == "non_electrical_accessories")?.selected) {
      params.non_electrical_kit_value = quoteAccessories?.find(obj => obj.id == "non_electrical_accessories")?.value == 0 ? null : quoteAccessories?.find(obj => obj.id == "non_electrical_accessories")?.value
    }

    if (quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type == 'used') {
      params.previous_policy_type = quoteDetailsObj?.previous_policy_type,
        params.is_claim_made_last_year = quoteDetailsObj?.is_claim_made_last_year
      // params.proposer_type = quoteDetailsObj?.proposer_type
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_ncb_visible) {
      params.previous_ncb_percentage = quoteDetailsObj?.previous_ncb_percentage
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_expire_date_visible) {
      params.previous_tp_policy_expire_date = quoteDetailsObj?.previous_tp_policy_expire_date
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_policy_expire_date_visible) {
      params.previous_policy_expire_date = quoteDetailsObj?.previous_policy_expire_date
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible) {
      params.previous_policy_expire_date = quoteDetailsObj?.previous_policy_expire_date
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_policy_insurer_visible) {
      params.previous_policy_insurer_id = quoteDetailsObj?.previous_policy_insurer_id
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_od_policy_insurer_visible) {
      params.previous_policy_insurer_id = quoteDetailsObj?.previous_policy_insurer_id
    }

    if (quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_insurer_visible) {
      params.previous_tp_policy_insurer_id = quoteDetailsObj?.previous_tp_policy_insurer_id
    }

    if (unselectedId !== null) {
      // console.log("Unselected ID:", unselectedId);
      if (unselectedId === "electrical_accessories") {
        params.electrical_kit_value = null;
      } else if (unselectedId === "non_electrical_accessories") {
        params.non_electrical_kit_value = null;
      }
    }

    console.log("params", params);


    // try {
    //   const response = await dispatch(actionUpdateQuoteDetails(params)).unwrap();

    //   if (response?.result === true && response?.status === 200) {
    //     // toast.success(response?.message || "Quote details updated!");
    //     const refId = response?.response?.reference_id;

    //     localStorage.setItem("QUOTE_ID", response?.response?.reference_id);
    //     dispatch(setQuoteId(response?.response?.reference_id));

    //     // dispatch(actionGetQuoteMaster({ reference_id: refId }));

    //     // router.push({
    //     //   pathname: "/car-insurance-list",
    //     //   query: { quoteId: refId },
    //     // });

    //     // Start retry logic
    //     // fetchQuotesWithRetry(refId);
    //   } else {
    //     toast.error(response?.message || "Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   toast.error("Some error occurred. Please try again.");
    //   console.error("Quote details update failed:", error);
    // }
  }


  useEffect(() => {
    const storedPACover = localStorage.getItem("PA_COVER_SELECTED");

    if (storedPACover !== null) {
      const parsedValue = JSON.parse(storedPACover);
      dispatch(setPaCoverSelected(parsedValue));
    } else {
      // // No stored value, check insurance_type
      // const insuranceType = quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type;

      // if (insuranceType === 'new') {
      //   console.log("Insurance type is 'new'");
      //   localStorage.setItem("PA_COVER_SELECTED", JSON.stringify(true));
      //   dispatch(setPaCoverSelected(true));
      // } else {
      //   console.log("Insurance type is not 'new'. Removing PA_COVER_SELECTED");
      //   localStorage.removeItem("PA_COVER_SELECTED");
      //   dispatch(setPaCoverSelected(false));
      // }
    }
  }, [dispatch, quoteDetailsObj]);

  useEffect(() => {
    if (QUOTE_ID === null) {
      const storedQuoteId = localStorage.getItem('QUOTE_ID');
      if (storedQuoteId) {
        dispatch(setQuoteId(storedQuoteId));
      }
    }
  }, [QUOTE_ID, dispatch]);

  // Step 1: Load ADD_ONS from localStorage only once
  useEffect(() => {
    const localAddons = localStorage.getItem("ADD_ONS");

    if (localAddons) {
      try {
        const parsedAddons = JSON.parse(localAddons);
        if (Array.isArray(parsedAddons)) {
          dispatch(setAddons(parsedAddons));
        }
      } catch (error) {
        console.error("Invalid ADD_ONS data in localStorage:", error);
      }
    }
  }, [dispatch]);

  // Step 2: Set ADD_ONS from quoteData when not available from localStorage
  useEffect(() => {
    if (!ADD_ONS && quoteData?.QUOTE_MASTER?.response?.addons) {
      console.log("test 1")
      const pcItem = quoteData.QUOTE_MASTER.response.addons.find(item => item.id === "passenger_cover");

      if (pcItem?.value) {
        setDropdownVisible(true);
      }

      dispatch(setAddons(quoteData.QUOTE_MASTER.response.addons));
    }
  }, [quoteData?.QUOTE_MASTER?.response?.addons, ADD_ONS, dispatch]);


  useEffect(() => {
    if (ADD_ONS !== null) {
      console.log("test 2")
      const selectedAddons = ADD_ONS.filter(addon => addon.selected);
      const hasSelectedAddOn = selectedAddons.length > 0;

      // Handle dropdown visibility
      const pcItem = selectedAddons.find(item => item?.id === "passenger_cover");
      if (pcItem?.value) {
        setDropdownVisible(true);
      } else {
        const fallbackPC = quoteData?.QUOTE_MASTER?.response?.addons?.find(item => item?.id === "passenger_cover");
        if (fallbackPC?.value) {
          setDropdownVisible(true);
        }
      }

      // Start preparing final selected IDs for query
      // let finalAddonIds = selectedAddons.map(addon => addon.id);

      let finalAddonIds = selectedAddons.map(addon => {
        if (addon.id === "passenger_cover" && addon.value) {
          return `passenger_cover_${addon.value}`;
        }
        return addon.id;
      });


      // Check if PA_COVER_SELECTED is true (from Redux or LocalStorage)
      const storedPaCover = localStorage.getItem("PA_COVER_SELECTED");
      const isPaCoverSelected = storedPaCover ? JSON.parse(storedPaCover) : false;

      if (isPaCoverSelected && !finalAddonIds.includes("pa_cover")) {
        finalAddonIds.push("pa_cover");
      }

      if (!isPaCoverSelected && finalAddonIds.includes("pa_cover")) {
        finalAddonIds = finalAddonIds.filter(id => id !== "pa_cover");
      }

      // Update state and route
      setQuoteAddOns(hasSelectedAddOn ? ADD_ONS : quoteData?.QUOTE_MASTER?.response?.addons || []);

      // Prepare query
      const query = {
        quoteId: QUOTE_ID,
        ...(finalAddonIds.length > 0 && { addons: finalAddonIds.join(",") }),
      };

      router.push(
        {
          pathname: "/car-insurance-list",
          query,
        },
        undefined,
        { shallow: true }
      );

    }
  }, [ADD_ONS, quoteData?.PA_COVER_SELECTED, quoteData?.QUOTE_MASTER, QUOTE_ID]);

  useEffect(() => {
    console.log("test 3");
    const data = quoteData?.QUOTE_MASTER;
    const updatedResponse = {
      ...data,
      response: {
        ...data.response,
        addons: data.response.addons.map(item => {
          if (item.id === "passenger_cover" || item.id === "invoice_price") {
            return item; // leave untouched
          }
          return {
            ...item,
            selected: true
          };
        })
        // accessories and everything else remain unchanged
      }
    };
    dispatch(setCheckedAddons(updatedResponse))
  }, [])


  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      // You could add further logic here to preview or upload files
      toast.success('Documents uploaded successfully!');
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <Grid
        container
        justifyContent="center"
        spacing={0}
      //   px={isMobile ? 1 : 90}
      >
        <Grid item xs={11} sm={10} lg={10} xl={9} md={11}>
          <Grid container spacing={0}>
            <CarDetailsSection
              carDetails={carDetails}
              setOpenPolicyExpModel={setOpenPolicyExpModel}
              quotePolicyTypes={quotePolicyTypes}
              quoteDetailsObj={quoteDetailsObj}
              quotePreviousPolicyTypes={quotePreviousPolicyTypes}
            />

            <Grid
              item
              xs={12}
              md={3}
              mt={8}
              display={"flex"}
              flexDirection={"column"}
              pl={0}
              gap={2}
              sx={{
                "&.MuiGrid-root >.MuiGrid-item": {
                  p: 0,
                },
              }}
            >
              <Card sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      p: 3,
                      px: 4,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    Check and Update
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      // color="primary"
                      sx={{ cursor: "pointer", fontWeight: "bold" }}
                    // onClick={handleNavigation}
                    >
                      Enquiry
                    </Typography>
                    <Tooltip title="Edit Enquiry">
                      <EditOutlined
                        // fontSize="14px"
                        color="primary"
                        sx={{ cursor: "pointer", mx: 2, mr: 4, fontSize: "14px" }}
                        onClick={() => {
                          router.push({ pathname: "/carInsurance", query: { ft: quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type == 'used' ? "OLD" : "NEW", fs: "FALLBACK_VERIFICATION" } });
                        }}
                      />
                    </Tooltip>
                  </Box>
                </Box>
                <Divider sx={{ width: "90%", mx: "auto" }} />
                <Box>
                  <List>

                    {
                      quoteData?.QUOTE_MASTER?.response?.is_idv_visible &&
                      <ListItem>
                        <ListItemText primary="Car Value" />
                        {
                          // quoteDetailsObj?.idv && (
                          <Typography
                            variant="body2"
                            // color="primary"
                            sx={{ cursor: "pointer", fontWeight: "bold" }}
                            onClick={() => setOpenIdvModel(true)}
                          >
                            {/* {quoteDetailsObj?.idv ? formatRuppee(quoteDetailsObj?.idv) : formatRuppee(quoteDetailsObj?.min_idv)} */}
                            {formatAED(globalIdvValue)}
                          </Typography>
                          // )
                        }
                        <Tooltip title="Edit Car Value">
                          <EditOutlined
                            // fontSize="14px"
                            color="primary"
                            sx={{ cursor: "pointer", ml: 2, fontSize: "14px" }}
                            onClick={() => setOpenIdvModel(true)}
                          />
                        </Tooltip>
                      </ListItem>
                    }

                    {
                      quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type == 'used' &&
                      <>
                        {
                          quoteData?.QUOTE_MASTER?.response?.is_ncb_visible &&
                          <ListItem>
                            <ListItemText primary=" Previous NCB" />
                            {
                              // quoteDetailsObj?.previous_ncb_percentage && 
                              <Typography
                                variant="body2"
                                // color="primary"
                                sx={{ cursor: "pointer", fontWeight: "bold" }}
                                onClick={() => setOpenNcbModel(true)}
                              >
                                Claim: {quoteDetailsObj?.is_claim_made_last_year == 1 ? "Yes" : "No"}{" "}
                                {"  |  "}
                                {quoteDetailsObj?.previous_ncb_percentage !== null ? quoteDetailsObj?.previous_ncb_percentage + "%" : "N/A"}
                              </Typography>
                            }
                            <Tooltip title="Edit NCB">
                              <EditOutlined
                                fontSize="10px"
                                color="primary"
                                sx={{ cursor: "pointer", ml: 2, fontSize: "14px" }}
                                onClick={() => setOpenNcbModel(true)}
                              />
                            </Tooltip>
                          </ListItem>
                        }

                        {
                          quoteData?.QUOTE_MASTER?.response?.is_od_expire_date_visible &&
                          <ListItem>
                            <ListItemText primary="OD Expiry Date" />
                            {/* {carDetails?.policyExpiryDate && ( */}
                            <Typography
                              variant="body2"
                              // color="primary"
                              sx={{ cursor: "pointer", fontWeight: "bold" }}
                              onClick={() => setOpenPolicyExpModel(true)}
                            >
                              {dayjs(quoteDetailsObj?.previous_policy_expire_date).format(
                                "DD-MM-YYYY"
                              )}
                            </Typography>
                            {/* )} */}
                            <Tooltip title="Edit OD Expiry Date">
                              <EditOutlined
                                color="primary"
                                sx={{ cursor: "pointer", ml: 2, fontSize: "14px" }}
                                onClick={() => setOpenPolicyExpModel(true)}
                              />
                            </Tooltip>
                          </ListItem>
                        }

                        {
                          quoteData?.QUOTE_MASTER?.response?.is_previous_policy_expire_date_visible &&
                          <ListItem>
                            <ListItemText primary="Policy Expiry Date" />
                            {/* {carDetails?.policyExpiryDate && ( */}
                            <Typography
                              variant="body2"
                              // color="primary"
                              sx={{ cursor: "pointer", fontWeight: "bold" }}
                              onClick={() => setOpenPolicyExpModel(true)}
                            >
                              {dayjs(quoteDetailsObj?.previous_policy_expire_date).format(
                                "DD-MM-YYYY"
                              )}
                            </Typography>
                            {/* )} */}
                            <Tooltip title="Edit Policy Expiry Date">
                              <EditOutlined
                                color="primary"
                                sx={{ cursor: "pointer", ml: 2, fontSize: "14px" }}
                                onClick={() => setOpenPolicyExpModel(true)}
                              />
                            </Tooltip>
                          </ListItem>
                        }

                        {
                          quoteData?.QUOTE_MASTER?.response?.is_previous_tp_policy_expire_date_visible &&
                          <ListItem>
                            <ListItemText primary="TP Expiry Date" />
                            {/* {carDetails?.previousPolicyTPExpiryDate && ( */}
                            <Typography
                              variant="body2"
                              // color="primary"
                              sx={{ cursor: "pointer", fontWeight: "bold" }}
                              onClick={() => setOpenPolicyExpModel(true)}
                            >
                              {dayjs(quoteDetailsObj?.previous_tp_policy_expire_date).format(
                                "DD-MM-YYYY"
                              )}
                            </Typography>
                            {/* )} */}
                            <Tooltip title="Edit TP Expiry Date">
                              <EditOutlined
                                color="primary"
                                sx={{ cursor: "pointer", ml: 2, fontSize: "14px" }}
                                onClick={() => setOpenPolicyExpModel(true)}
                              />
                            </Tooltip>
                          </ListItem>
                        }
                      </>
                    }

                    {/* <ListItem sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={quoteData?.PA_COVER_SELECTED || false}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              localStorage.setItem("PA_COVER_SELECTED", JSON.stringify(isChecked));
                              dispatch(setPaCoverSelected(isChecked));
                            }}
                          />
                        }
                        label={"Personal Accident Cover"}
                        disabled={!quoteData?.QUOTE_MASTER?.response?.is_pa_cover_visible}
                      />
                      <CustomTooltip
                        title={
                          quoteData?.QUOTE_MASTER?.response?.is_pa_cover_visible ? (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                p: 2,
                              }}
                            >
                              <Typography color={theme.palette.primary.contrastText} variant="h6">
                                {"Personal Accident (PA) Cover"}
                              </Typography>
                              <Divider
                                color={theme.palette.primary.main}
                                sx={{ width: "100%", mt: 2 }}
                              />
                              <Typography
                                variant="body2"
                                component="p"
                                color="inherit"
                                mt={3}
                              >
                                {"As per Insurance Regulatory and Development Authority of India notice. Personal Accident (PA) Cover is mandatory, if the car is owned by an individual not having Personal Accident cover of 15 Lakhs, please opt for 'Personal Acccident (PA) cover'"}
                              </Typography>
                              <Box sx={{ mt: 3, backgroundColor: theme.palette.primary.main, p: 2, borderRadius: 1 }}>
                                <Typography color={"inherit"} variant="h6">
                                  {"You can opt out if:"}
                                </Typography>
                                <Box component="ul" sx={{
                                  pl: 3,
                                  mt: 1,
                                  fontSize: '0.8rem',
                                  '& li': {
                                    marginBottom: '5px', // spacing between list items
                                    lineHeight: 1.5,
                                  },
                                }}>
                                  <li>The car is registered in a company's name</li>
                                  <li>
                                    You already have a PA cover of 15 lakhs (from any other vehicle owned by you or from a separate standalone PA Cover Policy)
                                  </li>
                                  <li>Registered Owner does not have a valid driving license</li>
                                </Box>
                              </Box>
                              <Box sx={{ mt: 3 }}>
                                <Typography color={theme.palette.primary.contrastText} variant="h6">
                                  {"What is PA Cover?"}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  component="p"
                                  color="inherit"
                                  mt={1}
                                >
                                  {"This policy covers the owner for death or disability due to an accident. Owner (in case of disability) or nominee (in case of death) will get 15 lakhs."}
                                </Typography>
                              </Box>
                            </Box>
                          ) : null
                        }
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, -5],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <InfoOutlined sx={{ color: quoteData?.QUOTE_MASTER?.response?.is_pa_cover_visible ? theme.palette.primary.main : "gray" }} />
                      </CustomTooltip>
                    </ListItem> */}
                  </List>
                </Box>
              </Card>

              <Card sx={{ mb: 1 }}>
                <Accordion sx={{ boxShadow: 0 }}>
                  <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography
                      variant="h5"
                      sx={{
                        width: "100%",
                        fontSize: "0.9rem",
                        fontWeight: "bold !important",
                      }}
                    >
                      Add-Ons
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{ display: "flex", flexDirection: "column" }}
                  >
                    <Divider sx={{ width: "100%" }} />


                    {quoteAddOns?.length > 0 && quoteAddOns.map((item, i) => {
                      const isPassenger = item.id === "passenger_cover";

                      const labelText = isPassenger
                        ? item.value && Number(item.value) > 0
                          ? `${item.title}`
                          : item.title // Don't show "0"
                        : item.title;

                      return (
                        <Box key={item.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={item.selected}
                                disabled={item?.is_disabled}
                                onChange={(e) => {
                                  const isChecked = e.target.checked;

                                  const updatedData = quoteAddOns.map((addon, index) => {
                                    if (index === i) {
                                      if (isPassenger && dropdownVisible === true && isChecked && !addon.value) {
                                        setDropdownVisible(false);
                                        dispatch(setPassengerCoverAmount(""));
                                        return { ...addon, selected: false, value: "" };
                                      }

                                      if (isPassenger && isChecked && !addon.value) {
                                        setDropdownVisible(true);
                                        return { ...addon, selected: false };
                                      }

                                      if (isPassenger && !isChecked) {
                                        setDropdownVisible(false);
                                        dispatch(setPassengerCoverAmount(""));
                                        return { ...addon, selected: false, value: "" };
                                      }

                                      return { ...addon, selected: isChecked };
                                    }
                                    return addon;
                                  });

                                  setQuoteAddOns(updatedData);
                                  dispatch(setAddons(updatedData));
                                  localStorage.setItem("ADD_ONS", JSON.stringify(updatedData));
                                }}
                              />
                            }
                            label={labelText}
                            sx={{
                              opacity: isPassenger && !item.selected && dropdownVisible ? 0.6 : 1,
                            }}
                          />

                          {isPassenger && (dropdownVisible || (item.value !== 0 && item?.value !== '' && Number(item.value) > 0)) && (

                            <FormControl fullWidth sx={{ mt: 1 }}>
                              <InputLabel id={`passenger-cover-select-label-${i}`}>Sum Insured</InputLabel>
                              <Select
                                labelId={`passenger-cover-select-label-${i}`}
                                value={item?.value || ""}
                                label="Coverage Amount"
                                onChange={(e) => {
                                  const selectedValue = e.target.value;
                                  const updatedData = quoteAddOns.map((addon, index) => {
                                    if (index === i) {
                                      return {
                                        ...addon,
                                        value: selectedValue,
                                        selected: true,
                                      };
                                    }
                                    return addon;
                                  });

                                  setQuoteAddOns(updatedData);
                                  dispatch(setAddons(updatedData));
                                  localStorage.setItem("ADD_ONS", JSON.stringify(updatedData));
                                  dispatch(setPassengerCoverAmount(selectedValue));
                                }}
                              >
                                {item?.dropdown_value.map((val) => (
                                  <MenuItem key={val} value={val}>
                                    {formatAED(val)}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )}
                        </Box>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </Card>

              {
                quoteData?.QUOTE_MASTER?.response?.is_accessories_visible &&
                <Card sx={{ mb: 1 }}>
                  <Accordion sx={{ boxShadow: 0 }}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                      <Typography
                        variant="h5"
                        sx={{
                          width: "100%",
                          fontSize: "0.9rem",
                          fontWeight: "bold !important",
                        }}
                      >
                        Accessories
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                      <Divider sx={{ width: "100%" }} />

                      {quoteAccessories?.map((item, i) => (
                        <React.Fragment key={item.id}>
                          <FormControlLabel
                            control={<Checkbox checked={item.selected} />}
                            label={item.title}
                            onChange={(e) => {
                              // const updatedData = quoteAccessories?.map((addon, index) => {
                              //   if (index === i) {
                              //     return {
                              //       ...addon,
                              //       selected: e.target.checked,
                              //     };
                              //   }
                              //   return addon;
                              // });
                              // setQuoteAccessories(updatedData);
                              const isChecked = e.target.checked;

                              const updatedData = quoteAccessories?.map((addon, index) => {
                                if (index === i) {
                                  return {
                                    ...addon,
                                    selected: isChecked,
                                  };
                                }
                                return addon;
                              });

                              setQuoteAccessories(updatedData);

                              // 🔄 Dispatch API call when checkbox is unchecked
                              if (!isChecked) {
                                console.log("Checkbox unchecked for item:", item);
                                handleApplyAccessories(item.id);
                              }
                            }}
                          />

                          {item.selected && (
                            <TextField
                              label={item?.title + " Value"}
                              size="small"
                              fullWidth
                              type="number"
                              inputProps={{ min: 0, max: 50000 }}
                              value={item.value}
                              error={
                                item.value !== "" &&
                                (item.value < 0 || item.value > 50000 || isNaN(item.value))
                              }
                              helperText={
                                item.value !== "" &&
                                  (item.value < 0 || item.value > 50000 || isNaN(item.value))
                                  ? "Value must be between ₹0 and ₹50,000"
                                  : ""
                              }
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <CurrencyRupeeIcon fontSize="small" />
                                  </InputAdornment>
                                ),
                              }}
                              onChange={(e) => {
                                const rawValue = e.target.value;
                                const updatedData = quoteAccessories?.map((addon, index) => {
                                  if (index === i) {
                                    return {
                                      ...addon,
                                      value: rawValue === "" ? "" : Number(rawValue),
                                    };
                                  }
                                  return addon;
                                });
                                setQuoteAccessories(updatedData);
                              }}
                              onFocus={(e) => {
                                // If the value is exactly 0, clear the field when focused
                                if (item.value === 0) {
                                  const updatedData = quoteAccessories?.map((addon, index) => {
                                    if (index === i) {
                                      return {
                                        ...addon,
                                        value: "",
                                      };
                                    }
                                    return addon;
                                  });
                                  setQuoteAccessories(updatedData);
                                }
                              }}
                              sx={{ mt: 1 }}
                            />
                          )}
                        </React.Fragment>
                      ))}

                      {/* Validate all selected items before enabling Apply */}
                      {quoteAccessories?.some(
                        (item) =>
                          item.selected &&
                          (item.value === "" || isNaN(Number(item.value)) || item.value < 0 || item.value > 50000)
                      ) && (
                          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                            Please enter valid values (₹0 – ₹50,000) for all selected accessories.
                          </Typography>
                        )}

                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => handleApplyAccessories()}
                        disabled={
                          !quoteAccessories?.some((item) => item.selected) ||
                          quoteAccessories?.some(
                            (item) =>
                              item.selected &&
                              (item.value === "" || isNaN(Number(item.value)) || item.value < 0 || item.value > 50000)
                          )
                        }
                      >
                        Apply
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              }

              <Card sx={{ mb: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      p: 3,
                      px: 4,
                      fontSize: "0.9rem",
                      fontWeight: "bold",
                    }}
                  >
                    Upload Documents
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    width: "100%",
                    pb: 3,
                    px: 4,
                  }}
                >
                  To get the best possible rates for Your beloved car, please provide your documents.
                </Typography>
                {/* <Box sx={{ px: 4, pb: 3 }}>
                  <Button variant="contained"
                    startIcon={<UploadIcon />}
                    sx={{ width: "100%" }}>
                    Upload Documents
                  </Button>
                </Box> */}

                <Box sx={{ px: 4, pb: 3 }}>
                  <input
                    type="file"
                    multiple
                    hidden
                    ref={inputRef}
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<UploadIcon />}
                    onClick={handleButtonClick}
                    sx={{ width: '100%' }}
                  >
                    Upload Documents
                  </Button>
                </Box>

              </Card>

            </Grid>
            <Grid
              item
              xs={12}
              md={9}
              my={8}
              pl={isMobile ? 0 : 2}
              pb={isCompareSelected?.length ? 30 : 8}
            >

              <CarDisplayList
                quoteAddOns={quoteAddOns}
                quoteDetails={quoteDetails}
                quoteLoading={quoteLoading}
                quoteErrors={quoteDetailsObj?.errors}
                quoteDetailsObj={quoteDetailsObj}
                globalIdvValue={globalIdvValue}
                // setQuoteLoading={setQuoteLoading}
                // addOnsSelected={addOnsSelected}
                CarPoliciesData={CarPoliciesData}
                filtersData={filtersData}
                isCompareSelected={isCompareSelected}
                setIsCompareSelected={setIsCompareSelected}
                quotePolicyTypes={quotePolicyTypes}
                fetchQuotesWithRetry={fetchQuotesWithRetry}
              />
            </Grid>

            {openIdvModal && (
              <IdvModal
                openModal={openIdvModal}
                globalIdvValue={globalIdvValue}
                setGlobalIdvValue={setGlobalIdvValue}
                dummyLoading={dummyLoading}
                quoteDetailsObj={quoteDetailsObj}
                setOpenModal={setOpenIdvModel}
                quoteLoading={quoteLoading}
                setQuoteLoading={setQuoteLoading}
              // defaultValue={carDetails?.IdvValue}
              />
            )}
            {openNcbModal && (
              <NcbSection
                openModal={openNcbModal}
                setOpenModal={setOpenNcbModel}
                quoteDetailsObj={quoteDetailsObj}
                fetchQuotesWithRetry={fetchQuotesWithRetry}
              />
            )}
            {openpolicyExpModal && (
              <PolicyExpSecction
                openModal={openpolicyExpModal}
                setOpenModal={setOpenPolicyExpModel}
                fetchQuotesWithRetry={fetchQuotesWithRetry}
                quoteDetailsObj={quoteDetailsObj}
                dummyLoading={dummyLoading}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      {isCompareSelected?.length ? (
        <CompareBoxList
          setIsCompareSelected={setIsCompareSelected}
          isCompareSelected={isCompareSelected}
        />
      ) : null}
    </>
  );
};
CarInsuranceList.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
export default CarInsuranceList;
