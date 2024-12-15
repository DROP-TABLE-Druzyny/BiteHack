"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/ui/login/header";
import { clientService, publicService } from "@/services";
import { HelpRequest } from "@/services/HelpRequest";
import RequestItem from "../ui/pomocnik/prosba/request-item";
import {
    TruckIcon,
    ShoppingCartIcon,
    HeartIcon,
    UsersIcon,
    ShieldCheckIcon,
    QuestionMarkCircleIcon,
  } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import { pl } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
const Page = () => {
    const [items, setItems] = useState<HelpRequest[]>([]);
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            let client = null
            try {
                client = await clientService.isLoggedIn()
            }
            finally
            {
                if (!client)
                {
                    router.push("./logowanie")
                }
            }
        }
        const fetchItems = async () => {
            try {
                const response = await publicService.getHelpRequests({});
                console.log("Items fetched", response); // Log the response
                setItems(response); // Adjust based on actual response structure
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchUser();
        fetchItems();
    }, []);

    const tilesData = {
        SHOPPING: { title: "Zakupy", icon: ShoppingCartIcon },
        MEDICAL: { title: "Medyczna", icon: ShieldCheckIcon },
        TRANSPORT: { title: "Transport", icon: TruckIcon },
        CARE: { title: "Opieka", icon: HeartIcon },
        WALK: { title: "Spacer", icon: UsersIcon },
        OTHER: { title: "Inne", icon: QuestionMarkCircleIcon },
    };
    return (
        <div className="flex min-h-screen p-8 w-full justify-center w-100">
            <main className="flex flex-col items-center">
                <Header text="Moje pomoce" backUrl="/" />

                <div className="flex flex-col items-center mt-2 w-full">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <RequestItem key={index} category={tilesData[item.type].title} categoryIcon={tilesData[item.type].icon} timeLeft={"Pozostało: " + formatDistanceToNow(item.expiration, {locale: pl})} location="Kraków Arena" status="pending" />
                            ))
                        ) : (
                            <p>No items found</p>
                        )}
                    </div>
                    <a href="/pomocnik/prosba" className="bg-amber-600 border-2 text-white border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 mt-4 text-3xl font-semibold px-8 py-4">
                        Nowa prośba
                    </a>
            </main>
        </div>
    );
};

export default Page;