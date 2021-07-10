import React from "react";
import { Post, useAllPostsQuery } from "../generated/graphql";

interface IPostContext {
  data: Post[];
  refetch: (() => any) | null;
  loading: boolean;
}
const PostsContext = React.createContext<IPostContext>({
  data: [],
  refetch: null,
  loading: false,
});

export const PostsProvider: React.FC<{}> = ({ children }) => {
  const { data, error, refetch, loading } = useAllPostsQuery({});

  if (error) console.error(error);

  return (
    <PostsContext.Provider
      value={{ data: data?.findAll as Post[], refetch, loading }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => React.useContext(PostsContext);
