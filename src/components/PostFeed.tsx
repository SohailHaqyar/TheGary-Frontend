import React from "react";
import { Post as PostType } from "../generated/graphql";
import { Post } from "./Post";

interface Props {
  data: PostType[];
}
const PostFeed: React.FC<Props> = ({ data }) => {
  return (
    <ul className="space-y-2 min-h-screen mb-20 lg:mb-0">
      {data && data.map((item) => <Post item={item} key={item.id} />)}
    </ul>
  );
};

export default PostFeed;
