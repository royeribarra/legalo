import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E]  flex flex-col justify-center overflow-hidden lg:pb-10">
      <div className="container p-4 lg:p-8 flex flex-col lg:flex-row items-start lg:justify-between lg:items-center border-b border-white mx-auto lg:h-[180px] gap-4">
        <Image
          src="/assets/legalo-logo-white.webp"
          alt="img"
          width={160}
          height={30}
          className="my-8"
        />
        <div className="text-white flex gap-8 flex-col lg:flex-row ">
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
        </div>

        <div className="flex space-x-4 my-4 ">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icos/icon_facebook.webp"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icos/icon_instagram.webp" alt="X" className="w-6 h-6" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src="/icos/icon_x.webp" alt="X" className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icos/icon_linkedin.webp"
              alt="LinkedIn"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>

      <div className="container p-4 lg:p-8 mx-auto flex flex-col-reverse lg:flex-wrap gap-8 justify-center text-white my-4 lg:flex-row ">
        <p>© 2023 Legalo. All rights reserved.</p>
        <Link href="#" className="underline">
          Privacy Policy
        </Link>
        <Link href="#" className="underline">
          Terms of Service
        </Link>
        <Link href="#" className="underline">
          Cookies Settings
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
