import Link from "next/link";

const OutlinedButton = ({ text, link }) => {
  if (link) {
    return (
      <Link href={link}>
        <button className="outline-btn font-nunito font-[700] px-[29px] py-[10px] cursor-pointer text-[#fefefe]">
          {text}
        </button>
      </Link>
    );
  } else {
    return (
      <button className="outline-btn font-nunito font-[700] px-[29px] py-[10px] cursor-pointer text-[#fefefe]">
        {text}
      </button>
    );
  }
};

export default OutlinedButton;
