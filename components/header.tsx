"use client";
import NavigationBar from "./navigationbar";
import Image from "next/image";
import React from "react";

export default function Header() {
    const [menuOpen, setMenuOpen] = React.useState(false);
    
    return (
        <>
            <header id="header">
                <div className="inner">
                    {/* Logo */}
                    <div className="logo">
                        <span className="symbol">
                            <Image src="/images/logo.svg" alt="" width="30" height="30" />
                        </span>
                        <span className="title">Personal Blog</span>
                    </div>
                    {/* Menu Button */}
                    <nav className={menuOpen ? "menuOpen" : ""}>
                        <ul>
                            <li>
                                <a href="#menu" onClick={() => setMenuOpen(prevState => !prevState)}>Menu</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <NavigationBar navClose={() => setMenuOpen(false)}/>
        </>
    )
}
