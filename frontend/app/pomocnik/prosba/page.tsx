"use client";

import Button from "@/app/ui/button";
import { PhoneInput } from "@/app/ui/login/phoneInput";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/app/ui/login/header";
import RequestTypeTile from "@/app/ui/pomocnik/prosba/request-type-tile";
import {
  TruckIcon,
  ShoppingCartIcon,
  HeartIcon,
  UsersIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

import TimeDropdown from "@/app/ui/pomocnik/prosba/time-dropdown";
import React, { useState } from "react";
import clsx from "clsx";

export type HelpRequestTypes =
  | "SHOPPING"
  | "MEDICAL"
  | "TRANSPORT"
  | "CARE"
  | "WALK"
  | "OTHER";

const Page = () => {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [timeDropdownValue, setTimeDropdownValue] = useState(null);

  const tilesData = [
    { title: "Zakupy", icon: ShoppingCartIcon },
    { title: "Medyczna", icon: ShieldCheckIcon },
    { title: "Transport", icon: TruckIcon },
    { title: "Opieka", icon: HeartIcon },
    { title: "Spacer", icon: UsersIcon },
    { title: "Inne", icon: QuestionMarkCircleIcon },
  ];

  const handleTileClick = (title: string) => {
    console.log("handling it");
    setSelectedTile(title);
  };

  const handleTimeDropdownChange = (value:any) => {
    setTimeDropdownValue(value);
  };

  return (
    <div className="flex min-h-screen p-8 w-full justify-center">
      <main className="flex flex-col items-center">
        <Header text="Prośba" backUrl="/" />

        <form className="flex flex-col items-center mt-2">
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mt-8">
            {tilesData.map((tileData, idx) => (
              <RequestTypeTile
                key={idx}
                tileData={tileData}
                isSelected={selectedTile === tileData.title}
                onClick={() => handleTileClick(tileData.title)}
              />
            ))}
          </div>

          <div
            className={clsx("mt-16 transition-opacity duration-500", {
              "opacity-100": selectedTile !== null,
              "opacity-0": selectedTile === null,
            })}
          >
            <TimeDropdown onChange={handleTimeDropdownChange} />
          </div>

          <Button
            label="Lokalizuj"
            className={clsx(
              "mt-20 text-3xl font-semibold px-12 py-4 transition-opacity duration-500",
              {
                "opacity-100": timeDropdownValue !== null,
                "opacity-0": timeDropdownValue === null,
              }
            )}
          />

          <Button
            label="Dodaj prośbę"
            className={clsx(
              "mt-4 text-3xl font-semibold px-8 py-4 transition-opacity duration-1000",
              {
                "opacity-100": timeDropdownValue !== null,
                "opacity-0": timeDropdownValue === null,
              }
            )}
          />
        </form>
      </main>
    </div>
  );
};

export default Page;
