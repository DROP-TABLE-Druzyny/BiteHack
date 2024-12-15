"use client";
import React, { useState, useEffect } from "react";
import Navigation from "./ui/mainpage/navigation";
import { client } from "@/services/ClientService";
import { clientService } from "@/services";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import { lusitana } from '@/app/ui/fonts';


export default function Page() {
  const [user, setUser] = useState<client | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);


  useEffect(() => {
    clientService.isLoggedIn().then(async (isLoggedIn) => {
      if (isLoggedIn) {
        setIsLoggedIn(true);
        const client_data = await clientService.getClientData()
        setUser(client_data);
      }
    });
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col min-h-screen p-8 relative w-full items-center justify-start gap-y-2">
      <div className="flex flex-row items-center justify-between w-full h-4 gap-x-4 text-[24px]">
      <h1 className="flex flex-row px-8 py-3 mt-12 mb-6 bg-amber-600 border-2 border-white rounded-full shadow-lg text-4xl text-white drop-shadow-md font-bold ">
         <UsersIcon className="h-10 w-10 mr-2" />
          <p className={lusitana.className}>eSenior</p>
      </h1>
        { user &&
        <p 
          className="w-max opacity-80 hover:opacity-100 hover:text-red-600 transition-colors cursor-pointer"
          onClick={() => {clientService.logout(); setIsLoggedIn(false); setUser(null);}}
        >
          Wyloguj
        </p>
        }
      </div>

      <main className="flex flex-col items-center h-full justify-evenly">
        { user &&
          <h2 className="text-2xl mt-6 mb-6">Witaj, <span className="font-bold">{user.name}</span>!</h2>
        }
        <Navigation/>
      </main>
      <a href="/wolontariusz" className="absolute bottom-4 start-1/2 -translate-x-1/2 px-4 py-1 bg-amber-600 border-2 border-white rounded-full shadow-lg text-md text-white drop-shadow-md hover:bg-amber-600 transition duration-300 ease-in-out transform hover:scale-105">
          Jesteś wolontariuszem?
        </a>
    </div>
  );
}