import React from "react";
import Image from "next/image";

// images
import logo from "../../../public/Logo.png";
import place from "../../assets/socials/round-place-24px.png";
import phone from "../../assets/socials/round-phone-24px.png";
import facebook from "../../assets/socials/facebook black.1.png";
import twitter from "../../assets/socials/Twitter.png";
import linkedin from "../../assets/socials/LinkedIn.png";
import youtube from "../../assets/socials/Youtube.png";
import instagram from "../../assets/socials/instagram black.1.png";
import google from "../../assets/socials/googleplus black.1.png";
import pinterest from "../../assets/socials/Pinterest.png";
import wifi from "../../assets/socials/rss black.1.png";

const Footer = () => {
  return (
    <div className="text-gray-400 mt-8 lg:mt-16 w-full flex items-center justify-center py-4">
      <div className="w-[88%] ">
        <div className="my-12 h-[2px] w-full gradient-bg"></div>
        <div className="grid lg:grid-cols-2 items-center justify-center gap-8">
          {/* logo */}
          <Image src={logo} className="w-[150px]" />
          <div className="flex flex-col items-start gap-8">
            {/* contact */}
            <div className="flex items-center gap-2">
              <Image src={place} />
              <p>345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345</p>
            </div>
            <div className="flex items-center gap-2">
              <Image src={phone} />
              <p>(+234) 906-031-3347</p>
            </div>
            {/* social */}
            <div className="lg:flex gap-6 hidden">
              <p>Social Media</p>
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={instagram}
                alt="Instagram logo"
              />
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={facebook}
                alt="Facebook Logo"
              />
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={linkedin}
                alt="Linkedin logo"
              />
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={youtube}
                alt="youtube logo"
              />
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={twitter}
                alt="twitter logo"
              />
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={pinterest}
                alt="pinterest logo"
              />
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={wifi}
                alt="rss logo"
              />
              <Image
                className="object-contain cursor-pointer w-[25px]"
                src={google}
                alt="Google logo "
              />
            </div>
          </div>
        </div>
        <div className="my-12 h-[1px] w-full gradient-bg"></div>
        <div className="w-full flex lg:flex-row flex-col items-start gap-8 justify-between text-gray-400">
          <div className="text-sm grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-4">
            <a href="">ABOUT US</a>
            <a href="">HELP</a>
            <a href="">PRIVACY POLICY</a>
            <a href="">DISCLAIMER</a>
          </div>
          <p className="text-sm">Copyright © 2024 • TrivAI.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
