import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "src/common/api";
import { API_CREATE_ENQUIRY, API_CREATE_LEAD, API_GET_QUOTE_MASTER, API_GET_QUOTES, API_UPDATE_QUOTE_DETAILS } from "src/common/api/constants";

// Reusable initial state
const initialState = {
    QUOTES: {
        "result": true,
        "status": 200,
        "response": {
            "enquiry_id": "e329020a-625b-4c25-bb2e-5541c10e851c",
            "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
            "manufacture_date": "2025-06-01",
            "registration_date": "2025-06-17",
            "policy_type": "1od_3tp",
            "idv": null,
            "max_idv": 1528129,
            "min_idv": 986138,
            "created_at": "2025-06-17T14:39:23.000Z",
            "updated_at": "2025-06-17T14:39:23.000Z",
            "proposer_type": "Individual",
            "pa_cover": 1,
            "electrical_kit_value": null,
            "non_electrical_kit_value": null,
            "previous_policy_expire_date": null,
            "previous_tp_policy_expire_date": null,
            "previous_ncb_percentage": null,
            "previous_policy_type": null,
            "other_previous_insurer_details": null,
            "previous_policy_insurer_id": null,
            "previous_tp_policy_insurer_id": null,
            "previous_policy_start_date": null,
            "previous_tp_policy_start_date": null,
            "is_claim_made_last_year": 0,
            "pjCarEnquiryDetails": {
                "enquiry_id": "e329020a-625b-4c25-bb2e-5541c10e851c",
                "pj_master_car_vehicle_detail_id": 37099,
                "insurance_type": "new",
                "request_type": null,
                "pj_master_motor_rto_location_id": 861,
                "vehicle_registration_no": null,
                "cng_kit_value": null,
                "ownership_transferred": 0,
                "lead_id": 1,
                "status": 1,
                "lpg_kit_value": null,
                "type": "online",
                "other_car_vehicle_details": null,
                "is_policy_expired": null,
                "policy_expire_type": null,
                "registration_year": null,
                "pjMasterCarVehicleDetails": {
                    "make_name": "HONDA",
                    "model_name": "CIVIC",
                    "variant_name": "SPORT",
                    "fuel": "PETROL",
                    "cubic_capacity": 1799
                },
                "pjMasterMotorRtoLocations": {
                    "code": "MH01"
                }
            },
            "premiums": [
                {
                    "id": 40483,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 3,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 9381.44,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:29.000Z",
                    "updated_at": "2025-06-17T14:39:29.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 843.5,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "pro",
                        "label": "Pro",
                        "dependent_addon_covers": {
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40482,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 7,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 10824.92,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:29.000Z",
                    "updated_at": "2025-06-17T14:39:29.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 677.69,
                        "invoice_price": 0,
                        "personal_loss": 843.5,
                        "engine_protection": 0,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dct_pro",
                        "label": "DCT Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "tyre_secure"
                            ],
                            "tyre_secure": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "tyre_secure"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "tyre_secure"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "consumables",
                                "tyre_secure"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "tyre_secure"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables",
                            "tyre_secure"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40481,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 4,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 10499.63,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:29.000Z",
                    "updated_at": "2025-06-17T14:39:29.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 843.5,
                        "engine_protection": 0,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "d_pro",
                        "label": "D Pro",
                        "dependent_addon_covers": {
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation"
                            ]
                        },
                        "addon_covers": [
                            "zero_depreciation",
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40480,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 5,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 10702.94,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:29.000Z",
                    "updated_at": "2025-06-17T14:39:29.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 843.5,
                        "engine_protection": 0,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dc_pro",
                        "label": "DC Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "consumables"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40479,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 23,
                    "pj_sub_product_insurer_plan_package_id": 25,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-18",
                    "policy_end_date": "2028-06-17",
                    "idv": 986138,
                    "min_idv": 986138,
                    "max_idv": 1479207,
                    "basic_od_premium": 10176.94,
                    "basic_tp_premium": 24596,
                    "service_tax": 6513.83,
                    "company_json": {
                        "quotation_no": "0000320475"
                    },
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 375
                        },
                        {
                            "cover": 100000,
                            "premium": 750
                        },
                        {
                            "cover": 200000,
                            "premium": 1125
                        }
                    ],
                    "pa_cover": 890,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:28.000Z",
                    "updated_at": "2025-06-17T14:39:28.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 0
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": 0,
                    "non_electrical_accessories": 0,
                    "pjMasterInsuranceCompanies": {
                        "name": "future_generali",
                        "label": "Adamjee Insurance Comprehensive (Garage)",
                        "id": 23
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "basic",
                        "label": "Basic",
                        "dependent_addon_covers": null,
                        "addon_covers": null,
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 2,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/adamjee.png",
                                "policy_wording_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/insurance_companies/policy_wording/fg_policy_wording.pdf",
                                "cashless_url": "https://general.futuregenerali.in/garage-locator"
                            }
                        }
                    }
                },
                {
                    "id": 40478,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 6,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 10906.25,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:28.000Z",
                    "updated_at": "2025-06-17T14:39:28.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 843.5,
                        "engine_protection": 1129.49,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dce_pro",
                        "label": "DCE Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "engine_protection"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection"
                            ],
                            "engine_protection": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables",
                            "engine_protection"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40477,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 23,
                    "pj_sub_product_insurer_plan_package_id": 27,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-18",
                    "policy_end_date": "2028-06-17",
                    "idv": 986138,
                    "min_idv": 986138,
                    "max_idv": 1479207,
                    "basic_od_premium": 10176.94,
                    "basic_tp_premium": 24596,
                    "service_tax": 7135.1,
                    "company_json": {
                        "quotation_no": "0000950599"
                    },
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 375
                        },
                        {
                            "cover": 100000,
                            "premium": 750
                        },
                        {
                            "cover": 200000,
                            "premium": 1125
                        }
                    ],
                    "pa_cover": 890,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:27.000Z",
                    "updated_at": "2025-06-17T14:39:27.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 3451.49
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": 0,
                    "non_electrical_accessories": 0,
                    "pjMasterInsuranceCompanies": {
                        "name": "future_generali",
                        "label": "Adamjee Insurance Comprehensive (Garage)",
                        "id": 23
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "STZDP",
                        "label": "STZDP",
                        "dependent_addon_covers": {
                            "personal_loss": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "key_lock_replacement"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement"
                            ],
                            "key_lock_replacement": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss"
                            ],
                            "24x7_road_side_assistance": [
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "zero_depreciation",
                            "personal_loss",
                            "key_lock_replacement"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 2,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/adamjee.png",
                                "policy_wording_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/insurance_companies/policy_wording/fg_policy_wording.pdf",
                                "cashless_url": "https://general.futuregenerali.in/garage-locator"
                            }
                        }
                    }
                },
                {
                    "id": 40476,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 23,
                    "pj_sub_product_insurer_plan_package_id": 28,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-18",
                    "policy_end_date": "2028-06-17",
                    "idv": 986138,
                    "min_idv": 986138,
                    "max_idv": 1479207,
                    "basic_od_premium": 10176.94,
                    "basic_tp_premium": 24596,
                    "service_tax": 7312.6,
                    "company_json": {
                        "quotation_no": "0000386207"
                    },
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 375
                        },
                        {
                            "cover": 100000,
                            "premium": 750
                        },
                        {
                            "cover": 200000,
                            "premium": 1125
                        }
                    ],
                    "pa_cover": 890,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:27.000Z",
                    "updated_at": "2025-06-17T14:39:27.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 4437.61
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": 0,
                    "non_electrical_accessories": 0,
                    "pjMasterInsuranceCompanies": {
                        "name": "future_generali",
                        "label": "Adamjee Insurance Comprehensive (Garage)",
                        "id": 23
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "ZDCNS",
                        "label": "ZDCNS",
                        "dependent_addon_covers": {
                            "consumables": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement"
                            ],
                            "personal_loss": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "consumables"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables"
                            ],
                            "key_lock_replacement": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "consumables"
                            ],
                            "24x7_road_side_assistance": [
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "zero_depreciation",
                            "personal_loss",
                            "key_lock_replacement",
                            "consumables"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 2,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/adamjee.png",
                                "policy_wording_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/insurance_companies/policy_wording/fg_policy_wording.pdf",
                                "cashless_url": "https://general.futuregenerali.in/garage-locator"
                            }
                        }
                    }
                },
                {
                    "id": 40475,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 8,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 11028.23,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:27.000Z",
                    "updated_at": "2025-06-17T14:39:27.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 677.69,
                        "invoice_price": 0,
                        "personal_loss": 843.5,
                        "engine_protection": 1129.49,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dcet_pro",
                        "label": "DCET Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "tyre_secure": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "engine_protection": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "tyre_secure"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables",
                            "engine_protection",
                            "tyre_secure"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40474,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 23,
                    "pj_sub_product_insurer_plan_package_id": 29,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-18",
                    "policy_end_date": "2028-06-17",
                    "idv": 986138,
                    "min_idv": 986138,
                    "max_idv": 1479207,
                    "basic_od_premium": 10176.94,
                    "basic_tp_premium": 24596,
                    "service_tax": 7756.36,
                    "company_json": {
                        "quotation_no": "0000213512"
                    },
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 375
                        },
                        {
                            "cover": 100000,
                            "premium": 750
                        },
                        {
                            "cover": 200000,
                            "premium": 1125
                        }
                    ],
                    "pa_cover": 890,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:27.000Z",
                    "updated_at": "2025-06-17T14:39:27.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 6902.97
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": 0,
                    "non_electrical_accessories": 0,
                    "pjMasterInsuranceCompanies": {
                        "name": "future_generali",
                        "label": "Adamjee Insurance Comprehensive (Garage)",
                        "id": 23
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "ZDCNE",
                        "label": "ZDCNE",
                        "dependent_addon_covers": {
                            "consumables": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "engine_protection"
                            ],
                            "personal_loss": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection"
                            ],
                            "engine_protection": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection"
                            ],
                            "key_lock_replacement": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "consumables",
                                "engine_protection"
                            ],
                            "24x7_road_side_assistance": [
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "zero_depreciation",
                            "personal_loss",
                            "key_lock_replacement",
                            "consumables",
                            "engine_protection"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 2,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/adamjee.png",
                                "policy_wording_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/insurance_companies/policy_wording/fg_policy_wording.pdf",
                                "cashless_url": "https://general.futuregenerali.in/garage-locator"
                            }
                        }
                    }
                },
                {
                    "id": 40473,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 9,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 10957.07,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:26.000Z",
                    "updated_at": "2025-06-17T14:39:26.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 0,
                        "invoice_price": 1411.86,
                        "personal_loss": 843.5,
                        "engine_protection": 0,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dc_rti_pro",
                        "label": "DC- RTI Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price"
                            ],
                            "invoice_price": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "invoice_price",
                                "consumables"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables",
                            "invoice_price"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40472,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 23,
                    "pj_sub_product_insurer_plan_package_id": 30,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-18",
                    "policy_end_date": "2028-06-17",
                    "idv": 986138,
                    "min_idv": 986138,
                    "max_idv": 1479207,
                    "basic_od_premium": 10176.94,
                    "basic_tp_premium": 24596,
                    "service_tax": 7756.36,
                    "company_json": {
                        "quotation_no": "0000872044"
                    },
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 375
                        },
                        {
                            "cover": 100000,
                            "premium": 750
                        },
                        {
                            "cover": 200000,
                            "premium": 1125
                        }
                    ],
                    "pa_cover": 890,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:26.000Z",
                    "updated_at": "2025-06-17T14:39:26.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 6902.97
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": 0,
                    "non_electrical_accessories": 0,
                    "pjMasterInsuranceCompanies": {
                        "name": "future_generali",
                        "label": "Adamjee Insurance Comprehensive (Garage)",
                        "id": 23
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "ZDCNT",
                        "label": "ZDCNT",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement",
                                "tyre_secure"
                            ],
                            "tyre_secure": [
                                "24x7_road_side_assistance",
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "zero_depreciation",
                                "key_lock_replacement",
                                "consumables",
                                "tyre_secure"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "tyre_secure"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "zero_depreciation",
                                "personal_loss",
                                "consumables",
                                "tyre_secure"
                            ],
                            "24x7_road_side_assistance": [
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "tyre_secure"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "zero_depreciation",
                            "personal_loss",
                            "key_lock_replacement",
                            "consumables",
                            "tyre_secure"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 2,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/adamjee.png",
                                "policy_wording_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/insurance_companies/policy_wording/fg_policy_wording.pdf",
                                "cashless_url": "https://general.futuregenerali.in/garage-locator"
                            }
                        }
                    }
                },
                {
                    "id": 40471,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 10,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 11160.38,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:26.000Z",
                    "updated_at": "2025-06-17T14:39:26.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 0,
                        "invoice_price": 1411.86,
                        "personal_loss": 843.5,
                        "engine_protection": 1129.49,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dce_rti_pro",
                        "label": "DCE - RTI Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "engine_protection"
                            ],
                            "invoice_price": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables",
                                "engine_protection"
                            ],
                            "engine_protection": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "invoice_price",
                                "consumables",
                                "engine_protection"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables",
                                "engine_protection"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables",
                                "engine_protection"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables",
                            "invoice_price",
                            "engine_protection"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40470,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 23,
                    "pj_sub_product_insurer_plan_package_id": 31,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-18",
                    "policy_end_date": "2028-06-17",
                    "idv": 986138,
                    "min_idv": 986138,
                    "max_idv": 1479207,
                    "basic_od_premium": 10176.94,
                    "basic_tp_premium": 24596,
                    "service_tax": 7933.87,
                    "company_json": {
                        "quotation_no": "0000680653"
                    },
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 375
                        },
                        {
                            "cover": 100000,
                            "premium": 750
                        },
                        {
                            "cover": 200000,
                            "premium": 1125
                        }
                    ],
                    "pa_cover": 890,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:26.000Z",
                    "updated_at": "2025-06-17T14:39:26.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 7889.11
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": 0,
                    "non_electrical_accessories": 0,
                    "pjMasterInsuranceCompanies": {
                        "name": "future_generali",
                        "label": "Adamjee Insurance Comprehensive (Garage)",
                        "id": 23
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "ZDCET",
                        "label": "ZDCET",
                        "dependent_addon_covers": {
                            "consumables": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "tyre_secure": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection"
                            ],
                            "personal_loss": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "engine_protection": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "tyre_secure"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "key_lock_replacement": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "24x7_road_side_assistance": [
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "zero_depreciation",
                            "personal_loss",
                            "key_lock_replacement",
                            "consumables",
                            "tyre_secure",
                            "engine_protection"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 2,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/adamjee.png",
                                "policy_wording_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/insurance_companies/policy_wording/fg_policy_wording.pdf",
                                "cashless_url": "https://general.futuregenerali.in/garage-locator"
                            }
                        }
                    }
                },
                {
                    "id": 40469,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 11,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 11079.06,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:25.000Z",
                    "updated_at": "2025-06-17T14:39:25.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 677.69,
                        "invoice_price": 1411.86,
                        "personal_loss": 843.5,
                        "engine_protection": 0,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dct_rti_pro",
                        "label": "DCT - RTI Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "tyre_secure"
                            ],
                            "tyre_secure": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables"
                            ],
                            "invoice_price": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "tyre_secure"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables",
                                "tyre_secure"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "invoice_price",
                                "consumables",
                                "tyre_secure"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables",
                                "tyre_secure"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "invoice_price",
                                "consumables",
                                "tyre_secure"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables",
                            "invoice_price",
                            "tyre_secure"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40468,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 23,
                    "pj_sub_product_insurer_plan_package_id": 32,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-18",
                    "policy_end_date": "2028-06-17",
                    "idv": 986138,
                    "min_idv": 986138,
                    "max_idv": 1479207,
                    "basic_od_premium": 10176.94,
                    "basic_tp_premium": 24596,
                    "service_tax": 8111.37,
                    "company_json": {
                        "quotation_no": "0000216414"
                    },
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 375
                        },
                        {
                            "cover": 100000,
                            "premium": 750
                        },
                        {
                            "cover": 200000,
                            "premium": 1125
                        }
                    ],
                    "pa_cover": 890,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:25.000Z",
                    "updated_at": "2025-06-17T14:39:25.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 8875.24
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": 0,
                    "non_electrical_accessories": 0,
                    "pjMasterInsuranceCompanies": {
                        "name": "future_generali",
                        "label": "Adamjee Insurance Comprehensive (Garage)",
                        "id": 23
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "ZCETR",
                        "label": "ZCETR",
                        "dependent_addon_covers": {
                            "consumables": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "tyre_secure": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "invoice_price"
                            ],
                            "invoice_price": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "personal_loss": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "engine_protection": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "key_lock_replacement": [
                                "zero_depreciation",
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "24x7_road_side_assistance": [
                                "zero_depreciation",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "zero_depreciation",
                            "personal_loss",
                            "key_lock_replacement",
                            "consumables",
                            "tyre_secure",
                            "engine_protection",
                            "invoice_price"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 2,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/adamjee.png",
                                "policy_wording_url": "https://kaito-retail-pub-bucket.s3.ap-south-1.amazonaws.com/kaito_retail/insurance_companies/policy_wording/fg_policy_wording.pdf",
                                "cashless_url": "https://general.futuregenerali.in/garage-locator"
                            }
                        }
                    }
                },
                {
                    "id": 40467,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 12,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 11282.37,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:25.000Z",
                    "updated_at": "2025-06-17T14:39:25.000Z",
                    "addon_covers": {
                        "consumables": 1129.49,
                        "tyre_secure": 677.69,
                        "invoice_price": 1411.86,
                        "personal_loss": 843.5,
                        "engine_protection": 1129.49,
                        "zero_depreciation": 6212.17,
                        "key_lock_replacement": 350,
                        "24x7_road_side_assistance": 218
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "dcet_rti_pro",
                        "label": "DCET - RTI Pro",
                        "dependent_addon_covers": {
                            "consumables": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "tyre_secure": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "invoice_price"
                            ],
                            "invoice_price": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "tyre_secure"
                            ],
                            "personal_loss": [
                                "24x7_road_side_assistance",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "engine_protection": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "zero_depreciation": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "key_lock_replacement",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "key_lock_replacement": [
                                "24x7_road_side_assistance",
                                "personal_loss",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ],
                            "24x7_road_side_assistance": [
                                "personal_loss",
                                "key_lock_replacement",
                                "zero_depreciation",
                                "consumables",
                                "engine_protection",
                                "tyre_secure",
                                "invoice_price"
                            ]
                        },
                        "addon_covers": [
                            "24x7_road_side_assistance",
                            "personal_loss",
                            "key_lock_replacement",
                            "zero_depreciation",
                            "consumables",
                            "invoice_price",
                            "engine_protection",
                            "tyre_secure"
                        ],
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                },
                {
                    "id": 40466,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 2,
                    "pj_sub_product_insurer_plan_package_id": 1,
                    "vehicle_age": null,
                    "policy_start_date": "2025-06-17",
                    "policy_end_date": "2028-06-16",
                    "idv": 1129486,
                    "min_idv": 1129486,
                    "max_idv": 1528129,
                    "basic_od_premium": 23312.59,
                    "basic_tp_premium": 24596,
                    "service_tax": 9127.37,
                    "company_json": null,
                    "legal_liability_driver": 150,
                    "extra_od": null,
                    "extra_addons": null,
                    "discounts": null,
                    "special_discounts": null,
                    "passenger_cover": [
                        {
                            "cover": 50000,
                            "premium": 750
                        },
                        {
                            "cover": 100000,
                            "premium": 1500
                        },
                        {
                            "cover": 200000,
                            "premium": 2250
                        }
                    ],
                    "pa_cover": 1899,
                    "ncb": 0,
                    "created_at": "2025-06-17T14:39:25.000Z",
                    "updated_at": "2025-06-17T14:39:25.000Z",
                    "addon_covers": {
                        "consumables": 0,
                        "tyre_secure": 0,
                        "invoice_price": 0,
                        "personal_loss": 0,
                        "engine_protection": 0,
                        "zero_depreciation": 0,
                        "key_lock_replacement": 0,
                        "24x7_road_side_assistance": 0
                    },
                    "cng_lpg": {
                        "cng_lpg_kit": 0,
                        "cng_lpg_tp_kit": 0
                    },
                    "electrical_accessories": null,
                    "non_electrical_accessories": null,
                    "pjMasterInsuranceCompanies": {
                        "name": "godigit",
                        "label": "DNI Comprehensive (Premium Garage)",
                        "id": 2
                    },
                    "pjSubProductInsurerPlanPackages": {
                        "name": "basic",
                        "label": "Basic",
                        "dependent_addon_covers": null,
                        "addon_covers": null,
                        "pjSubProductInsurerPlanDetails": {
                            "pj_sub_product_insurer_mapping_id": 1,
                            "pjSubProductInsurerMapping": {
                                "logo_url": "/images/dni.png",
                                "policy_wording_url": null,
                                "cashless_url": "https://www.godigit.com/garages"
                            }
                        }
                    }
                }
            ],
            "errors": [
                {
                    "id": 2843,
                    "quote_id": "ca4df75d1b-6038-4f1c-8194-ac00acd546a6",
                    "pj_master_insurance_company_id": 17,
                    "error_msg": "Insurance Company API Error.",
                    "ic_error_msg": "\"Value cannot be null.\\r\\nParameter name: input\"",
                    "created_at": "2025-06-17T14:39:26.000Z",
                    "updated_at": "2025-06-17T14:39:26.000Z",
                    "pjMasterInsuranceCompanies": {
                        "name": "hdfc",
                        "label": "Oriental Insurance Comprehensive (Premium Garage)",
                        "id": 17,
                        "pjSubProductInsurerMapping": [
                            {
                                "logo_url": "/images/oritental.png"
                            }
                        ]
                    }
                }
            ]
        }
    },
    QUOTE_MASTER: {
        "result": true,
        "status": 200,
        "response": {
            "addons": [
                {
                    "title": "Replacement of Vehicle",
                    "id": "zero_depreciation",
                    "selected": false,
                    "is_disabled": false
                },
                {
                    "title": "Road Side Assistance",
                    "id": "24x7_road_side_assistance",
                    "selected": false,
                    "is_disabled": false
                },
                {
                    "title": "Natural Calamities",
                    "id": "ncb_protector",
                    "selected": false,
                    "is_disabled": false
                },
                {
                    "title": "Oman Cover",
                    "id": "invoice_price",
                    "selected": false,
                    "is_disabled": false
                },
                {
                    "title": "Driver Cover",
                    "id": "driver_cover",
                    "selected": false,
                    "is_disabled": false
                },
                {
                    "title": "Passenger Cover",
                    "id": "passenger_cover",
                    "value": 0,
                    "selected": false,
                    "dropdown_value": [
                        50000,
                        100000,
                        200000
                    ],
                    "is_disabled": false
                }
            ],
            "accessories": [
                {
                    "title": "Electrical Accessories",
                    "id": "electrical_accessories",
                    "value": 0,
                    "selected": false
                },
                {
                    "title": "Non Electrical Accessories",
                    "id": "non_electrical_accessories",
                    "value": 0,
                    "selected": false
                }
            ],
            "voluntary_deductible": [
                {
                    "title": "Voluntary Deductible",
                    "id": "discount_voluntary_deductible",
                    "value": 0,
                    "radio_value": [
                        2500,
                        5000,
                        7500,
                        15000
                    ]
                }
            ],
            "policyType": [
                {
                    "value": "1od_3tp",
                    "label": "Comprehensive",
                    "is_new": 1
                },
                {
                    "value": "0od_3tp",
                    "label": "Third Party Liability",
                    "is_new": 1
                }
            ],
            "is_previous_policy_insurer_visible": false,
            "is_previous_tp_policy_insurer_visible": false,
            "is_previous_tp_policy_expire_date_visible": false,
            "is_previous_tp_policy_no_visible": false,
            "is_previous_policy_expire_date_visible": false,
            "is_previous_policy_no_visible": false,
            "is_od_expire_date_visible": false,
            "is_previous_od_policy_insurer_visible": false,
            "is_ncb_visible": false,
            "is_pa_cover_visible": true,
            "proposerType": [
                {
                    "value": {
                        "key": "Individual"
                    },
                    "label": "Individual"
                },
                {
                    "value": {
                        "key": "Organization"
                    },
                    "label": "Organization"
                }
            ],
            "insurance_type": "new",
            "manufacture_year": [
                2025,
                2024
            ],
            "is_idv_visible": true,
            "is_accessories_visible": false
        }
    },
    PA_COVER_SELECTED: false,
    PASSENGER_COVER_AMOUNT: null
};

export const actionGetQuotes = createAsyncThunk('actionGetQuotes', (params) => {
    try {
        return axiosPrivate.post(`${API_GET_QUOTES}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const actionUpdateQuoteDetails = createAsyncThunk('actionUpdateQuoteDetails', (params) => {
    try {
        return axiosPrivate.post(`${API_UPDATE_QUOTE_DETAILS}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const actionGetQuoteMaster = createAsyncThunk('actionGetQuoteMaster', (params) => {
    try {
        return axiosPrivate.post(`${API_GET_QUOTE_MASTER}`, params).then(response => response.data).catch(error => error)
    } catch (error) {
        return error
    }
})

export const quoteDetailsStore = createSlice({
    name: "quoteDetails",
    initialState,
    reducers: {
        // Generic field setter
        setField: (state, action) => {
            const { field, value } = action.payload;
            if (field in state) {
                state[field] = value;
            }
        },

        // Reset a specific field by name (optional alternative)
        resetField: (state, action) => {
            const field = action.payload;
            if (field in state) {
                state[field] = null;
            }
        },

        resetMultipleFields: (state, action) => {
            const fields = action.payload;
            fields.forEach(field => {
                if (field in state) {
                    state[field] = null;
                }
            });
        },

        // Reset all fields
        resetAll: (state) => {
            Object.assign(state, initialState);
        },

        setPaCoverSelected: (state, action) => {
            state.PA_COVER_SELECTED = action.payload;
        },

        resetPaCoverSelected: (state) => {
            state.PA_COVER_SELECTED = false;
        },

        setPassengerCoverAmount: (state, action) => {
            state.PASSENGER_COVER_AMOUNT = action.payload;
        },
        setCheckedAddons: (state, action) => {
            state.QUOTE_MASTER = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actionGetQuotes.fulfilled, (state, action) => {
            state.QUOTES = action.payload;
        });
        builder.addCase(actionGetQuoteMaster.fulfilled, (state, action) => {
            state.QUOTE_MASTER = action.payload;
        });
    }
});

export const { setField, resetField, resetMultipleFields, resetAll, setPaCoverSelected, setPassengerCoverAmount, resetPaCoverSelected, setCheckedAddons } = quoteDetailsStore.actions;

export default quoteDetailsStore.reducer;

// Example usage
//dispatch(setField({ field: "RTO", value: "MH12" }));
//dispatch(resetField("RTO"));
//dispatch(resetAll());