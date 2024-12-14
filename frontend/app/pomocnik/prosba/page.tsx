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

export type HelpRequestTypes =
  | "SHOPPING"
  | "MEDICAL"
  | "TRANSPORT"
  | "CARE"
  | "WALK"
  | "OTHER";

export default function Page() {
  const tilesData = [
    { title: "Zakupy", icon: ShoppingCartIcon },
    { title: "Medyczne", icon: ShieldCheckIcon },
    { title: "Transport", icon: TruckIcon },
    { title: "Opieka", icon: HeartIcon },
    { title: "Spacer", icon: UsersIcon },
    { title: "Inne", icon: QuestionMarkCircleIcon },
  ];

  return (
    <div className="flex min-h-screen p-8 w-full justify-center">
      <main className="flex flex-col items-center">
        <Header text="Prośba" backUrl="/" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {tilesData.map((tileData, idx) => (
            <RequestTypeTile key={idx} tileData={tileData} />
          ))}
        </div>

        <div className="mt-8">dropdown z czasem</div>

        <form className="flex flex-col items-center mt-16">
          <Button label="Lokalizuj" className="mt-4 text-lg font-semibold" />
        </form>

        <form className="flex flex-col items-center mt-16">
          <Button label="Dodaj prośbę" className="mt-4 text-lg font-semibold" />
        </form>
      </main>
    </div>
  );
}
