import React from "react";
import { createClient } from "@supabase/supabase-js";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

export default function HomeScreen({ navigation, route }) {
  const { scannedId } = route.params || {}; // Retrieve the scanned ID from navigation parameters

  const supabase = createClient(
    "https://dacvvspdtayiatuxpsci.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhY3Z2c3BkdGF5aWF0dXhwc2NpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzMDk3NzcsImV4cCI6MjAzNjg4NTc3N30.-QuLH6zBMtEnMLIocPHAj8QketLS5dqUT0UpoPxShJc"
  );

  supabase
    .from("Produits")
    .select("*")
    .then((response) => {
      const { data, error } = response;
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log("Data fetched successfully:", data);
      }
    });

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
      <Text>
        {scannedId && (
          <Text style={styles.scannedText}>Scanned ID: {scannedId}</Text>
        )}
      </Text>
      {/* Display the scanned ID */}
      <Button
        title="Scan QR Code"
        onPress={() => navigation.navigate("QRScanner")}
      />
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
  scannedText: {
    fontSize: 18,
    color: "green",
    marginVertical: 20,
  },
});
