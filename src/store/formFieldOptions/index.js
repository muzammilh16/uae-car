import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "src/common/api";
import { API_GET_FUEL_VARIANTS, API_GET_INSURER_MASTER, API_GET_MAKE_MODELS, API_GET_RTOS } from "src/common/api/constants";

// Reusable initial state
const initialState = {
    RTO_OPTIONS: null,
    FUEL_VARIANT_OPTIONS: null,
    MAKE_MODEL_OPTIONS: null,
    INSURER_MASTER_OPTIONS: {
        "result": true,
        "status": 200,
        "response": [
            {
                "value": 1,
                "label": "TATA AIG GENERAL INSURANCE CO.LTD."
            },
            {
                "value": 2,
                "label": "GoDigit GIC Ltd."
            },
            {
                "value": 3,
                "label": "BAJAJ ALLIANZ GENERAL INSURANCE CO.LTD"
            },
            {
                "value": 4,
                "label": "ICICI LOMBARD GENERAL INSURANCE CO. LTD."
            },
            {
                "value": 5,
                "label": "APOLLO MUNICH (AMHI)"
            },
            {
                "value": 6,
                "label": "IFFCO TOKIO GENERAL INSURANCE CO. LTD."
            },
            {
                "value": 7,
                "label": "NATIONAL INSURANCE CO.LTD."
            },
            {
                "value": 8,
                "label": "THE NEW INDIA ASSURANCE CO. LTD."
            },
            {
                "value": 9,
                "label": "THE ORIENTAL INSURANCE CO. LTD."
            },
            {
                "value": 10,
                "label": "RELIANCE GENERAL INSURANCE CO.LTD."
            },
            {
                "value": 11,
                "label": "DIRECTORATE OF INSURANCE (GIF), GOVT. OF MAHA"
            },
            {
                "value": 12,
                "label": "ROYAL SUNDARAM ALLIANCE INSURANCE CO.LTD."
            },
            {
                "value": 13,
                "label": "ENDURANCE"
            },
            {
                "value": 14,
                "label": "UNITED INDIA INSURANCE CO.LTD."
            },
            {
                "value": 15,
                "label": "CHOLAMANDALAM MS GENERAL INSURANCE CO.LTD."
            },
            {
                "value": 16,
                "label": "GENERAL INSURANCE CORPORATION OF INDIA"
            },
            {
                "value": 17,
                "label": "HDFC ERGO GIC Ltd."
            },
            {
                "value": 18,
                "label": "EXPORT CREDIT GUARANTEE CORPORATION OF INDIA LTD"
            },
            {
                "value": 19,
                "label": "AGRICULTURE INSURANCE CO. OF INDIA LTD."
            },
            {
                "value": 20,
                "label": "STAR HEALTH AND ALLIED INSURANCE COMPANY LIMITED"
            },
            {
                "value": 21,
                "label": "L&T GENERAL INSURANCE CO. LTD."
            },
            {
                "value": 22,
                "label": "MAGMA HDI GENERAL INSURANCE CO LTD"
            },
            {
                "value": 23,
                "label": "Future Generali India GIC Ltd."
            },
            {
                "value": 24,
                "label": "MITSUI INSURANCE"
            },
            {
                "value": 25,
                "label": "UNIVERSAL SOMPO GENERAL INSURANCE CO.LTD."
            },
            {
                "value": 26,
                "label": "Maharashtra Government Insurance Fund"
            },
            {
                "value": 27,
                "label": "BHARTI AXA GENERAL INSURANCE COMPANY LIMITED"
            },
            {
                "value": 28,
                "label": "RAHEJA QBE GENERAL INSURANCE COMPANY LIMITED"
            },
            {
                "value": 29,
                "label": "SBI GENERAL INSURANCE COMPANY LIMITED"
            },
            {
                "value": 30,
                "label": "THE GOVT. OF GUJARAT INSURANCE FUND"
            },
            {
                "value": 31,
                "label": "LIBERTY VIDEOCON GENERAL INSURANCE COMPANY LTD."
            },
            {
                "value": 32,
                "label": "SHRIRAM GENERAL INSURANCE COMPANY LIMITED"
            },
            {
                "value": 33,
                "label": "Religare Health Insurance Company Limited"
            },
            {
                "value": 34,
                "label": "MAX BUPA HEALTH INSURANCE COMPANY LTD."
            },
            {
                "value": 35,
                "label": "CignaTTK Health Insurance Company Limited"
            },
            {
                "value": 36,
                "label": "Aditya Birla Health Insurance Company Limited"
            },
            {
                "value": 37,
                "label": "ACKO General Insurance Ltd"
            },
            {
                "value": 38,
                "label": "KOTAK MAHINDRA GENERAL INSURANCE COMPANY LTD"
            },
            {
                "value": 39,
                "label": "EDELWEISS GENERAL INSURANCE COMPANY LIMITED"
            },
            {
                "value": 40,
                "label": "DHFL COCO GENERAL INSURANCE LIMITED"
            },
            {
                "value": 41,
                "label": "CARE HEALTH INSURANCE LTD"
            },
            {
                "value": 42,
                "label": "MANIPALCIGNA HEALTH INSURANCE CO LTD"
            },
            {
                "value": 43,
                "label": "RELIANCE HEALTH INSURANCE LTD."
            },
            {
                "value": 44,
                "label": "LIBERTY GENERAL INSURANCE LTD."
            },
            {
                "value": 45,
                "label": "APOLLO MUNICH HEALTH INSURANCE LTD."
            },
            {
                "value": 46,
                "label": "HDFC ERGO HEALTH INSURANCE LTD."
            },
            {
                "value": 47,
                "label": "NAVI GENERAL INSURANCE LTD"
            },
            {
                "value": 48,
                "label": "NIVA BUPA (MAX BUPA) HICL"
            },
            {
                "value": 49,
                "label": "SHYAMAL DUTTA"
            }
        ]
    }
};

export const actionGetRTOs = createAsyncThunk('actionGetRTOs', () => {
    try {
        return axiosPrivate.get(`${API_GET_RTOS}`).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const actionGetMakeModels = createAsyncThunk('actionGetMakeModels', () => {
    try {
        return axiosPrivate.get(`${API_GET_MAKE_MODELS}`).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const actionGetFuelVariants = createAsyncThunk('actionGetFuelVariants', (params) => {
    try {
        return axiosPrivate.post(`${API_GET_FUEL_VARIANTS}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const actionGetInsurerMaster = createAsyncThunk('actionGetInsurerMaster', (params) => {
    try {
        return axiosPrivate.get(`${API_GET_INSURER_MASTER}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const formFieldOptionsStore = createSlice({
    name: "formFieldOptions",
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
            Object.assign(state, initialState);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(actionGetRTOs.fulfilled, (state, action) => {
            state.RTO_OPTIONS = action.payload;
        });
        builder.addCase(actionGetMakeModels.fulfilled, (state, action) => {
            state.MAKE_MODEL_OPTIONS = action.payload;
        });
        builder.addCase(actionGetFuelVariants.fulfilled, (state, action) => {
            state.FUEL_VARIANT_OPTIONS = action.payload;
        });
        builder.addCase(actionGetInsurerMaster.fulfilled, (state, action) => {
            state.INSURER_MASTER_OPTIONS = action.payload;
        });
    }
});

export const { setField, resetField, resetMultipleFields, resetAll } = formFieldOptionsStore.actions;

export default formFieldOptionsStore.reducer;
