'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

                <Card className="bg-neutral-900 border border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center text-white">Send us a message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-white">
                                    Name
                                </label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-800 border-gray-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-white">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-800 border-gray-700 text-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-white">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="bg-gray-800 border-gray-700 text-white resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-white text-black hover:bg-gray-200"
                            >
                                Send Message
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mt-12 text-center">
                    <h2 className="text-2xl font-semibold mb-4">Other Ways to Reach Us</h2>
                    <div className="space-y-2">
                        <p>
                            Email: <a href="mailto:admin@archivenet.tech" className="underline text-blue-500">admin@archivenet.tech</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
