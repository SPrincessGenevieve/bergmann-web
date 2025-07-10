import MaintenanceContractsTable from "@/app/component/maintenance/MaintenanceContractsTable";
import MaintenanceMaintenanceTable from "@/app/component/maintenance/MaintenanceMaintenanceTable";
import MaintenanceTable from "@/app/component/maintenance/MaintenanceTable";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import "@/app/globals.css";

export default function page() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div>
        <p>Machines</p>
        <MaintenanceTable></MaintenanceTable>
      </div>
      <div className="w-full h-auto flex gap-8 maintenance-card ">
        <Card className="w-full h-full p-4">
          <CardContent className=" p-0 overflow-auto flex flex-col gap-2">
            
            <MaintenanceContractsTable></MaintenanceContractsTable>
          </CardContent>
        </Card>
        <Card className="w-full h-full  p-4">
          <CardContent className=" p-0 overflow-auto flex flex-col gap-2">
            
            <MaintenanceMaintenanceTable></MaintenanceMaintenanceTable>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
