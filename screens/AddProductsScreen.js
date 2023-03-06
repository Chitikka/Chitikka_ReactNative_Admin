import React from 'react'
import { Text } from 'react-native'
import AddProductsForm from '../components/Products/AddProductsForm'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { useState } from 'react'
import { Alert } from 'react-native'
import { axiosInstance } from '../util/axios'

const AddProductsScreen = () => {
  const [adding, setAdding] = useState(false)
  const addProductHandler = async ({
    name,
    quantity,
    price,
    supplier,
    category,
    image
  }) => {
    setAdding(true)
    let filename = image.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    var data = new FormData();
    data.append('name',name);
    data.append('quantity',quantity);
    data.append('price',price);
    data.append('supplier',supplier);
    data.append('category',category);
    data.append('image',{ uri: image, name: filename, type });
    
    try {
      const response = await axiosInstance
        .post("products/insert", data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })

      Alert.alert(response.data);
      setAdding(false)
    } catch (e) {
      console.log('ERRIR', e);
      Alert.alert('Could not add product. Please Check your product data')
      setAdding(false)
    }
  }

  return (
    adding ?
      <LoadingOverlay message={"Adding product. Please wait!"} /> :
      <AddProductsForm onSubmit={addProductHandler} />
  )
}

export default AddProductsScreen