import React from "react";

const ConnectedUser = ({ name, username }) => {
  function getRandomHexColor() {
    const letters = "ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const lightValue = letters[Math.floor(Math.random() * letters.length)];
      color += lightValue + lightValue;
    }
    return color;
  }
  const color = getRandomHexColor();
  return (
    <div className="gradient-outline rounded-[12px] px-[30px] py-[30px] w-[242px] h-[267px] flex justify-center items-center">
      <div className="flex flex-col justify-evenly items-center">
        <div
          style={{ backgroundColor: color }}
          className="h-[147px] w-[142px] rounded-full flex justify-center items-center"
        >
          <h1 className="font-nunito font-[800] text-[40px] ">{name[0]}</h1>
        </div>
        <div className="font-[600] font-fredoka text-[20px] text-center">
          <p className="gradient-text">
            {name}
          </p>
          <p className="gradient-text">{username == name ? "(You)" : null}</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectedUser;
