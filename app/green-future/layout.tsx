"use client";
import "@/app/globals.css";
import Sidebar from "../component/Sidebar";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function OverviewLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, isCollapse, setUserDetails } = useUserContext();
useEffect(() => {
  const handleResize = () => {
    setUserDetails((prev) => ({
      ...prev,
      isCollapse: window.innerWidth <= 580 ? 1 : 0,
    }));
  };
  handleResize(); // run immediately on mount
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [setUserDetails]);

  console.log(isOpen);

  return (
    <div className="w-full h-screen flex justify-between items-center bg-[#F6F6F6]">
      <div
        className={`h-full max-w-[230px] ${
          isOpen || isCollapse ? "w-[62px]" : "w-[230px]"
        }`}
      >
        <Sidebar></Sidebar>
      </div>
      <div className={`w-[100%] px-4 h-[95%] overflow-auto bg-[#F6F6F6]`}>
        <div className="flex w-full h-full">{children}</div>
      </div>
    </div>
  );
}
