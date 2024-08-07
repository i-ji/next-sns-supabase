"use client";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/utils/supabaseFunction";
import { PostType } from "@/utils/interface";
import PostList from "@/features/PostList/PostList";
import Header from "./components/layouts/Header";

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isRecommended, setIsRecommended] = useState(false);

  // 投稿を取得
  useEffect(() => {
    const getPost = async () => {
      const posts = (await getAllPosts()) as PostType[];
      setPosts(posts!.sort((a, b) => (a.id > b.id ? -1 : 1)));
    };
    getPost();
  }, [isRecommended]);

  // 見た目の処理を変更　（おすすめ）
  const relenderPost = (newPosts: PostType[]) => {
    setPosts(newPosts.sort((a, b) => (a.id > b.id ? -1 : 1)));
  };

  // おすすめとフォロー中を変更
  const swtichRecommended = (bool: boolean) => {
    setIsRecommended(bool);
  };

  // フォローしているユーザー
  const [recommendedPosts, setRecommendedPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const extractRecommendedPosts = () => {
      const newPosts = posts.filter((post) => {
        return post.isFollow;
      });
      setRecommendedPosts(newPosts.sort((a, b) => (a.id > b.id ? -1 : 1)));
    };
    extractRecommendedPosts();
  }, [posts]);

  // 見た目の処理を変更　（フォロー中）
  // const relenderFollowPost = (newPosts: PostType[]) => {
  //   setRecommendedPosts(newPosts.sort((a, b) => (a.id > b.id ? -1 : 1)));
  // };

  // console.log(posts);

  return (
    <>
      <Header
        posts={posts}
        relenderPost={relenderPost}
        swtichRecommended={swtichRecommended}
        isRecommended={isRecommended}
      />
      <div className="max-w-[640px] mx-auto mt-[115px]">
        {isRecommended ? (
          <PostList posts={recommendedPosts} relenderPost={relenderPost} />
        ) : (
          <PostList posts={posts} relenderPost={relenderPost} />
        )}
      </div>
    </>
  );
}
