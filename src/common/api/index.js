import axios from "axios";
import { API, API_COMMON } from "./constants";
import { LOG } from "../../utility/";
import { API_TIMEOUT, LOG_TYPE } from "../constants";
import { PROJECT_CONSTANTS } from "../constants/projectConfig";

export const ENV = "dev";

const hostUrl = PROJECT_CONSTANTS?.POS_HOST_URL;
const endUserUrl = PROJECT_CONSTANTS?.END_USER_URL;

const adminHostUrl = PROJECT_CONSTANTS?.ADMIN_HOST_URL;

const GET_HOST = (url) => {
  switch (ENV) {
    case "local":
      if (String(url).includes(API_COMMON)) {
        return endUserUrl;
      } else if (String(url).includes(API)) {
        return "http://localhost:4200";
      } else {
        return endUserUrl;
      }
    default:
      return endUserUrl;
  }
};

// Add a separate function for Admin Desk API base URL
// const GET_ADMIN_HOST = () => hostUrl;

const GET_ADMIN_HOST = () => {
  switch (ENV) {
    case "local":
      return "http://localhost:4500";
    default:
      return adminHostUrl;
  }
};

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};

const axiosPrivate = axios.create({
  baseURL: GET_HOST(),
  headers: defaultHeaders,
});

// Interceptors for axiosPrivate
axiosPrivate.interceptors.request.use(
  (config) => {
    config.baseURL = GET_HOST(config.url); // Dynamically set base URL
    LOG(LOG_TYPE.INFO, "REQUEST HEADER BEFORE", config);
    let token = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem('userData');
    let parsedUser = null;

    if (storedUser) {
      try {
        parsedUser = JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse userData from localStorage:", e);
      }
    }

    if (
      !config.headers["Authorization"] &&
      token &&
      parsedUser &&
      parsedUser?.is_guest === false
    ) {
      config.headers["Authorization"] = `Token ${token}`;
    }

    config.timeout = API_TIMEOUT;
    LOG(LOG_TYPE.INFO, "REQUEST HEADER AFTER", config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("RESPONSE ERROR");
    console.log(error.response);
    let response = {
      status: error?.response?.status,
      result: false,
    };
    console.log(response);

    return Promise.reject(response);
  }
);

// Admin Desk Axios Instance
const axiosAdminDesk = axios.create({
  baseURL: GET_ADMIN_HOST(),
  headers: defaultHeaders,
});

// Interceptors for axiosAdminDesk
axiosAdminDesk.interceptors.request.use(
  (config) => {
    LOG(LOG_TYPE.INFO, "ADMIN REQUEST HEADER BEFORE", config);
    let token = localStorage.getItem("accessToken");

    if (!config.headers["Authorization"] && token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    config.timeout = API_TIMEOUT;
    LOG(LOG_TYPE.INFO, "ADMIN REQUEST HEADER AFTER", config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosAdminDesk.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("ADMIN RESPONSE ERROR");
    console.log(error.response);
    let response = {
      status: error?.response?.status,
      result: false,
    };
    console.log(response);

    return Promise.reject(response);
  }
);

export { axiosPrivate, axiosAdminDesk };

export default axios.create({
  baseURL: GET_HOST(),
  headers: defaultHeaders,
});
