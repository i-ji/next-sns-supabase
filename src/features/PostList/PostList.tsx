import React from "react";

import { PostType } from "@/utils/interface";
import PostItem from "../PostItem/PostItem";
import { editPost, deletePost } from "@/utils/supabaseFunction";

interface PostListType {
  posts: PostType[];
  relenderPost: (posts: PostType[]) => void;
}

const PostList = ({ posts, relenderPost }: PostListType) => {
  // フォローボタンの変更
  const changeFollow = async (_post: PostType) => {
    // ボタンの見た目の処理の変更
    const newPosts = [...posts];
    newPosts.forEach((post) => {
      if (post.user_id === _post.user_id) {
        post.isFollow = !post.isFollow;
      }
      return post;
    });
    relenderPost(newPosts);

    // ボタンの裏側の処理の変更
    const changePosts = posts.filter((post: PostType) => {
      return _post.user_id === post.user_id;
    });
    for (let i = 0; i < changePosts.length; i++) {
      await editPost(changePosts[i]);
    }
  };

  // 本文の見た目を修正する
  const editBody = (_post: PostType) => {
    const newPosts = [...posts];
    newPosts.forEach((post) => {
      if (post.user_id === 0) {
        return (post.body = _post.body);
      }
    });
    // console.log(newPosts);
    relenderPost(newPosts);
  };

  // 投稿を削除する処理
  const destroyPost = async (_post: PostType) => {
    const newPosts = posts.filter((post) => {
      return _post.id !== post.id;
    });

    const oldPost = posts.filter((post) => {
      return _post.id === post.id;
    });

    relenderPost(newPosts);
    await deletePost(oldPost[0]);
  };

  return (
    <div>
      {posts.length !== 0 ? (
        posts.map((post) => {
          return (
            <PostItem
              key={post.id}
              post={post}
              changeFollow={changeFollow}
              destroyPost={destroyPost}
              editBody={editBody}
            />
          );
        })
      ) : (
        <div className="text-2xl text-center pt-60">投稿はまだありません</div>
      )}
    </div>
  );
};

export default PostList;
