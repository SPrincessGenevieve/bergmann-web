"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { maintenance_maintenance } from "@/lib/mock-data/maintenance-maintenance";
import "@/app/globals.css";
import { Input } from "@/components/ui/input";

export default function MaintenanceMaintenanceTable() {
  const maintenance = ["ID", "Job #", "Date", "Item #", "Description"];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center gap-2">
        <h1>Maintenance</h1>
        <Input
          placeholder="Search"
          className="shadow-none h-8 rounded-2xl max-w-[300px]"
        ></Input>
      </div>
      <Table className="">
        <TableHeader>
          <TableRow className="bg-[#439B8C] text-white">
            {maintenance.slice(0, 15).map((item) => (
              <>
                <TableCell className="font-light">{item}</TableCell>
              </>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenance_maintenance.slice(0, 15).map((item) => (
            <TableRow>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.job_number}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.item_number}</TableCell>
              <TableCell>{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog>
        <DialogTrigger className="w-full text-[#439B8C]">
          <p>View More</p>
        </DialogTrigger>
        <DialogContent className="max-w-[100vh] h-[90%] overflow-auto">
          <div className="flex justify-between items-center gap-2">
            <h1>Maintenance</h1>
            <Input
              placeholder="Search"
              className="shadow-none h-8 rounded-2xl max-w-[300px]"
            ></Input>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#439B8C] text-white">
                {maintenance.map((item) => (
                  <>
                    <TableCell>{item}</TableCell>
                  </>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {maintenance_maintenance.slice(0, 15).map((item) => (
                <TableRow>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.job_number}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.item_number}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
}
