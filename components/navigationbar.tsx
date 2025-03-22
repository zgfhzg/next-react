import Link from "next/link";

interface NavigationBarProps {
    navClose: () => void;
}

export default function NavigationBar({ navClose }: NavigationBarProps) {
    return (
        <>
            <nav id="menu">
                <div className="inner">
                    <h2 id="menuTitle">Menu</h2>
                    <ul>
                        <li><Link href="/" onClick={navClose}>Home</Link></li>
                        <li><Link href="/notice" onClick={navClose}>공지사항</Link></li>
                        <li><Link href="/gallery" onClick={navClose}>갤러리</Link></li>
                        <li><Link href="/admin" onClick={navClose}>관리자 페이지</Link></li>
                        <li><Link href="/budget" onClick={navClose}>경비 관리</Link></li>
                    </ul>
                </div>
                <a className="close" href="#" onClick={navClose}>Close</a>
            </nav>
        </>
    )
}
