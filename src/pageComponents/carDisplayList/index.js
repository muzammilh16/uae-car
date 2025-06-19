import { ArrowDownward, ArrowDropDown, ArrowForward, CalculateOutlined, FilterAltOutlined, GarageOutlined, GppMaybeRounded, PictureAsPdfOutlined, Share, } from "@mui/icons-material";
import {
  Badge, Box, Button, Checkbox, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, FormControl, FormControlLabel, Grid, IconButton, InputLabel, Link, List, ListItem, ListItemText, Menu, MenuItem, OutlinedInput, Radio, Select, Tooltip, Typography, useMediaQuery, useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { formatAED, formatRuppee } from "src/utility";
import CommonDrawer from "../CommonDrawer";
import PremiumCoverSection from "../premiumCoverSection";
import { ErrorsCarPoliciesData, policyType } from "src/mockData/policiesData";
import { CommonDropdown } from "src/views/components/commonDropdown";
import themeConfig from "src/configs/themeConfig";
import { CommonTextField } from "src/views/components/commonTextField";
import { useDispatch, useSelector } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { formatKeyName } from "src/common/constants";
import { actionGetQuoteMaster, actionUpdateQuoteDetails } from "src/store/quoteDetails";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { set } from "nprogress";
import { actionBuyGodigitInsurance } from "src/store/godigit_proposal";
import { setProposalId, setQuoteId } from "src/store/urlReference";
import { actionBuyFGInsurance } from "src/store/future_generali_proposal";
import AddOnsSection from "../addOnsSection";
import { actionBuyHDFCInsurance } from "src/store/hdfc_proposal";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const MenuProps = {
  PaperProps: {
    style: {
      // maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  MenuListProps: {
    // style: {

    // },
    style: {
      backgroundColor: "red",
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "yellow !important",
      },
    },
  },
};

const availableAddOns = [
  { id: "zero_depreciation", label: "Zero Depreciation" },
  { id: "invoice_price", label: "Invoice Price" },
  { id: "24x7_road_side_assistance", label: "24x7 Road Side Assistance" },
  { id: "key_lock_replacement", label: "Key Lock Replacement" },
  { id: "ncb_protector", label: "NCB Protection" },
  { id: "engine_protection", label: "Engine Protection" },
  { id: "consumables", label: "Consumables" },
  { id: "tyre_secure", label: "Tyre Secure" },
  { id: "emergency_expense", label: "Emergency transport and hotel expenses" },
  { id: "personal_loss", label: "Loss of personal belongings" },
  { id: "driver_cover", label: "Driver Cover" },
  { id: "passenger_cover", label: "Passenger Cover" },
  { id: "electrical_accessories", label: "Electrical Accessories" },
  { id: "non_electrical_accessories", label: "Non Electrical Accessories" },
];

const CarDisplayList = ({
  quoteAddOns,
  quoteDetails,
  quoteErrors,
  quoteDetailsObj,
  CarPoliciesData,
  addOnsSelected = null,
  filtersData,
  setIsCompareSelected,
  isCompareSelected,
  quoteLoading,
  quotePolicyTypes,
  fetchQuotesWithRetry,
  globalIdvValue
}) => {

  // const [expandedItems, setExpandedItems] = useState(
  //   CarPoliciesData?.map(() => true) // Initialize all items as expanded
  // );

  // const [displayData, setDisplayData] = useState(CarPoliciesData);
  // const [dependentAddonList, setDependentAddonList] = useState([]);

  const filterByTypeOptions = ["Third Party", "Comprehensive"];
  const sortOptions = [
    "None",
    "Low to High (Premium)",
    "High to Low (Premium)",
  ];

  const dispatch = useDispatch();
  const router = useRouter();

  const quoteData = useSelector((state) => state.quoteDetailsStore);
  const { QUOTE_ID } = useSelector((state) => state?.urlReferenceStore);



  const [sortValue, setSortValue] = useState("");
  const [showMoreErrors, setShowMoreErrors] = useState(false);
  const [selectedPremiumBreakup, setSelectedPremiumBreakup] = useState(null);
  const [ICMessageVisible, setICMessageVisible] = useState(false);

  const [isAppliedNameFilter, setIsAppliedNameFilter] = useState(false);
  const [selectedNameFilters, setSelectedNameFilters] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);

  // BY TYPE
  const [isAppliedTypeFilter, setIsAppliedTypeFilter] = useState(false);

  const [selectedTypeFilters, setSelectedTypeFilters] = useState(
    filterByTypeOptions[0]
  );

  const [selectedFilters, setSelectedFilters] = useState({
    sortBy: sortOptions?.[0],
    nameFilters: [],
    isNameFilterApplied: false,
    typeFilters: filterByTypeOptions[0],
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorByTypeEl, setAnchorByTypeEl] = useState(null);
  const [anchorSortEl, setAnchorSortEl] = useState(null);
  const [uniqueCompanies, setUniqueCompanies] = useState([]);

  const [filteredQuoteDetails, setFilteredQuoteDetails] = useState();
  const [availableQuoteDetails, setAvailableQuoteDetails] = useState();

  const [chosenCompaniesIds, setChosenCompaniesIds] = useState();
  const [selectedFilterValue, setSelectedFilterValue] = useState(sortOptions?.[0]);

  const [selectedPolicy, setSelectedPolicy] = useState("");

  const isMobile = useMediaQuery("(max-width: 1000px)");
  const isSmallScreen = useMediaQuery("(max-width: 1300px)");
  const theme = useTheme();

  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleExpand = (index) => {
    setExpandedItems((prev) =>
      prev.map((isExpanded, i) => (i === index ? !isExpanded : isExpanded))
    );
  };

  const handleCloseFilterMenu = ({ isClear, key }) => {
    console.log("isClear", isClear);
    setAnchorEl(null);
    setAnchorByTypeEl(null);
    setAnchorSortEl(null);
  };
  const handleClear = () => {
    setSelectedFilters((prev) => ({
      ...prev,
      nameFilters: [],
      isNameFilterApplied: false,
    }));
    handleCloseFilterMenu({ isClear: true, key: "name" });
  };

  const handleApplyFilter = () => {
    setIsAppliedNameFilter(true);
    setSelectedFilters({ ...selectedFilters, isNameFilterApplied: true });
    setAnchorEl(null);
  };

  const handleApplyTypeFilter = () => {
    setIsAppliedTypeFilter(true);
    setAnchorByTypeEl(null);
  };

  useEffect(() => {
    let filteredQuotes = [];

    // Filter quotes based on selected companies
    const quotesOfChosenCompanies = (chosenCompaniesIds?.length && quoteDetails?.length)
      ? quoteDetails.filter(quote =>
        chosenCompaniesIds.includes(quote?.pjMasterInsuranceCompanies?.id)
      )
      : [];

    // Apply sorting if a filter value is selected
    if (selectedFilterValue) {
      filteredQuotes = handleSort(
        quotesOfChosenCompanies.length ? quotesOfChosenCompanies : quoteDetails,
        selectedFilterValue
      );
    } else {
      filteredQuotes = quotesOfChosenCompanies.length ? quotesOfChosenCompanies : quoteDetails;
    }

    setFilteredQuoteDetails(filteredQuotes);
    setAvailableQuoteDetails(filteredQuotes);
  }, [chosenCompaniesIds, quoteDetails, selectedFilterValue]);

  const handleSort = (quotesArray, selectedFilterValue) => {
    const sortedQuotes = [...(quotesArray || [])];

    if (selectedFilterValue === "High to Low (Premium)") {
      sortedQuotes.sort((a, b) => (b?.total_premium ?? 0) - (a?.total_premium ?? 0));
    } else if (selectedFilterValue === "Low to High (Premium)") {
      sortedQuotes.sort((a, b) => (a?.total_premium ?? 0) - (b?.total_premium ?? 0));
    }

    console.log(sortedQuotes, "Sorted Quotes for", selectedFilterValue);
    return sortedQuotes;
  };

  const updateChosenCompaniesList = (ids) => {
    let temp = [];
    ids.forEach((id) => {
      const company = uniqueCompanies.find((company) => company.id === id);
      if (company) {
        temp.push(company.id);
      }
    })
    setChosenCompaniesIds(temp);
  }


  const handlePolicyTypeChange = async (value) => {

    const params = {
      "reference_id": quoteDetailsObj?.quote_id,
      "policy_type": value,
      "idv": quoteDetailsObj?.idv,
      "manufacture_date": quoteDetailsObj?.manufacture_date,
      "registration_date": quoteDetailsObj?.registration_date,
      "previous_policy_type": quoteDetailsObj?.previous_policy_type,
      "previous_tp_policy_expire_date": quoteDetailsObj?.previous_tp_policy_expire_date,
      "previous_policy_expire_date": quoteDetailsObj?.previous_policy_expire_date,
      "is_claim_made_last_year": quoteDetailsObj?.is_claim_made_last_year,
      "previous_ncb_percentage": quoteDetailsObj?.previous_ncb_percentage,
      "proposer_type": quoteDetailsObj?.proposer_type,
    }

    if (quoteDetailsObj?.electrical_kit_value != null) {
      params.electrical_kit_value = quoteDetailsObj.electrical_kit_value;
    }

    if (quoteDetailsObj?.non_electrical_kit_value != null) {
      params.non_electrical_kit_value = quoteDetailsObj.non_electrical_kit_value;
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

    if (quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type !== 'used') {
      // console.log("new case");
      delete params.previous_policy_type;
      delete params.previous_tp_policy_expire_date;
      delete params.previous_policy_expire_date;
      delete params.is_claim_made_last_year;
      delete params.previous_ncb_percentage;
    }

    console.log(params);

    // try {
    //   const response = await dispatch(actionUpdateQuoteDetails(params)).unwrap();

    //   if (response?.result === true && response?.status === 200) {
    //     // toast.success(response?.message || "Quote details updated!");
    //     const refId = response?.response?.reference_id;

    //     localStorage.setItem("QUOTE_ID", response?.response?.reference_id);
    //     dispatch(setQuoteId(response?.response?.reference_id));

    //     dispatch(actionGetQuoteMaster({ reference_id: refId }));

    //     router.push({
    //       pathname: "/car-insurance-list",
    //       query: { quoteId: refId },
    //     });

    //     // Start retry logic
    //     // fetchQuotesWithRetry(refId);
    //   } else {
    //     toast.error(response?.message || "Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   toast.error("Some error occurred. Please try again.");
    //   console.error("Quote details update failed:", error);
    // }
  };

  const handleBuyInsurance = async (quote) => {

    console.log('quote', quote)

    let params = {
      reference_id: QUOTE_ID,
      pj_sub_product_insurer_plan_package_id: quote?.pj_sub_product_insurer_plan_package_id,
      is_pa_opted: quote?.applicable_personal_accident_cover ? 1 : 0,
      is_driver_cover_opted: quote?.applicable_driver_cover ? 1 : 0,
    }

    const addon_covers = {};

    Object.entries(quote?.applicable_addons_summary || {})?.forEach(([addonKey, addonData]) => {
      addon_covers[addonKey] = true;

      if (Array.isArray(addonData.values)) {
        addonData.values.forEach((subAddon) => {
          addon_covers[subAddon] = true;
        });
      }
    });


    if (quote?.applicable_passenger_cover) {
      params.passenger_cover_value = quote?.passenger_cover?.find(item => item?.premium == quote?.applicable_passenger_cover?.amount)?.cover
    }

    params.addon_covers = addon_covers;

    ["driver_cover", "passenger_cover"].forEach((key) => {
      if (key in params.addon_covers) {
        delete params.addon_covers[key];
      }
    });


    console.log('params', params)

    router.push({
      pathname: `/fourwheeler/proposal_checkout`,
      query: { quoteId: QUOTE_ID }
    });


    // try {
    //   let response;

    //   if (quote?.pjMasterInsuranceCompanies?.name == 'godigit') {
    //     response = await dispatch(actionBuyGodigitInsurance(params)).unwrap();
    //   }
    //   else if (quote?.pjMasterInsuranceCompanies?.name == 'future_generali') {
    //     response = await dispatch(actionBuyFGInsurance(params)).unwrap();
    //   }
    //   else if (quote?.pjMasterInsuranceCompanies?.name == 'hdfc') {
    //     response = await dispatch(actionBuyHDFCInsurance(params)).unwrap();
    //   }
    //   else {
    //     response = {};
    //   }
    //   if (response?.result == true) {
    //     const proposalId = response?.response?.proposal_id;

    //     if (proposalId) {
    //       localStorage.setItem("PROPOSAL_ID", proposalId);
    //       dispatch(setProposalId(proposalId));
    //     }

    //     router.push({
    //       pathname: `/fourwheeler/${quote?.pjMasterInsuranceCompanies?.name}/checkout`,
    //       query: { quoteId: QUOTE_ID, proposalId: proposalId }
    //     });
    //   }
    //   else {
    //     toast.error(response?.message?.message || "Some error occured")
    //   }

    // } catch (error) {
    //   console.error("Failed to buy insurance:", error);
    // }
  }


  useEffect(() => {
    // console.log(CarPoliciesData, "CarPoliciesData");
    setFilterOptions(
      Array.from(new Set(CarPoliciesData?.map((item) => item.title)))?.map(
        (title) => ({ title: title, value: title })
      )
    );
  }, [CarPoliciesData]);


  function getTitleById(id) {
    const coverageOptions = quoteData?.QUOTE_MASTER?.response?.addons || [];
    const item = coverageOptions.find(option => option.id === id);
    return item ? item.title : null;
  }



  useEffect(() => {
    if (quoteDetailsObj?.premiums?.length) {
      const uniqueMap = quoteDetailsObj.premiums.reduce((acc, curr) => {
        const company = curr.pjMasterInsuranceCompanies;
        if (!acc[company.id]) {
          acc[company.id] = company;
        }
        return acc;
      }, {});

      const uniqueCompanies = Object.values(uniqueMap);
      setUniqueCompanies(uniqueCompanies);
      console.log("Unique Companies:", uniqueCompanies);
    }
    setSelectedPolicy(quoteDetailsObj?.policy_type);
  }, [quoteDetailsObj]);

  return (
    <Box
      pl={isMobile ? 0 : 4}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      py={2}
    >

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          mb={6}
          py={2}
          px={isMobile ? 1 : 2}
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          alignItems={isMobile ? "stretch" : "center"}
          justifyContent={isMobile ? "flex-start" : "flex-end"}
          gap={4}
        >
          {/* Insurer Dropdown with Badge */}
          <Badge
            badgeContent={
              uniqueCompanies?.filter(c => chosenCompaniesIds?.includes(c.id))?.length || null
            }
            color="primary"
          >
            <FormControl size="small" fullWidth={isMobile} sx={{ minWidth: isMobile ? "100%" : "12rem" }}>
              <InputLabel id="insurer-label">Insurer</InputLabel>
              <Select
                labelId="insurer-label"
                id="insurer-select"
                multiple
                autoWidth={false}
                MenuProps={{
                  anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                  },
                  transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                  },
                }}
                value={uniqueCompanies?.filter(c => chosenCompaniesIds?.includes(c.id)).map(c => c.id)}
                onChange={(event) => {
                  const selectedIds = event.target.value;

                  if (selectedIds.includes("select-all-option")) {
                    const allIds = uniqueCompanies.map(c => c.id);
                    setUniqueCompanies(prev =>
                      prev.map(company => ({ ...company, selected: true }))
                    );
                    updateChosenCompaniesList(allIds);
                    return;
                  }

                  if (selectedIds.includes("clear-all-option")) {
                    setUniqueCompanies(prev =>
                      prev.map(company => ({ ...company, selected: false }))
                    );
                    updateChosenCompaniesList([]);
                    return;
                  }

                  setUniqueCompanies(prev =>
                    prev.map(company => ({
                      ...company,
                      selected: selectedIds.includes(company.id),
                    }))
                  );
                  updateChosenCompaniesList(selectedIds);
                }}
                input={<OutlinedInput label="Insurer" />}
                renderValue={(selectedIds) => {
                  const selectedLabels = uniqueCompanies
                    .filter(c => chosenCompaniesIds.includes(c.id))
                    .map(c => c.label)
                    .join(", ");
                  return (
                    <Box sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>
                      <Typography variant="body2" fontSize="0.7rem">
                        {selectedLabels || "Select"}
                      </Typography>
                    </Box>
                  );
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1, py: 0.5 }}>
                  <MenuItem value="select-all-option" onClick={(e) => {
                    e.stopPropagation();
                    const allIds = uniqueCompanies.map(c => c.id);
                    setUniqueCompanies(prev => prev.map(company => ({ ...company, selected: true })));
                    updateChosenCompaniesList(allIds);
                  }}>
                    <Typography variant="body2">Select All</Typography>
                  </MenuItem>
                  <MenuItem value="clear-all-option" onClick={(e) => {
                    e.stopPropagation();
                    setUniqueCompanies(prev => prev.map(company => ({ ...company, selected: false })));
                    updateChosenCompaniesList([]);
                  }}>
                    <Typography variant="body2">Clear</Typography>
                  </MenuItem>
                </Box>
                <Divider />
                {uniqueCompanies.map((item) => (
                  <MenuItem sx={{ py: 0, pl: 0 }} key={item.id} value={item.id}>
                    <Checkbox checked={chosenCompaniesIds?.includes(item?.id) || false} />
                    <ListItemText primary={item.label} sx={{
                      '& .MuiListItemText-primary': {
                        fontSize: '13px'
                      }
                    }} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Badge>

          {/* Policy Type Dropdown */}
          {/* {quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type === 'used' && ( */}
          {/* <FormControl size="small" fullWidth={isMobile} sx={{ minWidth: isMobile ? "100%" : "12rem" }}>
            <InputLabel id="policy-type-label">Policy Type</InputLabel>
            <Select
              labelId="policy-type-label"
              id="policy-type"
              value={selectedPolicy || ""}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              onChange={(event) => {
                console.log("check",quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type);
                console.log("check",quoteDetailsObj?.pjCarEnquiryDetails?.registration_year);
                // setSelectedPolicy(event.target.value);
                // handlePolicyTypeChange(event.target.value);
              }}
              input={<OutlinedInput label="Policy Type" />}
              renderValue={(selected) => {
                const selectedLabel = quotePolicyTypes.find(item => item.value === selected)?.label;
                return <Typography variant="body2">{selectedLabel || "Select Policy Type"}</Typography>;
              }}
            >
              {quotePolicyTypes?.map((type) => (
                <MenuItem key={type.value} value={type.value} sx={{ fontSize: "0.75rem" }}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}

          <FormControl size="small" fullWidth={isMobile} sx={{ minWidth: isMobile ? "100%" : "12rem" }}>
            <InputLabel id="policy-type-label">Policy Type</InputLabel>
            <Select
              labelId="policy-type-label"
              id="policy-type"
              value={selectedPolicy || ""}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              onChange={(event) => {
                const selectedValue = event.target.value;
                const registrationYear = quoteDetailsObj?.pjCarEnquiryDetails?.registration_year;
                const insuranceType = quoteDetailsObj?.pjCarEnquiryDetails?.insurance_type;

                // Get current year and last two years
                const currentYear = new Date().getFullYear();
                const lastTwoYears = [currentYear - 1, currentYear - 2];

                // Check if registration year is one of the last two years and insurance type is "used"
                if (lastTwoYears.includes(parseInt(registrationYear)) && insuranceType?.toLowerCase() === 'used') {
                  // Show dialog box using Material-UI Dialog (you'll need to add state for this)
                  setErrorDialogOpen(true);
                  setErrorMessage('A valid Third Party policy is already active. Please select an appropriate policy type accordingly.');
                  return; // Exit without setting state or calling handler
                }

                // If validation passes, set state and call handler
                setSelectedPolicy(selectedValue);
                handlePolicyTypeChange(selectedValue);
              }}
              input={<OutlinedInput label="Policy Type" />}
              renderValue={(selected) => {
                const selectedLabel = quotePolicyTypes?.find(item => item.value === selected)?.label;
                return <Typography variant="body2">{selectedLabel || "Select Policy Type"}</Typography>;
              }}
            >
              {quotePolicyTypes?.map((type) => (
                <MenuItem key={type.value} value={type.value} sx={{ fontSize: "0.75rem" }}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* )} */}

          {/* Sort By Dropdown */}
          <FormControl size="small" fullWidth={isMobile} sx={{ minWidth: isMobile ? "100%" : "12rem" }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              id="sort-by"
              value={selectedFilterValue || ""}
              input={<OutlinedInput label="Sort By" />}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
              }}
              renderValue={() => (
                <Typography variant="body2">{selectedFilterValue || "Sort By"}</Typography>
              )}
            >
              {sortOptions?.map((name, index) => (
                <MenuItem
                  key={name}
                  value={name}
                  onClick={() => {
                    setSelectedFilters((prev) => ({ ...prev, sortBy: name }));
                    setSelectedFilterValue(name);
                  }}
                  sx={{ fontSize: "0.75rem", py: 0, pl: 0 }}
                >
                  <Checkbox checked={selectedFilterValue === name} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: selectedFilterValue === name ? 'white' : 'inherit'
                    }}>
                    {name}
                  </Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {
        ((!filteredQuoteDetails || filteredQuoteDetails?.length == 0)) ?
          <Box sx={{ height: "30vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h4">{quoteLoading ? "Fetching Quotes!" : "No quotes found!"}</Typography>
          </Box>
          :
          <List sx={{ p: 0 }}>
            {
              // displayData
              filteredQuoteDetails
                ?.map((quote, index) => {
                  return (
                    <ListItem
                      key={quote.id}
                      id={quote.id}
                      sx={{
                        mt: index == 0 ? 4 : 0,
                        boxShadow: 10,
                        mb: 8,
                        borderRadius: "10px",
                        background: "white",
                        minHeight: "8rem",
                      }}
                    >
                      <Grid
                        container
                        // spacing={4}
                        rowSpacing={4}
                        p={0}
                        height={"100%"}
                        sx={{
                          height: "100%",
                          minHeight: "8rem",
                          justifyContent: "right",
                        }}
                      >
                        <Grid item xs={12} sm={9} lg={10}>
                          <Grid container>

                            <Grid
                              item
                              xs={12}
                              sm={3}
                              xl={3}
                              display="flex"
                              gap={2}
                              justifyContent="center"
                              alignItems="center"
                              px={3}
                              position="relative"
                            >
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: {
                                    xs: -30, // smaller negative top for mobile
                                    sm: -25,
                                    md: -25,
                                  },
                                  left: {
                                    xs: "auto",
                                    sm: 10,
                                  },
                                  right: {
                                    xs: 0,
                                    sm: "auto",
                                  },
                                  height: {
                                    xs: "55px",
                                    sm: "60px",
                                    md: "65px",
                                  },
                                  width: {
                                    xs: "100px",
                                    sm: "100px",
                                    md: "105px",
                                  },
                                  borderRadius: "15px",
                                  backgroundImage: `url(${quote?.pjSubProductInsurerPlanPackages?.pjSubProductInsurerPlanDetails?.pjSubProductInsurerMapping?.logo_url ??
                                    "/images/company_logo/icici.png"
                                    })`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  objectFit: 'contain'
                                }}
                              />
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sm={9}
                              xl={9}
                              // p={4}
                              // px={2}
                              // pr={3}
                              display={"flex"}
                              flexDirection={isMobile ? "column" : "row"}
                              alignItems={isMobile ? "baseline" : "center"}
                              justifyContent={"space-between"}
                              sx={{
                                mt: {
                                  xs: 6,
                                  sm: 0
                                },
                                pl: {
                                  xs: 0,
                                  md: 4,
                                  lg: 0
                                }
                              }}

                            >
                              {" "}
                              <Typography variant="h4" fontWeight={500}>
                                {quote?.pjMasterInsuranceCompanies?.label}
                              </Typography>{" "}
                              <Tooltip
                                arrow
                                title="Car Value is Maximum Value you receive in case of full damage or theft of your car."
                              >
                                {quoteData?.QUOTE_MASTER?.response?.is_idv_visible &&
                                  <Typography
                                    variant="h5"
                                    sx={{
                                      //   width: "100%",
                                      textAlign: "justify",
                                      textWrap: "nowrap",
                                      fontWeight: 100,
                                      fontSize: "1rem",
                                      ml: 2
                                    }}
                                  >
                                    {/* IDV: {formatRuppee(quote?.idv ? quote?.idv : quote?.min_idv)} */}
                                    IDV: {formatAED(globalIdvValue)}
                                  </Typography>
                                }
                              </Tooltip>
                            </Grid>
                            <AddOnsSection quote={quote} getTitleById={getTitleById} />
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={12}
                          sm={3}
                          // ml={{ xs: 0, sm: 2 }}
                          lg={2}
                          gap={2}
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          flexDirection={"column"}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 4 }}
                            fullWidth
                            // endIcon={<ArrowForward />}
                            onClick={() => {
                              handleBuyInsurance(quote)
                            }}
                          >
                            {/* {formatRuppee(
                              (quote?.total_premium || 0) +
                              (quote?.applicable_personal_accident_cover?.amount || 0) +
                              (quote?.cng_lpg?.cng_lpg_kit || 0) +
                              (quote?.cng_lpg?.cng_lpg_tp_kit || 0) +
                              (quote?.applicable_driver_cover?.amount || 0) +
                              (quote?.applicable_passenger_cover?.amount || 0) +
                              (quote?.applicable_electrical_kit?.amount || 0) +
                              (quote?.applicable_non_electrical_kit?.amount || 0) -
                              (quote?.ncb || 0)
                            )} */}
                            {formatAED(
                              (quote?.total_premium || 0) +
                              (quote?.applicable_personal_accident_cover?.amount || 0) +
                              (quote?.cng_lpg?.cng_lpg_kit || 0) +
                              (quote?.cng_lpg?.cng_lpg_tp_kit || 0) +
                              (quote?.applicable_driver_cover?.amount || 0) +
                              (quote?.applicable_passenger_cover?.amount || 0) +
                              (quote?.applicable_electrical_kit?.amount || 0) +
                              (quote?.applicable_non_electrical_kit?.amount || 0) -
                              (quote?.ncb || 0)
                            )}
                          </Button>

                          {/* <Box
                            display={"flex"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            width={"100%"}
                          >
                            <Tooltip title="Premium Breakup">
                              <CalculateOutlined
                                color="success"
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                  setSelectedPremiumBreakup(quote);
                                  console.log("rohanrana", quote);
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="Policy Wording">
                              <PictureAsPdfOutlined
                                color="error"
                                sx={{ cursor: "pointer" }}
                                onClick={() =>
                                  window.open(
                                    quote?.pjSubProductInsurerPlanPackages?.pjSubProductInsurerPlanDetails?.pjSubProductInsurerMapping?.policy_wording_url,
                                    "_blank"
                                  )
                                }
                              />
                            </Tooltip>

                            <Tooltip title="Cashless Garage">
                              <GarageOutlined
                                color="warning"
                                sx={{ cursor: "pointer" }}
                                onClick={() =>
                                  window.open(
                                    // "https://www.icicilombard.com/cashless-garages",
                                    quote?.pjSubProductInsurerPlanPackages?.pjSubProductInsurerPlanDetails?.pjSubProductInsurerMapping?.cashless_url,
                                    "_blank"
                                  )
                                }
                              />
                            </Tooltip>
                          </Box> */}

                          {/* Checkbox for comparison commented for now */}

                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                checked={isCompareSelected.some(
                                  (compareItem) => compareItem.id === quote.id
                                )}
                                sx={{ fontSize: ".7rem" }}
                                size="small"
                              />
                            }
                            label={"Add to Compare"}
                            onChange={(e) => {
                              // if(isCompareSelected.length > 4) return ;

                              if (isCompareSelected.length < 4) {
                                setIsCompareSelected((prev) =>
                                  prev.some((compareItem) => compareItem.id === quote.id)
                                    ? prev.filter(
                                      (compareItem) => compareItem.id !== quote.id
                                    )
                                    : [...prev, { ...quote, addOnsSelected }]
                                );
                              } else {
                                setIsCompareSelected((prev) =>
                                  prev.filter(
                                    (compareItem) => compareItem.id !== quote.id
                                  )
                                );
                              }
                            }}
                            sx={{
                              width: "100%",
                              textWrap: "nowrap",
                              textOverflow: "ellipsis",
                              fontSize: ".7rem",
                            }}
                          /> */}
                        </Grid>


                      </Grid>
                    </ListItem>
                  );
                })}
          </List>
      }
      {
        quoteLoading &&
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "10vh" }}>
          <CircularProgress disableShrink />
        </Box>
      }
      {
        (!quoteLoading && quoteErrors?.length !== 0) && (
          <Grid
            container
            p={4}
            px={6}
            sx={{
              boxShadow: 10,
              // mb: 10,
              borderRadius: "10px",
              background: "white",
              position: "relative",
            }}
          >
            <IconButton
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                height: "80px",
                width: "80px",
                background: "#FF7F7F",
              }}
            >
              <GppMaybeRounded
                sx={{ color: "white", height: "60px", width: "60px" }}
              />
            </IconButton>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight={800}
                sx={{ fontSize: "1.2rem" }}
              >
                Quote Not Received from the Following Insurers
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <List>
                {
                  quoteErrors?.slice(0, showMoreErrors ? quoteErrors.length : 3)
                    // quoteErrors
                    .map((item, index) => {
                      return (
                        <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                          <Grid
                            container
                            p={0}
                            height={"100%"}
                            gap={2}
                            alignItems={"center"}
                            sx={{
                              height: "100%",
                              // minHeight: "2rem",
                              // justifyContent: "right",
                            }}
                          >
                            {/* <Grid item xs={1} display={"flex"}  alignItems={"center"} > */}
                            <img
                              src={item?.pjMasterInsuranceCompanies?.pjSubProductInsurerMapping[0]?.logo_url}
                              alt="car"
                              style={{ width: "40px", height: "40px" }}
                            />
                            {/* </Grid>
                      <Grid item xs={10}> */}
                            <Box>
                              <Typography
                                variant="h6"
                                // fontWeight={800}
                                sx={{ fontSize: ".82rem" }}
                              >
                                {item?.pjMasterInsuranceCompanies?.label}
                              </Typography>

                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography
                                  variant="body1"
                                  fontWeight={500}
                                  sx={{ fontSize: ".82rem" }}
                                  color="error"
                                >
                                  {item?.error_msg}
                                </Typography>

                                {/* <Button
                                  variant="text"
                                  sx={{ py: 1, px: 1, minHeight: 'auto', color: 'primary.main', fontSize: ".82rem", ml: 1 }}
                                  onClick={() => {
                                    setICMessageVisible(prev => !prev)
                                  }}
                                >
                                  {ICMessageVisible ? "Read Less" : "Read More"}
                                </Button> */}
                                <Typography
                                  component="span"
                                  onClick={() => setICMessageVisible(prev => !prev)}
                                  sx={{
                                    cursor: 'pointer',
                                    color: '#0000EE',
                                    textDecoration: 'underline',
                                    fontSize: '.82rem',
                                    // fontWeight: 600,
                                    ml: 2,
                                    userSelect: 'none',
                                  }}
                                >
                                  {ICMessageVisible ? 'Read Less' : 'Read More'}
                                </Typography>
                              </Box>

                              {
                                ICMessageVisible &&
                                <Typography
                                  variant="body1"
                                  sx={{ fontSize: ".82rem", wordBreak: 'break-word' }}
                                >
                                  {item?.ic_error_msg}
                                </Typography>
                              }
                            </Box>
                            {/* </Grid> */}
                          </Grid>
                        </ListItem>
                      );
                    })}
              </List>
            </Grid>

            {quoteErrors?.length > 3 && (
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Button
                  sx={{
                    mt: 2,
                    borderRadius: "30px",
                    background: "white",
                    color: theme.palette.primary.main,
                    border: 1,
                    borderColor: theme.palette.primary.main,
                  }}
                  size="small"
                  onClick={() => setShowMoreErrors(!showMoreErrors)}
                >
                  {showMoreErrors ? "Show Less" : "Show More"}
                </Button>
              </Grid>
            )}
          </Grid>
        )
      }
      {/* <Drawer
            anchor={"right"}
            open={true}
            onClose={() => {}}
          >
            asd
          </Drawer> */}
      {
        Boolean(selectedPremiumBreakup) && (
          <PremiumCoverSection
            quoteData={selectedPremiumBreakup}
            quoteMaster={quoteData?.QUOTE_MASTER?.response}
            CarPoliciesData={selectedPremiumBreakup}
            addOnsSelected={addOnsSelected}
            selectedPremiumBreakup={selectedPremiumBreakup}
            setSelectedPremiumBreakup={setSelectedPremiumBreakup}
            quoteDetailsObj={quoteDetailsObj}
            filtersData={filtersData}
            handleBuyInsurance={handleBuyInsurance}
            getTitleById={getTitleById}
          />
        )
      }
      {/* filter by name menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseFilterMenu}
      >
        {filterOptions?.map((row, i) => {
          return (
            <MenuItem
              key={i}
              onClick={(e, newValue) => {
                setIsAppliedNameFilter(false);
                if (!selectedNameFilters?.includes(row.value)) {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    nameFilters: [...prev.nameFilters, row.value],
                    isNameFilterApplied: false,
                  }));
                  setSelectedNameFilters((prev) => [...prev, row.value]);
                } else {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    nameFilters: prev.nameFilters.filter(
                      (item) => item !== row.value
                    ),
                    isNameFilterApplied: false,
                  }));
                  setSelectedNameFilters((prev) =>
                    prev.filter((item) => item !== row.value)
                  );
                }
              }}
            >
              {" "}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.nameFilters?.includes(row.value)}
                  />
                }
                label={row.title}
              />
            </MenuItem>
          );
        })}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button variant="text" color="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="text" color="primary" onClick={handleApplyFilter}>
            Apply
          </Button>
        </Box>
      </Menu>

      {/* filter by type menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorByTypeEl}
        open={Boolean(anchorByTypeEl)}
        onClose={handleCloseFilterMenu}
      // MenuListProps={{
      //   "aria-labelledby": "basic-button",
      // }}
      >
        {filterByTypeOptions?.map((row, i) => {
          return (
            <MenuItem
              key={i}
              onClick={(e, newValue) => {
                console.log(row);
                // setSelectedTypeFilters(row);
                setSelectedFilters((prev) => ({
                  ...prev,
                  typeFilters: row,
                }));
                // handleCloseFilterMenu({ isClear: false, key: "" });
                // setIsAppliedTypeFilter(false);
              }}
            >
              {" "}
              <FormControlLabel
                control={
                  <Checkbox checked={selectedFilters.typeFilters == row} />
                }
                label={row}
              />
            </MenuItem>
          );
        })}
      </Menu>

      {/* sort by menu */}
      <Menu
        id="basic-menu"
        anchorEl={anchorSortEl}
        open={Boolean(anchorSortEl)}
        onClose={handleCloseFilterMenu}
      // MenuListProps={{
      //   "aria-labelledby": "basic-button",
      // }}
      >
        {sortOptions?.map((row, i) => {
          return (
            <MenuItem
              key={i}
              onClick={(e, newValue) => {
                // handleCloseFilterMenu({ isClear: false, key: "" });
                setSelectedFilters((prev) => ({
                  ...prev,
                  sortBy: row,
                }));
                // setSelectedTypeFilters(row);
              }}
            >
              {" "}
              <FormControlLabel
                control={<Checkbox checked={selectedFilters.sortBy == row} />}
                label={row}
              />
            </MenuItem>
          );
        })}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="text"
            color="secondary"
            onClick={() => {
              console.log("clear");
              handleCloseFilterMenu({ isClear: true });
            }}
          >
            Clear
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={handleApplyTypeFilter}
          >
            Apply
          </Button>
        </Box> */}
      </Menu>

      <Dialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="error-dialog-title"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'error.main'
          }}
        >
          <ErrorOutlineIcon />
          Error
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setErrorDialogOpen(false)}
            color="primary"
            variant="contained"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
};

export default CarDisplayList;
