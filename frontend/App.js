// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import PetProfileScreen from './screens/PetProfileScreen';
import TaskScreen from './screens/TaskScreen';
import HistoryScreen from './screens/HistoryScreen';
import AllHistoryScreen from './screens/AllHistoryScreen';
import AddPetScreen from './screens/AddPetScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Pet Care Tracker">
        <Stack.Screen name="Pet Care Tracker" component={HomeScreen} />
        <Stack.Screen name="Pet Profiles" component={PetProfileScreen} />
        <Stack.Screen name="Tasks" component={TaskScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="All History" component={AllHistoryScreen} />
        <Stack.Screen name="Add Pet" component={AddPetScreen} />
        <Stack.Screen name="Add Task" component={AddTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
