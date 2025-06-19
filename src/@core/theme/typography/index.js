// import { getStoredSettings } from "src/common/constants";


// // Fetch primary font family from stored settings
// const { primary_font_family, is_default } = getStoredSettings();

// // Default font family stack
// const defaultFontFamily = [
//   'Public Sans',
//   'sans-serif',
//   '-apple-system',
//   'BlinkMacSystemFont',
//   '"Segoe UI"',
//   'Roboto',
//   '"Helvetica Neue"',
//   'Arial',
//   'sans-serif',
//   '"Apple Color Emoji"',
//   '"Segoe UI Emoji"',
//   '"Segoe UI Symbol"'
// ].join(',');

// // Dynamically set font family in typography
// const typography = {
//   fontFamily: is_default === 0 && primary_font_family || defaultFontFamily,  // Apply stored font family or fallback to default
//   fontSize: 13.125,
//   h1: {
//     fontWeight: 500,
//     fontSize: '2.375rem',
//     lineHeight: 1.368421
//   },
//   h2: {
//     fontWeight: 500,
//     fontSize: '2rem',
//     lineHeight: 1.375
//   },
//   h3: {
//     fontWeight: 500,
//     lineHeight: 1.38462,
//     fontSize: '1.625rem'
//   },
//   h4: {
//     fontWeight: 500,
//     lineHeight: 1.364,
//     fontSize: '1.375rem'
//   },
//   h5: {
//     fontWeight: 500,
//     lineHeight: 1.3334,
//     fontSize: '1.125rem'
//   },
//   h6: {
//     lineHeight: 1.4,
//     fontSize: '0.9375rem'
//   },
//   subtitle1: {
//     fontSize: '1rem',
//     letterSpacing: '0.15px'
//   },
//   subtitle2: {
//     lineHeight: 1.32,
//     fontSize: '0.875rem',
//     letterSpacing: '0.1px'
//   },
//   body1: {
//     lineHeight: 1.467,
//     fontSize: '0.9375rem'
//   },
//   body2: {
//     fontSize: '0.8125rem',
//     lineHeight: 1.53846154
//   },
//   button: {
//     lineHeight: 1.2,
//     fontSize: '0.9375rem',
//     letterSpacing: '0.43px'
//   },
//   caption: {
//     lineHeight: 1.273,
//     fontSize: '0.6875rem'
//   },
//   overline: {
//     fontSize: '0.75rem',
//     letterSpacing: '1px'
//   }
// };

// export default typography;


import { useSelector } from "react-redux";
import { getStoredSettings } from "src/common/constants";

// Default font family stack
const defaultFontFamily = [
  'Public Sans',
  'sans-serif',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"'
].join(',');

// Typography configuration function
const typography = () => {
  // Fetch app settings from Redux store
  const { appSettingData } = useSelector((state) => state.commonStore);

  // Dynamically determine font family
  const fontFamily =
    appSettingData?.is_default === 0 && appSettingData?.primary_font_family
      ? appSettingData?.primary_font_family
      : defaultFontFamily;

  return {
    fontFamily, // Apply stored font family or fallback to default
    fontSize: 13.125,
    h1: {
      fontWeight: 500,
      fontSize: '2.375rem',
      lineHeight: 1.368421,
    },
    h2: {
      fontWeight: 500,
      fontSize: '2rem',
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 500,
      lineHeight: 1.38462,
      fontSize: '1.625rem',
    },
    h4: {
      fontWeight: 500,
      lineHeight: 1.364,
      fontSize: '1.375rem',
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.3334,
      fontSize: '1.125rem',
    },
    h6: {
      lineHeight: 1.4,
      fontSize: '0.9375rem',
    },
    subtitle1: {
      fontSize: '1rem',
      letterSpacing: '0.15px',
    },
    subtitle2: {
      lineHeight: 1.32,
      fontSize: '0.875rem',
      letterSpacing: '0.1px',
    },
    body1: {
      lineHeight: 1.467,
      fontSize: '0.9375rem',
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.53846154,
    },
    button: {
      lineHeight: 1.2,
      fontSize: '0.9375rem',
      letterSpacing: '0.43px',
    },
    caption: {
      lineHeight: 1.273,
      fontSize: '0.6875rem',
    },
    overline: {
      fontSize: '0.75rem',
      letterSpacing: '1px',
    },
  };
};

export default typography;

