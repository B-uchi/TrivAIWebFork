"use client";

import { Layout } from "@/Components/gameroom";
import Image from "next/image";
import questionIcon from "../../assets/question_icon.png";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import send_icon from "../../assets/send_icon.svg";
import { toast } from "sonner";
import useCountdown from "@/Components/gameroom/useCountDown";

const GameRoom = () => {
  const sendBtnRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [answer, setAnswer] = useState("");
  const [chat, setChat] = useState([]);
  const [moderator_Token, setModeratorToken] = useState("");
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);
  const router = useRouter();

  const onCountdownEnd = () => {
    setIsSubmitDisabled(true);
    endGame();
  };
  const endGame = () => {
    if (moderator_Token) {
      if (socketRef.current) {
        socketRef.current.send(
          JSON.stringify({
            action: "end_game",
          })
        );
      }
      return;
    }
  };

  let { time, startCountdown } = useCountdown(0, onCountdownEnd);
  useEffect(() => {
    if (typeof sessionStorage !== undefined) {
      const username = sessionStorage.getItem("username");
      const moderator_token = sessionStorage.getItem("moderator_token");
      const room_id = sessionStorage.getItem("room_id");

      if (!username) {
        toast("Username unavailable");
        console.log("username unavailable");
        return router.push("/join-a-game");
      }


      setModeratorToken(sessionStorage.getItem("moderator_token"));
      const socket = new WebSocket(
        `wss://trivai-backend.onrender.com/gameroom/${room_id}/${username}${
          moderator_token ? "?moderator_token=" + String(moderator_token) : ""
        }`
      );

      socketRef.current = socket;
      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);

        if (data.message == "Game over") {
          sessionStorage.setItem(
            "leaderboard",
            JSON.stringify(data.leaderboard)
          );
          router.push("/gameroom/leaderboard");
        }
        if (Array.isArray(data)) {
          setQuestions(data);
        } else {
          setChat((prevChat) => [...prevChat, data.message]);
        }
      });

      return () => {
        socket.close();
      };
    }
  }, [router]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    if (questions.length > 0) {
      startCountdown(questions.length * 2 * 60);
    }
  }, [questions]);

  const goToNext = () => {
    setAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    setAnswer("");

    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitAnswer = () => {
    if (answer && !isSubmitDisabled) {
      if (socketRef.current) {
        socketRef.current.send(
          JSON.stringify({
            action: "ans_question",
            question_id: currentIndex + 1,
            answer: answer,
          })
        );
        setAnswer("");
      }
    } else {
      toast.error(isSubmitDisabled ? "Time's up!" : "An answer is required");
    }
  };

  return (
    <Layout>
      <div className="h-full flex flex-col">
        <div className="h-1/2">
          <div className="mt-[20px] flex justify-between items-center px-[20px] lg:px-[40px]">
            {moderator_Token && (
              <button
                onClick={() => endGame()}
                className="bg-red-600 font-fredoka font-[600] text-white rounded-[12px] px-2 py-3 mr-[10px]"
              >
                End Game
              </button>
            )}

            <div className="font-nunito font-[700] mx-auto text-[20px] text-[#9a9a9a]">
              {questions.length > 0 ? (
                <p>
                  Time Left: <span className="gradient-text">{time}</span>
                </p>
              ) : (
                <div className="loader"></div>
              )}
            </div>
          </div>

          <div className="flex justify-center h-[40vh] mt-[20px]">
            <div className="flex flex-col items-center gap-[12px]">
              <div className="gradient-bg rounded-[10px]">
                <Image src={questionIcon} className="w-[40px] h-[40px]" />
              </div>

              <div className="mx-auto px-[24px] py-[10px] rounded-[12px] w-[555px] max-h-[200px] overflow-y-auto bg-[#232935]">
                {questions.length > 0 ? (
                  <div className="mb-4 flex flex-col gap-[10px] items-center w-full">
                    <h2 className="text-[20px] text-center font-[600] text-[#9068c1] font-fredoka w-[555px]">
                      Question {currentIndex + 1}
                    </h2>

                    <p className="font-nunito font-[400] text-[#fefefe] text-[20px]">
                      {questions[currentIndex].question}
                    </p>

                    <div className="flex justify-center gap-[40px] w-full mt-5">
                      <button
                        onClick={goToPrevious}
                        disabled={currentIndex === 0}
                        className={`px-4 py-2 rounded ${
                          currentIndex === 0
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        <RxCaretLeft />
                      </button>

                      <button
                        onClick={goToNext}
                        disabled={currentIndex === questions.length - 1}
                        className={`px-4 py-2 rounded ${
                          currentIndex === questions.length - 1
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        <RxCaretRight />
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="h-1/2 mt-5 flex flex-col justify-between">
          <div className="h-[32vh] flex justify-center">
            <div
              ref={chatContainerRef}
              className="w-[60%] h-full flex flex-col items-end py-5 gap-[15px] overflow-y-auto"
            >
              {chat &&
                chat.map((message, index) => (
                  <div className="flex items-center gap-2" key={index}>
                    <Image src={questionIcon} className="w-[40px] h-[40px]" />

                    <div className="text-[#9a9a9a] font-fredoka text-[18px] bg-[#232935] p-4 rounded-[12px]">
                      {message}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center items-center">
            <div className="gradient-outline w-[60%] px-2 py-3 flex justify-between items-center">
              <input
                type="text"
                className="w-[90%] bg-transparent font-fredoka text-[#9a9a9a]"
                placeholder="Enter your answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <button onClick={submitAnswer} ref={sendBtnRef}>
                <Image src={send_icon} className="w-[30px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GameRoom;
