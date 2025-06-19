import { Autocomplete, Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Input, InputAdornment, List, ListItem, ListItemButton, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress'
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  Search as SearchIcon,
  Edit as EditIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";
import { carFuelType, carMakeList, carModalList, carVariants2, carVriants, cityOptions, rtoOptions, yearsOptions } from "../../mockData/formInputsData";
import ClaimSection from "../claimSection";
import { useRouter } from "next/router";
import { GlobalContext } from "src/context/appContext";
import { useDispatch, useSelector } from "react-redux";
import { actionCreateEnquiry, resetMultipleFields, setField } from "src/store/tempFormData";
import { set } from "nprogress";
import { actionGetFuelVariants, actionGetMakeModels, actionGetRTOs } from "src/store/formFieldOptions";
import dayjs from "dayjs";
import { resetAddons, setQuoteId } from "src/store/urlReference";
import { useTheme } from "@mui/material/styles";
import { FixedSizeList as VirtualizedList } from 'react-window';
import toast from "react-hot-toast";
import { resetAll, resetField, resetPaCoverSelected, setPaCoverSelected } from "src/store/quoteDetails";
import DatePicker from 'react-datepicker';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import CustomLabel from "src/views/components/custom_label";
import CustomTextField from "src/@core/components/mui/text-field";

const CustomInput = forwardRef(({ ...props }, ref) => {
  return <CustomTextField fullWidth inputRef={ref} {...props} sx={{ width: '100%' }} />
})


const FormSection = ({
  activeStep,
  // setActiveStep,
  // steps,
  // setSteps,
  // formValues,
  // setFormValues,
  setOpenExpDateModel,
  setOpenClainDetailModal
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();

  const tempFormData = useSelector((state) => state.tempFormDataStore);

  // Grab RTO options from the store
  const fetchedRtoOptions = useSelector((state) => state.formFieldOptionsStore.RTO_OPTIONS);
  // const fetchedMakeModelOptions = useSelector((state) => state.formFieldOptionsStore.MAKE_MODEL_OPTIONS);
  const fetchedMakeModelOptions = {
    "result": true,
    "status": 200,
    "response": {
      "make_model_data": [
        {
          "id": 1,
          "name": "HONDA",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/honda.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10001",
              "model_name": "BRIO"
            },
            {
              "model_code": "10002",
              "model_name": "ACCORD"
            },
            {
              "model_code": "10003",
              "model_name": "CRV"
            },
            {
              "model_code": "10004",
              "model_name": "CIVIC"
            },
            {
              "model_code": "10005",
              "model_name": "CITY"
            },
            {
              "model_code": "10006",
              "model_name": "JAZZ"
            },
            {
              "model_code": "10007",
              "model_name": "AMAZE"
            },
            {
              "model_code": "10008",
              "model_name": "MOBILIO"
            },
            {
              "model_code": "10009",
              "model_name": "BRV"
            },
            {
              "model_code": "10010",
              "model_name": "WRV"
            },
            {
              "model_code": "10544",
              "model_name": "ODYSSEY"
            },
            {
              "model_code": "14706",
              "model_name": "CITY eHEV"
            },
            {
              "model_code": "15606",
              "model_name": "V1"
            },
            {
              "model_code": "16442",
              "model_name": "RRPP"
            },
            {
              "model_code": "16467",
              "model_name": "ModelPC"
            }
          ]
        },
        {
          "id": 2,
          "name": "TATA MOTORS",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/tata.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10011",
              "model_name": "XENON"
            },
            {
              "model_code": "10012",
              "model_name": "SUMO SPACIO"
            },
            {
              "model_code": "10013",
              "model_name": "SUMO GRANDE"
            },
            {
              "model_code": "10014",
              "model_name": "ARIA"
            },
            {
              "model_code": "10015",
              "model_name": "SAFARI STORME"
            },
            {
              "model_code": "10016",
              "model_name": "INDIGO MANZA"
            },
            {
              "model_code": "10017",
              "model_name": "SAFARI"
            },
            {
              "model_code": "10018",
              "model_name": "INDIGO"
            },
            {
              "model_code": "10019",
              "model_name": "TATA 207"
            },
            {
              "model_code": "10020",
              "model_name": "INDIGO CS"
            },
            {
              "model_code": "10021",
              "model_name": "INDICA V2"
            },
            {
              "model_code": "10022",
              "model_name": "INDICA VISTA"
            },
            {
              "model_code": "10024",
              "model_name": "VENTURE"
            },
            {
              "model_code": "10025",
              "model_name": "SUMO GOLD"
            },
            {
              "model_code": "10026",
              "model_name": "SUMO VICTA"
            },
            {
              "model_code": "10027",
              "model_name": "INDIGO XL"
            },
            {
              "model_code": "10028",
              "model_name": "NANO"
            },
            {
              "model_code": "10029",
              "model_name": "INDICA EV2"
            },
            {
              "model_code": "10030",
              "model_name": "INDICA EV2 XETA"
            },
            {
              "model_code": "10031",
              "model_name": "INDICA V2 XETA"
            },
            {
              "model_code": "10032",
              "model_name": "INDIGO ECS"
            },
            {
              "model_code": "10033",
              "model_name": "MANZA CLUB CLASS"
            },
            {
              "model_code": "10034",
              "model_name": "INDIGO MARINA"
            },
            {
              "model_code": "10035",
              "model_name": "SUMO"
            },
            {
              "model_code": "10036",
              "model_name": "WINGER"
            },
            {
              "model_code": "10037",
              "model_name": "VISTA TECH"
            },
            {
              "model_code": "10038",
              "model_name": "ZEST"
            },
            {
              "model_code": "10039",
              "model_name": "BOLT"
            },
            {
              "model_code": "10040",
              "model_name": "MOVUS"
            },
            {
              "model_code": "10041",
              "model_name": "TIAGO"
            },
            {
              "model_code": "10042",
              "model_name": "HEXA"
            },
            {
              "model_code": "10043",
              "model_name": "TIGOR"
            },
            {
              "model_code": "10023",
              "model_name": "MAGIC"
            },
            {
              "model_code": "10044",
              "model_name": "NEXON"
            },
            {
              "model_code": "10361",
              "model_name": "HARRIER"
            },
            {
              "model_code": "10450",
              "model_name": "TL"
            },
            {
              "model_code": "10484",
              "model_name": "ALTROZ"
            },
            {
              "model_code": "10517",
              "model_name": "TIAGO NGR"
            },
            {
              "model_code": "10486",
              "model_name": "NEXON EV"
            },
            {
              "model_code": "10540",
              "model_name": "NEW SAFARI"
            },
            {
              "model_code": "10491",
              "model_name": "TIGOR EV"
            },
            {
              "model_code": "10581",
              "model_name": "XPRES T"
            },
            {
              "model_code": "10585",
              "model_name": "PUNCH"
            },
            {
              "model_code": "14709",
              "model_name": "NEXON EV MAX"
            },
            {
              "model_code": "14982",
              "model_name": "YODHA"
            },
            {
              "model_code": "15113",
              "model_name": "NEXON EV PRIME"
            },
            {
              "model_code": "15423",
              "model_name": "TIAGO EV"
            },
            {
              "model_code": "17693",
              "model_name": "HYBRIDPC"
            },
            {
              "model_code": "17694",
              "model_name": "HYBRIDRN"
            },
            {
              "model_code": "17695",
              "model_name": "Pravinpc"
            },
            {
              "model_code": "17696",
              "model_name": "manishpc"
            },
            {
              "model_code": "17697",
              "model_name": "mannPC"
            },
            {
              "model_code": "17698",
              "model_name": "manish quadri"
            }
          ]
        },
        {
          "id": 6,
          "name": "FORD",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/ford.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10063",
              "model_name": "ENDEAVOUR"
            },
            {
              "model_code": "10064",
              "model_name": "IKON"
            },
            {
              "model_code": "10065",
              "model_name": "FUSION"
            },
            {
              "model_code": "10066",
              "model_name": "FIGO"
            },
            {
              "model_code": "10067",
              "model_name": "FIESTA"
            },
            {
              "model_code": "10068",
              "model_name": "FIESTA CLASSIC"
            },
            {
              "model_code": "10069",
              "model_name": "CLASSIC"
            },
            {
              "model_code": "10070",
              "model_name": "ECOSPORT"
            },
            {
              "model_code": "10071",
              "model_name": "FIGO ASPIRE"
            },
            {
              "model_code": "10072",
              "model_name": "FREESTYLE"
            },
            {
              "model_code": "10073",
              "model_name": "ASPIRE"
            },
            {
              "model_code": "10387",
              "model_name": "MUSTANG"
            },
            {
              "model_code": "11595",
              "model_name": "TRANSIT"
            }
          ]
        },
        {
          "id": 8,
          "name": "SKODA",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/skoda.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10075",
              "model_name": "YETI"
            },
            {
              "model_code": "10076",
              "model_name": "SUPERB"
            },
            {
              "model_code": "10077",
              "model_name": "RAPID"
            },
            {
              "model_code": "10078",
              "model_name": "OCTAVIA"
            },
            {
              "model_code": "10079",
              "model_name": "LAURA"
            },
            {
              "model_code": "10080",
              "model_name": "FABIA"
            },
            {
              "model_code": "10081",
              "model_name": "KODIAQ"
            },
            {
              "model_code": "10497",
              "model_name": "KAROQ"
            },
            {
              "model_code": "10563",
              "model_name": "KUSHAQ"
            },
            {
              "model_code": "11594",
              "model_name": "SLAVIA"
            }
          ]
        },
        {
          "id": 12,
          "name": "NISSAN",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/nissan.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10132",
              "model_name": "SUNNY"
            },
            {
              "model_code": "10133",
              "model_name": "370Z"
            },
            {
              "model_code": "10134",
              "model_name": "MICRA"
            },
            {
              "model_code": "10135",
              "model_name": "TEANA"
            },
            {
              "model_code": "10136",
              "model_name": "X TRAIL"
            },
            {
              "model_code": "10137",
              "model_name": "EVALIA"
            },
            {
              "model_code": "10138",
              "model_name": "TERRANO"
            },
            {
              "model_code": "10139",
              "model_name": "GT-R"
            },
            {
              "model_code": "10378",
              "model_name": "KICKS"
            },
            {
              "model_code": "10448",
              "model_name": "Datsun GO"
            },
            {
              "model_code": "10494",
              "model_name": "NV 350"
            },
            {
              "model_code": "10524",
              "model_name": "MAGNITE"
            },
            {
              "model_code": "10566",
              "model_name": "JUKE"
            },
            {
              "model_code": "10586",
              "model_name": "PATROL"
            }
          ]
        },
        {
          "id": 15,
          "name": "RENAULT",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/renault.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10150",
              "model_name": "DUSTER"
            },
            {
              "model_code": "10151",
              "model_name": "SCALA"
            },
            {
              "model_code": "10152",
              "model_name": "PULSE"
            },
            {
              "model_code": "10153",
              "model_name": "KOLEOS"
            },
            {
              "model_code": "10154",
              "model_name": "FLUENCE"
            },
            {
              "model_code": "10155",
              "model_name": "LODGY"
            },
            {
              "model_code": "10156",
              "model_name": "KWID"
            },
            {
              "model_code": "10157",
              "model_name": "CAPTUR"
            },
            {
              "model_code": "10371",
              "model_name": "TRIBER"
            },
            {
              "model_code": "10538",
              "model_name": "KIGER"
            }
          ]
        },
        {
          "id": 22,
          "name": "MERCEDES-BENZ",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/mercedes-benz.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10218",
              "model_name": "C CLASS"
            },
            {
              "model_code": "10219",
              "model_name": "E CLASS"
            },
            {
              "model_code": "10220",
              "model_name": "SLS CLASS"
            },
            {
              "model_code": "10221",
              "model_name": "S CLASS"
            },
            {
              "model_code": "10222",
              "model_name": "ML CLASS"
            },
            {
              "model_code": "10223",
              "model_name": "GL CLASS"
            },
            {
              "model_code": "10224",
              "model_name": "G CLASS"
            },
            {
              "model_code": "10225",
              "model_name": "B CLASS"
            },
            {
              "model_code": "10226",
              "model_name": "R CLASS"
            },
            {
              "model_code": "10227",
              "model_name": "A CLASS"
            },
            {
              "model_code": "10228",
              "model_name": "M CLASS"
            },
            {
              "model_code": "10229",
              "model_name": "SLK CLASS"
            },
            {
              "model_code": "10230",
              "model_name": "SL CLASS"
            },
            {
              "model_code": "10231",
              "model_name": "CLS CLASS"
            },
            {
              "model_code": "10232",
              "model_name": "190"
            },
            {
              "model_code": "10233",
              "model_name": "CLA CLASS"
            },
            {
              "model_code": "10234",
              "model_name": "GLA CLASS"
            },
            {
              "model_code": "10235",
              "model_name": "GLE CLASS"
            },
            {
              "model_code": "10236",
              "model_name": "GLS CLASS"
            },
            {
              "model_code": "10237",
              "model_name": "GLC CLASS"
            },
            {
              "model_code": "10428",
              "model_name": "V-CLASS"
            },
            {
              "model_code": "10446",
              "model_name": "SLC"
            },
            {
              "model_code": "10467",
              "model_name": "AMG GT"
            },
            {
              "model_code": "10471",
              "model_name": "AMG"
            },
            {
              "model_code": "10475",
              "model_name": "VIANO"
            },
            {
              "model_code": "10516",
              "model_name": "EQC"
            },
            {
              "model_code": "10559",
              "model_name": "VITO"
            },
            {
              "model_code": "10590",
              "model_name": "MAYBACK 57 S"
            },
            {
              "model_code": "14990",
              "model_name": "GLC."
            },
            {
              "model_code": "14991",
              "model_name": "MAYBACH"
            },
            {
              "model_code": "15207",
              "model_name": "EQS"
            }
          ]
        },
        {
          "id": 24,
          "name": "MAHINDRA & MAHINDRA",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/mahindra.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10243",
              "model_name": "VERITO"
            },
            {
              "model_code": "10244",
              "model_name": "THAR"
            },
            {
              "model_code": "10245",
              "model_name": "BOLERO"
            },
            {
              "model_code": "10246",
              "model_name": "SCORPIO"
            },
            {
              "model_code": "10247",
              "model_name": "QUANTO"
            },
            {
              "model_code": "10248",
              "model_name": "XUV 500"
            },
            {
              "model_code": "10249",
              "model_name": "MAXXIMO"
            },
            {
              "model_code": "10250",
              "model_name": "XYLO"
            },
            {
              "model_code": "10251",
              "model_name": "VERITO VIBE"
            },
            {
              "model_code": "10252",
              "model_name": "ARMADA"
            },
            {
              "model_code": "10255",
              "model_name": "TUV 300"
            },
            {
              "model_code": "10256",
              "model_name": "SUPRO"
            },
            {
              "model_code": "10257",
              "model_name": "KUV 100"
            },
            {
              "model_code": "10258",
              "model_name": "GIO"
            },
            {
              "model_code": "10259",
              "model_name": "CL 550"
            },
            {
              "model_code": "10261",
              "model_name": "NUVOSPORT"
            },
            {
              "model_code": "10260",
              "model_name": "MAXX"
            },
            {
              "model_code": "10264",
              "model_name": "JEETO"
            },
            {
              "model_code": "10265",
              "model_name": "ALFA"
            },
            {
              "model_code": "10266",
              "model_name": "CHAMPION"
            },
            {
              "model_code": "10267",
              "model_name": "CHAMPION ALFA"
            },
            {
              "model_code": "10269",
              "model_name": "IMPERIO"
            },
            {
              "model_code": "10270",
              "model_name": "MARAZZO"
            },
            {
              "model_code": "10271",
              "model_name": "ALTURAS"
            },
            {
              "model_code": "10356",
              "model_name": "XUV 300"
            },
            {
              "model_code": "10364",
              "model_name": "TUV 300 PLUS"
            },
            {
              "model_code": "10415",
              "model_name": "MARSHAL"
            },
            {
              "model_code": "10442",
              "model_name": "GENIO"
            },
            {
              "model_code": "10458",
              "model_name": "REXTON"
            },
            {
              "model_code": "10262",
              "model_name": "SAVARI"
            },
            {
              "model_code": "10508",
              "model_name": "JEEP"
            },
            {
              "model_code": "10254",
              "model_name": "REVAI"
            },
            {
              "model_code": "10253",
              "model_name": "E2O"
            },
            {
              "model_code": "10480",
              "model_name": "TREO"
            },
            {
              "model_code": "10263",
              "model_name": "E VERITO"
            },
            {
              "model_code": "10567",
              "model_name": "BOLERO NEO"
            },
            {
              "model_code": "10583",
              "model_name": "XUV 700"
            },
            {
              "model_code": "14983",
              "model_name": "SCORPIO N"
            },
            {
              "model_code": "15007",
              "model_name": "SCORPIO CLASSIC"
            },
            {
              "model_code": "16351",
              "model_name": "NEW SCORPIO"
            },
            {
              "model_code": "16352",
              "model_name": "KUV100 NXT"
            },
            {
              "model_code": "16353",
              "model_name": "XUV500N"
            },
            {
              "model_code": "16354",
              "model_name": "NEW THAR"
            },
            {
              "model_code": "16374",
              "model_name": "ALFA PASS"
            },
            {
              "model_code": "16356",
              "model_name": "GIO PASSENGER"
            },
            {
              "model_code": "16357",
              "model_name": "HARD TOP"
            },
            {
              "model_code": "16358",
              "model_name": "PICK UP"
            },
            {
              "model_code": "16359",
              "model_name": "SCORPIO 1.99"
            },
            {
              "model_code": "16360",
              "model_name": "SUPRO Passenger"
            },
            {
              "model_code": "16361",
              "model_name": "VIBE"
            },
            {
              "model_code": "16362",
              "model_name": "XUV 1.99"
            },
            {
              "model_code": "16363",
              "model_name": "XUV500R"
            },
            {
              "model_code": "16367",
              "model_name": "SOFT TOP"
            },
            {
              "model_code": "16368",
              "model_name": "SUPRO MINIVAN"
            },
            {
              "model_code": "16369",
              "model_name": "SUPRO MINIVAN SHT"
            },
            {
              "model_code": "16370",
              "model_name": "XYLO1.99"
            },
            {
              "model_code": "16350",
              "model_name": "MAXXIMO HT"
            },
            {
              "model_code": "16364",
              "model_name": "BOLERO P"
            },
            {
              "model_code": "16371",
              "model_name": "P602"
            },
            {
              "model_code": "16372",
              "model_name": "JEETO MINIVAN"
            },
            {
              "model_code": "16355",
              "model_name": "XUV400"
            },
            {
              "model_code": "17561",
              "model_name": "XUV 700"
            }
          ]
        },
        {
          "id": 26,
          "name": "MARUTI",
          "logo_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/products/car/logos/vehicle_make/maruti.png",
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10279",
              "model_name": "WAGON R"
            },
            {
              "model_code": "10280",
              "model_name": "SWIFT DZIRE"
            },
            {
              "model_code": "10281",
              "model_name": "BALENO"
            },
            {
              "model_code": "10282",
              "model_name": "800"
            },
            {
              "model_code": "10283",
              "model_name": "ESTEEM"
            },
            {
              "model_code": "10284",
              "model_name": "ERTIGA"
            },
            {
              "model_code": "10285",
              "model_name": "SWIFT"
            },
            {
              "model_code": "10286",
              "model_name": "ZEN ESTILO"
            },
            {
              "model_code": "10287",
              "model_name": "SX4"
            },
            {
              "model_code": "10288",
              "model_name": "ZEN"
            },
            {
              "model_code": "10289",
              "model_name": "ALTO 800"
            },
            {
              "model_code": "10290",
              "model_name": "CELERIO"
            },
            {
              "model_code": "10291",
              "model_name": "OMNI"
            },
            {
              "model_code": "10292",
              "model_name": "STINGRAY"
            },
            {
              "model_code": "10293",
              "model_name": "ALTO"
            },
            {
              "model_code": "10294",
              "model_name": "EECO"
            },
            {
              "model_code": "10295",
              "model_name": "GRAND VITARA"
            },
            {
              "model_code": "10296",
              "model_name": "RITZ"
            },
            {
              "model_code": "10297",
              "model_name": "GYPSY KING"
            },
            {
              "model_code": "10298",
              "model_name": "VERSA"
            },
            {
              "model_code": "10299",
              "model_name": "A STAR"
            },
            {
              "model_code": "10300",
              "model_name": "KIZASHI"
            },
            {
              "model_code": "10301",
              "model_name": "ESTILO"
            },
            {
              "model_code": "10302",
              "model_name": "CIAZ"
            },
            {
              "model_code": "10303",
              "model_name": "S CROSS"
            },
            {
              "model_code": "10304",
              "model_name": "VITARA BREZZA"
            },
            {
              "model_code": "10306",
              "model_name": "DZIRE"
            },
            {
              "model_code": "10307",
              "model_name": "CELERIO X"
            },
            {
              "model_code": "10366",
              "model_name": "XL6"
            },
            {
              "model_code": "10438",
              "model_name": "S-PRESSO"
            },
            {
              "model_code": "10445",
              "model_name": "ALTO K10"
            },
            {
              "model_code": "10305",
              "model_name": "IGNIS"
            },
            {
              "model_code": "10592",
              "model_name": "WAGON R VXI"
            },
            {
              "model_code": "14985",
              "model_name": "BREZZA"
            },
            {
              "model_code": "17589",
              "model_name": "Wagnor Electric"
            },
            {
              "model_code": "17644",
              "model_name": "som"
            },
            {
              "model_code": "17685",
              "model_name": "Hybrid"
            }
          ]
        },
        {
          "id": 3,
          "name": "HINDUSTAN MOTORS",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10045",
              "model_name": "AMBASSADOR"
            },
            {
              "model_code": "16430",
              "model_name": "model123"
            }
          ]
        },
        {
          "id": 4,
          "name": "CHEVROLET",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10046",
              "model_name": "TAVERA"
            },
            {
              "model_code": "10047",
              "model_name": "CAPTIVA"
            },
            {
              "model_code": "10048",
              "model_name": "SRV"
            },
            {
              "model_code": "10049",
              "model_name": "OPTRA"
            },
            {
              "model_code": "10050",
              "model_name": "SAIL"
            },
            {
              "model_code": "10051",
              "model_name": "BEAT"
            },
            {
              "model_code": "10052",
              "model_name": "CRUZE"
            },
            {
              "model_code": "10053",
              "model_name": "SPARK"
            },
            {
              "model_code": "10054",
              "model_name": "ENJOY"
            },
            {
              "model_code": "10055",
              "model_name": "AVEO U-VA"
            },
            {
              "model_code": "10056",
              "model_name": "AVEO"
            },
            {
              "model_code": "10057",
              "model_name": "SAIL UVA"
            },
            {
              "model_code": "10058",
              "model_name": "TRAILBLAZER"
            },
            {
              "model_code": "10515",
              "model_name": "CAMARO"
            },
            {
              "model_code": "10555",
              "model_name": "CORVETTE"
            }
          ]
        },
        {
          "id": 5,
          "name": "FORCE MOTORS",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10060",
              "model_name": "FORCE ONE"
            },
            {
              "model_code": "10061",
              "model_name": "GURKHA"
            },
            {
              "model_code": "10062",
              "model_name": "TRAVELLER"
            },
            {
              "model_code": "10059",
              "model_name": "TRAX CRUISER"
            },
            {
              "model_code": "10489",
              "model_name": "TRAX"
            }
          ]
        },
        {
          "id": 7,
          "name": "PREMIER",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10074",
              "model_name": "RIO"
            }
          ]
        },
        {
          "id": 9,
          "name": "BMW",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10082",
              "model_name": "X6 SERIES"
            },
            {
              "model_code": "10083",
              "model_name": "5 SERIES"
            },
            {
              "model_code": "10084",
              "model_name": "3 SERIES"
            },
            {
              "model_code": "10085",
              "model_name": "7 SERIES"
            },
            {
              "model_code": "10086",
              "model_name": "X1 SERIES"
            },
            {
              "model_code": "10087",
              "model_name": "X3 SERIES"
            },
            {
              "model_code": "10088",
              "model_name": "1 SERIES"
            },
            {
              "model_code": "10089",
              "model_name": "6 SERIES"
            },
            {
              "model_code": "10090",
              "model_name": "M SERIES"
            },
            {
              "model_code": "10091",
              "model_name": "X5 SERIES"
            },
            {
              "model_code": "10092",
              "model_name": "Z3"
            },
            {
              "model_code": "10093",
              "model_name": "Z4"
            },
            {
              "model_code": "10094",
              "model_name": "4 SERIES"
            },
            {
              "model_code": "10351",
              "model_name": "X4 SERIES"
            },
            {
              "model_code": "10362",
              "model_name": "X7 SERIES"
            },
            {
              "model_code": "10375",
              "model_name": "i8"
            },
            {
              "model_code": "10427",
              "model_name": "GRAN TURISMO"
            },
            {
              "model_code": "10498",
              "model_name": "8 SERIES"
            },
            {
              "model_code": "10519",
              "model_name": "2 SERIES"
            },
            {
              "model_code": "10565",
              "model_name": "X4 M"
            },
            {
              "model_code": "14701",
              "model_name": "IX"
            },
            {
              "model_code": "14791",
              "model_name": "i4"
            }
          ]
        },
        {
          "id": 10,
          "name": "VOLKSWAGEN",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10095",
              "model_name": "VENTO"
            },
            {
              "model_code": "10096",
              "model_name": "TOUREG"
            },
            {
              "model_code": "10097",
              "model_name": "PHAETON"
            },
            {
              "model_code": "10098",
              "model_name": "PASSAT"
            },
            {
              "model_code": "10099",
              "model_name": "POLO"
            },
            {
              "model_code": "10100",
              "model_name": "BEETLE"
            },
            {
              "model_code": "10101",
              "model_name": "JETTA"
            },
            {
              "model_code": "10102",
              "model_name": "CROSS POLO"
            },
            {
              "model_code": "10103",
              "model_name": "T5 MULTIVAN"
            },
            {
              "model_code": "10104",
              "model_name": "AMEO"
            },
            {
              "model_code": "10105",
              "model_name": "TIGUAN"
            },
            {
              "model_code": "10499",
              "model_name": "T-ROC"
            },
            {
              "model_code": "10504",
              "model_name": "TIGUAN ALL SPACE"
            },
            {
              "model_code": "10580",
              "model_name": "TAIGUN"
            },
            {
              "model_code": "14976",
              "model_name": "VIRTUS"
            }
          ]
        },
        {
          "id": 11,
          "name": "HYUNDAI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10106",
              "model_name": "TERRACAN"
            },
            {
              "model_code": "10107",
              "model_name": "ACCENT"
            },
            {
              "model_code": "10108",
              "model_name": "SANTA FE"
            },
            {
              "model_code": "10110",
              "model_name": "VERNA"
            },
            {
              "model_code": "10111",
              "model_name": "SANTRO"
            },
            {
              "model_code": "10112",
              "model_name": "ELANTRA"
            },
            {
              "model_code": "10113",
              "model_name": "SONATA"
            },
            {
              "model_code": "10114",
              "model_name": "GETZ PRIME"
            },
            {
              "model_code": "10115",
              "model_name": "GETZ"
            },
            {
              "model_code": "10116",
              "model_name": "VERNA FLUIDIC"
            },
            {
              "model_code": "10117",
              "model_name": "SANTRO XING"
            },
            {
              "model_code": "10118",
              "model_name": "I10"
            },
            {
              "model_code": "10119",
              "model_name": "TUCSON"
            },
            {
              "model_code": "10120",
              "model_name": "GRAND I10"
            },
            {
              "model_code": "10121",
              "model_name": "SONATA TRANSFORM"
            },
            {
              "model_code": "10122",
              "model_name": "EON"
            },
            {
              "model_code": "10123",
              "model_name": "XCENT"
            },
            {
              "model_code": "10124",
              "model_name": "NEO FLUIDIC ELANTRA"
            },
            {
              "model_code": "10125",
              "model_name": "SONATA EMBERA"
            },
            {
              "model_code": "10109",
              "model_name": "I20"
            },
            {
              "model_code": "10126",
              "model_name": "VERNA TRANSFORM"
            },
            {
              "model_code": "10127",
              "model_name": "ELITE I20"
            },
            {
              "model_code": "10128",
              "model_name": "4S FLUIDIC VERNA"
            },
            {
              "model_code": "10129",
              "model_name": "I20 ACTIVE"
            },
            {
              "model_code": "10130",
              "model_name": "CRETA"
            },
            {
              "model_code": "10353",
              "model_name": "VENUE"
            },
            {
              "model_code": "10370",
              "model_name": "GRAND I10 NIOS"
            },
            {
              "model_code": "10483",
              "model_name": "AURA"
            },
            {
              "model_code": "10496",
              "model_name": "AZERA"
            },
            {
              "model_code": "10131",
              "model_name": "SANTROGLS LPG"
            },
            {
              "model_code": "10359",
              "model_name": "KONA ELECTRIC"
            },
            {
              "model_code": "10556",
              "model_name": "H1 WAGON"
            },
            {
              "model_code": "10562",
              "model_name": "ALCAZAR"
            },
            {
              "model_code": "10578",
              "model_name": "I20 N LINE"
            },
            {
              "model_code": "14704",
              "model_name": "GENESIS"
            },
            {
              "model_code": "15011",
              "model_name": "VENUE N LINE"
            }
          ]
        },
        {
          "id": 13,
          "name": "BENTLEY",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10140",
              "model_name": "CONTINENTAL"
            },
            {
              "model_code": "10141",
              "model_name": "MULSANNE"
            },
            {
              "model_code": "10142",
              "model_name": "ARNAGE"
            },
            {
              "model_code": "10143",
              "model_name": "BROOKLANDS"
            },
            {
              "model_code": "10144",
              "model_name": "AZURE"
            },
            {
              "model_code": "10385",
              "model_name": "BENTAYGA"
            },
            {
              "model_code": "10493",
              "model_name": "NEW - FLYING SPUR"
            }
          ]
        },
        {
          "id": 14,
          "name": "PORSCHE",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10145",
              "model_name": "CAYMAN"
            },
            {
              "model_code": "10146",
              "model_name": "PANAMERA"
            },
            {
              "model_code": "10147",
              "model_name": "CAYENNE"
            },
            {
              "model_code": "10148",
              "model_name": "911"
            },
            {
              "model_code": "10149",
              "model_name": "BOXSTER"
            },
            {
              "model_code": "10380",
              "model_name": "MACAN"
            },
            {
              "model_code": "10447",
              "model_name": "718"
            },
            {
              "model_code": "10610",
              "model_name": "TAYCAN"
            }
          ]
        },
        {
          "id": 16,
          "name": "ROLLS ROYCE",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10158",
              "model_name": "PHANTOM"
            },
            {
              "model_code": "10159",
              "model_name": "GHOST"
            },
            {
              "model_code": "10160",
              "model_name": "DROPHEAD"
            },
            {
              "model_code": "10161",
              "model_name": "WRAITH"
            },
            {
              "model_code": "10443",
              "model_name": "CULLINAN"
            },
            {
              "model_code": "10527",
              "model_name": "DAWN"
            }
          ]
        },
        {
          "id": 17,
          "name": "JAGUAR",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10162",
              "model_name": "XF"
            },
            {
              "model_code": "10163",
              "model_name": "XJ"
            },
            {
              "model_code": "10164",
              "model_name": "F TYPE"
            },
            {
              "model_code": "10165",
              "model_name": "XK"
            },
            {
              "model_code": "10166",
              "model_name": "XKR"
            },
            {
              "model_code": "10167",
              "model_name": "XFR"
            },
            {
              "model_code": "10168",
              "model_name": "F TYPE PACE"
            },
            {
              "model_code": "10169",
              "model_name": "XE"
            },
            {
              "model_code": "10505",
              "model_name": "F PACE"
            },
            {
              "model_code": "10514",
              "model_name": "S TYPE"
            },
            {
              "model_code": "10543",
              "model_name": "I PACE"
            }
          ]
        },
        {
          "id": 18,
          "name": "AUDI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10170",
              "model_name": "A8"
            },
            {
              "model_code": "10171",
              "model_name": "A7"
            },
            {
              "model_code": "10172",
              "model_name": "A6"
            },
            {
              "model_code": "10173",
              "model_name": "A4"
            },
            {
              "model_code": "10174",
              "model_name": "RS 5"
            },
            {
              "model_code": "10175",
              "model_name": "R8"
            },
            {
              "model_code": "10176",
              "model_name": "Q7"
            },
            {
              "model_code": "10177",
              "model_name": "Q5"
            },
            {
              "model_code": "10178",
              "model_name": "Q3"
            },
            {
              "model_code": "10179",
              "model_name": "S4"
            },
            {
              "model_code": "10180",
              "model_name": "TT"
            },
            {
              "model_code": "10181",
              "model_name": "S6"
            },
            {
              "model_code": "10182",
              "model_name": "RS7"
            },
            {
              "model_code": "10183",
              "model_name": "A3"
            },
            {
              "model_code": "10184",
              "model_name": "A8 L"
            },
            {
              "model_code": "10454",
              "model_name": "A5"
            },
            {
              "model_code": "10465",
              "model_name": "A3 CABRIOLET"
            },
            {
              "model_code": "10478",
              "model_name": "S5"
            },
            {
              "model_code": "10500",
              "model_name": "Q8"
            },
            {
              "model_code": "10518",
              "model_name": "Q2"
            },
            {
              "model_code": "10522",
              "model_name": "RS Q8"
            },
            {
              "model_code": "10568",
              "model_name": "E TRON"
            }
          ]
        },
        {
          "id": 19,
          "name": "FIAT",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10185",
              "model_name": "LINEA"
            },
            {
              "model_code": "10186",
              "model_name": "PALIO"
            },
            {
              "model_code": "10187",
              "model_name": "GRANDE PUNTO"
            },
            {
              "model_code": "10188",
              "model_name": "PALIO STILE"
            },
            {
              "model_code": "10189",
              "model_name": "500"
            },
            {
              "model_code": "10190",
              "model_name": "PUNTO EVO"
            },
            {
              "model_code": "10191",
              "model_name": "AVVENTURA"
            },
            {
              "model_code": "10192",
              "model_name": "PREMIER"
            },
            {
              "model_code": "10193",
              "model_name": "ABARTH PUNTO"
            },
            {
              "model_code": "10194",
              "model_name": "PUNTO"
            },
            {
              "model_code": "10509",
              "model_name": "ABARTH 595"
            },
            {
              "model_code": "10551",
              "model_name": "UNO"
            }
          ]
        },
        {
          "id": 20,
          "name": "TOYOTA",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10195",
              "model_name": "CAMRY"
            },
            {
              "model_code": "10196",
              "model_name": "COROLLA ALTIS"
            },
            {
              "model_code": "10197",
              "model_name": "ETIOS"
            },
            {
              "model_code": "10198",
              "model_name": "QUALIS"
            },
            {
              "model_code": "10199",
              "model_name": "PRIUS"
            },
            {
              "model_code": "10200",
              "model_name": "INNOVA"
            },
            {
              "model_code": "10201",
              "model_name": "LAND CRUISER"
            },
            {
              "model_code": "10202",
              "model_name": "LAND CRUISER PRADO"
            },
            {
              "model_code": "10203",
              "model_name": "FORTUNER"
            },
            {
              "model_code": "10204",
              "model_name": "ETIOS CROSS"
            },
            {
              "model_code": "10205",
              "model_name": "KIJANG"
            },
            {
              "model_code": "10206",
              "model_name": "ETIOS LIVA"
            },
            {
              "model_code": "10207",
              "model_name": "COROLLA"
            },
            {
              "model_code": "10208",
              "model_name": "INNOVA CRYSTA"
            },
            {
              "model_code": "10209",
              "model_name": "PLATINUM ETIOS"
            },
            {
              "model_code": "10210",
              "model_name": "YARIS"
            },
            {
              "model_code": "10358",
              "model_name": "GLANZA"
            },
            {
              "model_code": "10468",
              "model_name": "HIACE"
            },
            {
              "model_code": "10473",
              "model_name": "KLUGER"
            },
            {
              "model_code": "10474",
              "model_name": "RAV4"
            },
            {
              "model_code": "10487",
              "model_name": "ALPHARD"
            },
            {
              "model_code": "10476",
              "model_name": "VELLFIRE"
            },
            {
              "model_code": "10512",
              "model_name": "URBAN CRUISER"
            },
            {
              "model_code": "12613",
              "model_name": "HILUX"
            },
            {
              "model_code": "15018",
              "model_name": "URBAN CRUISER HYRYDER"
            }
          ]
        },
        {
          "id": 21,
          "name": "VOLVO",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10211",
              "model_name": "S80"
            },
            {
              "model_code": "10212",
              "model_name": "XC60"
            },
            {
              "model_code": "10213",
              "model_name": "V40"
            },
            {
              "model_code": "10214",
              "model_name": "S60"
            },
            {
              "model_code": "10215",
              "model_name": "XC90"
            },
            {
              "model_code": "10216",
              "model_name": "C70"
            },
            {
              "model_code": "10217",
              "model_name": "S90"
            },
            {
              "model_code": "10365",
              "model_name": "V90 CROSS COUNTRY"
            },
            {
              "model_code": "10435",
              "model_name": "XC40"
            },
            {
              "model_code": "15111",
              "model_name": "S40"
            }
          ]
        },
        {
          "id": 23,
          "name": "MITSUBISHI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10238",
              "model_name": "CEDIA"
            },
            {
              "model_code": "10239",
              "model_name": "OUTLANDER"
            },
            {
              "model_code": "10240",
              "model_name": "MONTERO"
            },
            {
              "model_code": "10241",
              "model_name": "LANCER"
            },
            {
              "model_code": "10242",
              "model_name": "PAJERO"
            },
            {
              "model_code": "10437",
              "model_name": "ASX"
            }
          ]
        },
        {
          "id": 25,
          "name": "LAND ROVER",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10272",
              "model_name": "RANGE ROVER"
            },
            {
              "model_code": "10273",
              "model_name": "RANGE ROVER SPORT"
            },
            {
              "model_code": "10274",
              "model_name": "DISCOVERY 3"
            },
            {
              "model_code": "10275",
              "model_name": "FREELANDER 2"
            },
            {
              "model_code": "10276",
              "model_name": "DISCOVERY 4"
            },
            {
              "model_code": "10277",
              "model_name": "DISCOVERY"
            },
            {
              "model_code": "10278",
              "model_name": "DISCOVERY SPORT"
            },
            {
              "model_code": "10395",
              "model_name": "RANGE ROVER VELAR"
            },
            {
              "model_code": "10511",
              "model_name": "DEFENDER"
            },
            {
              "model_code": "14992",
              "model_name": "RANGE ROVER EVOQUE"
            }
          ]
        },
        {
          "id": 27,
          "name": "ICML",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10308",
              "model_name": "RHINO"
            },
            {
              "model_code": "10576",
              "model_name": "EXTREME"
            }
          ]
        },
        {
          "id": 28,
          "name": "MAHINDRA RENAULT",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10309",
              "model_name": "LOGAN"
            },
            {
              "model_code": "17588",
              "model_name": "m5"
            }
          ]
        },
        {
          "id": 29,
          "name": "SAN MOTORS",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10310",
              "model_name": "STORM"
            }
          ]
        },
        {
          "id": 30,
          "name": "SSANGYONG",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10311",
              "model_name": "REXTON"
            }
          ]
        },
        {
          "id": 31,
          "name": "MINI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10312",
              "model_name": "COOPER"
            },
            {
              "model_code": "10464",
              "model_name": "COUNTRYMAN"
            },
            {
              "model_code": "11596",
              "model_name": "COOPER SE"
            }
          ]
        },
        {
          "id": 32,
          "name": "FERRARI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10313",
              "model_name": "F 458"
            },
            {
              "model_code": "10314",
              "model_name": "FF"
            },
            {
              "model_code": "10315",
              "model_name": "CALIFORNIA"
            },
            {
              "model_code": "10316",
              "model_name": "599 GTB FIORANO"
            },
            {
              "model_code": "10470",
              "model_name": "458"
            },
            {
              "model_code": "10460",
              "model_name": "PORTOFINO"
            },
            {
              "model_code": "10346",
              "model_name": "488"
            },
            {
              "model_code": "10495",
              "model_name": "F12BERLINETTA"
            },
            {
              "model_code": "10501",
              "model_name": "812 SUPERFAST"
            },
            {
              "model_code": "10507",
              "model_name": "F8"
            },
            {
              "model_code": "10523",
              "model_name": "812"
            },
            {
              "model_code": "10529",
              "model_name": "SF 90"
            },
            {
              "model_code": "10532",
              "model_name": "GTC 4 LUSSO"
            },
            {
              "model_code": "10548",
              "model_name": "ROMA"
            },
            {
              "model_code": "10582",
              "model_name": "F430"
            },
            {
              "model_code": "14989",
              "model_name": "296"
            }
          ]
        },
        {
          "id": 33,
          "name": "ISUZU",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10317",
              "model_name": "MU 7"
            },
            {
              "model_code": "10318",
              "model_name": "D MAX"
            },
            {
              "model_code": "10319",
              "model_name": "MU X"
            },
            {
              "model_code": "10320",
              "model_name": "V CROSS"
            },
            {
              "model_code": "10554",
              "model_name": "HI LANDER"
            },
            {
              "model_code": "10588",
              "model_name": "S CAB"
            }
          ]
        },
        {
          "id": 34,
          "name": "ASHOK LEYLAND",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10321",
              "model_name": "STILE"
            }
          ]
        },
        {
          "id": 35,
          "name": "BAJAJ TEMPO",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10322",
              "model_name": "TRAX"
            }
          ]
        },
        {
          "id": 36,
          "name": "DATSUN",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10323",
              "model_name": "GO"
            },
            {
              "model_code": "10324",
              "model_name": "GO PLUS"
            },
            {
              "model_code": "10325",
              "model_name": "REDI GO"
            }
          ]
        },
        {
          "id": 37,
          "name": "LAMBORGHINI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10326",
              "model_name": "AVENTADOR"
            },
            {
              "model_code": "10327",
              "model_name": "GALLARDO"
            },
            {
              "model_code": "10328",
              "model_name": "MURCIELAGO"
            },
            {
              "model_code": "10352",
              "model_name": "URUS"
            },
            {
              "model_code": "10379",
              "model_name": "HURACAN"
            }
          ]
        },
        {
          "id": 38,
          "name": "MASERATI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10329",
              "model_name": "QUATTROPORTE"
            },
            {
              "model_code": "10330",
              "model_name": "GRANTURISMO"
            },
            {
              "model_code": "10331",
              "model_name": "GRANCABRIO"
            },
            {
              "model_code": "10386",
              "model_name": "LEVANTE"
            },
            {
              "model_code": "10472",
              "model_name": "GHIBLI"
            }
          ]
        },
        {
          "id": 39,
          "name": "MAYBACH",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10332",
              "model_name": "62"
            }
          ]
        },
        {
          "id": 40,
          "name": "HUMMER",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10333",
              "model_name": "H2"
            },
            {
              "model_code": "10482",
              "model_name": "H3"
            }
          ]
        },
        {
          "id": 41,
          "name": "LEXUS",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10334",
              "model_name": "IS"
            },
            {
              "model_code": "10335",
              "model_name": "LS"
            },
            {
              "model_code": "10336",
              "model_name": "LX"
            },
            {
              "model_code": "10337",
              "model_name": "SC"
            },
            {
              "model_code": "10338",
              "model_name": "ES"
            },
            {
              "model_code": "10339",
              "model_name": "RX"
            },
            {
              "model_code": "10452",
              "model_name": "NX"
            }
          ]
        },
        {
          "id": 42,
          "name": "OPEL",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10340",
              "model_name": "CORSA"
            }
          ]
        },
        {
          "id": 43,
          "name": "JEEP",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10341",
              "model_name": "WRANGLER"
            },
            {
              "model_code": "10342",
              "model_name": "GRAND CHEROKEE"
            },
            {
              "model_code": "10343",
              "model_name": "COMPASS"
            },
            {
              "model_code": "14789",
              "model_name": "MERIDIAN"
            }
          ]
        },
        {
          "id": 44,
          "name": "MORRIS GARAGES",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10360",
              "model_name": "HECTOR"
            },
            {
              "model_code": "10503",
              "model_name": "HECTOR PLUS"
            },
            {
              "model_code": "10513",
              "model_name": "GLOSTER"
            },
            {
              "model_code": "10488",
              "model_name": "ZS EV"
            },
            {
              "model_code": "10584",
              "model_name": "ASTOR"
            },
            {
              "model_code": "17691",
              "model_name": "ZS Electruic vehicle"
            }
          ]
        },
        {
          "id": 45,
          "name": "KIA",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10355",
              "model_name": "SELTOS"
            },
            {
              "model_code": "10510",
              "model_name": "SONET"
            },
            {
              "model_code": "10485",
              "model_name": "CARNIVAL"
            },
            {
              "model_code": "11593",
              "model_name": "CARENS"
            },
            {
              "model_code": "14980",
              "model_name": "EV 6"
            }
          ]
        },
        {
          "id": 46,
          "name": "ASTON MARTIN",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10410",
              "model_name": "RAPIDE"
            },
            {
              "model_code": "10457",
              "model_name": "DB11"
            },
            {
              "model_code": "10469",
              "model_name": "V8 VANTAGE"
            },
            {
              "model_code": "10502",
              "model_name": "DBS"
            },
            {
              "model_code": "10535",
              "model_name": "DBX"
            },
            {
              "model_code": "10561",
              "model_name": "DB9"
            },
            {
              "model_code": "14710",
              "model_name": "VANTAGE"
            }
          ]
        },
        {
          "id": 47,
          "name": "BAJAJ",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10425",
              "model_name": "QUTE"
            },
            {
              "model_code": "10456",
              "model_name": "Avenger"
            },
            {
              "model_code": "10453",
              "model_name": "RE"
            },
            {
              "model_code": "17579",
              "model_name": "Qute quadricycle"
            },
            {
              "model_code": "17585",
              "model_name": "V3 Quadricycle"
            },
            {
              "model_code": "17586",
              "model_name": "Electric Quadricycle"
            }
          ]
        },
        {
          "id": 48,
          "name": "EICHER",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10463",
              "model_name": "POLARIS"
            }
          ]
        },
        {
          "id": 49,
          "name": "DC",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10477",
              "model_name": "AVANTI"
            }
          ]
        },
        {
          "id": 50,
          "name": "TESLA",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10506",
              "model_name": "X"
            },
            {
              "model_code": "10575",
              "model_name": "MODEL 3"
            },
            {
              "model_code": "16441",
              "model_name": "SSTT"
            }
          ]
        },
        {
          "id": 51,
          "name": "DAEWOO",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10520",
              "model_name": "MATIZ"
            }
          ]
        },
        {
          "id": 52,
          "name": "LINCOIN",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10526",
              "model_name": "NAVIGATOR"
            },
            {
              "model_code": "10569",
              "model_name": "CONTINENTAL"
            }
          ]
        },
        {
          "id": 53,
          "name": "LOTUS",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10530",
              "model_name": "EVORA"
            }
          ]
        },
        {
          "id": 54,
          "name": "SCANIA",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10534",
              "model_name": "METROLINK"
            }
          ]
        },
        {
          "id": 55,
          "name": "LAGONDA",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10539",
              "model_name": "LG 45"
            }
          ]
        },
        {
          "id": 56,
          "name": "GMC",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10541",
              "model_name": "YUKON"
            }
          ]
        },
        {
          "id": 57,
          "name": "CADILLAC",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10542",
              "model_name": "ESCALADE"
            },
            {
              "model_code": "12603",
              "model_name": "XLR"
            }
          ]
        },
        {
          "id": 58,
          "name": "CHERY",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10547",
              "model_name": "QQ"
            }
          ]
        },
        {
          "id": 59,
          "name": "CITROEN",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10550",
              "model_name": "C5 AIRCROSS"
            },
            {
              "model_code": "14986",
              "model_name": "C3"
            },
            {
              "model_code": "16507",
              "model_name": "EC3"
            }
          ]
        },
        {
          "id": 60,
          "name": "MCLAREN",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10560",
              "model_name": "570 S"
            },
            {
              "model_code": "10564",
              "model_name": "720S"
            },
            {
              "model_code": "10574",
              "model_name": "620R"
            },
            {
              "model_code": "10579",
              "model_name": "765LT"
            },
            {
              "model_code": "14978",
              "model_name": "GT"
            }
          ]
        },
        {
          "id": 61,
          "name": "FOTON",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10571",
              "model_name": "VIEW CS2"
            }
          ]
        },
        {
          "id": 62,
          "name": "LONDON TAXI",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10577",
              "model_name": "TX4"
            }
          ]
        },
        {
          "id": 63,
          "name": "BYD",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "10594",
              "model_name": "E6"
            }
          ]
        },
        {
          "id": 64,
          "name": "CHRYSLER",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "14790",
              "model_name": "300 C"
            }
          ]
        },
        {
          "id": 65,
          "name": "JANUARY",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "16327",
              "model_name": "JANUARY MODEL"
            }
          ]
        },
        {
          "id": 66,
          "name": "JAYHIND",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "16330",
              "model_name": "jayhind model"
            }
          ]
        },
        {
          "id": 67,
          "name": "ZERRO",
          "logo_url": null,
          "pjMasterCarVehicleDetails": [
            {
              "model_code": "16504",
              "model_name": "Zerooo"
            }
          ]
        }
      ]
    }
  };

  const fetchedFuelVariantOptions = useSelector((state) => state.formFieldOptionsStore.FUEL_VARIANT_OPTIONS);


  const { ft } = router.query;

  const handleNextStep = (fs) => {

    if (fs == 'redirectToResultsPage') {
      // setOpenExpDateModel(true)
      // Store in Redux
      dispatch(setQuoteId("ca6018d35f-495e-4b10-9b44-92cfbd5e1fea"));
      // Store in localStorage
      localStorage.removeItem('ADD_ONS')
      localStorage.removeItem('PROPOSAL_ID')
      dispatch(resetPaCoverSelected());
      localStorage.removeItem('PA_COVER_SELECTED')
      // localStorage.setItem("QUOTE_ID", tempFormData?.REFERENCE_DETAILS?.response?.reference_id);
      localStorage.setItem("QUOTE_ID", "ca6018d35f-495e-4b10-9b44-92cfbd5e1fea");
      dispatch(resetAddons())
      dispatch(resetAll())

      router.push({
        pathname: "/car-insurance-list",
        query: { quoteId: "ca6018d35f-495e-4b10-9b44-92cfbd5e1fea" },
      });
      // console.log("tempFormData", tempFormData);
      return;
    }
    // setActiveStep(activeStep + 1);
    else {
      // if (fs == "FALLBACK_VERIFICATION" && tempFormData?.FORM_TYPE == "OLD") {
      //   console.log("we can open modal here if fs is", tempFormData?.FORM_TYPE);
      // }
      // else {
      localStorage.removeItem('ADD_ONS')
      localStorage.removeItem('PROPOSAL_ID')
      router.push({
        pathname: "/carInsurance",
        query: { ...router.query, fs: fs },
      });
      // }

    }


  };

  //!DO not delete below commented code

  const RtoSelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Memoize filtered options to prevent unnecessary re-computations
    const filteredRtoOptions = useMemo(() => {
      if (!fetchedRtoOptions?.response) return [];

      return fetchedRtoOptions.response.filter(item =>
        item?.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [fetchedRtoOptions, searchQuery]);

    // Callback to handle search input changes
    const handleSearchChange = useCallback((e) => {
      setSearchQuery(e.target.value);
    }, []);

    // Pre-populate search query from existing form data
    useEffect(() => {
      if (tempFormData?.RTO) {
        setSearchQuery(tempFormData.RTO?.name);
      }
    }, [tempFormData]);

    // Virtualized list row renderer
    const RenderRow = useCallback(({ index, style }) => {
      const state = filteredRtoOptions[index];
      return (
        <div style={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          margin: 0
        }}>
          <ListItemButton
            secondaryAction={<ArrowForwardIcon color="primary" />}
            sx={{
              py: 1, // Reduced padding
              px: 2, // Added horizontal padding
              margin: 0,
              background: tempFormData?.RTO?.name === state?.code ? "#1976D2" : "transparent",
            }}
            onClick={() => {
              setSearchQuery("");
              dispatch(setField({
                field: "RTO",
                value: { id: state?.id, name: state?.code }
              }));

              // Determine next step based on form type
              const nextStep = tempFormData?.FORM_TYPE === 'NEW'
                ? "FALLBACK_CAR_MAKE"
                : "FALLBACK_CAR_REGISTRATION_YEAR";

              handleNextStep(nextStep);
            }}
          >
            <ListItemText
              primary={state?.code}
              sx={{
                marginLeft: "15px",
                '& .MuiTypography-root': {
                  margin: 0
                }
              }}
            />
            <ChevronRightIcon />
          </ListItemButton>
          <Divider sx={{ margin: 0 }} />
        </div>
      );
    }, [filteredRtoOptions, tempFormData]);

    // Render No Data Found component
    const NoDataFound = () => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400,
          textAlign: 'center'
        }}
      >
        <Typography variant="body1" color="textSecondary">
          {searchQuery
            ? `No RTO found matching "${searchQuery}"`
            : "No RTO locations available"
          }
        </Typography>
      </Box>
    );

    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Select RTO Location
        </Typography>

        <TextField
          fullWidth
          placeholder="Search RTO"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Conditionally render either Virtualized List or No Data Found */}
        {filteredRtoOptions.length > 0 ? (
          <VirtualizedList
            height={400} // Adjust based on your design
            itemCount={filteredRtoOptions.length}
            itemSize={50} // Reduced item size to match original design
            width="100%"
          >
            {RenderRow}
          </VirtualizedList>
        ) : (
          <NoDataFound />
        )}
      </Box>
    );
  };

  const CarRegistrationYearSelection = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.REGISTRATION_YEAR) {
        setSearchQuery(tempFormData.REGISTRATION_YEAR?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    const availableYears = Array.from({ length: 15 }, (_, i) =>
      dayjs().subtract(i + 1, 'year').year().toString()
    );

    // Filter logic: only filter if user has modified search
    const filteredOptions = availableYears?.filter(state =>
      !userModifiedSearch || state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Select Car Registration Year
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Year"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />


        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((state) => (
                <React.Fragment key={state}>
                  <ListItemButton
                    secondaryAction={<ArrowForwardIcon color="primary" />}
                    sx={{
                      py: 2,
                      background:
                        tempFormData?.REGISTRATION_YEAR?.name === state ? "#1976D2" : "transparent",
                    }}
                    onClick={() => {
                      setSearchQuery("");
                      setUserModifiedSearch(false);
                      dispatch(setField({ field: "REGISTRATION_YEAR", value: { id: state, name: state } }));
                      // handleNextStep("FALLBACK_CAR_MAKE");
                      handleNextStep("FALLBACK_CAR_MODEL");
                    }}
                  >
                    <ListItemText primary={state} sx={{ marginLeft: "15px" }} />
                    <ChevronRightIcon />
                  </ListItemButton>
                  <Divider />
                </React.Fragment>
              ))}
        </List>


      </Box>
    );
  }

  const CarMakerSelection = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.CAR_MAKE) {
        setSearchQuery(tempFormData.CAR_MAKE?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // Filter logic: only filter if user has modified search
    // const filteredOptions = carMakeList?.filter(state =>
    //   !userModifiedSearch || state.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const filteredOptions = fetchedMakeModelOptions?.response?.make_model_data?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Select Car Make
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Car Maker"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((maker) => (
                <React.Fragment key={maker?.id}>
                  <ListItemButton
                    secondaryAction={<ArrowForwardIcon color="primary" />}
                    sx={{
                      py: 2,
                      background:
                        tempFormData?.CAR_MAKE?.name === maker?.name ? "#1976D2" : "transparent",
                    }}
                    onClick={() => {
                      setSearchQuery("");
                      setUserModifiedSearch(false);
                      dispatch(setField({ field: "CAR_MAKE", value: { id: maker?.id, name: maker?.name } }));
                      // handleNextStep("FALLBACK_CAR_MODEL");
                      handleNextStep("FALLBACK_CAR_REGISTRATION_YEAR");
                    }}
                  >
                    <ListItemText primary={maker?.name} sx={{ marginLeft: "15px" }} />
                    <ChevronRightIcon />
                  </ListItemButton>
                </React.Fragment>
              ))}
        </List>
        {/* <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            color="primary"
            fullWidth
            variant="contained"
            onClick={handleNextStep}
          >
            Next
          </Button>
        </Box> */}
      </Box>
    );
  };

  const CarModelSelection = () => {

    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.CAR_MODEL) {
        setSearchQuery(tempFormData.CAR_MODEL?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    const brand = fetchedMakeModelOptions?.response?.make_model_data?.find(
      (item) => item.name === tempFormData?.CAR_MAKE?.name
    );

    console.log("brand", brand);

    // Filter logic: only filter if user has modified search
    // const filteredOptions = carModalList?.[tempFormData?.CAR_MAKE?.toLowerCase()]?.filter(state =>
    //   !userModifiedSearch || state.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const filteredOptions = brand?.pjMasterCarVehicleDetails?.filter(item =>
      !userModifiedSearch || item?.model_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Select Car Model
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Car Model"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((model) => (
                <React.Fragment key={model?.model_code}>
                  <ListItemButton
                    secondaryAction={<ArrowForwardIcon color="primary" />}
                    sx={{
                      py: 2,
                      background:
                        tempFormData?.CAR_MODEL?.name === model?.model_name ? "#1976D2" : "transparent",
                    }}
                    onClick={() => {
                      setSearchQuery("");
                      setUserModifiedSearch(false);
                      dispatch(setField({ field: "CAR_MODEL", value: { id: model?.model_code, name: model?.model_name } }));
                      // dispatch(actionGetFuelVariants({ "model_code": model?.model_code }));
                      // handleNextStep("FALLBACK_CAR_FUEL_TYPE");
                      handleNextStep("FALLBACK_CAR_VARIANT");
                    }}
                  >
                    {/* <img
                  src="/images/suzuki.png"
                  alt="car"
                  height={30}
                  width={30}
                /> */}
                    <ListItemText primary={model?.model_name} sx={{ marginLeft: "15px" }} />
                    <ChevronRightIcon />
                  </ListItemButton>
                </React.Fragment>
              ))}
        </List>
      </Box>
    );
  };



  const CarFuelTypeSelection = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [gasType, setGasType] = useState('');
    const [amount, setAmount] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [externalKitDetails, setExternalKitDetails] = useState({});

    const isFormValid = gasType && amount;

    const handleDialogSubmit = () => {
      setSubmitted(true);

      if (!gasType || !amount) {
        // Do not proceed if validation fails
        return;
      }

      console.log('Selected gas type:', gasType);
      console.log('Amount entered:', amount);

      dispatch(setField({ field: "CAR_FUEL_TYPE", value: { id: "PETROL+CNG/LPG", name: externalKitDetails?.name } }));
      dispatch(setField({ field: "GAS_TYPE", value: gasType }));
      dispatch(setField({ field: "GAS_COST", value: amount }));

      setIsDialogOpen(false);
      handleNextStep("FALLBACK_CAR_VARIANT");
    };

    return (
      <>
        {//!fetchedFuelVariantOptions ?
          //<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "35vh" }}>
          //<CircularProgress disableShrink />
          //</Box> :
          <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
              Select Fuel Type
            </Typography>

            <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
              {/* {carFuelType */}
              {fetchedFuelVariantOptions?.response?.fuel?.length == 0 ?
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
                  <Typography variant="body1">No data found!</Typography>
                </Box> :
                fetchedFuelVariantOptions?.response?.fuel
                  ?.map((type) => (
                    <ListItemButton
                      secondaryAction={<ArrowForwardIcon color="primary" />}
                      sx={{
                        py: 2,
                        background:
                          tempFormData?.CAR_FUEL_TYPE?.name === type?.name ? "#1976D2" : "transparent",
                      }}
                      // onClick={() => {
                      //   dispatch(setField({ field: "CAR_FUEL_TYPE", value: { id: type?.key, name: type?.name } }));
                      //   handleNextStep("FALLBACK_CAR_VARIANT");
                      // }}
                      onClick={() => {
                        if (type?.key == "PETROL+CNG/LPG") {
                          setExternalKitDetails({
                            id: type?.key, name: type?.name
                          })
                          setIsDialogOpen(true);
                          // dispatch(setField({ field: "CAR_FUEL_TYPE", value: { id: type?.key, name: type?.name } }));
                        } else {
                          dispatch(setField({ field: "CAR_FUEL_TYPE", value: { id: type?.key, name: type?.name } }));
                          dispatch(resetMultipleFields(["GAS_TYPE", "GAS_COST"]));
                          handleNextStep("FALLBACK_CAR_VARIANT");
                        }
                      }}
                    >
                      <ListItemText primary={type?.name} sx={{ marginLeft: "15px" }} />
                      <ChevronRightIcon />
                    </ListItemButton>
                  ))}
            </List>
          </Box>
        }

        {/* <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          PaperProps={{
            sx: {
              width: '400px',
              maxWidth: '90vw',
            }
          }}
        >
          <DialogTitle>External Fitted Kit Details</DialogTitle>
          <DialogContent dividers>
            <Select
              value={gasType}
              onChange={(e) => setGasType(e.target.value)}
              displayEmpty
              fullWidth
              error={!gasType}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300
                  },
                },
              }}
            >
              <MenuItem value="" disabled>Select Kit Type</MenuItem>
              <MenuItem value="CNG">CNG</MenuItem>
              <MenuItem value="LPG">LPG</MenuItem>
            </Select>

            {!gasType && (
              <Typography color="error" sx={{ mt: 1 }}>
                Please select a gas type
              </Typography>
            )}

            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              error={!amount}
              helperText={!amount ? "Amount is required" : ""}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button disabled={!isFormValid} variant="contained" onClick={handleDialogSubmit}>Submit</Button>
          </DialogActions>
        </Dialog> */}

        <Dialog
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          PaperProps={{
            sx: {
              width: '400px',
              maxWidth: '90vw',
            }
          }}
        >
          <DialogTitle>External Fitted Kit Details</DialogTitle>
          <DialogContent dividers>
            <Select
              value={gasType}
              onChange={(e) => setGasType(e.target.value)}
              displayEmpty
              fullWidth
              error={submitted && !gasType}
              MenuProps={{
                PaperProps: {
                  style: { maxHeight: 300 },
                },
              }}
            >
              <MenuItem value="" disabled>Select Kit Type</MenuItem>
              <MenuItem value="CNG">CNG</MenuItem>
              <MenuItem value="LPG">LPG</MenuItem>
            </Select>
            {submitted && !gasType && (
              <Typography color="error" sx={{ mt: 1 }}>
                Please select a Kit Type
              </Typography>
            )}

            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              error={submitted && !amount}
              helperText={submitted && !amount ? "Amount is required" : ""}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleDialogSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  const CarVariantsSelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.CAR_VARIANT) {
        setSearchQuery(tempFormData.CAR_VARIANT?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const variants = [
      {
        "key": 37040,
        "name": "1.8 V MT SUNROOF (1799 )"
      },
      {
        "key": 37041,
        "name": "1.8 V MT (1799 )"
      },
      {
        "key": 37042,
        "name": "1.8 V AT SUNROOF (1799 )"
      },
      {
        "key": 37043,
        "name": "1.8 S AT (1799 )"
      },
      {
        "key": 37044,
        "name": "1.8 S MT (1799 )"
      },
      {
        "key": 37060,
        "name": "HYBRID (1339 )"
      },
      {
        "key": 37064,
        "name": "1.8 V AT (1799 )"
      },
      {
        "key": 37069,
        "name": "1.8 E MT (1799 )"
      },
      {
        "key": 37099,
        "name": "SPORT (1799 )"
      },
      {
        "key": 37100,
        "name": "MT (1799 )"
      },
      {
        "key": 37101,
        "name": "AT (1799 )"
      },
      {
        "key": 37132,
        "name": "1.8 SMT (1799 )"
      },
      {
        "key": 37133,
        "name": "HYBRID 1.5 AT (1497 )"
      },
      {
        "key": 40908,
        "name": "VX CVT (1799 )"
      },
      {
        "key": 40910,
        "name": "ZX CVT (1799 )"
      },
      {
        "key": 40937,
        "name": "V CVT Petrol (1799 )"
      },
      {
        "key": 40984,
        "name": "1.8 V CVT (1799 )"
      }
    ];

    const filteredOptions = variants?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Select Car Variant
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Car Variant"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.CAR_VARIANT?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "CAR_VARIANT", value: { id: variant?.key, name: variant?.name } }));
                    // if (tempFormData?.FORM_TYPE == 'NEW') {
                    //   let params = {
                    //     "insurance_type": tempFormData?.FORM_TYPE == 'NEW' ? "new" : "old",
                    //     "pj_master_car_vehicle_detail_id": variant?.key,
                    //     "pj_master_motor_rto_location_id": tempFormData?.RTO?.id,
                    //   }
                    //   if (tempFormData?.GAS_TYPE == 'CNG') {
                    //     params.cng_kit_value = tempFormData?.GAS_COST
                    //   }
                    //   else if (tempFormData?.GAS_TYPE == 'LPG') {
                    //     params.lpg_kit_value = tempFormData?.GAS_COST
                    //   }

                    //   try {
                    //     const result = await dispatch(actionCreateEnquiry({ ...params })).unwrap();
                    //     console.log("result enquiry", result);
                    //     if (result?.status === 200) {
                    //       handleNextStep("FALLBACK_VERIFICATION");
                    //       toast.success(result?.message)
                    //     } else {
                    //       toast.error(result?.message)
                    //     }
                    //   } catch (error) {
                    //     console.log("Error creating enquiry:", error);
                    //   }
                    //   // dispatch(actionCreateEnquiry({ ...params }));
                    //   // handleNextStep("FALLBACK_VERIFICATION");
                    // }
                    // else {
                    //   setOpenClainDetailModal(true);
                    // }
                    handleNextStep("FALLBACK_CAR_SPECIFICATION");
                  }}
                >
                  {/* <img
                  src="/images/suzuki.png"
                  alt="car"
                  height={30}
                  width={30}
                /> */}
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };

  const CarSpecificationSelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.CAR_SPECIFICATION) {
        setSearchQuery(tempFormData.CAR_SPECIFICATION?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const specifications = [
      {
        "key": 37040,
        "name": "GCC Spec"
      },
      {
        "key": 37041,
        "name": "Non-Gcc Spec/Modified"
      }
    ];

    const filteredOptions = specifications?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Select Car Specifications
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Car Specification"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.CAR_SPECIFICATION?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "CAR_SPECIFICATION", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    handleNextStep("FALLBACK_NATIONALITY");
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };

  const NationalitySelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.USER_NATIONALITY) {
        setSearchQuery(tempFormData.USER_NATIONALITY?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const nations = [
      {
        "key": 37040,
        "name": "USA"
      },
      {
        "key": 37041,
        "name": "India"
      },
      {
        "key": 37042,
        "name": "Canada"
      },
      {
        "key": 37043,
        "name": "Germany"
      },
      {
        "key": 37044,
        "name": "Australia"
      },
      {
        "key": 37045,
        "name": "United Kingdom"
      },
      {
        "key": 37046,
        "name": "France"
      },
      {
        "key": 37047,
        "name": "Japan"
      },
      {
        "key": 37048,
        "name": "Brazil"
      },
      {
        "key": 37049,
        "name": "South Africa"
      }
    ];

    const filteredOptions = nations?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Select Nationality
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Nationality"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.USER_NATIONALITY?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "USER_NATIONALITY", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    handleNextStep('FALLBACK_REGISTRATION_CITY');
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };


  const RegistrationCitySelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.REGISTRATION_CITY) {
        setSearchQuery(tempFormData.REGISTRATION_CITY?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const emirates = [
      {
        "key": 1001,
        "name": "Dubai"
      },
      {
        "key": 1002,
        "name": "Sharjah"
      },
      {
        "key": 1003,
        "name": "Abu Dhabi"
      },
      {
        "key": 1004,
        "name": "Ras Al Khaimah"
      },
      {
        "key": 1005,
        "name": "Al Ain"
      },
      {
        "key": 1006,
        "name": "Ajman"
      },
      {
        "key": 1007,
        "name": "Fujairah"
      },
      {
        "key": 1008,
        "name": "Umm Al Quwain"
      }
    ];


    const filteredOptions = emirates?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Where do you want to register you car?
        </Typography>

        <TextField
          fullWidth
          placeholder="Search City"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.REGISTRATION_CITY?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "REGISTRATION_CITY", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    handleNextStep('FALLBACK_POLICY_CASE');
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };


  const PolicyCaseSelection = () => {

    const cases = [
      {
        "key": 1001,
        "name": "Yes"
      },
      {
        "key": 1002,
        "name": "No"
      }
    ];

    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Is your car brand new?
        </Typography>

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {cases?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            cases
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.POLICY_CASE?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    dispatch(setField({ field: "POLICY_CASE", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    if (variant?.name == 'Yes') {
                      handleNextStep('FALLBACK_UAE_DRIVING_EXP');
                    }
                    else {
                      handleNextStep('FALLBACK_IS_CAR_USED');
                    }
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };


  const IsCarUsedSelection = () => {

    const cases = [
      {
        "key": 1001,
        "name": "Yes"
      },
      {
        "key": 1002,
        "name": "No"
      }
    ];

    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Buying a Second Hand Car ?
        </Typography>

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {cases?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            cases
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.IS_CAR_USED?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    dispatch(setField({ field: "IS_CAR_USED", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    handleNextStep('FALLBACK_FIRST_REG_YEAR');
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };

  const FirstRegYearSelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.FIRST_REGISTRATION_YEAR) {
        setSearchQuery(tempFormData.FIRST_REGISTRATION_YEAR?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const cases = [
      {
        "key": 1001,
        "name": "2024"
      },
      {
        "key": 1002,
        "name": "2025"
      }
    ];


    const filteredOptions = cases?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          First Registration Year
        </Typography>

        <TextField
          fullWidth
          placeholder="Search Year"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.FIRST_REGISTRATION_YEAR?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "FIRST_REGISTRATION_YEAR", value: { id: variant?.key, name: variant?.name } }));
                    handleNextStep('FALLBACK_UAE_DRIVING_EXP');
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };

  const UAEDrivingExpSelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.UAE_DRIVING_EXP) {
        setSearchQuery(tempFormData.UAE_DRIVING_EXP?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const experienceRanges = [
      {
        "key": 1,
        "name": "0 - 6 Months"
      },
      {
        "key": 2,
        "name": "6 - 12 Months"
      },
      {
        "key": 3,
        "name": "1 - 2 Years"
      },
      {
        "key": 4,
        "name": "2 - 3 Years"
      },
      {
        "key": 5,
        "name": "3 - 4 Years"
      },
      {
        "key": 6,
        "name": "4 - 5 Years"
      },
      {
        "key": 7,
        "name": "Above 5 Years"
      }
    ];


    const filteredOptions = experienceRanges?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          UAE Driving Exp.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.UAE_DRIVING_EXP?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "UAE_DRIVING_EXP", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    handleNextStep('FALLBACK_INTRL_DRIVING_EXP');
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };

  const IntrlDrivingExpSelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.INTRL_DRIVING_EXP) {
        setSearchQuery(tempFormData.INTRL_DRIVING_EXP?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const experienceRanges = [
      {
        "key": 1,
        "name": "0 - 6 Months"
      },
      {
        "key": 2,
        "name": "6 - 12 Months"
      },
      {
        "key": 3,
        "name": "1 - 2 Years"
      },
      {
        "key": 4,
        "name": "Above 2 Years"
      },
    ];


    const filteredOptions = experienceRanges?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          International Driving Exp.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.INTRL_DRIVING_EXP?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "INTRL_DRIVING_EXP", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    handleNextStep('FALLBACK_CAR_REGISTRATION_DATE');
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };


  const CarRegistrationDateSelection = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
      if (tempFormData?.CAR_REGISTRATION_DATE?.name) {
        // Convert string to Date object
        const dateValue = new Date(tempFormData.CAR_REGISTRATION_DATE.name);
        // Check if the date is valid before setting it
        if (!isNaN(dateValue.getTime())) {
          setSelectedDate(dateValue);
        }
      }
    }, [tempFormData]);

    const handleDateChange = (newDate) => {
      setSelectedDate(newDate);
      // Format the date as string for storage if needed
      const dateString = newDate ? newDate.toISOString().split('T')[0] : null;
      dispatch(setField({
        field: "CAR_REGISTRATION_DATE",
        value: {
          id: dateString,
          name: dateString
        }
      }));
      // setOpenClainDetailModal(true);
      handleNextStep('FALLBACK_CAR_DAMAGE_DURATION');
    };

    return (
      <DatePickerWrapper>
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            When do you want to register your car?
          </Typography>

          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            placeholderText="DD/MM/YYYY"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            isClearable
            showYearDropdown
            showMonthDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={10}
            customInput={
              <CustomInput
                value={selectedDate}
                onChange={handleDateChange}
                label={<CustomLabel label="Car Registration Date" required />}
                aria-describedby="validation-basic-registration-date"
              />
            }
          />
        </Box>
      </DatePickerWrapper>
    );
  };

  const CarDamageSelection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const [userModifiedSearch, setUserModifiedSearch] = useState(false);

    useEffect(() => {
      if (tempFormData?.CAR_DAMAGE_DURATION) {
        setSearchQuery(tempFormData.CAR_DAMAGE_DURATION?.name);
      }
    }, [tempFormData]);

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
      setUserModifiedSearch(true);
    };

    // const variants = fetchedFuelVariantOptions?.response?.variants[tempFormData?.CAR_FUEL_TYPE?.id];

    const dateRanges = [
      {
        "key": 1,
        "name": "Never met with an Accident"
      },
      {
        "key": 2,
        "name": "0 - 12 Months Ago"
      },
    ];


    const filteredOptions = dateRanges?.filter(item =>
      !userModifiedSearch || item?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          How many months without any Accident?
        </Typography>

        <TextField
          fullWidth
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ mb: 2 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ width: "100%", maxHeight: "60dvh", overflowY: "auto" }}>
          {filteredOptions?.length == 0 ?
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "30vh" }}>
              <Typography variant="body1">No data found!</Typography>
            </Box> :
            filteredOptions
              ?.map((variant) => (
                <ListItemButton
                  secondaryAction={<ArrowForwardIcon color="primary" />}
                  key={variant?.key}
                  sx={{
                    py: 2,
                    background:
                      tempFormData?.CAR_DAMAGE_DURATION?.name === variant?.name ? "#1976D2" : "transparent",
                  }}
                  onClick={async () => {
                    setSearchQuery("");
                    setUserModifiedSearch(false);
                    dispatch(setField({ field: "CAR_DAMAGE_DURATION", value: { id: variant?.key, name: variant?.name } }));
                    // setOpenClainDetailModal(true);
                    handleNextStep('FALLBACK_VERIFICATION');
                  }}
                >
                  <ListItemText primary={variant?.name} sx={{ marginLeft: "15px" }} />
                  <ChevronRightIcon />
                </ListItemButton>
              ))}
        </List>
      </Box>
    );
  };


  const renderComponent = () => {
    switch (activeStep) {
      // case 2:
      //   return <RtoSelection />;
      case 3:
        return <CarMakerSelection />;
      case 4:
        return <CarRegistrationYearSelection />;
      case 5:
        return <CarModelSelection />;
      // case 6:
      //   return <CarFuelTypeSelection />;
      case 6:
        return <CarVariantsSelection />;
      case 7:
        return <CarSpecificationSelection />;
      case 8:
        return <NationalitySelection />;
      case 9:
        return <RegistrationCitySelection />;
      case 10:
        return <PolicyCaseSelection />;
      case 11:
        return <IsCarUsedSelection />;
      case 12:
        return <FirstRegYearSelection />;
      case 13:
        return <UAEDrivingExpSelection />;
      case 14:
        return <IntrlDrivingExpSelection />;
      case 15:
        return <CarRegistrationDateSelection />;
      case 16:
        return <CarDamageSelection />;
      case 17:
        return (<ClaimSection handleNextStep={handleNextStep} />);
    }
  };
  return <Box>{renderComponent()}</Box>;
};

export default FormSection;
