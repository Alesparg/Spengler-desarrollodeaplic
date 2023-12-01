import { useState } from "react";
import { View, StyleSheet } from "react-native";
import uuid from 'react-native-uuid';
import ModalDelete from "./src/components/ModalDelete";
import AddProduct from "./src/components/AddProduct";
import ListProduct from "./src/components/ListProduct";

const App = () => {
  const [newTitleProduct, setNewTitleProduct] = useState("");
  const [newPriceProduct, setNewPriceProducts] = useState("");
  const [products, setProducts] = useState([]);
  const [productSelected, setProductSelected] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handlerAddProduct = () => {
    const newProduct = {
      id: uuid.v4(),
      title: newTitleProduct,
      price: newPriceProduct,
    };

    setProducts((current) => [...current, newProduct]);
    setNewTitleProduct("");
    setNewPriceProducts("");
  };

  const handlerModal = (item) => {
    setProductSelected(item);
    setModalVisible(true);
  };

  const handlerDeleteProduct = () => {
    setProducts((current) => current.filter((product) => product.id !== productSelected.id));
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <AddProduct
        valueTitle={newTitleProduct}
        valuePrice={newPriceProduct}
        onChangeTitle={setNewTitleProduct}
        onChangePrice={setNewPriceProducts}
        addProduct={handlerAddProduct}
      />
      <ListProduct products={products} onModal={handlerModal} />
      <ModalDelete
        product={productSelected}
        visible={modalVisible}
        onModal={handlerModal}
        onDelete={handlerDeleteProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "start",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "red", // Añade este estilo para el fondo rojo
  },
});

export default App;

