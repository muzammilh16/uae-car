"use client"; // Ensure it runs only on the client side

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { DirectionsCar } from "@mui/icons-material";

// Fix Leaflet Marker icon issue
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [35, 50], // Bigger marker for highlight
  iconAnchor: [17, 50],
});

const officeLocation = [19.1876, 72.9538]; // KaitoTech Office Coordinates

const LeafletMap = () => {
  const popupRef = useRef(null); // Ref for Popup



  return (
    <MapContainer center={officeLocation} zoom={15} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={officeLocation} icon={defaultIcon}>
        <Popup autoPan ref={popupRef}>
          <Card sx={{ minWidth: 250, boxShadow: 3, borderRadius: 2 }}>
            <CardContent sx={{ textAlign: "center" }}>
              {/* Title */}
              <Typography variant="h6" color="error" sx={{ fontWeight: "bold", display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}>
                📍 KaitoTech Office
              </Typography>

              {/* Address */}
              <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: "bold", mt: 1 }}>
                Address: 909 C5, Fenkin9, Wagle Estate Rd, nr. Satkar Grande Hotel, near Automatic, Thane West, Thane, Maharashtra 400607
              </Typography>

              {/* Directions Button */}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, fontWeight: "bold", borderRadius: 2 }}
                href={`https://www.google.com/maps/dir/?api=1&destination=${officeLocation[0]},${officeLocation[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<DirectionsCar />}
              >
                Get Directions
              </Button>
            </CardContent>
          </Card>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

// Ensure LeafletMap runs only on the client side
export default dynamic(() => Promise.resolve(LeafletMap), { ssr: false });
