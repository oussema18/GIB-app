import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
  const { history = [], resetHistory } = route.params || {};

  const handleReset = () => {
    resetHistory();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanned History</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item}</Text>
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});
