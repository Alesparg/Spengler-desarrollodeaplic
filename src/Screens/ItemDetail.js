import { StyleSheet, Text, View , Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../Global/colors'
import { useSelector } from 'react-redux'

const ItemDetail = ({route}) => {

  const product = useSelector((state)=> state.shop.value.productSelected)
  const images = product.images ? product.images : []



  return (
    <View style={styles.container}>
      <View style={styles.content} >
          <Image
            style={styles.image}
            source={{uri:images[2]}}
            resizeMode='cover's
          />
          <View style={styles.containerText}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          <View style={styles.containerPrice}>
            <Text style={styles.price}>Precio$ {product.price}</Text>
            <Pressable style={styles.buyNow}>
              <Text style={styles.buyNowText}>Compra Ya</Text>
            </Pressable>
          </View>
        </View>
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
    container:{
        width:"100%",
        flex:1,
        justifyContent:"start",
        alignItems:"center",
    },
    content:{
      width:"100%"
    },

    image:{
      width:"100%",
      height:300
    },
    goBack:{
      width:"100%",
      backgroundColor:colors.color1,
      padding:10,
      paddingStart:40
     },
     containerText:{
      gap:25,
      paddingHorizontal:5,
      paddingVertical:25
     },
     containerPrice:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        marginVertical:10
     },
     title:{
      fontSize:25,
      textAlign: "center",
      borderBottomEndRadius: 2,
      fontWeight:"bold"
     },
     description:{
      fontSize:20,
      textAlign: "center",
      backgroundColor:colors.color4,
     },
     price:{
      fontSize:30
     },
     buyNow:{
      backgroundColor:colors.color1,
      paddingVertical:5,
      paddingHorizontal:10,
      borderRadius:5
     },
     buyNowText:{
      color:"white"
     }
})