import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import CenterMessage from "./components/CenterMessage"; // Adjust if needed

const API_URL = "http://localhost:5050/tasks";

function TaskScreen({ navigation }) {
  const route = useRoute();
  const params = route.params || {};

  const [tasks, setTasks] = useState([]);
  const [petId, setPetId] = useState(params.petId || "");
  const [petName, setPetName] = useState(params.petName || "");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState(new Date());
  const [status, setStatus] = useState("Pending");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (params.petId) setPetId(params.petId);
      if (params.petName) setPetName(params.petName);
    }, [params.petId, params.petName])
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const clearForm = () => {
    setPetId(params.petId || "");
    setPetName(params.petName || "");
    setActivity("");
    setDescription("");
    setDatetime(new Date());
    setStatus("Pending");
    setEditingTask(null);
    setShowForm(false);
  };

  const addTask = async () => {
    if (!petId || !petName || !activity || !description || !datetime) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      pet_id: petId,
      petName,
      activity,
      description,
      datetime: datetime.toISOString(),
      status,
    };

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      fetchTasks();
      clearForm();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async () => {
    if (!editingTask) return;

    const updatedTask = {
      pet_id: petId,
      petName,
      activity,
      description,
      datetime: datetime.toISOString(),
      status,
    };

    try {
      await fetch(`${API_URL}/${editingTask._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      fetchTasks();
      clearForm();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setPetId(task.pet_id);
    setPetName(task.petName);
    setActivity(task.activity);
    setDescription(task.description);
    setDatetime(new Date(task.datetime));
    setStatus(task.status);
    setShowForm(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || datetime;
    setShowDatePicker(Platform.OS === "ios");
    setDatetime(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>

      <Button
        title={showForm ? "Cancel" : editingTask ? "Edit Task" : "Add Task"}
        onPress={() => (showForm ? clearForm() : setShowForm(true))}
      />

      {showForm && (
        <View style={{ marginTop: 15 }}>
          <TextInput
            style={styles.input}
            placeholder="Pet ID"
            value={petId}
            onChangeText={setPetId}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Pet Name"
            value={petName}
            onChangeText={setPetName}
          />
          <TextInput
            style={styles.input}
            placeholder="Activity"
            value={activity}
            onChangeText={setActivity}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {datetime.toLocaleString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={datetime}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={handleDateChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Status"
            value={status}
            onChangeText={setStatus}
          />

          {editingTask ? (
            <Button title="Update Task" onPress={updateTask} />
          ) : (
            <Button title="Submit Task" onPress={addTask} />
          )}
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>Pet ID: {item.pet_id}</Text>
            <Text style={styles.recordText}>Pet Name: {item.petName}</Text>
            <Text style={styles.recordText}>Activity: {item.activity}</Text>
            <Text style={styles.recordText}>Description: {item.description}</Text>
            <Text style={styles.recordText}>
              DateTime: {new Date(item.datetime).toLocaleString()}
            </Text>
            <Text style={styles.recordText}>Status: {item.status}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEditing(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<CenterMessage message="No tasks yet." />}
      />
    </View>
  );
}

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  recordItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  recordText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  dateButton: {
    padding: 12,
    backgroundColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
});
