"use client";
import NavigationBar from "./navigationbar";
import Image from "next/image";
import React from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <>
            <header id="header">
                <div className="inner">
                    {/* Logo */}
                    <div className="logo">
                        <span className="symbol">
                            <Image src="/images/logo.svg" alt="" width="30" height="30"/>
                        </span>
                        <span className="title">Personal Blog</span>
                    </div>
                    {/* Menu Button */}
                    <nav className={menuOpen ? "menuOpen" : ""}>
                        <ul>
                            <li>
                                <button type="button" onClick={toggleMenu} aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={menuOpen} className={`hamburger-menu ${menuOpen ? 'active' : ''}`} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <NavigationBar isOpen={menuOpen} navClose={closeMenu}/>
        </>
    )
}
