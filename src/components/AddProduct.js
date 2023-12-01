import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const AddProduct = ({ valueTitle, valuePrice, onChangeTitle, onChangePrice, addProduct }) => {
  return (
    <View>
      <Text style={styles.title}>Bienvenido a mi aplicación</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={valueTitle}
          onChangeText={(t) => onChangeTitle(t)}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={valuePrice}
          onChangeText={(t) => onChangePrice(t)}
        />
        <Button title="Añadir" onPress={addProduct} color="#FFA500" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-around",
  },
  input: {
    borderWidth: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 150,
  },
});

export default AddProduct;

