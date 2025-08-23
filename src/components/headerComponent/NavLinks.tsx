import ActiveLink from "./ActiveLink";


export default function NavLinks() {

  return (
    <div className="border-r-4 border-Text md:border-0 flex flex-col md:flex-row justify-between gap-10 py-10 md:gap-2.5  ">
      <ActiveLink targetPath={"/products"}>Our Products </ActiveLink>
    </div>
  );
}
