
import { selectIsAdmin, selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SidebarItem from "./sidebar-item";

export default function Navigate() {
    const isAdmin = useSelector(selectIsAdmin);
    const userId = useSelector(selectUserId);
    const isLoggedIn = useSelector(selectIsLoggedIn)
    
    const { t } = useTranslation();
    return (
         <nav className="ml-16">
                <ul>
                  <SidebarItem pathname="/">
                    {t("sidebar.navOne")}
                </SidebarItem>
                {isLoggedIn && (
               <SidebarItem pathname="/clan/create">
                    Трон Кланів
                </SidebarItem>)}
                
                {isLoggedIn && (
                    <SidebarItem pathname={`/hero/${userId}`} >
                     Персонажи
                    </SidebarItem>)}
                 <SidebarItem pathname="/portal">
                    GvG Портал
                </SidebarItem>
                <SidebarItem pathname="/gallery">
                    Галерея
                </SidebarItem>
                {isAdmin && (
                <SidebarItem pathname="/admin">
                        Admin Page
                    </SidebarItem>
                )}
                </ul>
            </nav>
    )
}