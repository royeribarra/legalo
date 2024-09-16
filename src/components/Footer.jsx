import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram,} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1E] md:h-[324px] flex flex-col justify-center">
      <div className='container p-4 md:p-8 flex justify-between items-center border-b border-white mx-auto md:h-[180px]'>
        <Image 
            src="/assets/legalo-logo-white.webp" 
            alt="img" 
            width={160} 
            height={30} 
            className=""
        />
        <div className='text-white flex gap-8'>
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
          <Link href="#">Link One</Link>
        </div>

        <div class="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="/icos/icon_facebook.webp" alt="LinkedIn" class="w-6 h-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="/icos/icon_instagram.webp" alt="X" class="w-6 h-6" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <img src="/icos/icon_x.webp" alt="X" class="w-6 h-6" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <img src="/icos/icon_linkedin.webp" alt="LinkedIn" class="w-6 h-6" />
          </a>
        </div>
      </div >
        
      <div className='container p-4 md:p-8 mx-auto flex gap-8 justify-center text-white'>
        <p>
          © 2023 Legalo. All rights reserved.
        </p>
        <Link href="#" className='underline'>Privacy Policy</Link>
        <Link href="#" className='underline'>Terms of Service</Link>
        <Link href="#" className='underline'>Cookies Settings</Link>
      </div>

    </footer>
  )
}

export default Footer