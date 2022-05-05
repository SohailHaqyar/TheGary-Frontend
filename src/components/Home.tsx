import { useState } from "react"
import { useAllPostsQuery } from "../generated/graphql"
import { Container } from "./Container"
import { CreatePostForm } from "./CreatePostForm"
import PostFeed from "./PostFeed"
import { SkeletonPost } from "./Skeletons/SkeletonPost"

export const Home = () => {
  const { data, loading, refetch, error } = useAllPostsQuery()
  if (error) console.error(error)
  return (
    <Container>
      <CreatePostForm refetch={refetch} />
      {loading ? (
        [1, 2, 3, 4, 5].map((e) => <SkeletonPost key={e} />)
      ) : (
        <PostFeed data={data?.findAll as any} />
      )}
    </Container>
  )
}
