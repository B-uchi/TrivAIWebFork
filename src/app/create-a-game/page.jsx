"use client";
import { Layout } from "@/Components/gameroom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  IoCaretBackCircleOutline,
  IoCaretForwardCircleOutline,
} from "react-icons/io5";
import { toast } from "sonner";

const CreateGame = () => {
  const [noOfQuestions, setNoOfQuestions] = useState(1);
  const [category, setCategory] = useState("selectCategory");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const createGame = async () => {
    setLoading(true);
    if (category == "selectCategory") {
      setLoading(false);
      return "Please select a valid category.";
    } else {
      try {
        const request = await fetch(
          "https://trivai-backend.onrender.com/gameroom/create",
          {
            method: "POST",
            body: JSON.stringify({
              category: category,
              no_of_questions: noOfQuestions,
            }),
            headers: {
              X_API_Token: process.env.NEXT_PUBLIC_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        if (request.status == 201) {
          setLoading(false);
          const data = await request.json();
          toast.success("Game created successfully");
          sessionStorage.clear()
          sessionStorage.setItem("room_id", data.room_id);
          sessionStorage.setItem("moderator_token", data.moderator_token);
          router.push('/moderator-waitroom')
        } else {
          setLoading(false);
          return toast.error("An error occured.");
        }
      } catch (error) {
        setLoading(false);
        return toast.error("Request incomplete.");
      }
    }
  };

  return (
    <Layout>
      <div className=" flex flex-col items-center">
        <div className="gap-[12px] text-center mt-5">
          <h1 className="font-fredoka font-[600] gradient-text lg:text-[50px] text-[30px] ">
            Create New Game
          </h1>
          <p className="font-nunito font-[400] lg:text-[28px] text-[#878B8A]">
            Customize your trivia game and invite players to join.
          </p>
        </div>
        <div className="mt-8 gradient-outline lg:w-[800px] w-[90%] lg:p-[40px] p-[20px]">
          <h2 className="font-fredoka font-[500] text-[20px] lg:text-[25px] gradient-text text-center">
            Game Details
          </h2>
          <div className="mt-10 flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[8px]">
              <p className="lg:text-[18px] font-poppins font-[500] text-[#fefefe]">
                Category
              </p>

              <select
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
                className="gradient-outline bg-transparent p-[5px] lg:p-[20px] w-full font-poppins font-[400] text-[#9A9A9A]"
              >
                <option value="selectCategory" disabled>
                  Select Category
                </option>
                <option value="Movies">Movies</option>
                <option value="Sport">Sport</option>
                <option value="History">History</option>
                <option value="Science">Science</option>
              </select>
            </div>
            <div className="flex lg:flex-row flex-col lg:gap-0 gap-[32px] justify-between">
              <div className="flex flex-col gap-[8px]">
                <p className="lg:text-[18px] font-poppins font-[500] text-[#fefefe]">
                  Number of Questions
                </p>
                <div className="w-full lg:h-[50px] h-[40px] gradient-outline flex">
                  <button
                    onClick={() =>
                      setNoOfQuestions(
                        noOfQuestions == 1 ? 1 : noOfQuestions - 1
                      )
                    }
                    className="h-full w-[25%] flex justify-center items-center gradient-right"
                  >
                    <IoCaretBackCircleOutline color="#fefefe" size={20} />
                  </button>
                  <div className="flex-grow text-center font-poppins gradient-text h-full flex justify-center items-center">
                    <p>{noOfQuestions}</p>
                  </div>
                  <button
                    onClick={() => setNoOfQuestions(noOfQuestions + 1)}
                    className="h-full w-[25%] flex justify-center items-center gradient-left"
                  >
                    <IoCaretForwardCircleOutline color="#fefefe" size={20} />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => createGame()}
              className="font-[700] rounded-[10px] font-nunito text-[18px] text-[#fefefe] bg-custom p-[10px] lg:p-[20px] flex items-center justify-center gap-2"
            >
              Create Game {loading && <div className="loader"></div>}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateGame;
