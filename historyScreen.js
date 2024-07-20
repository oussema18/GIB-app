import React from 'react';
import { View, Button, StyleSheet, FlatList, Image } from 'react-native';
import { Card, Text } from "@ui-kitten/components";

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
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Image source={{ uri: item.Image }} style={styles.itemImage} />
              <View style={styles.cardText}>
                <Text style={styles.productName}>{item.Nom}</Text>
                <Text style={styles.itemText}>Prix: {item.Prix}</Text>
                <Text style={styles.itemText}>Prix Vente: {item.Prix_vente}</Text>
                <Text style={styles.itemText}>ID: {item.identifiant}</Text>
              </View>
            </View>
          </Card>
        )}
      />
      <Button title="Reset History" onPress={handleReset} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  cardText: {
    flex: 1,
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  itemText: {
    fontSize: 17,
    marginBottom: 10,
    color: '#333',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: 'red',
  },
});
