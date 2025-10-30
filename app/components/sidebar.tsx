import LangBox from "./lang";
import BuyCoffee from "./buyCoffee";
import System from "./system";
import Navigate from "./navigaite";




export default function Sidebar() {
 
 
    return (
        <aside className="fixed flex flex-col  z-20 gap-8 px-4 py-4 w-80 h-full rounded-tr-lg rounded-br-lg border-r-4  border-yellow-200 bg-red-800">
            <div className="  flex flex-col gap-6 w-full h-36 items-center border-b-2 border-yellow-200">
                <BuyCoffee/>
                <LangBox/>
            </div>
           <Navigate/>
           <System/>
        </aside>
    );

}