import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

/**
 * Recipe List Screen
 * @returns {string} <RecipeListScreen /> component
 */
export function RecipeListScreen() {
    return (
        <View style={styles.container}>
            <Text>Recipes Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
