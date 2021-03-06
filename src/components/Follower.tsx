import { useHistory } from "react-router-dom";
import { Avatar } from "./Avatar";

interface FollowerProps {
  imageUrl: string;
  id: string;
  username: string;
}

export const Follower: React.FC<FollowerProps> = ({
  imageUrl,
  username,
  id,
}) => {
  const { push } = useHistory();
  return (
    <li
      className="imageHoverEffect mr-1 rounded p-2 flex flex-col items-center col-span-6 md:col-span-4 lg:col-span-3"
      onClick={() => {
        push(`/user/${id}`);
      }}
    >
      <Avatar src={imageUrl} size="sm" rounded />
      <h2 className="mt-3 capitalize text-xs text-center">
        {username}
      </h2>
    </li>
  );
};
