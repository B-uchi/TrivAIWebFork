import React from "react";
import Image from "next/image";

import img from "../../assets/Funny.png";
import FilledButton from "../Buttons/FIlledButton";

const AboutUs = () => {
  return (
    <div className="lg:h-[450px] mt-10 lg:mt-16 mb-[100px] w-[88%] container mx-auto text-white flex lg:flex-row flex-col items-start justify-center lg:gap-14 gap-8 font-nunito">
      <Image
        src={img}
        className="lg:w-[350px] w-[200px] object-cover bg-custom rounded-tl-[200px] rounded-md mx-auto"
      />
      <div className="flex h-[100%] flex-col items-start lg:justify-between lg:gap-0 gap-5 ">
        <h1 className="lg:self-start font-[800] text-2xl lg:text-[36px] ">
          <span className="gradient-text">About</span> Us
        </h1>
        <p className="font-[400] text-[18px] lg:text-[20px] lg:line-clamp-none line-clamp-5">
          At TrivAI, we believe that learning should be fun, engaging, and
          social. Our platform combines the thrill of trivia with the power of
          AI to create an exciting and immersive experience for players of all
          ages. Our mission is to bring people together through the joy of
          trivia, fostering a community where knowledge is celebrated and
          competition is friendly. We offer a wide range of trivia categories,
          from movies and sports to history and science, ensuring there's
          something for everyone. Our AI-powered questions keep gameplay fresh
          and challenging, while our competitive leaderboards and rewards system
          add extra motivation and fun. We are a passionate team of trivia
          enthusiasts, tech geeks, and creative thinkers dedicated to providing
          the best trivia experience possible. Whether you're here to test your
          knowledge, compete with friends, or simply enjoy some quality time,
          we're thrilled to have you with us. Dive into the world of Trivia
          Titans and become part of our growing community today! Ready to get
          started? Join the fun!
        </p>
        <div className="w-full">
          <FilledButton text={"Read More"} link={'/'}/>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
