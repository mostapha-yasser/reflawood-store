"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function ActiveLink({
  targetPath,
  children,
  onClickFun= undefined
}: {
  targetPath: string;
  children: ReactNode;
  onClickFun?:()=>void
}) {
  const currentPath = usePathname();
  const isActiveLink = currentPath === targetPath;

  return (
    <Link
      href={targetPath}
      onClick={onClickFun}
      className={`
        px-3 py-1 text-nowrap
       text-Text 
        text-lg md:
        lg:text-xl
        xl:text-2xl
        z-30   
        transition-all
        duration-200
        font-medium hover:-translate-y-0.5
         ${
        isActiveLink &&
        "font-bold  border-b-2  border-Text  scale-y-110   "
      } `}
    >
      {children}
    </Link>
  );
}

export default ActiveLink;
