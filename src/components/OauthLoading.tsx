import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const URL = `https://the-gary.herokuapp.com`;
export const OauthLoading = () => {
  let code = window.location.href.split("?")[1];
  const history = useHistory();
  const { setCurrentUser } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.post(
          `${URL}/users/github/oauth/${code}`
        );
        if (result.data.access_token) {
          localStorage.setItem("token", result.data.access_token);

          const user = await axios.get(`${URL}/users/me`, {
            headers: {
              Authorization: `Bearer ${result.data.access_token}`,
            },
          });

          setCurrentUser({ user: user.data, isAuth: true });
          history.push("/");
        }
      } catch (e) {
        alert(e.message);
      }
    })();
  }, [code, history, setCurrentUser]);
  return (
    <div className="w-screen h-screen grid place-items-center">
      <h2 className="text-4xl">Redirecting Please Wait ...</h2>
    </div>
  );
};
