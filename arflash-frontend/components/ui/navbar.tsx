import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white bg-opacity-30 backdrop-blur-md text-foreground p-4 fixed top-0 left-0 right-0 z-50 transition duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logo.png" alt="Arflash Logo" width={35} height={35} />
          <span className="text-lg font-bold">Arflash</span>
        </Link>
        <div className="flex space-x-4">
          <Link href="/contact" className="text-foreground transition duration-300 ease-in-out hover:text-blue-500">Contact</Link>  
          <Link href="/about-us" className="text-foreground transition duration-300 ease-in-out hover:text-blue-500">About Us</Link>
          <Link href="https://calc1f4r.gitbook.io/arflash/" className="text-foreground transition duration-300 ease-in-out hover:text-blue-500">Get Flashloaning</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
