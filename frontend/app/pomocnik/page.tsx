"use client";

import React, { useEffect, useState } from "react";
import Header from "@/app/ui/login/header";
import { publicService } from "@/services";
import { HelpRequest } from "@/services/HelpRequest";

const Page = () => {
    const [items, setItems] = useState<HelpRequest[]>([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await publicService.getHelpRequests({});
                setItems(response); // Adjust based on actual response structure
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div className="flex min-h-screen p-8 w-full justify-center">
            <main className="flex flex-col items-center">
                <Header text="Moje pomoce" backUrl="/" />

                <div className="flex flex-col items-center mt-2">
                    <div>
                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index}>
                                    {item.type}
                                </div>
                            ))
                        ) : (
                            <p>No items found</p>
                        )}
                    </div>
                    <a href="/pomocnik/prosba" className="bg-amber-700 border-2 text-white border-white rounded-full shadow-lg hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 mt-4 text-3xl font-semibold px-8 py-4">
                        Nowa prośba
                    </a>
                </div>
            </main>
        </div>
    );
};

export default Page;