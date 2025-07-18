import Link from "next/link";

interface NavigationBarProps {
    isOpen: boolean;
    navClose: () => void;
}

export default function NavigationBar({ isOpen, navClose }: NavigationBarProps) {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
            navClose();
        }
    };

    // 메뉴가 열려있지 않으면 렌더링하지 않음
    if (!isOpen) return null;
    
    return (
        <>
            <nav id="menu" className={isOpen ? 'open' : ''} role="navigation" aria-label="메인 네비게이션" onKeyDown={handleKeyDown} >
                <div className="inner">
                    <h2 id="menuTitle">Menu</h2>
                    <ul role="menubar">
                        <li role="none"><Link href="/" onClick={navClose} role="menuitem" tabIndex={1}>Home</Link></li>
                        <li role="none"><Link href="/notice" onClick={navClose} role="menuitem" tabIndex={2}>공지사항</Link></li>
                        <li role="none"><Link href="/gallery" onClick={navClose} role="menuitem" tabIndex={3}>갤러리</Link></li>
                        <li role="none"><Link href="/admin" onClick={navClose} role="menuitem" tabIndex={4}>관리자 페이지</Link></li>
                        <li role="none"><Link href="/budget" onClick={navClose} role="menuitem" tabIndex={5}>경비 관리</Link></li>
                    </ul>
                    <button type="button" className="close" onClick={navClose} aria-label="메뉴 닫기" tabIndex={0} >
                        X
                    </button>
                </div>
            </nav>
        </>
    )
}
