import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import useCurrentUser from "./../hooks/useCurrentUser";
import { useState } from "react";
import { motion } from "framer-motion";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

const Profiles = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push("/");
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          {" "}
          Who's Watching ?{" "}
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={handleRedirect}>
            <div className="group flex-row w-44 mx-auto">
              <motion.div
                whileHover={{ scale: 0.8 }}
                className=" w-44 h-44 rounded-md flex items-center border-2 border-transparent group-hover: cursor-pointer group-hover:border-white overflow-hidden "
              >
                <img src="/images/default-green.png" alt="" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, type: "tween" }}
                className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white"
              >
                {user?.name}
              </motion.div>

              {isLoading && (
                <div className="mt-2 flex justify-center">
                  <span className="loading loading-dots loading-lg bg-red-700"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
