import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { axiosPrivate } from "src/common/api";

import { API_FG_PROPOSAL_UPDATE, API_FG_BUY_INSURANCE, API_FG_KYC_SUBMIT, API_FG_PROPOSAL_SUBMIT, API_FG_PROPOSAL, API_FG_PINCODE_MASTER, API_FG_KYC_STATUS, API_FG_MASTER_STATE, API_FG_MASTER_CITY, API_FG_PAYMENT_MAKE, API_FG_PAYMENT_STATUS_UPDATE } from "src/common/api/constants";

export const actionUpdateFGProposal = createAsyncThunk('actionUpdateFGProposal', (params) => {
    try {
        return axiosPrivate.post(API_FG_PROPOSAL_UPDATE, params)
            .then(response => response.data)
            .catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionSubmitFGProposal = createAsyncThunk('actionSubmitFGProposal', (params) => {
    try {
        return axiosPrivate.post(API_FG_PROPOSAL_SUBMIT, params)
            .then(response => response.data)
            .catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionFGMasterState = createAsyncThunk('actionFGMasterState', (params) => {
    try {
        return axiosPrivate.get(API_FG_MASTER_STATE)
            .then(response => response.data)
            .catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionFGMasterCity = createAsyncThunk('actionFGMasterCity', (params) => {
    try {
        return axiosPrivate.post(API_FG_MASTER_CITY, params)
            .then(response => response.data)
            .catch(error => error);
    } catch (error) {
        return error;
    }
});


export const actionBuyFGInsurance = createAsyncThunk('actionBuyInsurance', (params) => {
    try {
        return axiosPrivate.post(API_FG_BUY_INSURANCE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetFGPincodeMaster = createAsyncThunk('actionGetFGPincodeMaster', (params) => {
    try {
        return axiosPrivate.post(API_FG_PINCODE_MASTER, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionKYCSubmit = createAsyncThunk('actionKYCSubmit', (params) => {
    try {
        return axiosPrivate.post(API_FG_KYC_SUBMIT, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionKYCStatus = createAsyncThunk('actionKYCStatus', (params) => {
    try {
        return axiosPrivate.post(API_FG_KYC_STATUS, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetProposal = createAsyncThunk('actionGetProposal', (params) => {
    try {
        return axiosPrivate.post(API_FG_PROPOSAL, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actiFGtPaymentMake = createAsyncThunk('actiFGtPaymentMake', (params) => {
    try {
        return axiosPrivate.post(API_FG_PAYMENT_MAKE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionFGPaymentStatusUpdate = createAsyncThunk('actionFGPaymentStatusUpdate', (params) => {
    try {
        return axiosPrivate.post(API_FG_PAYMENT_STATUS_UPDATE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});


export const futureGeneraliProposalStore = createSlice({
    name: "futureGeneraliProposal",
    initialState: {
        proposalFGUpdate: null,
        boughtInsurance: null,
        kycSubmit: null,
        kycStatus: null,
        proposalFGSubmit: null,
        getFGProposalDetails: null,
        getPincodeDetails: null,
        getFGMasterState: null,
        getFGMasterCity: null,
        getFGPaymentDetails: null,
        getFGPaymentStatusDetails: null,
    },
    reducers: {
        resetProposal: (state, action) => {
            state.getFGProposalDetails = null
        },
        resetPincodeDetails: (state, action) => {
            state.getPincodeDetails = null
        },
        resetFGMasterCity: (state, action) => {
            state.getFGMasterCity = null
        },
        resetFGMasterState: (state, action) => {
            state.getFGMasterState = null
        },
        resetSubmitFGProposal: (state, action) => {
            state.proposalFGSubmit = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actionUpdateFGProposal.fulfilled, (state, action) => {
            state.proposalFGUpdate = action.payload;
        });
        builder.addCase(actionBuyFGInsurance.fulfilled, (state, action) => {
            state.boughtInsurance = action.payload;
        });
        builder.addCase(actionKYCSubmit.fulfilled, (state, action) => {
            state.kycSubmit = action.payload;
        });
        builder.addCase(actionKYCStatus.fulfilled, (state, action) => {
            state.kycStatus = action.payload;
        });
        builder.addCase(actionSubmitFGProposal.fulfilled, (state, action) => {
            state.proposalFGSubmit = action.payload;
        });
        builder.addCase(actionGetProposal.fulfilled, (state, action) => {
            state.getFGProposalDetails = action.payload;
        });
        builder.addCase(actionGetFGPincodeMaster.fulfilled, (state, action) => {
            state.getPincodeDetails = action.payload;
        });
        builder.addCase(actionFGMasterCity.fulfilled, (state, action) => {
            state.getFGMasterCity = action.payload;
        });
        builder.addCase(actionFGMasterState.fulfilled, (state, action) => {
            state.getFGMasterState = action.payload;
        }); 
        builder.addCase(actiFGtPaymentMake.fulfilled, (state, action) => {
            state.getFGPaymentDetails = action.payload;
        });
        builder.addCase(actionFGPaymentStatusUpdate.fulfilled, (state, action) => {
            state.getFGPaymentStatusDetails = action.payload;
        });

    }
});

export const { resetProposal, resetPincodeDetails, resetFGMasterCity, resetFGMasterState, resetSubmitFGProposal } = futureGeneraliProposalStore.actions;

export default futureGeneraliProposalStore.reducer;