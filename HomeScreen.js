import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { getProductDetailsById } from "./backend/server.js";
import ProductDetailsModal from "./ProductDetailsModal";

export default function HomeScreen({ navigation, route }) {
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.scannedId) {
      getProductDetailsById(route.params.scannedId)
        .then((productDetails) => {
          setProduct(productDetails);
          setModalVisible(true); // Open the modal
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [route.params?.scannedId]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileIcon}
        onPress={() => navigation.navigate("Profile")}
      >
        <Image
          source={require("./assets/logo.png")}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Home Screen</Text>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate("QRScanner")}
      />
      <View style={styles.container}>
        {product && (
          <ProductDetailsModal
            product={product}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  profileIcon: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
