import Link from "next/link";
import { selectIsAdmin } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

export default function Navigate() {
      const isAdmin = useSelector(selectIsAdmin)
    return (
         <nav>
                <ul>
                <li><Link href="/">Головний Зал</Link></li>
                <li><Link href="/admin">Трон Кланів</Link></li>
                <li><Link href="/admin">Куточок Героя</Link></li>
                <li><Link href="/admin">GvG Портал</Link></li>
                    {isAdmin && (
                    <li><Link href="/admin">Admin Page</Link></li>
                    )}
                </ul>
            </nav>
    )
}