import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons } from '@expo/vector-icons';
import { getProductDetailsById } from "./backend/server.js";

export default function QRScanner({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const productDetails = await getProductDetailsById(data);
      const currentHistory = route.params?.history || [];
      const updatedHistory = [...currentHistory, productDetails];

      navigation.navigate("Home", { scannedId: data, openModal: true, history: updatedHistory });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        torchMode={flashEnabled ? 'on' : 'off'}
      />
      <View style={styles.overlay}>
        <View style={styles.top} />
        <View style={styles.middle}>
          <View style={styles.left} />
          <View style={styles.squareWrapper}>
            <View style={styles.square} />
            <Text style={styles.instructionText}>Align QR code within the frame</Text>
          </View>
          <View style={styles.right} />
        </View>
        <View style={styles.bottom} />
      </View>
      <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
        <MaterialIcons name={flashEnabled ? 'flash-on' : 'flash-off'} size={24} color="white" />
      </TouchableOpacity>
      {scanned && (
        <Button
          title={"Tap to Scan Again"}
          onPress={() => {
            setScanned(false);
          }}
        />
      )}
      <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate("History", { history: route.params?.history || [], resetHistory: () => {} })}>
        <Text style={styles.historyButtonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    flex: 1,
  },
  middle: {
    flexDirection: "row",
    flex: 2,
  },
  left: {
    flex: 1,
  },
  squareWrapper: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: 250,
    height: 250,
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderStyle: "dashed",
  },
  instructionText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  right: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  flashButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 50,
  },
  historyButton: {
    position: "absolute",
    bottom: 100,
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 5,
  },
  historyButtonText: {
    color: "white",
    fontSize: 18,
  },
});
