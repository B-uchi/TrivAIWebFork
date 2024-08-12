"use client";
import { Layout } from "@/Components/gameroom";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState([]);
  const [current_user, setCurrentUser] = useState("");
  useEffect(() => {
    if (typeof sessionStorage !== undefined) {
      const leaderboardd = JSON.parse(sessionStorage.getItem("leaderboard"));
      const current_userr = sessionStorage.getItem("username");
      setLeaderboard(leaderboardd);
      setCurrentUser(current_userr);
      console.log(current_userr)
      // return () => {
      //   sessionStorage.removeItem("username");
      // };
    }
  }, [router]);


  return (
    <Layout>
      <div className=" flex flex-col items-center">
        <div className="gap-[12px] text-center mt-5">
          <h1 className="font-fredoka font-[600] gradient-text lg:text-[50px] text-[30px] ">
            Leaderboard
          </h1>
          <p className="font-nunito font-[400] lg:text-[28px] text-[#878B8A]">
            View player scores and rankings.
          </p>
        </div>
        <div className="flex flex-col w-full px-5 items-center overflow-y-scroll">
          {leaderboard &&
            leaderboard.map((player) => (
              <div
                key={player.username}
                className="mt-8 flex justify-between items-center bg-[#232935] rounded-[12px] w-full lg:w-[800px] lg:p-[40px] p-[20px]"
              >
                <div className=" flex text-[#9a9a9a] font-nunito font-[400] text-[19px] gap-[15px]">
                  <p>{player.rank}.</p>
                  <p>{player.username}</p>
                  {player.username == current_user ? (
                    <p className="font-[600]">(You)</p>
                  ) : null}
                </div>
                <div className="flex text-[#9a9a9a] font-fredoka font-[700] text-[19px]">
                  <p>Score: {player.score}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
