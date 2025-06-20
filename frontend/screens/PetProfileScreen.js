// screens/PetProfileScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import CenterMessage from "./components/CenterMessage"; // Adjust path if needed

// Change this for mobile testing
const API_URL = "http://192.168.7.182:5050/pets";

// const API_URL ="http://127.0.0.1:5050/pets";

function PetProfileScreen({ navigation }) {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [editingPet, setEditingPet] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const addPet = async () => {
    if (!name || !species || !age) return;

    const newPet = { name, species, age };
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    });

    fetchPets();
    clearForm();
  };

  const updatePet = async () => {
    if (!editingPet) return;

    await fetch(`${API_URL}/${editingPet._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, species, age }),
    });

    fetchPets();
    clearForm();
  };

  const deletePet = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchPets();
  };

  const startEditing = (pet) => {
    setEditingPet(pet);
    setName(pet.name);
    setSpecies(pet.species);
    setAge(pet.age.toString());
    setShowForm(true);
  };

  const clearForm = () => {
    setName("");
    setSpecies("");
    setAge("");
    setEditingPet(null);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Manager</Text>

      {/* Add / Cancel button */}
      <TouchableOpacity
        style={[styles.toggleButton, showForm ? styles.cancelButton : styles.addButton]}
        onPress={() => {
          if (showForm) {
            clearForm();
          } else {
            setShowForm(true);
          }
        }}
      >
        <Text style={styles.buttonText}>{showForm ? "Cancel" : "Add Pet"}</Text>
      </TouchableOpacity>

      {showForm && (
        <View style={{ marginTop: 15 }}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Species"
            value={species}
            onChangeText={setSpecies}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          {editingPet ? (
            <TouchableOpacity style={[styles.actionButton, styles.updateButton]} onPress={updatePet}>
              <Text style={styles.buttonText}>Update Pet</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.actionButton, styles.submitButton]} onPress={addPet}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={pets}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Text style={styles.recordText}>Name: {item.name}</Text>
            <Text style={styles.recordText}>Species: {item.species}</Text>
            <Text style={styles.recordText}>Age: {item.age}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.taskButton}
                onPress={() =>
                  navigation.navigate("Add Task", {
                    petId: item._id,
                    petName: item.name,
                  })
                }
              >
                <Text style={styles.buttonText}>Task</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.taskButton}
                onPress={() =>
                  navigation.navigate("History", {
                    petId: item._id,
                    petName: item.name,
                  })
                }
              >
                <Text style={styles.buttonText}>History</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => startEditing(item)}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePet(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<CenterMessage message="No pets added yet." />}
      />
    </View>
  );
}

export default PetProfileScreen;

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
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#FF5733",
    padding: 8,
    borderRadius: 5,
  },
  taskButton: {
    backgroundColor: "#3498db",
    padding: 8,
    borderRadius: 5,
  },

  // New styles for Add/Cancel, Submit, Update buttons
  toggleButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007bff", // green
  },
  cancelButton: {
    backgroundColor: "#007bff", // red
  },
  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitButton: {
    backgroundColor: "#007bff", // blue
  },
  updateButton: {
    backgroundColor: "#ffc107", // amber/yellow for update
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
