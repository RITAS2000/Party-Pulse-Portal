
import { selectIsAdmin, selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import SidebarItem from "./sidebar-item";
import SidebarClans from "./sidebarClans";

export default function Navigate() {
    const isAdmin = useSelector(selectIsAdmin);
    const userId = useSelector(selectUserId);
    const isLoggedIn = useSelector(selectIsLoggedIn)
    
    const { t } = useTranslation();
    return (
         <nav className="ml-16">
                <ul className="flex flex-col ">
                  <SidebarItem pathname="/">
                    {t("sidebar.navOne")}
                </SidebarItem>
                    {isLoggedIn && (
                    <SidebarItem pathname={`/hero/${userId}`} >
                    {t("sidebar.heroes")}
                    </SidebarItem>)}
                {isLoggedIn && (
               <SidebarItem pathname="/clan/create">
              {t("sidebar.clans")}
               
                </SidebarItem>)}
              <SidebarClans/>
                <SidebarItem pathname="/gallery">
                  {t("sidebar.gallery")}
          </SidebarItem>
         
                {isAdmin && (
                <SidebarItem pathname="/admin">
                       {t("sidebar.admin")}
                    </SidebarItem>
                )}
        </ul>
       
            </nav>
    )
}