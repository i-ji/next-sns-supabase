"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PostType } from "@/utils/interface";
import { editPost } from "@/utils/supabaseFunction";
import Link from "next/link";
import { CiSaveDown2, CiUser } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";

interface PostItem {
  post: PostType;
  changeFollow: (post: PostType) => void;
  destroyPost: (post: PostType) => void;
  editBody: (post: PostType) => void;
}

const PostItem = ({ post, changeFollow, destroyPost, editBody }: PostItem) => {
  // フォローの切り替え
  const toggleFollow = async (post: PostType) => {
    changeFollow(post);
  };

  const [isEdit, setIsEdit] = useState(false);
  const [editingBody, setEditingBody] = useState(post.body);

  // 本文を修正する
  const savePost = async (post: PostType) => {
    if (editingBody === "") return;

    const newPost = {
      id: post.id,
      user_id: post.user_id,
      name: post.name,
      body: editingBody,
      isFollow: post.isFollow,
    };

    await editPost(newPost);
    editBody(newPost);
    setIsEdit(false);
  };

  // 編集$削除ボタン
  const editAndDelete = (
    <div className="w-1/3 ml-auto rounded-lg text-xl sm:text-2xl flex justify-end">
      {isEdit ? (
        <CiSaveDown2
          className="mr-5 cursor-pointer"
          onClick={() => savePost(post)}
        />
      ) : (
        <FiEdit
          className="mr-5 cursor-pointer"
          onClick={() => setIsEdit(true)}
        />
      )}

      <MdDeleteOutline
        className="cursor-pointer"
        onClick={() => destroyPost(post)}
      />
    </div>
  );

  // フォローボタンの実装
  const FollowButton = post.isFollow ? (
    <Button
      className="min-w-[100px] w-1/3 ml-auto rounded-lg text-xs sm:text-sm"
      onClick={() => toggleFollow(post)}
    >
      フォロー中
    </Button>
  ) : (
    <Button
      variant="outline"
      className="min-w-[100px] w-1/3 ml-auto rounded-lg text-xs sm:text-sm"
      onClick={() => toggleFollow(post)}
    >
      フォローする
    </Button>
  );

  return (
    <Card className="mb-4 mx-1 sm:mx-0">
      <CardHeader className="flex">
        <div className="flex items-center">
          {post.user_id === 0 ? (
            <FaUser className="text-2xl sm:text-3xl" />
          ) : (
            <CiUser className="text-2xl sm:text-3xl" />
          )}

          <CardTitle className="ml-3 cursor-pointer hover:underline">
            <Link href={`/user/${post.user_id}`}>{post.name}</Link>
          </CardTitle>
          {post.user_id === 0 ? editAndDelete : FollowButton}
        </div>
      </CardHeader>
      <CardContent>
        {isEdit ? (
          <Textarea
            onChange={(e) => setEditingBody(e.target.value)}
            value={editingBody}
          />
        ) : (
          <p className=" whitespace-pre-wrap text-sm sm:text-base">
            {post.body}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PostItem;
