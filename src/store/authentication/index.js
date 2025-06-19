import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "src/common/api";
import {
    API_GET_SETTING,
    API_LOGIN_WITH_OTP,
    API_FORGET_PASSWORD,
    API_RESET_PASSWORD,
    API_VERIFY_MOBILE_OTP,
    API_VERIFY_LINK,
    API_LOGOUT,
    API_POS_SIGNUP,
    API_CHANGE_PASSWORD,
    API_VERIFY_OTP,
    API_RESEND_MOBILE_OTP,
    API_SET_PASSWORD,
    API_LOGIN_VERIFY_OTP,
    API_LOGIN_WITH_PASSWORD,
    API_EMAIL_VERIFY_API,
    API_EMAIL_GENERATE_OTP
} from "src/common/api/constants";

export const actionGetSetting = createAsyncThunk('actionGetSetting', () => {
    try {
        return axiosPrivate.get(`${API_GET_SETTING}`).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionLoginWithOtp = createAsyncThunk('actionLoginWithOtp', (params) => {
    try {
        return axiosPrivate.post(API_LOGIN_WITH_OTP, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionResendMobileOTP = createAsyncThunk('actionResendMobileOTP', (params) => {
    try {
        return axiosPrivate.post(API_RESEND_MOBILE_OTP, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionForgetPassword = createAsyncThunk('actionForgetPassword', (params) => {
    try {
        return axiosPrivate.post(API_FORGET_PASSWORD, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionVerifyLink = createAsyncThunk('actionVerifyLink', (params) => {
    try {
        return axiosPrivate.post(API_VERIFY_LINK, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionResetPassword = createAsyncThunk('actionResetPassword', (params) => {
    try {
        return axiosPrivate.post(API_RESET_PASSWORD, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionLogout = createAsyncThunk('actionLogout', (params) => {
    try {
        return axiosPrivate.post(API_LOGOUT, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionPosSignup = createAsyncThunk('actionPosSignup', (params) => {
    try {
        return axiosPrivate.post(API_POS_SIGNUP, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionChangePassword = createAsyncThunk('actionChangePassword', (params) => {
    try {
        return axiosPrivate.post(API_CHANGE_PASSWORD, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionVerifyMobileOTP = createAsyncThunk('actionVerifyMobileOTP', (params) => {
    try {
        return axiosPrivate.post(API_VERIFY_OTP, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionSetPassword = createAsyncThunk('actionSetPassword', (params) => {
    try {
        return axiosPrivate.post(API_SET_PASSWORD, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionLoginVerifyOTP = createAsyncThunk('actionLoginVerifyOTP', (params) => {
    try {
        return axiosPrivate.post(API_LOGIN_VERIFY_OTP, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionLoginWithPassword = createAsyncThunk('actionLoginWithPassword', (params) => {
    try {
        return axiosPrivate.post(API_LOGIN_WITH_PASSWORD, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionEmailVerifyOTP = createAsyncThunk('actionEmailVerifyOTP', (params) => {
    try {
        return axiosPrivate.post(API_EMAIL_VERIFY_API, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})

export const actionEmailOTPGenerate = createAsyncThunk('actionEmailOTPGenerate', () => {
    try {
        return axiosPrivate.get(`${API_EMAIL_GENERATE_OTP}`).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }

})


export const authenticationStore = createSlice({
    name: "authentication",
    initialState: {
        getSettingRespone: null,

        loginWithOtpResponse: null,

        resendMobileOTPResponse: null,

        forgetPasswordResponse: null,

        verifyLinkResponse: null,

        newPasswordResponse: null,

        logoutResponse: null,

        posSignupResponse: null,

        changePasswordResponse: null,

        verifyMobileOTPResponse: null,

        setPasswordResponse: null,

        loginVerifyOTPesponse: null,

        loginWithPassword: null,

        emailVerifyOTPResponse:null,

        emailOTPGenerateResponse: null,


    },
    reducers: {
        resetGetSettingResponse: (state) => {
            state.getSettingRespone = null;
        },
        resetLoginWithOtpResponse: (state) => {
            state.loginWithOtpResponse = null;
        },
        resetResendMobileOTPResponse: (state) => {
            state.resendMobileOTPResponse = null;
        },
        resetForgetPasswordResponse: (state) => {
            state.forgetPasswordResponse = null;
        },
        resetVerifyLinkResponse: (state) => {
            state.verifyLinkResponse = null;
        },
        resetPasswordResponse: (state) => {
            state.newPasswordResponse = null;
        },
        resetLogoutResponse: (state) => {
            state.logoutResponse = null;
        },
        resetPosSignupResponse: (state) => {
            state.posSignupResponse = null;
        },
        resetChangePasswordResponse: (state) => {
            state.changePasswordResponse = null;
        },
        resetVerifyMobileOTPResponse: (state) => {
            state.verifyMobileOTPResponse = null;
        },
        resetSetPasswordResponse: (state) => {
            state.setPasswordResponse = null;
        },
        resetLoginVerifyOTPResponse: (state) => {
            state.loginVerifyOTPesponse = null;
        },
        resetLoginWithPasswordResponse: (state) => {
            state.loginWithPassword = null;
        },
        resetEmailVerifyOTPResponse: (state) => {
            state.emailVerifyOTPResponse = null;
        },
        resetEmailOTPGenerateResponse: (state) => {
            state.emailOTPGenerateResponse = null;
        }
        
    },

    extraReducers: (builder) => {
        builder.addCase(actionLoginWithOtp.fulfilled, (state, action) => {
            state.loginWithOtpResponse = action.payload;
        });

        builder.addCase(actionResendMobileOTP.fulfilled, (state, action) => {
            state.resendMobileOTPResponse = action.payload;
        });

        builder.addCase(actionForgetPassword.fulfilled, (state, action) => {
            state.forgetPasswordResponse = action.payload;
        });

        builder.addCase(actionVerifyLink.fulfilled, (state, action) => {
            state.verifyLinkResponse = action.payload;
        });

        builder.addCase(actionResetPassword.fulfilled, (state, action) => {
            state.newPasswordResponse = action.payload;
        });

        builder.addCase(actionLogout.fulfilled, (state, action) => {
            state.logoutResponse = action.payload;
        });

        builder.addCase(actionPosSignup.fulfilled, (state, action) => {
            state.posSignupResponse = action.payload;
        });

        builder.addCase(actionChangePassword.fulfilled, (state, action) => {
            state.changePasswordResponse = action.payload;
        });

        builder.addCase(actionVerifyMobileOTP.fulfilled, (state, action) => {
            state.verifyMobileOTPResponse = action.payload;
        });

        builder.addCase(actionSetPassword.fulfilled, (state, action) => {
            state.setPasswordResponse = action.payload;
        });

        builder.addCase(actionLoginVerifyOTP.fulfilled, (state, action) => {
            state.loginVerifyOTPesponse = action.payload;
        });

        builder.addCase(actionLoginWithPassword.fulfilled, (state, action) => {
            state.loginWithPassword = action.payload;
        });

        builder.addCase(actionEmailVerifyOTP.fulfilled, (state, action) => {
            state.emailVerifyOTPResponse = action.payload;
        });
        builder.addCase(actionEmailOTPGenerate.fulfilled, (state, action) => {
            state.emailOTPGenerateResponse = action.payload;
        });

    },
});

export const {
    resetGetSettingResponse,
    resetResendMobileOTPResponse,
    resetForgetPasswordResponse,
    resetVerifyLinkResponse,
    resetPasswordResponse,
    resetLogoutResponse,
    resetPosSignupResponse,
    resetChangePasswordResponse,
    resetVerifyMobileOTPResponse,
    resetSetPasswordResponse,
    resetLoginWithOtpResponse,
    resetLoginVerifyOTPResponse,
    resetLoginWithPasswordResponse,
    resetEmailVerifyOTPResponse,
    resetEmailOTPGenerateResponse
} = authenticationStore.actions;

export default authenticationStore.reducer;
