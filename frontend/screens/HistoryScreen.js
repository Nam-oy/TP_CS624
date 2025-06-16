import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native';

const HistoryScreen = ({ route }) => {
  const { petId, petName } = route.params || {};

  // Change this for mobile testing
  const API_URL = `http://192.168.7.182:5050/tasks`;

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Invalid response format. Expected array.');
          return;
        }

        const completedTasks = data.filter(
          (task) => task.pet_id === petId && task.status === 'completed'
        );

        const formattedTasks = completedTasks.map((task) => ({
          id: task._id,
          action: task.activity || 'No activity',
          detail: task.description || 'No description',
          timestamp: new Date(task.datetime).toLocaleString(),
        }));

        setHistory(formattedTasks);
      } catch (error) {
        console.error('Error fetching task history:', error);
      }
    };

    if (petId) {
      fetchCompletedTasks();
    }
  }, [petId]);

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.actionText}>{item.action}</Text>
      <Text style={styles.detailText}>{item.detail}</Text>
      <Text style={styles.timestampText}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Activity History {petName ? `for ${petName}` : ''}
      </Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No history yet.</Text>
        }
        contentContainerStyle={history.length === 0 && styles.emptyContainer}
      />
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
  },
  historyItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detailText: {
    fontSize: 16,
    marginTop: 4,
    color: '#555',
  },
  timestampText: {
    fontSize: 13,
    color: '#888',
    marginTop: 6,
    fontStyle: 'italic',
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
