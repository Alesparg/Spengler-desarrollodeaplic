import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Alert } from 'react-native';
import CartItem from '../Components/CartItem';
import { useSelector, useDispatch } from 'react-redux';  
import { useEffect } from 'react';
import { usePostOrdersMutation } from '../app/services/shopServices';
import { colors } from '../Global/colors';
import { useNavigation } from '@react-navigation/native';
import { clearCart } from '../features/cart/cartSlice'; 

const Cart = () => {
  const localId = useSelector(state => state.auth.value.localId);
  const cart = useSelector(state => state.cart.value);
  const [triggerPostOrder, { isSuccess, isError, error }] = usePostOrdersMutation();
  const dispatch = useDispatch();  
  const navigation = useNavigation();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

 

  useEffect(() => {
    if (isSuccess) {
      setOrderConfirmed(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (orderConfirmed) {
      navigation.navigate('OrdersStack');
    }
  }, [orderConfirmed]);

  const handleConfirmOrder = async () => {
    try {
      await triggerPostOrder({ localId, order: cart });
      dispatch(clearCart());
      Alert.alert("La orden a sigo registrada con exito");
      navigation.navigate("OrdersStack");
    } catch (err) {
      console.error('Error al confirmar la orden:', err);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <View style={styles.confirmContainer}>
        <Pressable onPress={handleConfirmOrder}>
          <Text style={styles.text}>Confirmar</Text>
        </Pressable>
        <Text style={styles.text}>Total: $ {cart.total} </Text>
      </View>
    </View>
  );
};

export default Cart;










  

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginBottom:130
    },
    confirmContainer:{
        backgroundColor:colors.color5,
        padding:25,
        flexDirection:"row",
        justifyContent:"space-between",
    },
    text:{
        color:"white",
     
    }
})