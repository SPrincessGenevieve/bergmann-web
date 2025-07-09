import OpenLayersMap from "@/app/component/profitability/Map";
import React from "react";

export default function Profitability() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full rounded-2xl">
        <OpenLayersMap></OpenLayersMap>
      </div>
    </div>
  );
}
