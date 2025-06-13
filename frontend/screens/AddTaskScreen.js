// screens/AddTaskScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';

const AddTaskScreen = ({ navigation }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddTask = () => {
    if (!taskTitle || !description || !dueDate) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }

    // You can add logic to save the task to a state or database here
    Alert.alert('Task Added', `Title: ${taskTitle}\nDue: ${dueDate}`);

    // Reset form
    setTaskTitle('');
    setDescription('');
    setDueDate('');

    // Optionally go back to Task list
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={setTaskTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Due Date (e.g. 2025-06-15)"
        value={dueDate}
        onChangeText={setDueDate}
      />

      <Button title="Save Task" onPress={handleAddTask} />
    </View>
  );
};

export default AddTaskScreen;

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
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
