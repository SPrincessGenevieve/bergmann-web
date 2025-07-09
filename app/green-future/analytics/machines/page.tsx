import { Card, CardContent } from "@/components/ui/card";
import { profit_l1 } from "@/lib/mock-data/profit-l1";
import React from "react";
import "@/app/globals.css";

export default function Machines() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-medium">Machine Profitability</h2>
      <div className="w-full h-full flex flex-col gap-4">
        <div className="flex profit-l1 gap-8 w-full items-center justify-center">
          {profit_l1.map((item, index) => (
            <Card key={index} className="w-full h-20 p-2">
              <CardContent className="flex items-center h-full">
                <div className="w-full flex justify-center flex-col gap-1">
                  <h1>{item.title}</h1>
                  <p>€ {item.amount}</p>
                </div>
                <div className="h-full flex items-center justify-center">
                  <item.icon></item.icon>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="h-full">
          <CardContent></CardContent>
        </Card>
        <Card className="h-[60%]">
          <CardContent></CardContent>
        </Card>
      </div>
    </div>
  );
}
