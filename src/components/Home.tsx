import { usePosts } from "../context/PostsContext";
import { Container } from "./Container";
import { CreatePostForm } from "./CreatePostForm";
import PostFeed from "./PostFeed";
import { SkeletonPost } from "./Skeletons/SkeletonPost";

export const Home = () => {
  const { data, loading, refetch } = usePosts();

  console.log(data);
  return (
    <Container>
      <CreatePostForm refetch={refetch as any} />
      {loading ? (
        [1, 2, 3, 4, 5].map((e) => <SkeletonPost key={e} />)
      ) : (
        <PostFeed data={data} />
      )}
    </Container>
  );
};
