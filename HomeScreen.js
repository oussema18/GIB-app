import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { getProductDetailsById } from "./backend/server.js";
import ProductDetailsModal from "./ProductDetailsModal";
import { Card, Text } from "@ui-kitten/components";

export default function HomeScreen({ navigation, route }) {
  const [product, setProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [history, setHistory] = useState(route.params?.history || []);

  useEffect(() => {
    if (route.params?.scannedId) {
      getProductDetailsById(route.params.scannedId)
        .then((productDetails) => {
          setProduct(productDetails);
          setModalVisible(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    if (route.params?.history) {
      setHistory(route.params.history);
    }
  }, [route.params?.scannedId, route.params?.history]);

  const handleCloseModal = () => {
    setModalVisible(false);
    setProduct(null); // Reset product to allow re-scanning
    navigation.setParams({ scannedId: null }); // Reset route params
  };

  const handleViewHistory = () => {
    navigation.navigate("History", {
      history,
      resetHistory: () => setHistory([]),
    });
  };

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
      <Card>
        <Text>
          The Maldives, officially the Republic of Maldives, is a small country
          in South Asia, located in the Arabian Sea of the Indian Ocean. It lies
          southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from
          the Asian continent
        </Text>
      </Card>
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate("QRScanner", { history })}
      />
      <Button title="View History" onPress={handleViewHistory} />
      <View style={styles.container}>
        {product && (
          <ProductDetailsModal
            product={product}
            visible={modalVisible}
            onClose={handleCloseModal}
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
});
