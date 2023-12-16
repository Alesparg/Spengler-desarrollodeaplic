import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Search from '../components/Search'
import allProducts from "../Data/products.json"
import ProductItem from '../components/ProductItem'
import { useEffect, useState } from 'react'
import { colors } from '../Global/colors'


const ItemListCategories = ({navigation,route}) => {
  const {category} = route.params
  const [keyword,setKeyword] = useState("")
  const [products,setProducts] = useState(allProducts)

  useEffect(()=>{

    if(category){
      const productsCategory = allProducts.filter(product => product.category === category)
      const productsFiltered = productsCategory.filter(product => product.title.includes(keyword))
      setProducts(productsFiltered)
    }else{
      const productsFiltered = allProducts.filter(product => product.title.includes(keyword))
      setProducts(productsFiltered)
    }


  },[keyword])

  return (
    <>
      <Search setKeyword={setKeyword}/>
      <Pressable
        style={styles.goBack}
        title='Go back'
        onPress={() => navigation.goBack()} 
      >
        <Text style={styles.volver}>Volver</Text>
      </Pressable>
      <FlatList
        style={styles.container}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item})=> <ProductItem item={item} navigation={navigation} route={route} />}
      />
    </>
  )
}

export default ItemListCategories

const styles = StyleSheet.create({
 container:{
  width:"100%"
 },
 volver:{
marginLeft:155,
 },
 goBack:{
  width:"100%",
  backgroundColor:colors.color2,
  padding:10,
  paddingStart:40
 }
})