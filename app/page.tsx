"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Loading from "./component/Loading";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    router.replace("/green-future/welcome");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="fixed bg-[url(/bg.png)] w-full h-full bg-no-repeat bg-cover bg-center"></div>
      <div className="w-full h-full fixed flex justify-center items-center bg-[#000000a8]">
        <Card className="bg-[white] w-full max-w-[400px] max-h-[400px] h-full">
          <CardContent className="h-full flex flex-col justify-evenly">
            <CardHeader className="flex items-center justify-center">
              <Image
                src={"/logo.png"}
                alt=""
                width={400}
                height={400}
                className="w-auto h-20"
              ></Image>
            </CardHeader>
            <div className="">
              <div className="flex flex-col gap-2">
                <div>
                  <h1>Email</h1>
                  <Input></Input>
                </div>
                <div>
                  <h1>Password</h1>
                  <Input type="password"></Input>
                </div>
              </div>
              <Button onClick={handleLogin} className="w-full mt-4">
                {loading && <Loading strokeColor="white"></Loading>}Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
