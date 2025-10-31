"use client"
import Image from "next/image";

export default function System() {
    return (
        <div className="flex flex-col items-center mt-auto gap-2 text-white font-sans text-sm">
            <Image src="/ritas.png" alt="Ritas" width={200} height={150}  unoptimized className="w-52 h-auto"/>
            <p>© 2025 RITAS System</p>
        </div>
    )
}