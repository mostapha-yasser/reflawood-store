"use client";
import Image from "next/image";
import logo from "../../../public/logo.png";
import Link from "next/link";
import NavLinks from "../headerComponent/NavLinks";
import CartIcon from "../ui/CartIcon";
function Header() {
  return (
    <div className="px-2 sm:px-5 max-h-18 bg-headerBg max-w-screen
     text-white flex justify-evenly items-center
      border-b-2 border-main shadow-sm shadow-main">
      <Link href={"/"}>
        <Image
        priority
          src={logo}
          alt="reflawood logo"
          width={200}
          height={200}
          className=" w-20 h-18 "
        />
      </Link>
      <div className="">
        <NavLinks />
      </div>
      <div className="w-8/10 md:w-fit flex items-center justify-around ">
      <CartIcon />
      </div>
    </div>
  );
}

export default Header;
