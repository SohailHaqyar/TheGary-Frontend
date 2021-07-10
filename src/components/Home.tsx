import { usePosts } from "../context/PostsContext";
import { useAllPostsQuery } from "../generated/graphql";
import { Container } from "./Container";
import { checkPostDate, CreatePostForm } from "./CreatePostForm";
import PostFeed from "./PostFeed";
import { SkeletonPost } from "./Skeletons/SkeletonPost";

export const Home = () => {
  const { data, loading, refetch } = usePosts();

  console.log(data);
  return (
    <Container>
      {!checkPostDate() && (
        <CreatePostForm refetch={refetch as any} />
      )}{" "}
      {loading ? (
        [1, 2, 3, 4, 5].map((e) => <SkeletonPost key={e} />)
      ) : (
        <PostFeed data={data} />
      )}
    </Container>
  );
};
