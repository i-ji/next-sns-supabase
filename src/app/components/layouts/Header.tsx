"use client";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addPost } from "@/utils/supabaseFunction";
import { PostType } from "@/utils/interface";
import Link from "next/link";

interface HeaderType {
  posts: PostType[];
  relenderPost: (posts: PostType[]) => void;
  swtichRecommended: (bool: boolean) => void;
  isRecommended: boolean;
}

const Header = ({
  relenderPost,
  posts,
  swtichRecommended,
  isRecommended,
}: HeaderType) => {
  const toggleRecommended = (bool: boolean) => {
    swtichRecommended(bool);
  };

  // 一番上までスクロールする処理
  const moveTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  // 投稿する処理
  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text === "") return;

    const newPost = await addPost(text);

    const newPosts = [...posts, newPost![0]];

    relenderPost(newPosts);

    setText("");
    setOpen(false);
  };

  return (
    <header className="max-w-[640px] mx-auto pt-3 border-b border-gray-100 shadow-sm bg-white fixed w-full top-0 sm:left-[calc(50%_-_320px)]">
      <div className="px-4 sm:px-6 text-2xl sm:text-3xl flex items-center justify-between">
        <Link href="/user/0" scroll={false}>
          <FaUser className="cursor-pointer" />{" "}
        </Link>
        <FaTwitter onClick={moveTop} className="cursor-pointer" />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <FaPen className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
            <form onSubmit={(e) => submitPost(e)} className="text-right">
              <Textarea
                placeholder="What is happening?!"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <Button className="mt-3 text-right">Post</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full flex justify-between items-center pt-3 sm:text-lg cursor-pointer">
        <div
          className={`w-1/2 text-center py-2 hover:bg-gray-100 ${
            !isRecommended ? "bg-gray-100" : ""
          }`}
          onClick={() => toggleRecommended(false)}
        >
          おすすめ
        </div>
        <div
          className={`w-1/2 text-center py-2 hover:bg-gray-100 ${
            isRecommended ? "bg-gray-100" : ""
          }`}
          onClick={() => toggleRecommended(true)}
        >
          フォロー中
        </div>
      </div>
    </header>
  );
};

export default Header;
