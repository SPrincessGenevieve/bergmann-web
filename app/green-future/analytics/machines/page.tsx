import { Card, CardContent } from "@/components/ui/card";
import { profit_l1 } from "@/lib/mock-data/profit-l1";
import React from "react";
import "@/app/globals.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import ProfitChart from "@/app/component/profitability/Chart/ProfitChart";
import ProfitTable from "@/app/component/profitability/ProfitTable";

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
        <Card className="">
          <CardContent>
            <div className=" flex gap-2 items-end flex-wrap">
              <div>
                <h1>Machine ID</h1>
                <Input className="h-8 rounded-2xl text-muted-foreground"></Input>
              </div>
              <div>
                <h1>Range</h1>
                <DateRangePicker></DateRangePicker>
              </div>
              <div className="">
                <Button className="text-muted-foreground h-8 rounded-2xl" variant={"outline"}>
                  Reset
                </Button>
              </div>
            </div>
            <div className="py-4 text-muted-foreground">
              <h1>Showing total visitors for the last 3 months</h1>
            </div>
            <div className="flex relative justify-end items-center overflow-auto">
              <div className="w-full ">
                <div className="min-w-[500px] ">
                  <ProfitChart></ProfitChart>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="h-auto min-h-[200px] overflow-auto">
          <CardContent>
            <ProfitTable></ProfitTable>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
