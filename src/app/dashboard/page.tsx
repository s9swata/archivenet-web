"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RedirectToSignIn, SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import { useAuth } from '@clerk/nextjs';
import { test } from '@/lib/api';

const Dashboard = () => {
    const [selectedProject, setSelectedProject] = useState('main-protocol');
    const { getToken } = useAuth();

    const handleTest = async () => {
        try {
            const token = await getToken();
            const response = await test(token as string);
            console.log('API Response:', response);
        }
        catch (error) {
            console.error('API Error:', error);
        }
    }

    // Mock data
    const projects = [
        {
            id: 'main-protocol',
            name: 'ArchiveNet Protocol',
            status: 'active',
            region: 'us-east-1',
            memories: '1.2M',
            agents: 47,
            created: '2024-01-15'
        },
        {
            id: 'dev-environment',
            name: 'Development Env',
            status: 'active',
            region: 'us-west-2',
            memories: '45K',
            agents: 12,
            created: '2024-02-10'
        },
        {
            id: 'staging',
            name: 'Staging Protocol',
            status: 'sleeping',
            region: 'eu-west-1',
            memories: '234K',
            agents: 8,
            created: '2024-03-01'
        }
    ];

    const metrics = [
        { label: 'Total Memories', value: '1.2M', change: '+12.5%', trend: 'up' },
        { label: 'Active Agents', value: '47', change: '+3', trend: 'up' },
        { label: 'Storage Used', value: '2.4 GB', change: '+150 MB', trend: 'up' },
        { label: 'API Calls', value: '89.2K', change: '+5.2%', trend: 'up' }
    ];

    const recentActivity = [
        { action: 'Memory created', agent: 'Claude-Agent-01', timestamp: '2 minutes ago' },
        { action: 'Agent connected', agent: 'GPT-Agent-15', timestamp: '5 minutes ago' },
        { action: 'Context shared', agent: 'Gemini-Agent-03', timestamp: '12 minutes ago' },
        { action: 'Memory retrieved', agent: 'Claude-Agent-01', timestamp: '18 minutes ago' },
        { action: 'Agent deployed', agent: 'LLaMA-Agent-22', timestamp: '1 hour ago' }
    ];

    return (
        <>
            <SignedIn>
                <div className="min-h-screen bg-black text-white">
                    {/* Header */}
                    <div className="border-b border-gray-700 bg-zinc-900">
                        <div className="flex h-16 items-center justify-between px-6">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-xl font-[neuePlackExtendedBold] text-white">ArchiveNet</h1>
                                <Badge variant="outline" className="text-green-400 border-green-500 bg-green-500/10">
                                    Protocol Active
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Button variant="outline" size="sm" className="border-gray-600 text-black cursor-pointer hover:border-gray-400">
                                    Documentation
                                </Button>
                                <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={handleTest}>
                                    Create Project
                                </Button>
                                <UserButton />
                            </div>
                        </div>
                    </div>

                    <div className="flex">
                        {/* Sidebar */}
                        <div className="w-64 border-r border-gray-700 bg-zinc-900 min-h-screen">
                            <div className="p-4">
                                <div className="space-y-2">
                                    <Button variant="ghost" className="w-full justify-start text-blue-400 bg-blue-500/20 hover:bg-blue-500/30 hover:text-white">
                                        📊 Dashboard
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50">
                                        🧠 Memory Graph
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50">
                                        🤖 AI Agents
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50">
                                        📈 Analytics
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700/50">
                                        ⚙️ Settings
                                    </Button>
                                </div>
                            </div>

                            <div className="px-4 pt-8">
                                <h3 className="text-sm font-medium text-gray-300 mb-3">Projects</h3>
                                <div className="space-y-1">
                                    {projects.map((project) => (
                                        <button
                                            key={project.id}
                                            onClick={() => setSelectedProject(project.id)}
                                            className={`w-full text-left p-2 rounded-md text-sm transition-colors ${selectedProject === project.id
                                                ? 'bg-gray-700 text-white'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="truncate">{project.name}</span>
                                                <div className={`w-2 h-2 rounded-full ${project.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                                                    }`} />
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {project.memories} memories
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 p-6">
                            {/* Project Header */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-[neuePlackExtendedBold] mb-1 text-white">
                                            {projects.find(p => p.id === selectedProject)?.name}
                                        </h2>
                                        <p className="text-gray-300">
                                            Decentralized memory protocol • {projects.find(p => p.id === selectedProject)?.region}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" className="border-gray-600 text-black cursor-pointer hover:border-gray-400">
                                            ⚙️ Settings
                                        </Button>
                                        <Button variant="outline" size="sm" className="border-gray-600 text-black cursor-pointer hover:border-gray-400">
                                            📊 Metrics
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {metrics.map((metric, index) => (
                                    <Card key={index} className="bg-zinc-900 border-gray-700">
                                        <CardContent className="p-4">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-300">{metric.label}</p>
                                                    <p className="text-2xl font-[neuePlackExtendedBold] mt-1 text-white">{metric.value}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                                                        }`}>
                                                        {metric.change}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Main Dashboard Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Memory Graph Overview */}
                                <Card className="lg:col-span-2 bg-zinc-900 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between text-white">
                                            <span>Memory Activity</span>
                                            <Button variant="ghost" size="sm" className="text-gray-300 cursor-pointer">
                                                View All
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-2xl">
                                                    📈
                                                </div>
                                                <p className="text-gray-300">Memory activity chart</p>
                                                <p className="text-sm text-gray-400">Interactive visualization coming soon</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Activity */}
                                <Card className="bg-zinc-900 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">Recent Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {recentActivity.map((activity, index) => (
                                                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-white">{activity.action}</p>
                                                        <p className="text-xs text-gray-300 truncate">{activity.agent}</p>
                                                    </div>
                                                    <p className="text-xs text-gray-400">{activity.timestamp}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Quick Actions */}
                                <Card className="bg-zinc-900 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <Button variant="outline" className="w-full justify-start text-black border-gray-600 hover:border-gray-400 cursor-pointer">
                                            🤖 Deploy New Agent
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start text-black border-gray-600 hover:border-gray-400 cursor-pointer">
                                            🧠 Create Memory Node
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start text-black border-gray-600 hover:border-gray-400 cursor-pointer">
                                            🔗 Share Context
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start text-black border-gray-600 hover:border-gray-400 cursor-pointer">
                                            📊 View Analytics
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Agent Status */}
                                <Card className="bg-zinc-900 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">Active Agents</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {['Claude-Agent-01', 'GPT-Agent-15', 'Gemini-Agent-03', 'LLaMA-Agent-22'].map((agent, index) => (
                                                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        <span className="text-sm text-gray-200">{agent}</span>
                                                    </div>
                                                    <Badge variant="outline" className="text-xs text-green-400 border-green-500">
                                                        Active
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Storage Usage */}
                                <Card className="bg-zinc-900 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">Storage & Performance</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-300">Memory Storage</span>
                                                    <span className="text-gray-200">2.4 GB / 10 GB</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-300">API Rate Limit</span>
                                                    <span className="text-gray-200">1.2K / 10K req/hr</span>
                                                </div>
                                                <div className="w-full bg-gray-700 rounded-full h-2">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
};

export default Dashboard;