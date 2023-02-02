import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/authContext';
import { loginUser } from '../util/auth';

function LoginScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false)

  const authCtx =  useContext(AuthContext)

  const logInHandler = async(credentials) => {
    setAuthenticating(true)
    try{
      const token =  await loginUser(credentials)
      authCtx.authenticate(token)
    }catch(e){
      Alert.alert('Could not log you in. Please Check your credentials')
      setAuthenticating(false)
    }
  }

  if (isAuthenticating)
  return <LoadingOverlay message='Logging in...'/>
  return <AuthContent isLogin onAuthenticate ={logInHandler}/>;
}

export default LoginScreen;
