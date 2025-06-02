import { Button } from "@/components/ui/button";
import logo from "../../../public/logo.png";
import Image from "next/image";

export const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 z-2 w-full flex flex-row justify-between items-center p-4">
            <div className="flex flex-row items-center justify-between">
                <Image src={logo} alt="Logo" width={100} height={100} className="w-18 h-14" />
                <h1 className="text-lg md:text-2xl font-[neuePlackExtendedBlack] text-white">ArchiveNET</h1>
            </div>
            <div className="flex flex-row items-center gap-4 pr-3">
                <Button variant={"default"} className="bg-white text-black hover:bg-orange-600 hover:text-white transition-all duration-300">Get Started</Button>
            </div>
        </nav>
    )
}