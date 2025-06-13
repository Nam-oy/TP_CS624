// screens/HistoryScreen.js
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const mockHistory = [
  { id: '1', action: 'Fed Whiskers', timestamp: '2025-06-12 08:00 AM' },
  { id: '2', action: 'Walked Buddy', timestamp: '2025-06-12 06:00 PM' },
  { id: '3', action: 'Gave medicine to Max', timestamp: '2025-06-11 09:00 AM' },
];

const HistoryScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.actionText}>{item.action}</Text>
      <Text style={styles.timestampText}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Activity History</Text>
      <FlatList
        data={mockHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No history yet.</Text>}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  historyItem: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestampText: {
    fontSize: 14,
    color: '#666',
  },
});

