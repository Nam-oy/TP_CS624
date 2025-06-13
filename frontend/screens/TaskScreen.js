// screens/TaskScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const TaskScreen = () => {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      title: taskText,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTaskText('');
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleTask(item.id)}
      style={[styles.taskItem, item.completed && styles.completedTask]}
    >
      <Text style={styles.taskText}>
        {item.completed ? '✅' : '⬜️'} {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>
      <TextInput
        placeholder="Enter a task"
        style={styles.input}
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Add" onPress={handleAddTask} />

      <Text style={styles.header}>Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No tasks yet.</Text>}
      />
    </View>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskItem: {
    backgroundColor: '#e6f7ff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  completedTask: {
    backgroundColor: '#d4edda',
  },
  taskText: {
    fontSize: 16,
  },
});
