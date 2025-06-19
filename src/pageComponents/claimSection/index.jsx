// import React, { useContext, useEffect, useState } from "react";
// import { Box, Button, TextField, Typography } from "@mui/material";
// import { GlobalContext } from "src/context/appContext";
// import { CommonTextField } from "src/views/components/commonTextField";
// import { useDispatch, useSelector } from "react-redux";
// import { actionCreateLead, setField } from "src/store/tempFormData";

// const ClaimSection = ({ formValues, setFormValues, handleNextStep }) => {
//   const dispatch = useDispatch();
//   const { globalState, setGlobalState, clearGlobalState } = useContext(GlobalContext);
//   const [isMobileValidationError, setIsMobileValidationError] = useState("");
//   const tempFormData = useSelector((state) => state.tempFormDataStore);

//   const [inputValues, setInputValues] = useState({
//     userName: "",
//     userPhone: "",
//     userEmail: ""
//   })

//   useEffect(() => {
//     if (tempFormData) {
//       setInputValues({
//         userName: tempFormData?.USER_NAME || "",
//         userPhone: tempFormData?.USER_PHONE || "",
//         userEmail: tempFormData?.USER_EMAIL || ""
//       });
//     }
//   }, [tempFormData]);


//   const handleNextStepLocal = () => {
//     if (inputValues.userPhone === "") {
//       setIsMobileValidationError("Mobile Number Is Required");
//     } else if (inputValues.userPhone?.length != 10) {
//       setIsMobileValidationError("Please enter a valid mobile number");
//     } else {
//       dispatch(setField({ field: "USER_NAME", value: inputValues.userName }));
//       dispatch(setField({ field: "USER_PHONE", value: inputValues.userPhone }));
//       dispatch(setField({ field: "USER_EMAIL", value: inputValues.userEmail }));
//       dispatch(actionCreateLead({
//         "reference_id": tempFormData?.REFERENCE_DETAILS?.response?.reference_id,
//         "name": inputValues.userName,
//         "mobile": inputValues.userPhone,
//         "email_id": inputValues.userEmail
//       }));
//       handleNextStep("redirectToResultsPage");
//       setIsMobileValidationError("")
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//           Personal Details
//         </Typography>

//         <Typography variant="body">Almost done! Just one last step</Typography>
//       </Box>
//       <CommonTextField
//         fullWidth
//         placeholder="Full Name"
//         value={inputValues?.userName}
//         name="fullName"
//         label="Full Name"
//         onChange={(e) => {
//           setInputValues((prev) => ({
//             ...prev,
//             userName: e.target.value
//           }));
//         }}
//         sx={{ mb: 4 }}
//       />
//       <CommonTextField
//         fullWidth
//         placeholder="Mobile Number"
//         value={inputValues?.userPhone}
//         name="mobile"
//         label="Mobile Number"
//         error={Boolean(isMobileValidationError)}
//         helperText={isMobileValidationError}
//         onChange={(e) => {
//           const { value } = e.target;
//           const re = /^[0-9]{0,10}$/;
//           if (value === "" || re.test(value)) {
//             setInputValues((prev) => ({
//               ...prev,
//               userPhone: value
//             }));
//           }
//         }}
//         sx={{ mb: 4 }}
//         inputProps={{ maxLength: 10 }}
//       />
//       <CommonTextField
//         fullWidth
//         placeholder="Email"
//         value={inputValues?.userEmail}
//         name="email"
//         label="Email"
//         onChange={(e) => {
//           setInputValues((prev) => ({
//             ...prev,
//             userEmail: e.target.value
//           }));
//         }}
//         sx={{ mb: 4 }}
//       />
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//         <Button
//           color="primary"
//           fullWidth
//           variant="contained"
//           onClick={handleNextStepLocal}
//         >
//           View Quotes
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ClaimSection;

import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CommonTextField } from "src/views/components/commonTextField";
import { useDispatch, useSelector } from "react-redux";
import { actionCreateLead, setField } from "src/store/tempFormData";
import toast from "react-hot-toast";

const ClaimSection = ({ formValues, setFormValues, handleNextStep }) => {
  const dispatch = useDispatch();
  const tempFormData = useSelector((state) => state.tempFormDataStore);

  const [inputValues, setInputValues] = useState({
    userName: "",
    userPhone: "",
    userEmail: ""
  });

  const [errors, setErrors] = useState({
    userName: "",
    userPhone: "",
    userEmail: ""
  });

  useEffect(() => {
    if (tempFormData) {
      setInputValues({
        userName: tempFormData?.USER_NAME || "",
        userPhone: tempFormData?.USER_PHONE || "",
        userEmail: tempFormData?.USER_EMAIL || ""
      });
    }
  }, [tempFormData]);

  const validateInputs = () => {
    const newErrors = { userName: "", userPhone: "", userEmail: "" };
    let isValid = true;

    // Name validation
    if (!inputValues.userName.trim()) {
      newErrors.userName = "Full Name is required";
      isValid = false;
    }

    // Mobile validation
    if (!inputValues.userPhone) {
      newErrors.userPhone = "Mobile Number is required";
      isValid = false;
    } else if (inputValues.userPhone.length !== 10) {
      newErrors.userPhone = "Please enter a valid 10-digit mobile number";
      isValid = false;
    }

    // Email validation (simple regex)
    if (!inputValues.userEmail) {
      newErrors.userEmail = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(inputValues.userEmail)) {
      newErrors.userEmail = "Please enter a valid email address";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // const handleNextStepLocal = () => {
  //   if (validateInputs()) {
  //     dispatch(setField({ field: "USER_NAME", value: inputValues.userName }));
  //     dispatch(setField({ field: "USER_PHONE", value: inputValues.userPhone }));
  //     dispatch(setField({ field: "USER_EMAIL", value: inputValues.userEmail }));

  //     dispatch(actionCreateLead({
  //       "reference_id": tempFormData?.REFERENCE_DETAILS?.response?.reference_id,
  //       "name": inputValues.userName,
  //       "mobile": inputValues.userPhone,
  //       "email_id": inputValues.userEmail
  //     }));

  //     toast.success("Lead created successfully!");
  //     handleNextStep("redirectToResultsPage");
  //   }
  // };

  const handleNextStepLocal = async () => {
    if (validateInputs()) {
      dispatch(setField({ field: "USER_NAME", value: inputValues.userName }));
      dispatch(setField({ field: "USER_PHONE", value: inputValues.userPhone }));
      dispatch(setField({ field: "USER_EMAIL", value: inputValues.userEmail }));

      try {
        // const response = await dispatch(actionCreateLead({
        //   reference_id: tempFormData?.REFERENCE_DETAILS?.response?.reference_id,
        //   name: inputValues.userName,
        //   mobile: inputValues.userPhone,
        //   email_id: inputValues.userEmail,
        // })).unwrap();

        // if (response?.result === true && response?.status === 200) {
          // toast.success(response?.message || "Lead created successfully!");
          handleNextStep("redirectToResultsPage");
        // } else {
          // toast.error(response?.message || "Something went wrong. Please try again.");
        // }

      } catch (error) {
        toast.error("Failed to create lead. Please try again.");
        console.error("Lead creation error:", error);
      }
    }
  };



  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Personal Details
        </Typography>
        <Typography variant="body">Almost done! Just one last step</Typography>
      </Box>

      <CommonTextField
        fullWidth
        placeholder="Full Name"
        value={inputValues.userName}
        name="fullName"
        label="Full Name"
        error={Boolean(errors.userName)}
        helperText={errors.userName}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            userName: e.target.value
          }))
        }
        sx={{ mb: 4 }}
      />

      <CommonTextField
        fullWidth
        placeholder="Mobile Number"
        value={inputValues.userPhone}
        name="mobile"
        label="Mobile Number"
        error={Boolean(errors.userPhone)}
        helperText={errors.userPhone}
        onChange={(e) => {
          const { value } = e.target;
          const re = /^[0-9]{0,10}$/;
          if (value === "" || re.test(value)) {
            setInputValues((prev) => ({
              ...prev,
              userPhone: value
            }));
          }
        }}
        sx={{ mb: 4 }}
        inputProps={{ maxLength: 10 }}
      />

      <CommonTextField
        fullWidth
        placeholder="Email"
        value={inputValues.userEmail}
        name="email"
        label="Email"
        error={Boolean(errors.userEmail)}
        helperText={errors.userEmail}
        onChange={(e) =>
          setInputValues((prev) => ({
            ...prev,
            userEmail: e.target.value
          }))
        }
        sx={{ mb: 4 }}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          color="primary"
          fullWidth
          variant="contained"
          onClick={handleNextStepLocal}
        >
          View Quotes
        </Button>
      </Box>
    </Box>
  );
};

export default ClaimSection;

