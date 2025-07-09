"use client";
import React, { useState } from "react";
import Image from "next/image";

interface LoadingProps {
  strokeColor: "green" | "white"; // restricts to only two options
}

export default function Loading({ strokeColor }: LoadingProps) {
  return (
    <div className="flex h-10 justify-center items-center">
      {strokeColor === "green" ? (
        <Image
          width={300}
          height={300}
          className="w-5 h-5"
          src={"/spin-green.svg"}
          alt="spin"
        ></Image>
      ) : (
        <Image
          width={300}
          height={300}
          className="w-5 h-5"
          src={"/spin-white.svg"}
          alt="spin"
        ></Image>
      )}
    </div>
  );
}
