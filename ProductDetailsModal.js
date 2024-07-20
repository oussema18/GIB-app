import React, { useState, useEffect } from "react";
import { Modal, View, Text, Image, Button, StyleSheet } from "react-native";
import { supabase } from "./backend/server.js";

const ProductDetailsModal = ({ product, visible, onClose }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.getSession();
      if (session.data.session) {
        setUser(session.data.session.user);
      } else {
        // handle user not logged in
      }
    };

    getSession();
  }, []);

  const canAccessPrice = user && user.email === "gib.masmoudi@gmail.com";

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.image} source={{ uri: product.Image }} />
          <View style={styles.row}>
            <Text style={styles.label}>Nom</Text>
            <Text style={styles.value}>{product.Nom}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Prix vente</Text>
            <Text style={styles.value}>{product.Prix_vente}</Text>
          </View>
          {canAccessPrice && (
            <View style={styles.row}>
              <Text style={styles.label}>Prix achat</Text>
              <Text style={styles.value}>{product.Prix_achat}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.label}>Couleur</Text>
            <Text style={styles.value}>{product.Couleur}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Identifiant</Text>
            <Text style={styles.value}>{product.identifiant}</Text>
          </View>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    width: 100,
    fontSize: 17, // Change font size for labels
  },
  value: {
    flex: 1,
    fontSize: 17, // Change font size for labels
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
    width: 700 * 0.4,
    height: 431 * 0.4,
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
  },
});

export default ProductDetailsModal;
