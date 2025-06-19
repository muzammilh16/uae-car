import {
  Button,
  Chip,
  Link,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { border, borderRadius, Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import CommonDialog from "../commonModal";
import {
  ExpandCircleDownRounded,
  KeyboardArrowDownRounded,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import { actionGetQuoteMaster, actionUpdateQuoteDetails } from "src/store/quoteDetails";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setQuoteId } from "src/store/urlReference";


const tableData = [
  {
    title: "No claim in last 6 or more years",
    value: "50%",
  },
  {
    title: "No claim in last 5 years",
    value: "45%",
  },
  {
    title: "No claim in last 4 years",
    value: "35%",
  },
  {
    title: "No claim in last 3 years",
    value: "25%",
  },
  {
    title: "No claim in last 2 years",
    value: "20%",
  },
  {
    title: "No claim in last year",
    value: "0%",
  },
];
const NcbSection = ({ openModal, setOpenModal, quoteDetailsObj, fetchQuotesWithRetry }) => {
  const theme = useTheme();
  const [showTable, setShowTable] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const quoteData = useSelector((state) => state.quoteDetailsStore);
  const [existingPolicy, setExistingPolicy] = useState([
    {
      label: "Yes",
      isSelected: false,
    },
    {
      label: "No",
      isSelected: true,
    },
  ]);
  const [ncbPercentage, setNcbPercentage] = useState([
    {
      label: "0%",
      isSelected: true,
    },
    {
      label: "20%",
      isSelected: false,
    },
    {
      label: "25%",
      isSelected: false,
    },
    {
      label: "35%",
      isSelected: false,
    },
    {
      label: "45%",
      isSelected: false,
    },
    {
      label: "50%",
      isSelected: false,
    },
  ]);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
      // background: "lightblue",
      color: theme.palette.common.black,
      border: "1px solid grey",
      borderRadius: 0,
    },
    // [`&.${tableCellClasses.body}`]: {
    //   fontSize: 14,
    // },
  }));

  const handleSubmit = async () => {
    // if (typeof window !== "undefined") {
    //   const data = JSON.parse(localStorage.getItem("carEnquiry"));
    let selectedNcbIndex = ncbPercentage?.findIndex((item) => item.isSelected);
    // console.log(selectedNcbIndex);
    let ncbValue =
      // ncbPercentage?.[newValueIndex + 1].label ||
      ncbPercentage?.[selectedNcbIndex].label;

    if (existingPolicy?.[0]?.isSelected) {
      ncbValue = ncbPercentage?.[0]?.label;
    }

    const params = {
      "reference_id": quoteDetailsObj?.quote_id,
      "policy_type": quoteDetailsObj?.policy_type,
      "idv": quoteDetailsObj?.idv,
      "manufacture_date": quoteDetailsObj?.manufacture_date,
      "registration_date": quoteDetailsObj?.registration_date,
      "previous_policy_type": quoteDetailsObj?.previous_policy_type,
      "previous_tp_policy_expire_date": quoteDetailsObj?.previous_tp_policy_expire_date,
      "previous_policy_expire_date": quoteDetailsObj?.previous_policy_expire_date,
      "is_claim_made_last_year": existingPolicy?.[0]?.isSelected ? 1 : 0,
      "previous_ncb_percentage": existingPolicy?.[0]?.isSelected ? null : parseInt(ncbValue),
      "proposer_type": quoteDetailsObj?.proposer_type
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

    console.log(params);

    // try {
    //   const response = await dispatch(actionUpdateQuoteDetails(params)).unwrap();

    //   if (response?.result === true && response?.status === 200) {
    //     // toast.success(response?.message || "Quote details updated!");
    //     const refId = response?.response?.reference_id;

    //     localStorage.setItem("QUOTE_ID", response?.response?.reference_id);
    //     dispatch(setQuoteId(response?.response?.reference_id));

    //     dispatch(actionGetQuoteMaster({ reference_id: refId }));

    //     // router.push({
    //     //   pathname: "/car-insurance-list",
    //     //   query: { quoteId: refId },
    //     // });

    //     // Start retry logic
    //     fetchQuotesWithRetry(refId);
    //   } else {
    //     toast.error(response?.message || "Something went wrong. Please try again.");
    //   }
    // } catch (error) {
    //   toast.error("Some error occurred. Please try again.");
    //   console.error("Quote details update failed:", error);
    // }
    setOpenModal(false);
  };


  useEffect(() => {
    // if (typeof window !== "undefined") {
    //   const data = JSON.parse(localStorage.getItem("carEnquiry"));
    //   console.log("ncbPercentage", data?.ncbPercentage);
    //   setNcbPercentage(
    //     ncbPercentage.map((item, index) =>
    //       index ===
    //       ncbPercentage?.findIndex((item) => item.label === data?.ncbPercentage)
    //         ? // -
    //           //   1
    //           { ...item, isSelected: true }
    //         : { ...item, isSelected: false }
    //     )
    //   );
    //   setExistingPolicy(
    //     data?.isClaimMade
    //       ? [
    //           { label: "Yes", isSelected: true },
    //           { label: "No", isSelected: false },
    //         ]
    //       : [
    //           { label: "Yes", isSelected: false },
    //           { label: "No", isSelected: true },
    //         ]
    //   );
    // }
  }, []);

  useEffect(() => {
    const previousNcb = quoteDetailsObj?.previous_ncb_percentage;

    if (quoteDetailsObj?.is_claim_made_last_year == 1) {
      setExistingPolicy([
        {
          label: "Yes",
          isSelected: true,
        },
        {
          label: "No",
          isSelected: false,
        }
      ])
    }
    if (previousNcb) {
      setNcbPercentage(prev =>
        prev.map(item => ({
          ...item,
          isSelected: item.label === previousNcb + "%",
        }))
      );
    }
  }, [quoteDetailsObj]);

  const getNcbPercentage = (value) => {
    const selectedIndex = ncbPercentage?.findIndex((item) => item.isSelected);
    if (selectedIndex !== ncbPercentage?.length - 1) {
      return ncbPercentage[selectedIndex + 1].label;
    } else {
      return ncbPercentage[selectedIndex].label;
    }
  };

  return (
    <>
      <CommonDialog
        open={openModal}
        header="Confirm your existing NCB%"
        subHeader="This must be mentioned in your existing policy document"
        content={() => {
          return (
            <Box>
              <Box my={2}>
                <Typography
                  sx={{ width: "100%", mb: 2, fontWeight: "bold" }}
                  variant="h6"
                >
                  Did you make a claim in your existing policy?
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                >
                  {existingPolicy.map((item, i) => (
                    <Chip
                      key={i}
                      label={item.label}
                      variant="outlined"
                      color={item.isSelected ? "primary" : "default"}
                      sx={{
                        minWidth: "100px",
                      }}
                      onClick={() => {
                        setExistingPolicy((prev) =>
                          prev.map((item, index) =>
                            index === i
                              ? { ...item, isSelected: !item.isSelected }
                              : { ...item, isSelected: false }
                          )
                        );
                      }}
                    />
                  ))}
                </Stack>
              </Box>
              {existingPolicy?.find((item) => item.label === "Yes")
                .isSelected ? (
                <Box
                  my={4}
                  p={"1px"}
                  borderColor="error"
                  sx={{
                    borderRadius: "3px",
                    backgroundColor: theme.palette.error.main,
                  }}
                >
                  <Typography variant="body1" p={2}>
                    No Claim Bonus (NCB) is 0%
                  </Typography>
                  <Box p={2} sx={{ background: "white" }}>
                    <Typography variant="body2">
                      Your NCB has been reset to 0% since you filed a claim last
                      year
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <>
                  <Box>
                    <Typography
                      sx={{ width: "100%", my: 3, fontWeight: "bold" }}
                      variant="h6"
                    >
                      {/* What is the No Claim Bonus (NCB%) in your current policy? */}
                      Select the NCB% of your current policy
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}
                    >
                      {ncbPercentage?.map((item, i) => (
                        <Chip
                          key={i}
                          label={item.label}
                          variant="outlined"
                          color={item.isSelected ? "primary" : "default"}
                          sx={{
                            minWidth: "100px",
                          }}
                          onClick={() => {
                            setNcbPercentage((prev) =>
                              prev.map((item, index) =>
                                index === i
                                  ? { ...item, isSelected: !item.isSelected }
                                  : { ...item, isSelected: false }
                              )
                            );
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                  <Box
                    my={4}
                    p={"1px"}
                    borderColor="success"
                    sx={{
                      borderRadius: "3px",
                      backgroundColor: theme.palette.success.main,
                    }}
                  >
                    <Typography variant="body1" p={2}>
                      You are eligible for {getNcbPercentage(ncbPercentage)} NCB
                      in your new policy
                    </Typography>
                    <Box p={2} sx={{ background: "white" }}>
                      <Typography variant="body2">
                        If the declared NCB% is incorrect, the Insurance Company
                        may reject your claims. You can check your NCB% in your
                        previous policy document.
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={2}
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setShowTable(!showTable);
                }}
              >
                <Link component="button" variant="body2" underline="always">
                  Check and select the NCB% accordingly{" "}
                </Link>
                <KeyboardArrowDownRounded
                  sx={{ marginRight: 20, color: theme.palette.primary.main }}
                />
              </Box>
              {showTable && (
                <Box>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              background: "grey",
                              color: "white",
                              border: "1px solid grey",
                              textTransform: "none",
                            }}
                          >
                            No Claim Years
                          </TableCell>
                          <TableCell
                            sx={{
                              background: "grey",
                              color: "white",
                              border: "1px solid grey",
                              textTransform: "none",
                            }}
                            align="right"
                          >
                            Existing NCB%
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody sx={{ borderRadius: 0 }}>
                        {tableData.map((item, i) => {
                          return (
                            <TableRow>
                              <StyledTableCell>{item.title}</StyledTableCell>
                              <StyledTableCell align="right">
                                {item.value}
                              </StyledTableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </Box>
          );
        }}
        onClose={() => {
          console.log("sdfbsdkfjshdkfjsh,setOpenModal");
          setOpenModal(false);
        }}
        actionFooter={() => {
          return (
            <Button
              // fullWidth
              onClick={handleSubmit}
              variant="text"
              color="primary"
            >
              Update
            </Button>
          );
        }}
      />
    </>
  );
};

export default NcbSection;
