import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const API_URL = 'http://127.0.0.1:5050/pets';

function AddPetScreen() {
  const [pets, setPets] = useState([]);
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [editingPet, setEditingPet] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPets(data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const addPet = async () => {
    if (!name || !species || !age) return;

    const newPet = { name, species, age };
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet),
    });

    fetchPets();
    setName('');
    setSpecies('');
    setAge('');
  };

  const updatePet = async () => {
    if (!editingPet) return;

    await fetch(`${API_URL}/${editingPet._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, species, age }),
    });

    fetchPets();
    setEditingPet(null);
    setName('');
    setSpecies('');
    setAge('');
  };

  const deletePet = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchPets();
  };

  const startEditing = (pet) => {
    setEditingPet(pet);
    setName(pet.name);
    setSpecies(pet.species);
    setAge(pet.age);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pet Manager</Text>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Species" value={species} onChangeText={setSpecies} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />

      {editingPet ? (
        <Button title="Update Pet" onPress={updatePet} />
      ) : (
        <Button title="Add Pet" onPress={addPet} />
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
              <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deletePet(item._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

export default AddPetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
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
    backgroundColor: '#fff',
  },
  recordItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  recordText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#FF5733',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
