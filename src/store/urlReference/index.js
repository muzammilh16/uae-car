import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ADD_ONS: null,
    QUOTE_ID: null,
    PROPOSAL_ID: null,
}

export const urlReferenceStore = createSlice({
    name: "urlReference",
    initialState,
    reducers: {
        setAddons: (state, action) => {
            state.ADD_ONS = action.payload;
        },
        setQuoteId: (state, action) => {
            state.QUOTE_ID = action.payload;
        },
        setProposalId: (state, action) => {
            state.PROPOSAL_ID = action.payload;
        },
        resetAddons: (state) => {
            state.ADD_ONS = null;
        },
        resetQuoteId: (state, action) => {
            state.QUOTE_ID = null
        },
        resetProposalId: (state, action) => {
            state.PROPOSAL_ID = null
        },
    }
});

export const { setAddons, resetAddons, setQuoteId, setProposalId, resetProposalId, resetQuoteId } = urlReferenceStore.actions;

export default urlReferenceStore.reducer;