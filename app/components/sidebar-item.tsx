import React from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { BsHeartPulse } from 'react-icons/bs';



export interface SidebarItemProps {
  pathname: string;
  children: React.ReactNode;
}

export default function SidebarItem({
    pathname,
    children,
}: SidebarItemProps) {
  const currentPath = usePathname();
  const isActive = currentPath === pathname;
  return (
    <li>
      <Link href={pathname} className="flex items-center h-9 mx-1  relative">
              <span className="font-bold text-lg text-white">{children}</span>
               {isActive && ( <BsHeartPulse size={26} color="white" className="absolute right-0 top-1/2 -translate-y-1/2"/>
        )}
      </Link>
    </li>
  );
}