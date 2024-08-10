import { HiMenu } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { IoIosHelpCircle } from "react-icons/io";
import { IoBug } from "react-icons/io5";

const NavBar = () => {
  return (
    <nav className="w-[64px]">
      <div className="gradient-outline h-screen flex flex-col justify-between items-center py-8">
        <div className="flex flex-col gap-[32px] items-center">
          <button>
            <HiMenu size={38} color="#fefefe" />
          </button>
          <button className="bg-[#000000] w-[32px] h-[32px] bg-opacity-[38%] rounded-full p-1">
            <LuPlus color="#fefefe" size={19} className="mx-auto" />
          </button>
        </div>
        <div className="mb-0 flex flex-col gap-[32px] items-center text-[#878B8A]">
          <button>
            <IoIosHelpCircle size={24}/>
          </button>
          <button>
            <IoBug size={24}/>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
