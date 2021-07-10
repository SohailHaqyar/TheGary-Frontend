import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  useFollowersQuery,
  useFollowingsQuery,
  useFollowUserMutation,
  useGetUserQuery,
} from "../generated/graphql";
import { Avatar } from "./Avatar";
import { MainButton } from "./Buttons/MainButton";
import { Container } from "./Container";
import { Tabs } from "./Tabs";

export const UserDetails = () => {
  const params: any = useParams();
  const { data } = useGetUserQuery({
    variables: { userId: params.id },
  });
  const [followUser, { error }] = useFollowUserMutation();
  const [isFollowing, setIsFollowing] = useState(false);

  const {
    data: followers,
    refetch,
    loading: followersLoading,
  } = useFollowersQuery({
    variables: { id: params.id },
  });

  const { data: followings } = useFollowingsQuery({
    variables: { id: params.id },
  });
  const {
    currentUser: { user },
  } = useAuth();

  let isProfilePage = params.id === user?.id;

  useEffect(() => {
    if (!followersLoading) {
      for (const f of followers?.getUserFollowers!) {
        if (f.id === user?.id) {
          console.log("THIS IS HAPPENING");
          setIsFollowing(true);
        }
      }
    }
  }, [followers, user?.id, followersLoading]);
  const follow = async () => {
    const result = await followUser({
      variables: {
        id: params.id,
      },
    });
    if (!error) {
      setIsFollowing(!!result.data?.followUser.followResults);
      refetch();
    }
  };
  return (
    <Container>
      <div className="w-full min-h-screen">
        <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 dark:bg-dracula-700">
          <Avatar src={data?.user.imageUrl!} rounded size="xl" />
          <h2 className="mt-2 text-lg capitalize dark:text-white">
            {data?.user.username}
          </h2>
          <h3 className="text-base text-gray-600 dark:text-gray-200">
            {data?.user.email}
          </h3>
          <h4 className="text-lightGreen-600 dark:text-white">
            {followers?.getUserFollowers.length} Followers
          </h4>

          <h4 className="text-lightGreen-600 dark:text-white">
            {data?.user?.posts.length +
              `${
                data?.user?.posts.length === 1 ? " Post" : " Posts"
              }`}
          </h4>

          {!isProfilePage && (
            <MainButton onClick={follow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </MainButton>
          )}
        </div>
        <Tabs
          followers={followers?.getUserFollowers}
          followings={followings?.getUserFollowings}
          user={data?.user}
          posts={data?.user.posts}
        />
      </div>
    </Container>
  );
};
