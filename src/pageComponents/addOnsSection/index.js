import {
    Box,
    Grid,
    Typography,
    List,
    ListItem,
    Card,
    CardContent,
    Divider,
    Chip,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Cancel";
import { formatRuppee } from "src/utility";

// Format function (keep as-is)
const formatKeyName = (key) =>
    key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const removedAddons = ['personal_loss', 'key_lock_replacement', 'consumables', 'tyre_secure', 'engine_protection', 'emergency_expense'];

const AddOnsSection = ({ quote, getTitleById }) => {
    const hasAddons =
        Object.keys(quote?.applicable_addons_summary || {}).length > 0 ||
        quote?.not_applicable_addons_summary?.length > 0 ||
        quote?.applicable_personal_accident_cover ||
        quote?.applicable_driver_cover ||
        quote?.applicable_passenger_cover;

    if (!hasAddons) return null;

    return (
        <Card elevation={0} sx={{ borderRadius: 3, width: '100%', border: 'none' }}>
            <CardContent sx={{ paddingBottom: '0 !important' }}>
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, fontSize: "1rem", mb: 2 }}
                >
                    Add-On Coverages
                </Typography>

                <Grid container spacing={8}>
                    {/* === Add-ons Column === */}
                    {
                        (Object.keys(quote?.applicable_addons_summary || {}).length > 0 ||
                            quote?.not_applicable_addons_summary?.length > 0) &&

                        <Grid item xs={12} md={6}>
                            <List dense sx={{ p: 0 }}>
                                {Object.entries(quote?.applicable_addons_summary || {}).map(
                                    ([key, value]) => (
                                        <Box key={key} sx={{ mb: 2 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    mb: 1,
                                                }}
                                            >
                                                <Typography
                                                    sx={{ fontWeight: 600, fontSize: "0.9rem" }}
                                                >
                                                    {/* {formatKeyName(key)} */}
                                                    {getTitleById(key)}
                                                </Typography>
                                                <Chip
                                                    label={`AED ${value.addons_total.toFixed(2)}`}
                                                    color="primary"
                                                    size="small"
                                                />
                                            </Box>
                                            <List disablePadding dense sx={{ pl: 2 }}>
                                                {value.values.map((addon, idx) => {
                                                    if (!removedAddons.includes(addon)) {
                                                        return (
                                                            <ListItem
                                                                key={idx}
                                                                disableGutters
                                                                sx={{
                                                                    py: 0.5,
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                <Typography variant="body2">
                                                                    {/* {formatKeyName(addon)} */}
                                                                    {getTitleById(addon)}
                                                                </Typography>
                                                                <CheckIcon fontSize="small" sx={{ color: "green" }} />
                                                            </ListItem>
                                                        )
                                                    }
                                                    else {
                                                        return null;
                                                    }

                                                })}
                                            </List>
                                        </Box>
                                    )
                                )}

                                {quote?.not_applicable_addons_summary?.length > 0 && (
                                    <>
                                        {Object.keys(quote?.applicable_addons_summary || {}).length > 0 &&
                                            <Divider sx={{ my: 1 }} />
                                        }

                                        <Typography
                                            sx={{ fontWeight: 600, fontSize: "0.9rem", mb: 1 }}
                                            color="text.secondary"
                                        >
                                            Not Applicable Add-ons
                                        </Typography>
                                        <List dense disablePadding sx={{ pl: 2 }}>
                                            {quote?.not_applicable_addons_summary?.map((addon, idx) => (
                                                <ListItem
                                                    key={idx}
                                                    disableGutters
                                                    sx={{
                                                        py: 0.5,
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Typography variant="body2">
                                                        {/* {formatKeyName(addon)} */}
                                                        {getTitleById(addon)}
                                                    </Typography>
                                                    <CloseIcon
                                                        fontSize="small"
                                                        sx={{ color: "red", ml: 1 }}
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </>
                                )}
                            </List>
                        </Grid>
                    }

                    {/* === Covers Column === */}
                    <Grid item xs={12} md={6}>
                        <List dense sx={{ p: 0 }}>
                            {[
                                quote?.applicable_personal_accident_cover,
                                quote?.applicable_driver_cover,
                                quote?.applicable_passenger_cover,
                                quote?.applicable_electrical_kit,
                                quote?.applicable_non_electrical_kit
                            ]
                                .filter(Boolean)
                                .map((cover, index) => (
                                    <ListItem
                                        key={index}
                                        disableGutters
                                        sx={{
                                            py: 1,
                                            px: 0,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>
                                            {cover.label}
                                            {cover?.selected_amount ? `(${formatAED(cover.selected_amount)})` : ''}
                                        </Typography>
                                        <Chip
                                            label={`AED ${typeof cover?.amount === 'number' ? cover.amount.toFixed(2) : '0.00'}`}
                                            color="primary"
                                            size="small"
                                            sx={{ fontWeight: "bold" }}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </Grid>



                </Grid>
            </CardContent>
        </Card>
    );
};

export default AddOnsSection;
