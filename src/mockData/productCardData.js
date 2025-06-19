import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";

export const ProductCardData = [
  {
    id: 1,
    title: "Car Insurance",
    discount: "20%",
    icon: (
      <>
        <AirportShuttleIcon
          sx={{ fontSize: "4rem" }}
        />
      </>
    ),
    cardColor: "lightBlue",
    href: "/car-insurance/new-journey",
  },
  {
    id: 2,
    title: "Bike Insurance",
    discount: "30%",
    icon: (
      <>
        <TwoWheelerIcon
          sx={{ fontSize: "4rem" }}
        />
      </>
    ),
    cardColor: "lightGreen",
    href: "#",
  },
];
