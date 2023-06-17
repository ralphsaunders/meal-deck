import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

export function ShoppingListDetailScreen({ route, navigation }) {
    const { title, meals = [], ingredients = [] } = route.params;

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{title}</Text>

                <Text>Meals</Text>
                {meals.map((meal) => (
                    <Text key={meal}>{meal}</Text>
                ))}

                <Text>Ingredients</Text>
                {ingredients.map((ingredient) => (
                    <Text key={ingredient}>{ingredient}</Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
