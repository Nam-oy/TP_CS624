import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import CenterMessage from "./components/CenterMessage";

// Change this for mobile testing
const API_URL = "http://192.168.7.182:5050/tasks";

// const API_URL = "http://localhost:5050/tasks";

function TaskScreen({ navigation }) {
  const route = useRoute();
  const params = route.params || {};

  const [tasks, setTasks] = useState([]);
  const [petId, setPetId] = useState(params.petId || "");
  const [petName, setPetName] = useState(params.petName || "");
  const [activity, setActivity] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState(new Date());

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
    if (petId) {
      fetchTasks();
    }
  }, [petId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      // Filter by pet_id AND status === "pending"
      const filteredTasks = data.filter(
        (task) => task.pet_id === petId && task.status === "pending"
      );

      setTasks(filteredTasks);
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
      petName: petName,
      activity,
      description,
      datetime: datetime.toISOString(),
      status: "pending",
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
      petName: petName,
      activity,
      description,
      datetime: datetime.toISOString(),
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

  const markTaskComplete = async (id) => {
    try {
      // Fetch the original task
      const res = await fetch(`${API_URL}/${id}`);
      const originalTask = await res.json();

      // Update the status only
      const updatedTask = { ...originalTask, status: "completed" };

      // Send the full updated object
      await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      fetchTasks();
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const startEditing = (task) => {
    setEditingTask(task);
    setPetId(task.pet_id);
    setPetName(task.petName);
    setActivity(task.activity);
    setDescription(task.description);
    setDatetime(new Date(task.datetime));
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
      <Text style={styles.recordText}>Pet Name: {petName}</Text>

      <TouchableOpacity
        style={[
          styles.formToggleButton,
          showForm ? styles.cancelButton : styles.addButton,
        ]}
        onPress={() => (showForm ? clearForm() : setShowForm(true))}
      >
        <Text style={styles.formToggleButtonText}>
          {showForm ? "Cancel" : editingTask ? "Edit Task" : "Add Task"}
        </Text>
      </TouchableOpacity>

      {showForm && (
        <View style={{ marginTop: 15 }}>
          <TextInput
            style={styles.input}
            placeholder="Pet Name"
            value={petName}
            onChangeText={setPetName}
            editable={false}
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
            <Text style={styles.dateButtonText}>{datetime.toLocaleString()}</Text>
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
          <TouchableOpacity
            style={[styles.submitButton, editingTask ? styles.updateButton : null]}
            onPress={editingTask ? updateTask : addTask}
          >
            <Text style={styles.submitButtonText}>
              {editingTask ? "Update Task" : "Submit Task"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={tasks}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>Pet Name: {item.petName}</Text>
            <Text style={styles.recordText}>Activity: {item.activity}</Text>
            <Text style={styles.recordText}>Description: {item.description}</Text>
            <Text style={styles.recordText}>
              DateTime: {new Date(item.datetime).toLocaleString()}
            </Text>
            <Text style={styles.recordText}>Status: {item.status || "pending"}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEditing(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => markTaskComplete(item._id)}
              >
                <Text style={styles.buttonText}>Mark Complete</Text>
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
  completeButton: {
    backgroundColor: "#2196F3",
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

  // New styles for the buttons replacing native Button components
  formToggleButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: "#f44336", // red
  },
  addButton: {
    backgroundColor: "#007bff", // green
  },
  formToggleButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#2196F3", // blue
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#FF9800", // orange
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
