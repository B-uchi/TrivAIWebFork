"use client";
import { HiMenu } from "react-icons/hi";
import { LuPlus } from "react-icons/lu";
import { IoIosHelpCircle } from "react-icons/io";
import { IoBug } from "react-icons/io5";
import { useState } from "react";
import { RxCaretUp, RxEnter } from "react-icons/rx";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();
  const [expandMenu, setExpandMenu] = useState(false);
  const style = expandMenu ? "w-[224px] bg-[#161920]" : "w-[57px] bg-[#161920]";
  return (
    <nav className={style}>
      <div
        className={`gradient-outline h-[100vh] flex flex-col justify-between ${
          expandMenu ? "" : "items-center"
        } py-8 px-4`}
      >
        <div className="">
          <div className="flex flex-col gap-[32px] ">
            <button title="Menu" onClick={() => setExpandMenu(!expandMenu)}>
              <HiMenu size={38} color="#fefefe" />
            </button>
            <button
              onClick={() => router.push("/create-a-game")}
              title="Create a game"
              className={`bg-[#000000] ${
                expandMenu
                  ? "gap-[10px] items-center"
                  : "w-[32px] h-[32px] items-center"
              } bg-opacity-[38%] rounded-full p-1 flex`}
            >
              <LuPlus
                color="#fefefe"
                size={19}
                className={`${expandMenu ? "ml-2" : "mx-auto"}`}
              />
              {expandMenu && (
                <p className="font-nunito font-[600] text-[20px] text-[#fefefe]">
                  Create a game
                </p>
              )}
            </button>
            <button
              title="Join a game"
              onClick={() => router.push("/join-a-game")}
              className={`bg-[#000000] ${
                expandMenu
                  ? "gap-[10px] items-center"
                  : "w-[32px] h-[32px] items-center"
              } bg-opacity-[38%] rounded-full p-1 flex`}
            >
              <RxEnter
                color="#fefefe"
                size={19}
                className={`${expandMenu ? "ml-2" : "mx-auto"}`}
              />
              {expandMenu && (
                <p className="font-nunito font-[600] text-[20px] text-[#fefefe]">
                  Join a game
                </p>
              )}
            </button>
          </div>
          {expandMenu && (
            <div className="mt-[60px]">
              <div className="flex items-center gap-[20px]">
                <p className="font-nunito text-[#fefefe] text-[18px]">
                  Recent Games
                </p>
                <button>
                  <RxCaretUp color="#fefefe" size={28} />
                </button>
              </div>
              {/* <div className="">
              <p className="font-nunito text-[#fefefe] text-[18px]">
                
              </p>
            </div> */}
            </div>
          )}
        </div>
        <div className={`mb-0 flex flex-col gap-[32px] text-[#878B8A]`}>
          <button className="flex items-center gap-[10px]" title="Help">
            <IoIosHelpCircle size={24} />
            {expandMenu && (
              <p className="font-[600] text-[16px] font-nunito">Get Help</p>
            )}
          </button>
          <button className="flex items-center gap-[10px]" title="Report bug">
            <IoBug size={24} />
            {expandMenu && (
              <p className="font-[600] text-[16px] font-nunito">Report Bug</p>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
