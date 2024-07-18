import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Replace this with your actual login logic
    if (username === "admin" && password === "password") {
      navigation.navigate("Home");
    } else {
      alert("Invalid username or password");
    }
  };

  // Get screen dimensions
  const { width, height } = Dimensions.get("window");

  // Calculate dynamic image size (e.g., 40% of the screen width)
  const imageSize = width * 0.6;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("./assets/logo.png")}
          style={[styles.logo, { width: imageSize, height: imageSize }]}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.formContainer, { marginTop: height * 0.05 }]}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50, // Adjust this value to position the logo
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontSize: 30, // Larger font size
    fontWeight: "bold", // Bold text
    color: "#333", // Darker color
    textAlign: "center", // Centered text
    marginBottom: 30, // More space at the bottom
    fontFamily: "sans-serif", // Custom font family (ensure it's available on your platform)
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
    marginBottom: 12,
    padding: 10,
    width: "80%",
  },
});
