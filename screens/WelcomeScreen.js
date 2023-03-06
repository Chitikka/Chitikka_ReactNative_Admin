
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/ui/Button";
import { AuthContext } from "../store/authContext";
import { axiosInstance } from "../util/axios";

function WelcomeScreen() {
  const [msg, setMsg] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get("users/test");
        // console.log("RESPONSE", response);
        setMsg(response.data.message)

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully! {}</Text>
      <Text>Welcome {msg}!</Text>
      <Button onPress={()=>navigation.navigate("Products")}>View your products</Button>
      <Button onPress={()=>navigation.navigate("AddProduct")}>Add product</Button>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
