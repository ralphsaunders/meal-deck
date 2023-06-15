import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

export function MealDetailScreen({ route, navigation }) {
    const { name, ingredients } = route.params;

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{name}</Text>
                <Text>{ingredients}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
