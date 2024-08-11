"use client";
import { Layout } from "@/Components/gameroom";
import ConnectedUser from "@/Components/waitroom/connectedUser";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Waitroom = () => {
  const [isValidId, setIsValidId] = useState(false);
  const [verifyingId, setVerifyingId] = useState(true);
  const [users, setUsers] = useState([]);
  const [moderator_token, setModeratorToken] = useState("");
  const [joinText, setJoinText] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const { gameId } = useParams();

  useEffect(() => {
    if (typeof sessionStorage !== undefined) {
      setModeratorToken(sessionStorage.getItem("moderator_token"));
    }
    if (moderator_token) {
      toast("You are a moderator");
      router.push("/moderator-waitroom");
    } else {
      const socket = new WebSocket(
        `wss://trivai-backend.onrender.com/waitroom/${gameId}`
      );

      socket.addEventListener("close", (event) => {
        if (event.reason == "Room not found") {
          toast.error("Invalid game id");
          setTimeout(() => router.push("/join-a-game"), 2000);
          setIsValidId(false);
          console.log("Invalid game id");
        }
      });

      socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        setVerifyingId(false);
        setIsValidId(true);

        if (data.action == "start_game") {
          if (window) {
            sessionStorage.setItem("room_id", gameId);
          }
          toast.success("Game started");
          setTimeout(() => router.push("/gameroom"), 1000);
        }

        if (data.current_user) {
          toast.success("Game joined successfully");
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

  if (verifyingId) {
    return (
      <Layout>
        <div className="h-[90%] w-full flex items-center justify-center">
          <div className="loader"></div>
        </div>
      </Layout>
    );
  }

  if (isValidId) {
    return (
      <Layout>
        <div className="flex flex-col gap-[30px] mt-[50px]">
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-center items-center gap-5">
              <p className="font-fredoka font-[600] gradient-text lg:text-[50px] text-[30px] text-center">
                Player Waitroom
              </p>
            </div>
            {joinText && (
              <p className="text-[#878b8a] font-nunito font-[400] text-[28px] text-center">
                {joinText}
              </p>
            )}
          </div>
          <div className="px-10 flex flex-wrap overflow-auto max-w-full max-h-[50vh] gap-[50px] justify-center">
            {users && users.length > 0 ? (
              users.map((user) => (
                <ConnectedUser key={user} name={user} username={username} />
              ))
            ) : (
              <p>No users connected</p>
            )}
          </div>
        </div>
      </Layout>
    );
  }
};

export default Waitroom;
