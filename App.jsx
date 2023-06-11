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
        <Stack.Screen
            name="MealList"
            component={MealsScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
);

const ShoppingListsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ShoppingLists"
                component={ShoppingListsScreen}
                options={{ headerShown: false }}
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
            <Tab.Navigator initialRouteName="Meals">
                <Tab.Screen name="Meals" component={MealsStack} />
                <Tab.Screen
                    name="Shopping List"
                    component={ShoppingListsStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
