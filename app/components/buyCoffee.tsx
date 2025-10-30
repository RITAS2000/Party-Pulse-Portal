import Link from "next/link";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
export default function BuyCoffee() {
    const { t } = useTranslation();
    
    return (
        <div className="flex flex-row justify-around w-full items-center">
            <Link href="https://portfolio-lev-yuliia.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-31 h-13">
                <Image src="/my-logo-1.png" alt="logo" width={124} height={48} className="w-32 h-auto hover:drop-shadow-[0_0_6px_white] transition-all duration-300" />
            </Link>
            <Link href="https://ko-fi.com/ritas2000" target="_blank" rel="noopener noreferrer" className="flex items-center border-2 p-1 hover:bg-red-400 transition duration-300 ease-in-out"><p className="font-sans text-xs text-center text-white w-16">{t("sidebar.coffee")}</p>
                <Image src="/coffee.png" alt="coffee" width={30} height={30} />
            </Link>
        </div>)
 }
