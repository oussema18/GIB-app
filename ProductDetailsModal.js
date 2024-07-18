import React, { useState } from "react";
import { Modal, View, Text, Image, Button, StyleSheet } from "react-native";

const ProductDetailsModal = ({ product, visible, onClose }) => {
  console.log(product);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Nom: {product.Nom}</Text>
          <Text style={styles.modalText}>Couleur: {product.Couleur}</Text>
          <Image style={styles.image} source={{ uri: product.Image }} />
          <Text style={styles.modalText}>
            Identifiant: {product.identifiant}
          </Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ProductDetailsModal;
