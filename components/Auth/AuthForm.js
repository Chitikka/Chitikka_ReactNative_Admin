import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import Button from "../ui/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [enteredGender, setEnteredGender] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "age":
        setEnteredAge(enteredValue);
        break;
      case "name":
        setEnteredName(enteredValue);
        break;
      case "gender":
        setEnteredGender(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      age: enteredAge,
      name: enteredName,
      gender: enteredGender,
    });
  }

  return (
    <ScrollView style={styles.form}>
      <Input
        label="Email Address"
        onUpdateValue={updateInputValueHandler.bind(this, "email")}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />
      {!isLogin && (
        <>
          <Input
            label="Name"
            onUpdateValue={updateInputValueHandler.bind(this, "name")}
            value={enteredName}
            keyboardType="default"
          />
          <Input
            label="Age"
            onUpdateValue={updateInputValueHandler.bind(this, "age")}
            value={enteredAge}
            keyboardType="number-pad"
          />
          <Input
            label="Gender"
            onUpdateValue={updateInputValueHandler.bind(this, "gender")}
            value={enteredGender}
            keyboardType="text"
          />
        </>
      )}
      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, "password")}
        secure
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
      )}
      <View style={styles.buttons}>
        <Button onPress={submitHandler}>
          {isLogin ? "Log In" : "Sign Up"}
        </Button>
      </View>
    </ScrollView>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
  },
});
