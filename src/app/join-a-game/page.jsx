"use client";
import { Layout } from "@/Components/gameroom";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const JoinGame = () => {
  const [gameId, setGameId] = useState("");
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const joinGame = () => {
    setLoading(true)
    if (!gameId){
      return toast.error("Game id is required")
    }
    router.push(`/waitroom/${gameId}`);
    setLoading(false)
  };

  return (
    <Layout>
      <div className=" flex flex-col items-center mb-10">
        <div className="gap-[12px] text-center mt-5">
          <h1 className="font-fredoka font-[600] gradient-text lg:text-[50px] text-[30px] ">
            Join a Game
          </h1>
          <p className="font-nunito font-[400] lg:text-[28px] text-[#878B8A]">
            Ready, Set, Play! Join an existing game and test your skills.
          </p>
        </div>
        <div className="mt-8 gradient-outline lg:w-[800px] w-[90%] lg:p-[20px] p-[20px]">
          <h2 className="font-fredoka font-[500] text-[20px] lg:text-[25px] gradient-text text-center">
            Game Details
          </h2>
          <div className="mt-10 flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[8px]">
              <p className="lg:text-[18px] font-poppins font-[500] text-[#fefefe]">
                Game Id
              </p>
              <input
                type="text"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="text-[#9A9A9A] gradient-outline bg-transparent lg:p-[20px] p-[5px] w-full font-poppins font-[400]"
                placeholder="Enter game id"
              />
            </div>
            <button
              onClick={() => joinGame()}
              className="font-[700] rounded-[10px] font-nunito text-[18px] text-[#fefefe] bg-custom p-[10px] lg:p-[20px] fles items-center justify-center gap-5"
            >
              Join Game {loading && <div className="loader"></div>}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JoinGame;
