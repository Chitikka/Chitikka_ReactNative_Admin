import React, { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { axiosInstance } from '../util/axios';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  async function fetchData() {
    try {
      setRefreshing(true)
      const response = await axiosInstance.get("products/all");
      setRefreshing(false)

      setProducts(response.data.products)

    } catch (error) {
      console.log(error);
    }
  }
    useEffect(() => {
        
        fetchData();
      }, []);
    
  // return (
  //   <View>
  //       {products.map(product=><Text key={product.id}>{product.product_name}</Text>)}
  //   </View>
  // )

  return <FlatList refreshing={refreshing} onRefresh={fetchData} data={products} keyExtractor={item=>item.id} renderItem={({item})=><Text>{item.product_name}</Text>}/>
}

export default ProductsScreen