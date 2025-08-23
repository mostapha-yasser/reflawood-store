import Image from "next/image";
import Link from "next/link";
import EmptyLogo from "../../public/EmptyLogo.svg";

function Empty() {
  return (
    <div className="flex flex-col py-10 lg:pt-0 lg:flex-row items-center justify-center text-Text md:w-10/12 mx-auto">
      <div className="z-20 text-center lg:text-left w-full lg:w-1/2 flex flex-col gap-80 lg:gap-0 relative lg:pt-5px">
        <div className="space-y-8 lg:mb-7">
          <p className="text-center lg:text-start text-2xl sm:text-3xl xl:text-4xl md:tracking-wider font-bold text-nowrap">
        Empty Card
          </p>

          <p
            className="text-center  text-sm 
          font-medium sm:text-base lg:text-lg lg:text-justify
           lg:mx-5 w-full lg:w-8/12  md:leading-10"
          >
            Looks like you haven’t added anything to your cart yet. Let’s get
            you back to explore our candle collection and find something you’ll
            love.
          </p>
          </div>

        <Link
          href="products"
          className="text-base text-center w-2/3 md:w-/5 mx-auto 
          lg:text-2xl px-4 py-2 lg:px-0 text-white bg-main rounded-sm text-nowrap"
          >
          Browse tables and mirrors
        </Link>
      </div>

      <div className="lg:w-1/2 mt-12 absolute lg:static z-10">
        <Image
          priority
          width={400}
          height={400}
          src={EmptyLogo}
          alt="Empty Cart Illustration"
          className="relative z-10 w-full max-w-lg mx-auto rounded-lg transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

export default Empty;
