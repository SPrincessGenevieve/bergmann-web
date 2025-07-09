"use client";
import React, { useEffect, useState } from "react";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { sidebar_items } from "@/lib/sidebar_items";
import { useRouter, usePathname } from "next/navigation";
import Loading from "./Loading";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useUserContext } from "../context/UserContext";

export default function Sidebar() {
  const [isClose, setIsClose] = useState(false);
  const [collapse, setCollapse] = useState(0);
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current path
  const [activeLoadingLink, setActiveLoadingLink] = useState<string | null>(
    null
  );
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const { isCollapse, setUserDetails } = useUserContext();

  const handleSidebar = () => {
    setIsClose(!isClose);
  };

  useEffect(() => {
    const handleResize = () => {
      setCollapse(window.innerWidth <= 580 ? 1 : 0);
      setUserDetails({
        isCollapse: window.innerWidth <= 580 ? 1 : 0,
      });
    };
    handleResize();
    setUserDetails({
      isOpen: isClose,
    });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClose]);

  useEffect(() => {
    setActiveLoadingLink(null);
  }, [pathname]);

  const handleNavigate = (link: string) => {
    setActiveLoadingLink(link); // ✅ Show spinner only for this item
    router.push(link);
  };

  return (
    <div className="">
      <div
        className={`transition-all duration-300 ease-in-out w-[230px] ${
          isClose || collapse ? "w-[62px]" : "w-[230px]"
        }`}
      ></div>
      <div
        className={`bg-[#ffff] fixed z-50 left-0 top-0 flex flex-col items-end h-full transition-all duration-300 ease-in-out ${
          isClose || collapse ? "w-[62px]" : "w-[230px]"
        }`}
      >
        <div className={`relative bg-[#ffff] w-full h-12 ${collapse ? "hidden" : ""}`}>
          {!collapse && (
            <div
              onClick={handleSidebar}
              className="absolute top-0 -right-3 z-20 mt-2 cursor-pointer bg-[#ffff] rounded-full w-10 h-10 flex items-center justify-center"
            >
              {isClose ? (
                <CircleArrowLeft style={{ color: "#439B8C", fontSize: 25 }} />
              ) : (
                <CircleArrowRight style={{ color: "#439B8C", fontSize: 25 }} />
              )}
            </div>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center p-2">
          <Image
            src={"/logo.png"}
            className=""
            alt=""
            width={90}
            height={100}
          ></Image>
          {collapse !== 1 && !isClose && (
            <>
              <h1 className="font-semibold text-white">Jayde Mike Engracia</h1>
              <p className="font-light text-white">Treasurer</p>
            </>
          )}
        </div>
        <Separator></Separator>

        <div className="h-auto mt-2 w-full flex flex-col gap-2 px-2">
          {sidebar_items.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.link;
            const isLoading = activeLoadingLink === item.link;
            const isSubActive = item.sub_item?.some(
              (sub) => `/${sub.link}` === pathname
            );

            return (
              <div key={index} className="relative">
                {isLoading && (
                  <div className="absolute inset-0 flex justify-center items-center bg-[#ffffff38] rounded-xl">
                    <Loading strokeColor="green" />
                  </div>
                )}
                <div
                  onClick={() => {
                    if (item.link) {
                      handleNavigate(item.link);
                    } else if (item.sub_item.length > 0) {
                      setExpandedItem(expandedItem === index ? null : index);
                    }
                  }}
                  className={`cursor-pointer flex transition-all ease-in-out p-2 rounded-xl hover:bg-[#439b8c3a] ${
                    isActive ? "bg-[#439B8C] text-[#fff]" : ""
                  } ${isSubActive ? "text-[#439B8C]" : ""}`}
                >
                  <div className="flex gap-2 pl-1 text-black items-center">
                    <Icon
                      color={`${
                        isActive ? "white" : isSubActive ? "#439B8C" : "black"
                      }`}
                      className="w-5 h-5 text-black "
                    />
                    <h1
                      className={`${collapse || isClose ? "hidden" : ""} ${
                        isActive
                          ? "text-[#fff]"
                          : isSubActive
                          ? "text-[#439B8C]"
                          : "text-black"
                      } font-light`}
                    >
                      {item.title}
                    </h1>
                  </div>
                </div>
                {expandedItem === index &&
                  item.sub_item.length > 0 &&
                  item.sub_item.map((sub, subIndex) => {
                    const SubIcon = sub.icon;
                    const isSubActive = pathname === `/${sub.link}`;
                    const isSubLoading = activeLoadingLink === sub.link;

                    return (
                      <div
                        key={subIndex}
                        onClick={() => handleNavigate(`/${sub.link}`)}
                        className={`${
                          collapse || isClose ? "ml-0 justify-center" : "ml-8"
                        }  flex items-center  gap-2 p-2 text-white cursor-pointer rounded-xl hover:bg-[#439b8c3a] ${
                          isSubActive ? "bg-[#439B8C]" : ""
                        }`}
                      >
                        {isSubLoading && <Loading strokeColor="green" />}
                        <SubIcon
                          color={`${isSubActive ? "#fff" : "black"}`}
                          className="w-5 h-5"
                        />
                        <h1
                          className={`${collapse || isClose ? "hidden" : ""} ${
                            isSubActive ? "text-[#fff]" : "text-black"
                          } font-light`}
                        >
                          {sub.title}
                        </h1>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
