import { Marker, Tooltip, Popup } from "react-leaflet";
import L from "leaflet";
import type { ShipwreckPoint } from "@/data/types";
import shipImg from "@/assets/ship.png";

const createShipwreckIcon = () => {
  return L.divIcon({
    html: `<img src="${shipImg}" style="width:16px;height:16px;object-fit:contain;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5));opacity:0.85;" />`,
    className: "shipwreck-marker",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
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
      <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
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
