import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { MealListScreen } from './app/components/MealList';
import { RecipeListScreen } from './app/components/RecipeList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Tab.Navigator initialRouteName="Meals">
            <Tab.Screen name="Meals" component={MealListScreen} />
            <Tab.Screen name="Recipes" component={RecipeListScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}
