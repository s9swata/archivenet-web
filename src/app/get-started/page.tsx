"use client";
import { useState } from "react";
//import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RedirectToSignIn, SignedIn, SignedOut, useUser, UserButton } from "@clerk/nextjs";
import { CardSpotlightDemo } from "@/components/ui/archivnet-card";

import axios from "axios";
import Image from "next/image";
import logo from "../../../public/logo.png";

import { Web3Payment } from "@/utils/Web3Payment";
import { MeteorsDemo } from "@/utils/Meteors";

const SubscriptionPlans = [
    {
        title: "Starter",
        featureTitle: "Perfect for individuals",
        features: [
            "Store up to 1,000 memories",
            "Create and manage 5 AI agents",
            "Get email-based support",
            "Ideal for students, hobbyists, or early testers"
        ],
        price: "$5",
        currentPlan: false
    },
    {
        "title": "Pro",
        "featureTitle": "Built for power users and growing teams",
        "features": [
            "Store up to 10,000 memories",
            "Unlimited AI agents",
            "Priority support",
            "Great for startups, researchers, and productivity hackers"
        ],
        "price": "$15",
        "currentPlan": true
    },
    {
        "title": "Enterprise",
        "featureTitle": "Tailored for businesses and organizations",
        "features": [
            "Unlimited memory capacity",
            "Team collaboration tools",
            "Dedicated support",
            "Built for scale, reliability, and premium experience"
        ],
        "price": "$50",
        "currentPlan": false
    }
]

export default function GetStarted() {
    const [step, setStep] = useState(0); // 0: signup, 1: payment, 2: api, 3: done
    const [apiResult, setApiResult] = useState<unknown>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const { isSignedIn } = useUser();


    // Step 1: After sign up, go to payment
    if (step === 0 && isSignedIn) {
        setStep(1);
    }

    // Step 2: After payment, fetch API
    async function handleApiFetch() {
        setApiError(null);
        try {
            const res = await axios.get("/api/onboarding-success"); // Replace with your backend endpoint
            setApiResult(res.data);
            setStep(3);
        } catch (err: unknown) {
            if (err && typeof err === "object" && "message" in err) {
                setApiError((err as { message: string }).message);
            } else {
                setApiError("API error");
            }
        }
    }

    return (
        <>
            <SignedIn>
                <div className="min-h-screen flex flex-col bg-black text-white">
                    <Navbar />
                    <div className="flex flex-col items-center justify-center h-full mt-10">
                        <p className="text-2xl font-bold font-[neuePlackExtendedRegular] text-white mb-4">
                            Choose a plan that fits your needs
                        </p>
                        <Subscription />
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
}

const Navbar = () => {
    return (
        <nav className="w-full flex flex-row justify-between items-center p-2 border-b border-neutral-700/50 bg-black pr-2">
            <div className="flex flex-row items-center justify-between">
                <Image src={logo} alt="Logo" width={100} height={100} className="w-18 h-14" />
                <h1 className="text-lg md:text-2xl font-[neuePlackExtendedBlack] text-white">ArchiveNET</h1>
                <Badge variant="outline" className="text-green-400 border-green-500 ml-2">Onboarding</Badge>
            </div>
            <UserButton />
        </nav>
    )
}

const Subscription = () => {
    return (
        <div className="flex flex-row items-center justify-center w-full gap-7">
            {
                SubscriptionPlans.map((plan, index) => (
                    <CardSpotlightDemo
                        key={index}
                        title={plan.title}
                        featureTitle={plan.featureTitle}
                        features={plan.features}
                        price={plan.price}
                        currentPlan={plan.currentPlan}
                    />
                ))
            }
        </div>
    )
}
