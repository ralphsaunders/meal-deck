import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MealsScreen } from "./app/components/MealsScreen";
import { MealDetailScreen } from "./app/components/MealDetailScreen";
import { ShoppingListsScreen } from "./app/components/ShoppingListsScreen";
import { ShoppingListDetailScreen } from "./app/components/ShoppingListDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MealsStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Meals" component={MealsScreen} />
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
);

const ShoppingListsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Shopping Lists"
                component={ShoppingListsScreen}
            />
            <Stack.Screen
                name="ShoppingListDetail"
                component={ShoppingListDetailScreen}
            />
        </Stack.Navigator>
    );
};

/**
 * Root App component
 * @returns {string} App component tree
 */
export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="MealsTab"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name="MealsTab"
                    component={MealsStack}
                    options={{
                        tabBarLabel: "Meals",
                    }}
                />
                <Tab.Screen
                    name="ShoppingListTab"
                    component={ShoppingListsStack}
                    options={{
                        tabBarLabel: "Shopping Lists",
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
