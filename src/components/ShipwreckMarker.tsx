import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { ShipwreckPoint } from "@/data/types";

const createShipwreckIcon = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40">
      <!-- Outer ripple rings -->
      <circle cx="32" cy="32" r="28" fill="none" stroke="hsl(200,80%,60%)" stroke-width="1.5" opacity="0.3">
        <animate attributeName="r" from="16" to="30" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="32" cy="32" r="22" fill="none" stroke="hsl(200,80%,65%)" stroke-width="1.2" opacity="0.4">
        <animate attributeName="r" from="14" to="26" dur="2s" begin="0.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
      <!-- Splash droplets -->
      <circle cx="20" cy="18" r="2.5" fill="hsl(200,90%,75%)" opacity="0.8">
        <animate attributeName="cy" from="22" to="10" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.9" to="0" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="44" cy="16" r="2" fill="hsl(200,85%,70%)" opacity="0.7">
        <animate attributeName="cy" from="24" to="8" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="14" cy="28" r="1.8" fill="hsl(200,80%,78%)" opacity="0.6">
        <animate attributeName="cx" from="22" to="8" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.7" to="0" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="50" cy="26" r="2.2" fill="hsl(200,85%,72%)" opacity="0.7">
        <animate attributeName="cx" from="42" to="56" dur="1.6s" begin="0.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.8" to="0" dur="1.6s" begin="0.2s" repeatCount="indefinite"/>
      </circle>
      <!-- Central burst -->
      <circle cx="32" cy="32" r="8" fill="hsl(200,70%,50%)" opacity="0.5">
        <animate attributeName="r" from="4" to="12" dur="1.2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" from="0.7" to="0.1" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <!-- Core icon - anchor/cross shape -->
      <circle cx="32" cy="32" r="6" fill="hsl(210,60%,35%)" stroke="hsl(200,80%,75%)" stroke-width="1.5"/>
      <text x="32" y="36" text-anchor="middle" font-size="10" fill="white" font-weight="bold">⚓</text>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "shipwreck-marker",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
};

interface ShipwreckMarkerProps {
  shipwreck: ShipwreckPoint;
  journeyColor: string;
}

const ShipwreckMarkerComponent = ({ shipwreck, journeyColor }: ShipwreckMarkerProps) => {
  return (
    <Marker
      position={[shipwreck.lat, shipwreck.lng]}
      icon={createShipwreckIcon()}
    >
      <Popup className="shipwreck-popup" maxWidth={320}>
        <div className="p-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🌊</span>
            <h3 className="font-bold text-base" style={{ fontFamily: "'Lora', serif" }}>
              {shipwreck.label}
            </h3>
          </div>
          <p className="text-xs font-semibold mb-1" style={{ color: journeyColor }}>
            {shipwreck.reference}
          </p>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "'Rosarivo', serif" }}>
            {shipwreck.description}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

export default ShipwreckMarkerComponent;
