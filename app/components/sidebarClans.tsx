import { selectUserId } from "@/redux/auth/selectors";
import { selectAllChars } from "@/redux/char/selectors";
import { Character } from "@/redux/char/slice";
import { selectClans } from "@/redux/clan/selectors";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

export default function SidebarClans() {
    const pathname = usePathname();
    const chars = useSelector(selectAllChars); // або твоє джерело персонажів
    const userId = useSelector(selectUserId);
    const clans = useSelector(selectClans);
    const userChars = chars.filter((char: Character )=> char.userId === userId);
    const uniqueClanIds = [...new Set(
  userChars
    .filter((char: Character ) => char.clan?.clanId) // тільки ті, хто в клані
    .map((char: Character ) => char.clan.clanId.toString())
    )];
    const userClans = clans.filter(clan => uniqueClanIds.includes(clan._id.toString()));
return (
    
<li>
      <ul className="ml-6">
        {userClans.map((clan) => {
          const isActive = pathname === `/clan/${clan._id}`;
          return (
            <li key={clan._id}>
              <Link
                href={`/clan/${clan._id}`}
                className={`block px-2 py-1 transition ${
                  isActive
                    ? "underline text-white"
                    : "text-white"
                }`}
              >
                {clan.clanName}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
)
}