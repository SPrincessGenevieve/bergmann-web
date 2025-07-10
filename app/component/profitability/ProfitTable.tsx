import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { profit_table } from "@/lib/mock-data/profit-table";
import React from "react";

export default function ProfitTable() {
  return (
    <div className="flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>
              <h1 className="font-bold">Machine ID</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Date</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Cost</h1>
            </TableCell>
            <TableCell>
              <h1 className="font-bold">Type</h1>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profit_table.slice(0, 3).map((item, index) => (
            <TableRow
              className={`text-muted-foreground ${
                index % 2 === 0 ? "bg-[#e970521c]" : ""
              }`}
            >
              <TableCell>{item.machine_id}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.cost}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex justify-center items-center mt-2">
        <Dialog>
          <DialogTrigger className="text-[#439B8C]">
            <h1>View more</h1>
          </DialogTrigger>
          <DialogContent className="w-[90%] h-[95%] min-w-[400px]">
            <DialogHeader>
              <DialogTitle>Machine Expenses</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>
                    <h1 className="font-bold">Machine ID</h1>
                  </TableCell>
                  <TableCell>
                    <h1 className="font-bold">Date</h1>
                  </TableCell>
                  <TableCell>
                    <h1 className="font-bold">Cost</h1>
                  </TableCell>
                  <TableCell>
                    <h1 className="font-bold">Type</h1>
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profit_table.map((item, index) => (
                  <TableRow
                    className={`${index % 2 === 0 ? "bg-[#e970521c]" : ""}`}
                  >
                    <TableCell>{item.machine_id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.cost}</TableCell>
                    <TableCell>{item.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
