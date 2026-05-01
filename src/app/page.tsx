"use client"

import { useEffect, useState } from "react";
import { useAccount } from "wagmi"
import RecentlyListedNFTs from "@/components/RecentlyListed"

export default function Home() {
    const [isCompliant, setIsCompliant] = useState(true);
    const { isConnected, address } = useAccount();
    
    useEffect(() => {
        if (address) { checkCompliance() };
    }, [address]);

    const checkCompliance = async () => {
        if (!address) return;

        const response = await fetch("api/compliance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ address })
        });

        const result = await response.json();
        setIsCompliant(result.success && result.isApproved);
    };

    return (
        <main>
            {!isConnected ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    Please connect a wallet
                </div>
            ) : (
                isCompliant ? 
                    <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                        <RecentlyListedNFTs />
                    </div> : 
                    <div className="flex justify-center p-8 font-semibold text-red-800">You are denied!!</div>
            )}
        </main>
    )
}
