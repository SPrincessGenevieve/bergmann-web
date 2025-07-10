"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { machine_table } from "@/lib/mock-data/maintenance-table1";
import React from "react";

export default function MaintenanceTable() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              <h1 className="font-bold">ID</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Description</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Purchase Date</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Purchase Cost</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Months in use</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Total Cost</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Total Benefits</h1>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {machine_table.slice(0, 3).map((item, index) => (
            <TableRow
              className={`text-muted-foreground ${
                index % 2 === 0 ? "bg-[#005B8908]" : ""
              }`}
            >
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.purchase_date}</TableCell>
              <TableCell>{item.purchase_cost}</TableCell>
              <TableCell>{item.months_in_use}</TableCell>
              <TableCell>{item.total_cost}</TableCell>
              <TableCell>{item.total_benefits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
