import React from "react";
import Header from "./components/layouts/Header";
import { FaPen, FaTwitter, FaUser } from "react-icons/fa6";

const loading = () => {
  return (
    <div>
      <header className="max-w-[640px] mx-auto pt-3 border-b border-gray-100 shadow-sm bg-white sm:fixed sm:w-full sm:top-0 sm:left-[calc(50%_-_320px)]">
        <div className=" px-6 text-3xl flex items-center justify-between">
          <FaUser /> <FaTwitter />
          <FaPen />
        </div>

        <div className="w-full flex justify-between items-center pt-3 text-lg cursor-pointer">
          <div className={`w-1/2 text-center py-2 hover:bg-gray-100 `}>
            おすすめ
          </div>
          <div className={`w-1/2 text-center py-2 hover:bg-gray-100 `}>
            フォロー中
          </div>
        </div>
      </header>
      <div className="text-2xl text-center pt-60">読み込み中です。</div>
    </div>
  );
};

export default loading;
