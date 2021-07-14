import React from "react";
import { useAllUsersQuery } from "../generated/graphql";
import { Container } from "./Container";
import { UserCard } from "./UserCard";

export const UsersPage = () => {
  const { data, error } = useAllUsersQuery();
  if (error) return <div>Loading...</div>;
  return (
    <Container>
      <ul className="space-y-1 min-h-screen mb-20 lg:mb-0">
        {data?.users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </Container>
  );
};
