// components/OpenLayersMap.tsx
"use client";

import React, { useRef, useEffect } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default function OpenLayersMap() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [13403155.65, 1605395.51], // Approx Manila (in EPSG:3857)
        zoom: 12,
      }),
    });

    return () => {
      map.setTarget(undefined); // Clean up on unmount
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="rounded-xl"
      style={{ width: "100%", height: "100%", borderRadius: "8px" }}
    />
  );
}
