"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <Image src="/samwell_logo.svg" alt="Samwell" width={40} height={40} />
        <Link href="/" className="text-2xl font-bold">
          <span className="flex items-center">
            <span className="text-blue-500">sam</span>
            <span className="text-black">well.ai</span>
          </span>
        </Link>
      </div>

      <nav className="hidden md:flex space-x-8">
        <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
          Pricing
        </Link>
        <Link href="/examples" className="text-gray-600 hover:text-gray-900">
          Examples
        </Link>
        <Link href="/affiliate" className="text-gray-600 hover:text-gray-900">
          Affiliate
        </Link>
        <Link href="/products" className="text-gray-600 hover:text-gray-900">
          Products
        </Link>
      </nav>

      <div className="flex items-center gap-2">
        <Button variant='outline' className="px-4 py-1 rounded-3xl border border-gray-300">
          Login
        </Button>
        <Button variant='outline' className="px-4 py-1 rounded-3xl border border-gray-300">
          Sign-up for Free
        </Button>
      </div>
    </header>
  );
};

export default Header;
