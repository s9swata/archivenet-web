"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

const pricingPlans = [
    {
        title: "Basic",
        price: "$5",
        features: ["1,000 memories", "5 AI agents", "Email support"],
    },
    {
        title: "Pro",
        price: "$15",
        features: ["10,000 memories", "Unlimited agents", "Priority support"],
        highlight: true,
    },
    {
        title: "Enterprise",
        price: "$50",
        features: ["Unlimited memories", "Team features", "Dedicated support"],
    },
];

export default function PricingPage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-gray-400 text-lg">Choose the plan that&apos;s right for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingPlans.map((plan) => (
                        <Card
                            key={plan.title}
                            className={`hover:scale-105 bg-black border border-gray-800 hover:border-gray-700 transition-all duration-300 ${plan.highlight ? 'ring-2 ring-purple-500' : ''
                                }`}
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">{plan.title}</CardTitle>
                                <div className="mt-4">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-400">/month</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center">
                                            <Check className="h-5 w-5 text-purple-500 mr-2" />
                                            <span className="text-gray-300">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => router.push("/get-started")}
                                    className={`w-full ${plan.highlight
                                        ? 'bg-purple-600 hover:bg-purple-700'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                        }`}
                                >
                                    Get Started
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
