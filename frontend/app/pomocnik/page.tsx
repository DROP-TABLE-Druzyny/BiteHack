"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/ui/login/header";
import { publicService } from "@/services";
import { HelpRequest } from "@/services/HelpRequest";
import RequestItem from "../ui/pomocnik/prosba/request-item";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import { pl } from 'date-fns/locale'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation'
const Page = () => {
    const [items, setItems] = useState<HelpRequest[]>([]);

    const { getClientData } = useAuth();
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
            let client = null
            try {
                client = await getClientData()
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
    return (
        <div className="flex min-h-screen p-8 w-full justify-center w-100">
            <main className="flex flex-col items-center">
                <Header text="Moje pomoce" backUrl="/" />

                <div className="flex flex-col items-center mt-2 w-full">
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <RequestItem key={index} category="Nieokreślona" categoryIcon={ShoppingCartIcon} timeLeft={"Pozostało: " + formatDistanceToNow(item.expiration, {locale: pl})} location="Kraków Arena" status="pending" />
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