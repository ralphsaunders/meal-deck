import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import { MealListScreen } from "./app/components/MealList";
import { RecipeListScreen } from "./app/components/RecipeList";

const Tab = createBottomTabNavigator();

/**
 * Root App component
 * @returns {string} App component tree
 */
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
