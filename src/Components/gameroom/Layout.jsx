import NavBar from "./NavBar";
import Image from "next/image";
import profileIcon from "../../assets/how_to_play_img2.png";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex bg-[#161920]">
      <div className="w-[64px]">
        <div className="absolute">
          <NavBar />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="h-[60px] flex justify-end px-[20px] lg:px-[40px] py-[24px]">
          <button className="w-[48px] h-[48px] rounded-full overflow-hidden relative">
            <Image
              src={profileIcon}
              alt="Profile Icon"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
