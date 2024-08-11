"use client";
import { Layout } from "@/Components/gameroom";
import ConnectedUser from "@/Components/waitroom/connectedUser";
import { LuCopy } from "react-icons/lu";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ModeratorWaitroom = () => {
  const [loading, setLoading] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [users, setUsers] = useState([]);
  const [joinText, setJoinText] = useState("");
  const [username, setUsername] = useState("");
  const [room_Id, setRoomId] = useState("");
  const [moderatorToken, setModeratorToken] = useState("")
  const router = useRouter();

  useEffect(() => {
    if (typeof sessionStorage !== "undefined") {
      const room_id = sessionStorage.getItem("room_id");
      const moderator_token = sessionStorage.getItem("moderator_token");

      
      if (!moderator_token) {
        toast("You are not a moderator");
        router.push("/join-a-game");
        return;
      }
      
      setIsModerator(true);
      setRoomId(room_id)
      setModeratorToken(moderator_token)
      const socket = new WebSocket(
        `wss://trivai-backend.onrender.com/waitroom/${room_id}`
      );

      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data.current_user) {
          setJoinText(`You joined`);
          setUsername(data.current_user);
          if (window) {
            sessionStorage.setItem("username", data.current_user);
          }
        }

        if (data.action === "join_room") {
          setJoinText(`${data.username} Joined`);
          setUsers((prevUsers) => {
            if (!prevUsers.includes(data.username)) {
              return [...prevUsers, data.username];
            }
            return prevUsers;
          });
        }

        if (data.action === "exit_room") {
          setJoinText(`${data.username} Left`);
          setUsers((prevUsers) =>
            prevUsers.filter((username) => username !== data.username)
          );
        }

        if (data.users) {
          const connectedUsers = Object.entries(data.users)
            .filter(
              ([username, statusObject]) => statusObject.status === "connected"
            )
            .map(([username]) => username);
          setUsers(connectedUsers);
        }
      });
      return () => {
        socket.close();
      };
    }
  }, [router]);



  const startGame = async () => {
    setLoading(true);
    try {
      const request = await fetch(
        `https://trivai-backend.onrender.com/game/${room_Id}/start`,
        {
          method: "POST",
          body: JSON.stringify({ moderator_token: moderatorToken }),
          headers: {
            X_API_Token: process.env.NEXT_PUBLIC_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await request.json();
      if (request.status == 200) {
        setLoading(false);
        toast.success("Game started");
        setTimeout(() => router.push("/gameroom"), 1000);
      } else {
        setLoading(false);
        toast.error("An error occured");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Request incomplete");
      console.log("Error: ", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(room_Id);
    toast("Copied to clipboard!");
  };

  if (!isModerator) {
    return (
      <Layout>
        <div className="h-[90%] w-full flex items-center justify-center">
          <div className="loader"></div>
        </div>
      </Layout>
    );
  }

  if (isModerator) {
    return (
      <Layout>
        <div className="flex flex-col gap-[30px] mt-[50px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-center items-center gap-5">
              <p className="font-fredoka font-[600] gradient-text lg:text-[50px] text-[30px] text-center">
                Game Room Id: {room_Id}
              </p>
              <button
                onClick={() => {
                  copyToClipboard();
                }}
              >
                <LuCopy size={30} color="white" />
              </button>
            </div>
            {joinText && (
              <p className="text-[#878b8a] font-nunito font-[400] text-[28px] text-center">
                {joinText}
              </p>
            )}
          </div>
          <div className="px-10 flex flex-wrap overflow-auto max-w-full max-h-[45vh] gap-[50px] justify-center">
            {users && users.length > 0 ? (
              users.map((user) => (
                <ConnectedUser key={user} name={user} username={username} />
              ))
            ) : (
              <p className="text-[#878b8a] font-nunito font-[400] text-[28px] text-center">
                Waiting for players....
              </p>
            )}
          </div>

          <div className="">
            {users.length > 1 ? (
              <button
                onClick={() => startGame()}
                className="font-[700] disabled:opacity-40 mx-auto rounded-[10px] font-nunito text-[18px] text-[#fefefe] bg-custom p-[10px] lg:px-[46px] lg:py-[18px] w-[500px] flex items-center justify-center gap-2"
              >
                Start Game {loading && <div className="loader"></div>}
              </button>
            ) : (
              <button
                onClick={() => startGame()}
                disabled
                className="font-[700] disabled:opacity-40 mx-auto rounded-[10px] font-nunito text-[18px] text-[#fefefe] bg-custom p-[10px] lg:px-[46px] lg:py-[18px] w-[500px] flex items-center justify-center gap-2"
              >
                Start Game {loading && <div className="loader"></div>}
              </button>
            )}
          </div>
        </div>
      </Layout>
    );
  }
};

export default ModeratorWaitroom;
