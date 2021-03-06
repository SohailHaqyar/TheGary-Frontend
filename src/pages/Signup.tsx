import axios from "axios";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router";
import { Redirect } from "react-router-dom";
import { createJsxJsxClosingFragment } from "typescript";
import { useAuth } from "../context/AuthContext";
import {
  useContinueWithGoogleMutation,
  useGuestLoginMutation,
} from "../generated/graphql";
import GithubLogo from "../github-logo.png";
import GoogleLogo from "../google-logo.png";
const URL = `https://the-gary.herokuapp.com`;

export const Signup = () => {
  const [login] = useContinueWithGoogleMutation();
  const [loginAsGuest] = useGuestLoginMutation();
  const history = useHistory();
  const { currentUser, setCurrentUser } = useAuth();
  const guestLogin = async () => {
    try {
      const result = await loginAsGuest();
      if (result.data?.continueAsGuest.access_token) {
        console.log(result);
        localStorage.setItem(
          "token",
          result.data?.continueAsGuest.access_token!
        );

        const user = await axios.get(`${URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${result.data?.continueAsGuest
              .access_token!}`,
          },
        });

        setCurrentUser({ user: user.data, isAuth: true });

        history.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSuccess = async (response: any) => {
    try {
      const result = await login({
        variables: {
          googleIdToken: response.tokenId,
        },
      });
      if (result.data?.continueWithGoogle.access_token) {
        localStorage.setItem(
          "token",
          result.data?.continueWithGoogle.access_token!
        );

        const user = await axios.get(`${URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${result.data?.continueWithGoogle
              .access_token!}`,
          },
        });

        setCurrentUser({ user: user.data, isAuth: true });

        history.push("/");
      }
    } catch (e) {
      alert(e.message);
    }
  };
  const handleFailure = (response: any) => {
    alert(response.error);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <GoogleLogin
        clientId="63096940458-fvomofr8jbr1uiphkcdv0gcqpgib5421.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="bg-white mb-4 p-4 flex items-center text-lg rounded-2xl transform transition-transform ease-in-out hover:scale-110 hover:shadow-lg uppercase"
          >
            <img
              alt="google icon"
              src={GoogleLogo}
              className="w-16 h-16 mr-2"
            />
            Continue with Google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />

      <button
        className="bg-white p-4 flex items-center text-lg rounded-2xl transform transition-transform ease-in-out hover:scale-110 hover:shadow-lg uppercase"
        onClick={() => {
          window.location.href =
            "https://github.com/login/oauth/authorize?client_id=26cc14764a4d1f570bda";
        }}
      >
        <img src={GithubLogo} alt="" className="w-16 h-16 mr-2" />
        Continue with Github
      </button>

      <button
        className="bg-white mt-4 p-4 flex items-center text-lg rounded-2xl transform transition-transform ease-in-out hover:scale-110 hover:shadow-lg uppercase"
        onClick={guestLogin}
      >
        Continue as Guest
      </button>
    </div>
  );
};
