import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "src/common/api";

import { API_GODIGIT_PROPOSAL_UPDATE, API_GODIGIT_BUY_INSURANCE, API_GODIGIT_KYC_STATUS, API_GODIGIT_PROPOSAL_SUBMIT, API_GODIGIT_PROPOSAL, API_GODIGIT_PINCODE_MASTER, API_GODIGIT_PAYMENT_MAKE, API_GODIGIT_PAYMENT_UPDATE } from "src/common/api/constants";

export const actionUpdateProposal = createAsyncThunk('actionUpdateProposal', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_PROPOSAL_UPDATE, params, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => response.data)
            .catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionSubmitProposal = createAsyncThunk('actionSubmitProposal', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_PROPOSAL_SUBMIT, params, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => response.data)
            .catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionBuyGodigitInsurance = createAsyncThunk('actionBuyInsurance', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_BUY_INSURANCE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetGodigitPincodeMaster = createAsyncThunk('actionGetGodigitPincodeMaster', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_PINCODE_MASTER, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGodigitKYCStatus = createAsyncThunk('actionGodigitKYCStatus', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_KYC_STATUS, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGodigitPaymentMake = createAsyncThunk('actionGodigitPaymentMake', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_PAYMENT_MAKE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetProposal = createAsyncThunk('actionGetProposal', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_PROPOSAL, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGodigitPaymentUpdate = createAsyncThunk('actionGodigitPaymentUpdate', (params) => {
    try {
        return axiosPrivate.post(API_GODIGIT_PAYMENT_UPDATE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const godigitProposalStore = createSlice({
    name: "godigitProposal",
    initialState: {
        proposalUpdate: null,
        boughtInsurance: null,
        kycStatusDetails: null,
        paymentMakeDetails: null,
        proposalSubmit: null,
        getProposalDetails: null,
        getPincodeDetails: null,
        paymentUpdateDetails: null
    },
    reducers: {
        resetProposal: (state, action) => {
            state.getProposalDetails = null
        },
        resetPincodeDetails: (state, action) => {
            state.getPincodeDetails = null
        },
        resetKycStatusDetails: (state, action) => {
            state.kycStatusDetails = null
        },
        resetSubmitProposal: (state, action) => {
            state.proposalSubmit = null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actionUpdateProposal.fulfilled, (state, action) => {
            state.proposalUpdate = action.payload;
        });
        builder.addCase(actionBuyGodigitInsurance.fulfilled, (state, action) => {
            state.boughtInsurance = action.payload;
        });
        builder.addCase(actionGodigitKYCStatus.fulfilled, (state, action) => {
            state.kycStatusDetails = action.payload;
        });
        builder.addCase(actionGodigitPaymentMake.fulfilled, (state, action) => {
            state.paymentMakeDetails = action.payload;
        });
        builder.addCase(actionSubmitProposal.fulfilled, (state, action) => {
            state.proposalSubmit = action.payload;
        });
        builder.addCase(actionGetProposal.fulfilled, (state, action) => {
            state.getProposalDetails = action.payload;
        });
        builder.addCase(actionGetGodigitPincodeMaster.fulfilled, (state, action) => {
            state.getPincodeDetails = action.payload;
        });
        builder.addCase(actionGodigitPaymentUpdate.fulfilled, (state, action) => {
            state.paymentUpdateDetails = action.payload;
        });

    }
});

export const { resetProposal, resetPincodeDetails, resetKycStatusDetails, resetSubmitProposal } = godigitProposalStore.actions;

export default godigitProposalStore.reducer;