"use client";
import { Layout } from "@/Components/gameroom";
import { useState } from "react";
import {
  IoCaretBackCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";

const CreateGame = () => {
  const [duration, setDuration] = useState(1);
  const [noOfPlayers, setNoOfPlayers] = useState(1);
  return (
    <Layout>
      <div className=" flex flex-col items-center mb-10">
        <div className="gap-[12px] text-center mt-5">
          <h1 className="font-fredoka font-[600] gradient-text lg:text-[50px] text-[30px] ">
            Create New Game
          </h1>
          <p className="font-nunito font-[400] lg:text-[28px] text-[#878B8A]">
            Customize your trivia game and invite players to join.
          </p>
        </div>
        <div className="mt-8 gradient-outline lg:w-[800px] w-[90%] lg:p-[50px] p-[20px]">
          <h2 className="font-fredoka font-[500] text-[20px] lg:text-[25px] gradient-text text-center">
            Game Details
          </h2>
          <div className="mt-10 flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[8px]">
              <p className="lg:text-[18px] font-poppins font-[500] text-[#fefefe]">
                Game Name
              </p>
              <input
                type="text"
                className="gradient-outline bg-transparent lg:p-[20px] p-[5px] w-full font-poppins font-[400]"
                placeholder="Enter game name"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <p className="lg:text-[18px] font-poppins font-[500] text-[#fefefe]">
                Category
              </p>

              <select
                defaultValue={"selectCategory"}
                className="gradient-outline bg-transparent p-[5px] lg:p-[20px] w-full font-poppins font-[400] text-[#9A9A9A] gragient-text"
              >
                <option value="selectCategory" selected disabled>
                  Select Category
                </option>
                <option value="Movies">Movies</option>
                <option value="Sport">Sport</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-[32px] justify-between">
              <div className="">
                <p className="lg:text-[18px] font-poppins font-[500] text-[#fefefe]">
                  Game Duration/min
                </p>
                <div className="w-full lg:h-[50px] h-[40px] gradient-outline flex">
                  <button
                    onClick={() =>
                      setDuration(duration == 1 ? 1 : duration - 1)
                    }
                    className="h-full w-[25%] flex justify-center items-center gradient-right"
                  >
                    <IoCaretBackCircleOutline color="#fefefe" size={20} />
                  </button>
                  <div className="flex-grow text-center font-poppins gradient-text h-full flex justify-center items-center">
                    <p>{duration}</p>
                  </div>
                  <button
                    onClick={() => setDuration(duration + 1)}
                    className="h-full w-[25%] flex justify-center items-center gradient-left"
                  >
                    <IoCaretForwardCircleOutline color="#fefefe" size={20} />
                  </button>
                </div>
              </div>
              <div className="">
                <p className="lg:text-[18px] font-poppins font-[500] text-[#fefefe]">
                  Number of Players
                </p>
                <div className="w-full lg:h-[50px] h-[40px] gradient-outline flex">
                  <button
                    onClick={() =>
                      setNoOfPlayers(noOfPlayers == 1 ? 1 : noOfPlayers - 1)
                    }
                    className="h-full w-[25%] flex justify-center items-center gradient-right"
                  >
                    <IoCaretBackCircleOutline color="#fefefe" size={20} />
                  </button>
                  <div className="flex-grow text-center font-poppins gradient-text h-full flex justify-center items-center">
                    <p>{noOfPlayers}</p>
                  </div>
                  <button
                    onClick={() => setNoOfPlayers(noOfPlayers + 1)}
                    className="h-full w-[25%] flex justify-center items-center gradient-left"
                  >
                    <IoCaretForwardCircleOutline color="#fefefe" size={20} />
                  </button>
                </div>
              </div>
            </div>
            <button className="font-[700] rounded-[10px] font-nunito text-[18px] text-[#fefefe] bg-custom p-[10px] lg:p-[20px]">Create Game</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateGame;
