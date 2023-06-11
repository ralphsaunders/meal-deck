import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

export function MealDetailScreen({ route, navigation }) {
    const { title } = route.params;

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{title}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
