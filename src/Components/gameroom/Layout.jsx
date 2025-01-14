import NavBar from "./NavBar";
import Image from "next/image";
import profileIcon from "../../assets/how_to_play_img2.png";
import { Toaster } from "sonner";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const showHomeBtn = ["/moderator-waitroom", "/gameroom"].includes(pathname);

  return (
    <div className="h-screen flex bg-[#161920]">
      <div className="w-[64px]">
        <div className="absolute">
          <NavBar />
        </div>
      </div>
      <div className="flex flex-col w-full flex-1 overflow-y-auto">
        <Toaster richColors position="top-right" />
        <div
          className={`h-[40px] flex items-center ${
            !showHomeBtn ? "justify-between" : "justify-end"
          } px-[20px] lg:px-[40px] py-[28px]`}
        >
          {!showHomeBtn && (
            <Link href={"/"}>
              <h1 className="font-[600] font-fredoka text-[28px] gradient-text">
                TrivAi
              </h1>
            </Link>
          )}
          <button className="w-[48px] h-[48px] rounded-full overflow-hidden relative">
            <Image
              src={profileIcon}
              alt="Profile Icon"
              layout="fill"
              objectFit="cover"
              className="rounded-full top-0"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
