"use client";

import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { PostType } from "@/utils/interface";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface UserHeaderType {
  posts: PostType[];
  userId: number;
}

const UserHeader = ({ posts, userId }: UserHeaderType) => {
  // ユーザー名を取得
  const [name, setName] = useState("");
  useEffect(() => {
    if (posts.length > 0 && posts[0].name) {
      setName(posts[0].name);
    }

    if (userId === 0) {
      setName("J-ito");
    }
  }, [posts, userId]);

  // 前のユーザーのuser_idを取得
  const [prevUser, setPrevUser] = useState<number | null>(null);
  useEffect(() => {
    setPrevUser(userId - 1);
  }, [userId]);

  // 次のユーザーのuser_idを取得
  const [nextUser, setNextUser] = useState<number | null>(null);
  useEffect(() => {
    setNextUser(userId + 1);
  }, [userId]);

  return (
    <header className="max-w-[640px] mx-auto pt-3 border-b border-gray-100 shadow-sm bg-white fixed w-full top-0 sm:left-[calc(50%_-_320px)]">
      <div className="px-4 sm:px-6 text-2xl sm:text-3xl flex items-center h-[30px]">
        <Link href={"/"} scroll={false}>
          <FaArrowLeft />
        </Link>
        <h1 className="mx-auto font-bold">{name}</h1>
      </div>
      <div className="w-full flex justify-between items-center pt-3 sm:text-lg">
        {userId === 0 ? (
          <div className={`w-1/2 text-center py-2 `}></div>
        ) : (
          <div
            className={`w-1/2 text-center py-2 cursor-pointer hover:bg-gray-100`}
          >
            <Link
              href={`/user/${prevUser}`}
              className="flex items-center justify-center"
              scroll={false}
            >
              <MdKeyboardDoubleArrowLeft className="text-xl sm:text-2xl mr-5" />
              前のユーザー
            </Link>
          </div>
        )}

        <div className={`w-1/2 text-center py-2 hover:bg-gray-100 `}>
          <Link
            href={`/user/${nextUser}`}
            className="flex items-center justify-center"
            scroll={false}
          >
            次のユーザー
            <MdKeyboardDoubleArrowRight className="text-2xl ml-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
