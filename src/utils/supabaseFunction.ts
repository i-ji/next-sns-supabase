import { supabase } from "./supabase";
import { PostType } from "./interface";

// 全データの取得
export const getAllPosts = async () => {
  const posts = await supabase.from("user-posts").select("*");
  return posts.data;
};

// 個別データの取得
export const getIndividualPosts = async (user_id: number) => {
  const posts = await supabase
    .from("user-posts")
    .select("*")
    .eq("user_id", user_id);

  return posts.data;
};

// データの追加
export const addPost = async (body: string) => {
  const { data } = await supabase
    .from("user-posts")
    .insert([
      {
        user_id: 0,
        name: "J-Ito",
        body: body,
        isFollow: true,
      },
    ])
    .select();
  return data;
};

// データの変更
export const editPost = async (post: PostType) => {
  await supabase
    .from("user-posts")
    .update([{ isFollow: post.isFollow, body: post.body }])
    .eq("id", post.id)
    .select();
};

// データの削除
export const deletePost = async (post: PostType) => {
  await supabase.from("user-posts").delete().eq("id", post.id);
};
