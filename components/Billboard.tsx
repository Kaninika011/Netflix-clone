import useBillboard from "../hooks/useBillboard";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import React, { useCallback } from "react";
import PlayButton from "./PlayButton";
import useInfoModalStore from "@/hooks/useInfoModal";

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModalStore();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="
        w-full
        h-[56.25vw]
        object-cover
        brightness-[50%]
        "
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.9, type: "bounce" }}
          className="
          animate__animated animate__bounce
                text-white 
                text -1xl
                 md:text-5xl 
                 h-full w-[50%] 
                 lg:text-6xl 
                 font-bold drop-shadow-xl "
        >
          {data?.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, type: "tween" }}
          className="
                    animate__slideOutLeft
                    text-white
                    text-[8px]
                    md:text-lg
                    mt-3
                    md:mt-8
                    w-[90%]
                    md:w-[80%]
                    lg:w-[50%]
                    drop-shadow-xl"
        >
          {data?.description}
        </motion.p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />

          <button
            onClick={handleOpenModal}
            className="
                        bg-white
                        text-white
                        bg-opacity-30
                        rounded-md
                        py-1 md:py-2
                        px-2 md:px-4
                        w-auto
                        text-xs lg:text-lg
                        font-semibold
                        flex
                        flex-row
                        items-center
                        hover:bg-opacity-20
                        transition
                        "
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
