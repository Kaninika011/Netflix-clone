import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="btn bg-slate-100 text-zinc-800 hover:text-slate-100 "
    >
      <BsFillPlayFill size={25} className="-mr-1" />
      Play
    </button>
  );
};
export default PlayButton;
