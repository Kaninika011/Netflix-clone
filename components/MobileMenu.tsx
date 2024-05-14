import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-neutral-800  w-76 top-8 left-0 py-5 flex-col border-2 border-gray-500 flex">
      <div className="flex flex-col gap-4">
        <div className=" px-3 text-center text-white hover:underline">Home</div>
        <div className=" px-3 text-center text-white hover:underline">
          Series
        </div>
        <div className=" px-3 text-center text-white hover:underline">
          Movies
        </div>
        <div className=" px-3 text-center text-white hover:underline">
          New & Popular{" "}
        </div>
        <div className=" px-3 text-center text-white hover:underline">
          My List{" "}
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
