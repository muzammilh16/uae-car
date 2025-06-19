import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "src/common/api";
import { API_CREATE_ENQUIRY, API_CREATE_LEAD } from "src/common/api/constants";

// Reusable initial state
const initialState = {
    FORM_TYPE: null,
    REGISTRATION_NUMBER: null,
    RTO: null,
    CAR_MAKE: null,
    REGISTRATION_YEAR: null,
    CAR_MODEL: null,
    // CAR_FUEL_TYPE: null,
    CAR_VARIANT: null,
    CAR_SPECIFICATION: null,
    USER_NATIONALITY: null,
    REGISTRATION_CITY: null,
    POLICY_CASE: null,
    IS_CAR_USED: null,
    FIRST_REGISTRATION_YEAR: null,
    UAE_DRIVING_EXP: null,
    INTRL_DRIVING_EXP: null,
    CAR_REGISTRATION_DATE: null,
    CAR_DAMAGE_DURATION: null,
    USER_NAME: null,
    USER_EMAIL: null,
    USER_PHONE: null,
    PREVIOUS_POLICY_EXPIRY_DATE: null,
    IS_OLD_POLICY_CLAIMED: null,
    IS_OWNERSHIP_TRANSFERRED: null,
    REFERENCE_DETAILS: null,
    GAS_TYPE: null,
    GAS_COST: null,
    URL: ""
};

export const actionCreateEnquiry = createAsyncThunk('actionCreateEnquiry', (params) => {
    try {
        return axiosPrivate.post(`${API_CREATE_ENQUIRY}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const actionCreateLead = createAsyncThunk('actionCreateLead', (params) => {
    try {
        return axiosPrivate.post(`${API_CREATE_LEAD}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const tempFormDataStore = createSlice({
    name: "tempFormData",
    initialState,
    reducers: {
        // Generic field setter
        setField: (state, action) => {
            const { field, value } = action.payload;
            if (field in state) {
                state[field] = value;
            }
        },

        // Reset a specific field by name (optional alternative)
        resetField: (state, action) => {
            const field = action.payload;
            if (field in state) {
                state[field] = null;
            }
        },

        resetMultipleFields: (state, action) => {
            const fields = action.payload;
            fields.forEach(field => {
                if (field in state) {
                    state[field] = null;
                }
            });
        },

        // Reset all fields
        resetAll: (state) => {
            console.log("resetting store from store");
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actionCreateEnquiry.fulfilled, (state, action) => {
            state.REFERENCE_DETAILS = action.payload;
        })
    }
});

export const { setField, resetField, resetMultipleFields, resetAll } = tempFormDataStore.actions;

export default tempFormDataStore.reducer;

// Example usage
//dispatch(setField({ field: "RTO", value: "MH12" }));
//dispatch(resetField("RTO"));
//dispatch(resetAll());
// dispatch(resetMultipleFields(["RTO", "REGISTRATION_YEAR"]));