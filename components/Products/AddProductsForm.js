import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Input from "../Auth/Input";
import { Colors } from "../../constants/styles";
import Button from "../ui/Button";
import ImagePicker from "./ImagePicker";



function AddProductsForm({ credentialsInvalid, onSubmit }) {
  const [productName, setProductName] = useState("");
  const [productQuantity, setQuantity] = useState("")
  const [productPrice, setPrice] = useState("")
  const [productSupplier, setSupplier] = useState("")
  const [productCategory, setCategory] = useState("")
  const [productImage, setProductImage] = useState("")


  // const {
  //   email: emailIsInvalid,
  //   confirmEmail: emailsDontMatch,
  //   password: passwordIsInvalid,
  //   confirmPassword: passwordsDontMatch,
  // } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "name":
        setProductName(enteredValue);
        break;
      case "quantity":
        setQuantity(enteredValue);
        break;
      case "price":
        setPrice(enteredValue);
        break;
      case "supplier":
        setSupplier(enteredValue);
        break;
      case "category":
        setCategory(enteredValue);
        break;
      case "image":
        setProductImage(enteredValue);
        break;

    }
  }

  function submitHandler() {
    onSubmit({
      name: productName,
      quantity: productQuantity,
      price: productPrice,
      supplier: productSupplier,
      category: productCategory,
      image: productImage, 
    });
  }

  return (
    <View>
      <ScrollView style={styles.formContent} showsVerticalScrollIndicator={false}>
        <Input
          label="Product Name"
          onUpdateValue={updateInputValueHandler.bind(this, "name")}
          value={productName}
          keyboardType="text"
        // isInvalid={emailIsInvalid}
        />

        <Input
          label="quantity" onUpdateValue={updateInputValueHandler.bind(this, "quantity")}
          value={productQuantity}
          keyboardType="number-pad"
        // isInvalid={emailIsInvalid}
        />
        <Input
          label="price" onUpdateValue={updateInputValueHandler.bind(this, "price")}
          value={productPrice}
          keyboardType="number-pad"
        // isInvalid={emailIsInvalid}
        />
        <Input
          label="supplier" onUpdateValue={updateInputValueHandler.bind(this, "supplier")}
          value={productSupplier}
          keyboardType="text"
        // isInvalid={emailIsInvalid}
        />
        {/* TODO: DROPDOWN  */}
        <Input
          label="category" onUpdateValue={updateInputValueHandler.bind(this, "category")}
          value={productCategory}
          keyboardType="text"
        // isInvalid={emailIsInvalid}
        />

        <View style={styles.buttons}>
          <View style={styles.imagePicker}>
            <ImagePicker onPickImage={updateInputValueHandler.bind(this, "image")}/>
          </View>
          <Button onPress={submitHandler}>
            Submit
          </Button>
        </View>


      </ScrollView>
    </View>
  );
}

export default AddProductsForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 12,
    marginBottom: 40,
  },
  formContent: {
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  imagePicker: {
    marginBottom: 12,
    marginTop: 12,
  }
});
