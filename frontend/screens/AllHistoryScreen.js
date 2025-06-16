import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const AllHistoryScreen = ({ route }) => {
  const { petId, petName } = route.params || {};
  // const API_URL = `http://127.0.0.1:5050/tasks`;

   // Change this for mobile testing
  const API_URL = `http://192.168.7.182:5050/tasks`; 

  const [history, setHistory] = useState([]);
  const [filter, setFilter] = useState('all'); // all | completed | pending

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!Array.isArray(data)) {
          console.error('Invalid response format. Expected array.');
          return;
        }

        const filteredTasks = petId
          ? data.filter((task) => task.pet_id === petId)
          : data;

        const formattedTasks = filteredTasks.map((task) => ({
          id: task._id,
          name: task.petName || 'No PetName',
          action: task.activity || 'No activity',
          detail: task.description || 'No description',
          status: task.status || 'unknown',
          timestamp: new Date(task.datetime).toLocaleString(),
        }));

        setHistory(formattedTasks);
      } catch (error) {
        console.error('Error fetching all task history:', error);
      }
    };

    fetchAllTasks();
  }, [petId]);

  const getFilteredHistory = () => {
    if (filter === 'all') return history;
    return history.filter((item) => item.status === filter);
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.actionText}>{item.name} : {item.action}</Text>
      <Text style={styles.detailText}>{item.detail}</Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>
      <Text style={styles.timestampText}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {petName ? `${petName}'s Full Task Log` : 'All Task Logs'}
      </Text>

      <View style={styles.filterContainer}>
        {['all', 'completed', 'pending'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filter === type && styles.activeFilter,
            ]}
            onPress={() => setFilter(type)}
          >
            <Text style={styles.filterText}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getFilteredHistory()}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No task history found.</Text>}
      />
    </View>
  );
};

export default AllHistoryScreen;

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
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterText: {
    color: '#000',
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 15,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  timestampText: {
    fontSize: 13,
    color: '#777',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#aaa',
  },
});
