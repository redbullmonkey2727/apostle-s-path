import { Marker, Tooltip, Popup } from "react-leaflet";
import L from "leaflet";
import type { ShipwreckPoint } from "@/data/types";
import shipImg from "@/assets/ship.png";

const createShipwreckIcon = () => {
  const html = `
    <div class="shipwreck-icon-wrap" style="position:relative;width:48px;height:48px;">
      <!-- Ripple rings -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="position:absolute;top:0;left:0;width:48px;height:48px;pointer-events:none;">
        <circle cx="24" cy="24" r="20" fill="none" stroke="hsl(200,80%,60%)" stroke-width="1.2" opacity="0.3">
          <animate attributeName="r" from="12" to="23" dur="2.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.6" to="0" dur="2.2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="24" cy="24" r="16" fill="none" stroke="hsl(200,80%,65%)" stroke-width="1" opacity="0.4">
          <animate attributeName="r" from="10" to="20" dur="2.2s" begin="0.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.5" to="0" dur="2.2s" begin="0.6s" repeatCount="indefinite"/>
        </circle>
        <!-- Splash droplets -->
        <circle cx="14" cy="12" r="1.8" fill="hsl(200,90%,75%)" opacity="0.8">
          <animate attributeName="cy" from="18" to="6" dur="1.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.9" to="0" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="36" cy="10" r="1.5" fill="hsl(200,85%,70%)" opacity="0.7">
          <animate attributeName="cy" from="16" to="4" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" begin="0.3s" repeatCount="indefinite"/>
        </circle>
        <circle cx="8" cy="22" r="1.3" fill="hsl(200,80%,78%)" opacity="0.6">
          <animate attributeName="cx" from="14" to="2" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.7" to="0" dur="1.8s" begin="0.6s" repeatCount="indefinite"/>
        </circle>
        <circle cx="40" cy="20" r="1.6" fill="hsl(200,85%,72%)" opacity="0.7">
          <animate attributeName="cx" from="34" to="46" dur="1.6s" begin="0.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.8" to="0" dur="1.6s" begin="0.2s" repeatCount="indefinite"/>
        </circle>
        <!-- Central burst -->
        <circle cx="24" cy="24" r="6" fill="hsl(200,70%,50%)" opacity="0.4">
          <animate attributeName="r" from="3" to="10" dur="1.2s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.6" to="0.05" dur="1.2s" repeatCount="indefinite"/>
        </circle>
      </svg>
      <!-- Ship image centered -->
      <img src="${shipImg}" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(15deg);width:22px;height:22px;object-fit:contain;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.4));pointer-events:none;" />
    </div>
  `;

  return L.divIcon({
    html,
    className: "shipwreck-marker",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
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
      <Tooltip direction="top" offset={[0, -24]} opacity={0.95}>
        <div style={{ maxWidth: 200 }}>
          <div className="flex items-center gap-1">
            <span>🌊</span>
            <strong style={{ fontFamily: "'Lora', serif", fontSize: 12 }}>{shipwreck.label}</strong>
          </div>
          <p style={{ fontSize: 11, margin: "2px 0 0", color: "#666" }}>{shipwreck.reference}</p>
        </div>
      </Tooltip>
      <Popup className="shipwreck-popup" maxWidth={360}>
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">⛵</span>
            <div>
              <h3 className="font-bold text-base leading-tight" style={{ fontFamily: "'Lora', serif" }}>
                {shipwreck.label}
              </h3>
              {shipwreck.date && (
                <span className="text-xs" style={{ color: journeyColor, fontWeight: 600 }}>
                  {shipwreck.date}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs font-semibold mb-1.5 italic" style={{ color: journeyColor }}>
            {shipwreck.reference}
          </p>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "'Rosarivo', serif" }}>
            {shipwreck.summary || shipwreck.description}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

export default ShipwreckMarkerComponent;
