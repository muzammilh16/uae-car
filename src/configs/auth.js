import { API_LOGIN_VERIFY_OTP, API_LOGIN_WITH_OTP, API_VERIFY_TOKEN } from "src/common/api/constants";

export default {
  // meEndpoint: API_VERIFY_TOKEN,
  loginEndpoint: API_LOGIN_VERIFY_OTP,         // '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  permission: 'abilities', // logout | refreshToken
  storageKeyName: 'userDetails',
  appSettingKeyName: 'appSetting'
}
