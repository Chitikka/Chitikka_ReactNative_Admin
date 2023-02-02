import axios from "axios";
import { LogBox } from "react-native";

const BACKEND_API = "http://192.168.1.7:3000/";

export async function createUser({ email, password, name, age, gender }) {
  const response = await axios
    .post(BACKEND_API + "users/register", {
      email,
      password,
      name,
      age,
      gender,
    })


  const token = response.data.token
  if(token)
    return token
  else
    throw new Error(response.data.message);
}

export async function loginUser({ email, password }) {
  const response = await axios
    .get(BACKEND_API + "users/login", {
      params: {
        email,
        password,
      },
    })
    
  const token = response.data.token
  return token

}
