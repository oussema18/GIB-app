import React from "react";
import { View, Text, Button, StyleSheet, FlatList, Image } from "react-native";

export default function HistoryScreen({ route, navigation }) {
  const { history = [], resetHistory } = route.params || {};

  const handleReset = () => {
    resetHistory();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.Image }} style={styles.itemImage} />
            <Text style={styles.itemText}>ID: {item.identifiant}</Text>
            <Text style={styles.itemText}>Nom Produit: {item.Nom}</Text>
            <Text style={styles.itemText}>Prix: {item.Prix_achat}</Text>
            <Text style={styles.itemText}>Couleur: {item.Couleur}</Text>

            {/* Add other product details as needed */}
          </View>
        )}
      />
      <Button title="Reset History" onPress={handleReset} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  item: {
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
    marginLeft: 10, // Add some margin to the left of the text for spacing
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});
