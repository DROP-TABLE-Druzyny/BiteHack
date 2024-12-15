"use client";

import Button from "@/app/ui/button";
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

import { publicService } from "@/services";

import TimeDropdown from "@/app/ui/pomocnik/prosba/time-dropdown";
import React, { useState } from "react";
import clsx from "clsx";
import { HelpRequestTypes } from "@/services/HelpRequest";
import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedTile, setSelectedTile] = useState<string | null>(null);
  const [timeDropdownValue, setTimeDropdownValue] = useState(null);
  const [isLocateButtonClicked, setIsLocateButtonClicked] = useState("");
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const router = useRouter();
  const tilesData = [
    { title: "Zakupy", icon: ShoppingCartIcon, value: "SHOPPING" },
    { title: "Medyczna", icon: ShieldCheckIcon, value: "MEDICAL" },
    { title: "Transport", icon: TruckIcon, value: "TRANSPORT" },
    { title: "Opieka", icon: HeartIcon, value: "CARE" },
    { title: "Spacer", icon: UsersIcon, value: "WALK" },
    { title: "Inne", icon: QuestionMarkCircleIcon, value: "OTHER" },
  ];

  const handleTileClick = (title: string) => {
    setSelectedTile(title);
  };

  const handleTimeDropdownChange = (value: any) => {
    setTimeDropdownValue(value);
  };

  const handleLocateClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(loc);
          console.log("Current location:", loc);
          setIsLocateButtonClicked("located");
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLocateButtonClicked("");
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setIsLocateButtonClicked("");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!location || !timeDropdownValue) {
      console.error("Location not set");
      return;
    }

    const hoursToAdd = parseInt(timeDropdownValue, 10);
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + hoursToAdd);

    publicService.createHelpRequest({
      type: selectedTile as HelpRequestTypes,
      longitude: location.longitude,
      latitude: location.latitude,
      expiration: expirationDate.toISOString(),
      id: 0,
      author: 0,
      description: "",
      created: "",
      accepted_by: null,
      completed: false,
    });
    router.push('/pomocnik');
  };

  return (
    <div className="flex min-h-screen p-8 w-full justify-center">
      <main className="flex flex-col items-center">
        <Header text="Prośba" backUrl="/pomocnik" />

        <form
          className="flex flex-col items-center mt-2"
          action="/your-form-action-url"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 mt-8">
            {tilesData.map((tileData, idx) => (
              <RequestTypeTile
                key={idx}
                tileData={tileData}
                isSelected={selectedTile === tileData.value}
                onClick={() => handleTileClick(tileData.value)}
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
            type="button"
            label="Lokalizuj"
            className={clsx(
              "mt-20 text-3xl font-semibold py-4 pr-12 pl-12 transition-opacity duration-500",
              {
                "opacity-100": timeDropdownValue !== null,
                "opacity-0": timeDropdownValue === null,
              }
            )}
            onClick={handleLocateClick}
          />

          <Button
            type="submit"
            label="Dodaj prośbę"
            className={clsx(
              "mt-4 text-3xl font-semibold px-8 py-4 transition-opacity duration-1000",
              {
                "opacity-100": isLocateButtonClicked !== "",
                "opacity-0": isLocateButtonClicked === "",
              }
            )}
          />
        </form>
      </main>
    </div>
  );
};

export default Page;
