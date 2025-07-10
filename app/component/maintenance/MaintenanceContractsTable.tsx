"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { maintenance_contracts } from "@/lib/mock-data/maintenance-contracts";
import "@/app/globals.css";

export default function MaintenanceContractsTable() {
  const contracts = ["ID", "Contract #", "Start Date", "End Date", "Acc name"];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <h1>Contracts</h1>
        <Input
          placeholder="Search"
          className="shadow-none h-8 rounded-2xl max-w-[300px]"
        ></Input>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-[#439B8C] text-white">
            {contracts.map((item) => (
              <>
                <TableCell className="font-light">{item}</TableCell>
              </>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenance_contracts.slice(0, 15).map((item) => (
            <TableRow className="">
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.contract_number}</TableCell>
              <TableCell>{item.start_date}</TableCell>
              <TableCell>{item.end_date}</TableCell>
              <TableCell>{item.acc_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger className="w-full text-[#439B8C]">
          <p>View More</p>
        </DialogTrigger>
        <DialogContent className="w-full max-w-[100vh] h-[90%] overflow-auto">
          <div className="flex justify-between items-center gap-2">
            <h1>Contracts</h1>
            <Input
              placeholder="Search"
              className="shadow-none h-8 rounded-2xl max-w-[300px]"
            ></Input>
          </div>
          <Table>
            <TableHeader className="">
              <TableRow className="bg-[#439B8C] text-white ">
                {contracts.map((item) => (
                  <>
                    <TableCell>{item}</TableCell>
                  </>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenance_contracts.map((item) => (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.contract_number}</TableCell>
                  <TableCell>{item.start_date}</TableCell>
                  <TableCell>{item.end_date}</TableCell>
                  <TableCell>{item.acc_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
