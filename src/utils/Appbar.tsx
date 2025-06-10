"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserButton } from "@clerk/nextjs";
import { ConnectButton } from "./ConnectButton";

export const NavBar = () => {

    return (
        <nav className="border-b border-gray-700 bg-zinc-900">
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
                    <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                        Create Project
                    </Button>
                    <ConnectButton />
                    <UserButton />
                </div>
            </div>
        </nav >
    );
};

export default NavBar;