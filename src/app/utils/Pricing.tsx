"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Plan = {
    title: string;
    price: string;
    features: string[];
    highlight?: boolean;
};

const plans: Plan[] = [
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

export default function Pricing() {
    return (
        <section className="bg-black text-white py-20 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-[neuePlackExtendedBold] mb-4">Choose the Right Plan for Your Team</h2>
                <p className="text-gray-400 mb-12">
                    Decentralized memory protocol for agentic LLMs. Scalable. Secure.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    {plans.map((plan, index) => (
                        <Card
                            key={index}
                            className={`bg-[#111] border border-neutral-800 text-white shadow-md ${plan.highlight ? "border-white scale-[1.03]" : ""
                                } transition-all`}
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl flex justify-between items-center">
                                    {plan.title}
                                    {plan.highlight && (
                                        <Badge variant="outline" className="text-blue-400 border-blue-500">
                                            Most Popular
                                        </Badge>
                                    )}
                                </CardTitle>
                                <div className="text-xl text-blue-400 mt-2"><span className="text-5xl">{plan.price}</span>/month</div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <ul className="text-left space-y-2 text-lg text-gray-400">
                                    {plan.features.map((feature, i) => (
                                        <li key={i}>• {feature}</li>
                                    ))}
                                </ul>
                                <Button
                                    variant="default"
                                    className="w-full bg-white hover:bg-white text-black mt-4 cursor-pointer"
                                >
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
