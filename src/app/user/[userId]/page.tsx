"use client";
import React, { useEffect, useState } from "react";
import { PostType } from "@/utils/interface";
import { getIndividualPosts } from "@/utils/supabaseFunction";
import PostList from "@/features/PostList/PostList";
import UserHeader from "@/app/components/layouts/UserHeader";
import { notFound } from "next/navigation";

interface Props {
  params: { userId: string };
}

const Page = (props: Props) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const userId = Number(props.params.userId);
  useEffect(() => {
    const getPosts = async () => {
      const newPosts = await getIndividualPosts(userId);
      setPosts(newPosts!!.sort((a, b) => (a.id > b.id ? -1 : 1)));
    };
    getPosts();
  }, [userId]);

  // 見た目の処理
  const relenderPost = (newPosts: PostType[]) => {
    setPosts(newPosts.sort((a, b) => (a.id > b.id ? -1 : 1)));
  };

  return (
    <>
      <div className="max-w-[640px] mx-auto mt-[115px]">
        <UserHeader posts={posts} userId={userId} />
        <PostList posts={posts} relenderPost={relenderPost} />
      </div>
    </>
  );
};

export default Page;
