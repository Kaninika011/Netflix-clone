import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoritesButton";
import useInfoModalStore from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}
const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { movieId } = useInfoModalStore();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }
  return (
    <div
      className="z-50
    transition
    duration-300
    bg-black
    bg-opacity-80
    flex
    justify-center
    items-center
    overflow-x-hidden
    overflow-y-auto
    fixed 
    inset-0

    "
    >
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${isVisible ? "scale-100" : "scale-0"}
      transform
      duration-300
      relative 
      flex-auto
      bg-zinc-900
      drop-shadow-md

      `}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
            ></video>
            <div
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center"
              onClick={handleClose}
            >
              <AiOutlineClose className="text-white" />
            </div>

            <div className="absolute bottom-[10%] left-10">
              <motion.p
                initial={{ opacity: 0, x: -200 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, type: "tween" }}
                className="text-2xl text-white mb-3 font-mono font-semibold"
              >
                {data?.title}
              </motion.p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0.1 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1, type: "tween" }}
            className="px-12 py-8"
          >
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-lg">{data?.genre}</p>
            <p className="text-white text-lg">{data?.description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default InfoModal;
