'use client';

import style from "./Header.module.css";
import Link from "next/link";
import {Playfair_Display} from "next/font/google";
import ToggleTheme from "@/component/ToggleTheme/ToggleTheme";
import TextWriterAnimation from "@/component/TextWriterAnimation/TextWriterAnimation";
import {useState} from "react";
import {usePathname} from "next/navigation";
import headers from "@/static/header";


const font = Playfair_Display({ subsets: ["latin"]});

const Header = () => {
  const pathname = usePathname();
  const [reWriteLogo, setReWriteLogo] = useState(false);
  
  const toggleRewriteLogo = () => {
    setReWriteLogo(prev => !prev);
  }
  
  const onClickLogo = () => {
    if (pathname === '/') {
      toggleRewriteLogo();
    }
  }
  
  
  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link href={'/'} className={`${font.className} ${style.logo}`} onClick={onClickLogo}>
          <TextWriterAnimation text={'Lofi Typing'} delay={80} rewrite={reWriteLogo} playOnRender={false} />
        </Link>
        <div className={style.link_wrap}>
          {headers.map((item, index) => (
            <Link key={index} href={item.link} className={`${pathname===item.link ? style.active : ''}`}>
              {item.title}
            </Link>
          ))}
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
}

export default Header;