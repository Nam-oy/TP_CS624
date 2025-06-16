// screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { colors, images } from './theme'; // adjust the path as needed

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pet Care App!</Text>
      <Image source={images.homePetPhoto} style={styles.image} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pet Profiles')}
      >
        <Text style={styles.buttonText}>View Pet Profiles</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('All History')}
      >
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  image: {
    width: 550,
    height: 550,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
