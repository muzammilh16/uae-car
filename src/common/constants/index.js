import { ENV } from '../api/constants'

export const API_TIMEOUT = 50000

/**
 * API Error Codes
 */
export const UNAUTHORIZED = 400

export const FORBIDDEN = 403

export const SUCCESS = 200

export const ERROR = 410


export const LOG_TYPE = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  ERROR: 'ERROR'
}

export const SHOW_LOGS = ENV === 'prod' ? 'NO' : 'YES'

export const TOAST_DURATION = 4000

export const LONG_TOAST_DURATION = 8000


export const TOAST_POSITION = 'top-right'

export const isWord = word => /^[A-Za-z]+$/.test(word)

export const isEmail = email => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)

export const isPinCode = pinCode => /^[1-9][0-9]{5}$/.test(pinCode)

export const isMobile = mobile => /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(mobile)

export const isLandlineNumber = number => /^\d{11,}$/.test(number)

export const isNumberPattern = number => /^\d+$/.test(number);

export const isNumber = (number) => /^[0-9]+$/.test(number);



export const DATA_GRID_ROW_HEIGHT = 80

export const PAYMENT_MODE = ['Cash', 'UPI', 'Cheque', 'Bank Transfer']

export const CURRENCY_RUPEE = '₹'

export const EMPLOYEE_PROFILE_ICON = {
  Male: '/images/avatars/1.png',
  Female: '/images/icons/default_girl.png'
}

export const STATUS = {
  A: { label: 'Active', color: 'success' },
  I: { label: 'Inactive', color: 'warning' },
  D: { label: 'Delete', color: 'error' }
}

/**Validation */
export const validateFileSize = file => {
  if (!file) return true // File is optional, so return true if no file is selected
  const fileSizeInMB = file.size / (1024 * 1024)
  if (fileSizeInMB > 5) {
    return 'File size exceeds the limit of 5MB'
  }
  return true // Validation passed
}
export const validateFileType = file => {
  if (!file) {
    return true // Return true if file is undefined or null
  }
  const fileName = file.name
  if (!fileName) {
    return true // Return true if file name is undefined or null
  }
  const fileExtension = fileName.split('.').pop().toLowerCase() // Extract file extension
  const allowedExtensions = ['jpg', 'jpeg', 'png'] // Allowed file extensions
  if (!allowedExtensions.includes(fileExtension)) {
    return 'Only JPG, JPEG, and PNG files are allowed'
  }
  return true // Check if file extension is allowed
}

export const IMAGES_SCREEN_NO_DATA = {
  "NO_DATA_FOUND": '/images/screens_highlight/no_data_found.png'
}

export const toTitleCase = (str) => {
  return str
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

export const formatRateWithRupee = (rate) => {
  return `₹${rate?.toFixed(2)}`;
};


export const getStoredSettings = () => {
  if (typeof window !== "undefined") {
    try {
      const storedSettings = localStorage.getItem("appSetting");
      return storedSettings ? JSON.parse(storedSettings) : {};
    } catch (error) {
      console.error("Failed to parse stored settings:", error);
      return {};
    }
  }
  return {};
};


export const findById = (id, dataArr) => {
  return dataArr.find(item => `${item.value}` === `${id}`);
};

export const formatKeyName = (str) => {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// const MAX_RETRIES = 5;
// const RETRY_DELAY = 2000; // 2 seconds

// export const fetchQuotesWithRetry = async (referenceId) => {
//   for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
//     try {
//       console.log(`🔁 Attempt ${attempt}: Fetching quotes...`);

//       const response = await dispatch(actionGetQuotes({ reference_id: referenceId })).unwrap();
//       const premiums = response?.response?.premiums || [];

//       console.log(`✅ Attempt ${attempt}: Premiums length: ${premiums.length}`);
//     } catch (error) {
//       console.error(`❌ Attempt ${attempt} failed:`, error);
//     }

//     if (attempt < MAX_RETRIES) {
//       await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
//     }
//   }

//   toast.success("✅ Finished quote fetch attempts.");
// };