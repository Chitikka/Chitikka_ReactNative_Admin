
import { LogBox } from "react-native";
import { axiosInstance } from "./axios";



export async function createUser({ email, password, name, age, gender }) {
  const response = await axiosInstance
    .post("users/register", {
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
  const response = await axiosInstance
    .get("users/login", {
      params: {
        email,
        password,
      },
    })
    
  const token = response.data.token
  return token

}
