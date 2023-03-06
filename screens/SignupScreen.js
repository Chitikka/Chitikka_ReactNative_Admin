import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/authContext";
import { createUser } from "../util/auth";

function SignupScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  const signUpHandler = async (credentials) => {
    setAuthenticating(true);
    try {
      const token = await createUser(credentials);
      authCtx.authenticate(token);
    } catch (e) {
      console.log(e);
      Alert.alert(
        "Could not create new user. Please try again later",
        e.message && e.message
      );
      setAuthenticating(false);
    }
  };

  if (isAuthenticating) return <LoadingOverlay message="Creating user..." />;
  return <AuthContent onAuthenticate={signUpHandler} />;
}

export default SignupScreen;
