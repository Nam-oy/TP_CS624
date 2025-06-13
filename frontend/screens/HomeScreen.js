// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { colors, images } from './theme'; // adjust the path as needed

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Pet Care App!</Text>
      <Image source={images.homePetPhoto} style={styles.image} />

      <Button
        title="View Pet Profiles"
        onPress={() => navigation.navigate('Pet Profiles')}
      />
      <Button
        title="Task List"
        onPress={() => navigation.navigate('Tasks')}
      />
      <Button
        title="View History"
        onPress={() => navigation.navigate('History')}
      />
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
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 30,
  },
});
