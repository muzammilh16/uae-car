import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosAdminDesk, axiosPrivate } from "src/common/api";
import { API_APP_SETTING } from "src/common/api/constants";
import authConfig from "src/configs/auth";


export const actionAppSetting = createAsyncThunk('actionAppSetting', () => {
    try {
        return axiosAdminDesk.get(`${API_APP_SETTING}`).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})


export const commonStore = createSlice({
    name: "common",
    initialState: {
        appSettingResponse: null,

        appSettingData: null
    },
    reducers: {
        resetAppSettingResponse: (state) => {
            state.appSettingResponse = null;
        },

        actionGetAppSettingData: (state) => {
            const localstoragedata = localStorage.getItem(authConfig.appSettingKeyName);

            if (localstoragedata) {
                try {
                    state.appSettingData = JSON.parse(localstoragedata);
                } catch (e) {
                    console.error("Error parsing JSON from localStorage", e);
                    state.appSettingData = null;  // or handle this scenario as needed
                }
            } else {
                state.appSettingData = null;
            }
        },
        resetGetAppSettingData: (state) => {
            state.appSettingData = null
        }
    },

    extraReducers: (builder) => {
        builder.addCase(actionAppSetting.fulfilled, (state, action) => {
            localStorage.removeItem(authConfig.appSettingKeyName)
            localStorage.setItem(authConfig.appSettingKeyName, JSON.stringify(action?.payload?.response));
            state.appSettingResponse = action.payload;
        });
    },
});

export const {
    resetAppSettingResponse,
    actionGetAppSettingData,
    resetGetAppSettingData
} = commonStore.actions;

export default commonStore.reducer;
