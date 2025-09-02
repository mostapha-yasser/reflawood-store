"use client";
import { MapPin, Mail, Phone, Instagram } from "lucide-react";

function Footer() {
  return (
    <div className={`bg-Text/10 text-Text pt-20 mt-20 pb-3 px-4 sm:px-8 lg:px-20 bgFooter`}>
      <div className=" max-w-7xl mx-auto gap-2 xl:gap-4">
        <p className="text-xl font-semibold mb-5 md:text-center md:text-3xl lg:text-4xl">Contact Us</p>
        
        <div className="flex flex-col md:flex-row justify-around gap-3 sm:gap-4">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 text-main/40 mr-0.5 lg:mr-2 " />
            <span className="truncate md:text-lg lg:text-xl">Cairo, Egypt</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-main/40 mr-0.5 lg:mr-2 " />
            <span className="truncate md:text-lg lg:text-xl">+201067253899</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-main/40 mr-0.5 lg:mr-2 " />
            <span className="truncate md:text-lg lg:text-xl">reflawooddesign@gmail.com</span>
          </div>
          <div className="flex items-center">
            <Instagram className="w-5 h-5 text-main/40 mr-0.5 lg:mr-2 " />
            <a 
              href="https://www.instagram.com/reflawood/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="truncate md:text-lg lg:text-xl hover:text-main/60 transition-colors"
            >
              @reflawood
            </a>
          </div>
        </div>
      </div>
      <hr className="w-full border-Text/20 my-6" />
      <p className="flex justify-center items-center text-sm">
        <span className="scale-125 pt-0.5 mx-1 tracking-widest">©</span>
        {new Date().getFullYear().toString()}{" "}
        <span className="mx-2 font-medium">Reflawood</span>. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
