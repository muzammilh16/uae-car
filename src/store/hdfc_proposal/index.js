import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { axiosPrivate } from "src/common/api";

import { API_HDFC_BUY_INSURANCE, API_HDFC_KYC_STATUS, API_HDFC_KYC_SUBMIT, API_HDFC_KYC_UPDATE, API_HDFC_MASTER_FINANCER, API_HDFC_PAYMENT_MAKE, API_HDFC_PINCODE_MASTER, API_HDFC_PROPOSAL, API_HDFC_PROPOSAL_SUBMIT, API_HDFC_PROPOSAL_UPDATE } from "src/common/api/constants";

export const actionBuyHDFCInsurance = createAsyncThunk('actionBuyHDFCInsurance', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_BUY_INSURANCE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetProposal = createAsyncThunk('actionGetProposal', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_PROPOSAL, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionKYCSubmit = createAsyncThunk('actionKYCSubmit', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_KYC_SUBMIT, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionKYCStatus = createAsyncThunk('actionKYCStatus', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_KYC_STATUS, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionKYCUpdate = createAsyncThunk('actionKYCUpdate', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_KYC_UPDATE, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionUpdateHDFCProposal = createAsyncThunk('actionUpdateHDFCProposal', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_PROPOSAL_UPDATE, params)
            .then(response => response.data)
            .catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetHDFCPincodeMaster = createAsyncThunk('actionGetHDFCPincodeMaster', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_PINCODE_MASTER, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetHDFCPermanentPincodeMaster = createAsyncThunk('actionGetHDFCPermanentPincodeMaster', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_PINCODE_MASTER, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionSubmitHDFCProposal = createAsyncThunk('actionSubmitHDFCProposal', (params) => {
    try {
        return axiosPrivate.post(API_HDFC_PROPOSAL_SUBMIT, params).then(response => response.data).catch(error => error);
    } catch (error) {
        return error;
    }
});

export const actionGetHDFCFinancerMaster = createAsyncThunk('actionGetHDFCFinancerMaster', (params) => {
    try {
        return axiosPrivate.get(`${API_HDFC_MASTER_FINANCER}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})
export const actionHDFCPaymentMake = createAsyncThunk('actionHDFCPaymentMake', (params) => {
    try {
        return axiosPrivate.post(`${API_HDFC_PAYMENT_MAKE}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const hdfcProposalStore = createSlice({
    name: "hdfcProposal",
    initialState: {
        proposalHDFCUpdate: null,
        boughtInsuranceDetails: null,
        kycSubmit: null,
        kycStatusDetails: null,
        kycUpdateDetails: null,
        proposalHDFCSubmit: null,
        getHDFCProposalDetails: null,
        getPincodeDetails: null,
        getPermanentPincodeDetails: null,
        getHDFCFinancerMaster: null,
        getHDFCPaymentDetails: null,
    },
    reducers: {
        resetProposal: (state, action) => {
            state.getHDFCProposalDetails = null
        },
        resetPincodeDetails: (state, action) => {
            state.getPincodeDetails = null
        },
        resetPermanentPincodeDetails: (state, action) => {
            state.getPermanentPincodeDetails = null
        },
        resetSubmitHDFCProposal: (state) => {
            state.proposalHDFCSubmit = null
        },

    },
    extraReducers: (builder) => {
        builder.addCase(actionUpdateHDFCProposal.fulfilled, (state, action) => {
            state.proposalHDFCUpdate = action.payload;
        });
        builder.addCase(actionBuyHDFCInsurance.fulfilled, (state, action) => {
            state.boughtInsuranceDetails = action.payload;
        });
        builder.addCase(actionKYCSubmit.fulfilled, (state, action) => {
            state.kycSubmit = action.payload;
        });
        builder.addCase(actionKYCStatus.fulfilled, (state, action) => {
            state.kycStatusDetails = action.payload;
        });
        builder.addCase(actionKYCUpdate.fulfilled, (state, action) => {
            state.kycUpdateDetails = action.payload;
        });
        builder.addCase(actionSubmitHDFCProposal.fulfilled, (state, action) => {
            state.proposalHDFCSubmit = action.payload;
        });
        builder.addCase(actionGetProposal.fulfilled, (state, action) => {
            state.getHDFCProposalDetails = action.payload;
        });
        builder.addCase(actionGetHDFCPincodeMaster.fulfilled, (state, action) => {
            state.getPincodeDetails = action.payload;
        });
        builder.addCase(actionGetHDFCPermanentPincodeMaster.fulfilled, (state, action) => {
            state.getPermanentPincodeDetails = action.payload;
        });
        builder.addCase(actionGetHDFCFinancerMaster.fulfilled, (state, action) => {
            state.getHDFCFinancerMaster = action.payload;
        });
        builder.addCase(actionHDFCPaymentMake.fulfilled, (state, action) => {
            state.getHDFCPaymentDetails = action.payload;
        });
    }
});

export const { resetProposal, resetPincodeDetails, resetPermanentPincodeDetails, resetSubmitHDFCProposal } = hdfcProposalStore.actions;

export default hdfcProposalStore.reducer;