import { useSelector } from "react-redux";
import { getStoredSettings } from "src/common/constants";
import { extractRGB } from "src/utility";

const DefaultPalette = (mode, skin) => {


  // const storedColors = getStoredSettings();

  const { appSettingData } = useSelector(state => state.commonStore)


  // ** Vars
  const whiteColor = "#FFF";
  const lightColor = "rgba(47, 43, 61)";
  const darkColor = "208, 212, 241";
  const darkPaperBgColor = "#2F3349";
  const mainColor = mode === "light" ? lightColor : darkColor;


  const defaultBgColor = () => {
    if (skin === "bordered" && mode === "light") {
      return whiteColor;
    } else if (skin === "bordered" && mode === "dark") {
      return darkPaperBgColor;
    } else if (mode === "light") {
      return "#F8F7FA";
    } else return "#25293C";
  };

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      lightPaperBg: whiteColor,
      darkPaperBg: darkPaperBgColor,
      bodyBg: mode === "light" ? "#F8F7FA" : "#25293C",
      trackBg: mode === "light" ? "#F1F0F2" : "#363B54",
      avatarBg: mode === "light" ? "#DBDADE" : "#4A5072",
      tableHeaderBg: mode === "light" ? "#F6F6F7" : "#4A5072",
    },
    mode: mode,
    common: {
      black: "#000",
      white: whiteColor,
    },
    primary: {
      light: appSettingData?.is_default === 0 && appSettingData?.primary_colour || '#102147',
      main: appSettingData?.is_default === 0 && appSettingData?.primary_colour || '#102147',
      dark: appSettingData?.is_default === 0 && appSettingData?.primary_colour || '#102147',
      contrastText: whiteColor,
    },
    secondary: {
      light: "#B2B4B8",
      main: "#545454",
      dark: "#949699",
      contrastText: whiteColor,
    },
    error: {
      light: "#ED6F70",
      main: "#EA5455",
      dark: "#CE4A4B",
      contrastText: whiteColor,
    },
    warning: {
      light: "#FFAB5A",
      main: "#FF9F43",
      dark: "#E08C3B",
      contrastText: whiteColor,
    },
    info: {
      light: "#1FD5EB",
      main: "#00CFE8",
      dark: "#00B6CC",
      contrastText: whiteColor,
    },
    success: {
      light: "#42CE80",
      main: "#28C76F",
      dark: "#23AF62",
      contrastText: whiteColor,
    },
    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#F5F5F5",
      A200: "#EEEEEE",
      A400: "#BDBDBD",
      A700: "#616161",
    },
    text: {
      primary: `rgba(${extractRGB(mainColor)}, 1)`,
      secondary: `rgba(${extractRGB(mainColor)}, 1)`,
      disabled: `rgba(${extractRGB(mainColor)}, 0.42)`,
    },
    divider: `rgba(${extractRGB(mainColor)}, 0.16)`,
    background: {
      paper: mode === "light" ? whiteColor : darkPaperBgColor,
      default: defaultBgColor(),
    },
    action: {
      active: `rgba(${extractRGB(mainColor)}, 0.54)`,
      hover: `rgba(${extractRGB(mainColor)}, 0.04)`,
      selected: `rgba(${extractRGB(mainColor)}, 0.06)`,
      selectedOpacity: 0.06,
      disabled: `rgba(${extractRGB(mainColor)}, 0.26)`,
      disabledBackground: `rgba(${extractRGB(mainColor)}, 0.12)`,
      focus: `rgba(${extractRGB(mainColor)}, 0.12)`,
    },
  };
};

export default DefaultPalette;
