import React from "react";
import mapScreenshot from "../assets/mapScreenshot.png";

interface Marker {
  lat: number;
  lng: number;
  color: string;
}

interface GoogleMapScreenshotProps {
  markers: Marker[];
}

// Bildgröße
const IMAGE_WIDTH = 315;
const IMAGE_HEIGHT = 119;

// Bekannte Punkte
const TOP_LEFT_LAT = 53.838144;
const TOP_LEFT_LNG = 10.694895;
const CENTER_LAT = 53.837973;
const CENTER_LNG = 10.69529;

// Skalierungsfaktoren (Pixel pro Grad)
const LAT_SCALE = IMAGE_WIDTH / Math.abs(CENTER_LAT - TOP_LEFT_LAT);
const LNG_SCALE = IMAGE_HEIGHT / Math.abs(CENTER_LNG - TOP_LEFT_LNG);

// Umrechnung von Lat/Lng zu Pixel-Koordinaten
const latLngToPixel = (lat: number, lng: number) => {
  const y = (lng - TOP_LEFT_LNG) * LNG_SCALE * -1;
  const x = (lat - TOP_LEFT_LAT) * LAT_SCALE;
  return { x, y };
};

const GoogleMapScreenshot: React.FC<GoogleMapScreenshotProps> = ({
  markers,
}) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative w-[934px] h-[548px]">
        <img
          src={mapScreenshot}
          alt="Google Maps Screenshot"
          className="w-full h-full object-cover border rounded-xl shadow-md"
        />
        {markers.map((marker, index) => {
          const { x, y } = latLngToPixel(marker.lat, marker.lng);
          return (
            <div
              key={index}
              className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white"
              style={{
                top: `${y}px`,
                left: `${x}px`,
                background: marker.color,
                height: "10px",
                width: "10px",
                position: "absolute",
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default GoogleMapScreenshot;
