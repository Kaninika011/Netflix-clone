import React from "react";
import { useRouter } from "next/router";
import useMovie from "@/hooks/useMovie";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieid } = router.query;
  const { data } = useMovie(movieid as string);

  return (
    <div className=" text-white h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer "
          size={25}
        />
        <p className="text-white">
          <span>Watching:</span>
          <span className="text-white">{data?.title}</span>
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};
export default Watch;
