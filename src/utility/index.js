import moment from "moment";
import { SHOW_LOGS } from "src/common/constants";

export const LOG = (type, title, message) => {
  if (SHOW_LOGS === "YES") {
    switch (type) {
      case "ERROR":
        console.log(
          `xxxxxxxxxxxxxxxxxxxxxxxxx ${type} BEGIN xxxxxxxxxxxxxxxxxxxxxxxxx`
        );
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
        console.log("____________________________________________________");

        if ((title !== undefined || title !== null) && title.length > 0) {
          console.log(title);
          console.log("____________________________________________________");
        }
        if (message !== undefined || message !== null) {
          console.log(message);
        }
        console.log(
          `xxxxxxxxxxxxxxxxxxxxxxxx$ ${type} END $xxxxxxxxxxxxxxxxxxxxxxxx`
        );
        break;
      case "INFO":
        console.log(
          `========================$ ${type} BEGIN $========================`
        );
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
        console.log("____________________________________________________");

        if ((title !== undefined || title !== null) && title.length > 0) {
          console.log(title);
          console.log("____________________________________________________");
        }
        if (message !== undefined || message !== null) {
          console.log(message);
        }
        console.log(
          `========================$ ${type} END $========================`
        );
        break;
      case "DEBUG":
        console.log(
          `########################$ ${type} BEGIN $########################`
        );
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
        console.log("____________________________________________________");

        if ((title !== undefined || title !== null) && title.length > 0) {
          console.log(title);
          console.log("____________________________________________________");
        }
        if (message !== undefined || message !== null) {
          console.log(message);
        }
        console.log(
          `########################$ ${type} END $########################`
        );
        break;
      default:
        console.log(
          `########################$ LOG BEGIN $########################`
        );
        console.log(moment().format("YYYY-MM-DD HH:mm:ss"));
        console.log("____________________________________________________");

        if ((title !== undefined || title !== null) && title.length > 0) {
          console.log(title);
          console.log("____________________________________________________");
        }
        if ((message !== undefined || message !== null) && message.length > 0) {
          console.log(message);
        }
        console.log(
          `########################$ LOG END $########################`
        );
        console.log(message);
    }
  }
};

export const getValueFromObject = (input, key = "value") => {
  if (input !== null && typeof input === "object") {
    return input[`${key}`];
  }

  return input;
};

export const getFormData = (data, files = null) => {

  var objFormData = new FormData()

  for (var key in data) {
    if (data[key] instanceof Array || data[key] instanceof Object) {
      objFormData.append(key, JSON.stringify(data[key]))
    } else {
      objFormData.append(key, data[key])
    }
  }

  if (files !== null && files !== undefined && files.length > 0) {
    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      objFormData.append(file?.title, file?.data)
    }
  }
  return objFormData
}

export const convertAmount = (value) => {
  if (value >= 10000000) {
    return Number(value / 10000000) + " Cr";
  } else if (value >= 100000) {
    return Number(value / 100000) + " L";
  } else if (value >= 1000) {
    return Number(value / 1000) + " k";
  } else {
    return Number(value);
  }
};

export const extractRGB = (color) => {
  if (color.startsWith("rgba") || color.startsWith("rgb")) {
    // Extract the content inside the parentheses
    return color.slice(color.indexOf("(") + 1, color.lastIndexOf(")"));
  }
  return color; // Return the input if it's not in rgba/rgb format
};

export const hasPermission = (permissionKey, action, typeKey = null) => {
  const permissionData = JSON.parse(localStorage.getItem('userDetails'));

  // Check if permission data exists
  if (!permissionData?.permissions) {
    console.warn('Permissions not found in userDetails');
    return false;
  }

  // Get the specific permission
  const permission = permissionData.permissions[permissionKey]?.access?.[action];

  // If typeKey is provided, check if it's true
  if (typeKey) {
    return permission?.is_selected && permission?.type?.[typeKey] === true;
  }

  // Return the is_selected status or false if undefined
  return permission?.is_selected || false;
};

export const getFileType = (url) => {
  const baseUrl = url?.split('?')[0]; // Remove query parameters
  if (/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(baseUrl)) {
    return 'image';
  } else if (/\.(pdf)$/i.test(baseUrl)) {
    return 'pdf';
  } else {
    return 'unknown';
  }
};


// src/utility.js (Make sure getPOSID is async)
export const getPOSID = async () => {
  if (typeof window !== 'undefined') {
    const posId = window.localStorage.getItem('POS_ID');
    return posId; // Returns the POS_ID or null
  }
  return null; // Return null if running on the server
};


export const formatRuppee = (amount) => {
  if (amount === undefined || amount === null) {
    return null;
  }
  const numberValue = parseFloat(amount);
  return Number(numberValue).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const formatAED = (amount) => {
  if (amount === undefined || amount === null) {
    return null;
  }
  const numberValue = parseFloat(amount);
  return Number(numberValue).toLocaleString('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


export const reverseRuppeeFormat = (amount) => {
  const amountStr = amount.replace(/[^\d.-]/g, '');
  return Number(amountStr);
};
