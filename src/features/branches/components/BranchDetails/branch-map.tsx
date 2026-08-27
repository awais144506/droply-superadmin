"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface BranchMapProps {
  latitude: number;
  longitude: number;
  branchName: string;
  address: string;
}

export default function BranchMap({
  latitude,
  longitude,
  branchName,
  address,
}: BranchMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [latitude, longitude],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Custom Pin Marker
      const pinIcon = L.divIcon({
        className: "custom-map-pin",
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute h-8 w-8 animate-ping rounded-full bg-emerald-400 opacity-40"></span>
            <div class="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 15.193 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([latitude, longitude], { icon: pinIcon }).addTo(map);

      marker.bindPopup(`
        <div class="p-1 font-sans">
          <p class="font-semibold text-xs text-gray-900">${branchName}</p>
          <p class="text-[11px] text-gray-500">${address}</p>
        </div>
      `).openPopup();

      mapInstanceRef.current = map;
    } else {
      mapInstanceRef.current.setView([latitude, longitude], 14);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, branchName, address]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border bg-muted">
      <div ref={mapContainerRef} className="h-full w-full z-0 min-h-80" />
      <div className="absolute top-3 left-3 z-5 rounded-lg border bg-background/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
        <p className="text-[11px] font-mono font-medium text-foreground">
          GPS: {latitude.toFixed(5)}, {longitude.toFixed(5)}
        </p>
      </div>
    </div>
  );
}