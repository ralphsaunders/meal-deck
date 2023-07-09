import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import {
    countIngredients,
    ingredientLabel,
} from "../../../helpers/formatting/formatting";
import { selectMealById } from "../../state/reducers/mealReducer";

function MealDetailScreen({ route, navigation }) {
    const { id } = route.params;
    const meal = useSelector((state) => selectMealById(state, id));
    const count = countIngredients(meal.ingredients);
    const label = ingredientLabel(count);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <View style={styles.header}>
                    <Text style={styles.name}>{meal?.name}</Text>
                </View>
                <Text style={styles.heading}>
                    {label} ({count})
                </Text>
                <Text style={styles.body}>{meal?.ingredients}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
    },
    innerContainer: {
        margin: 16,
    },
    header: {
        marginBottom: 16,
    },
    name: {
        fontSize: 32,
        fontWeight: 700,
        color: "#20044E",
        letterSpacing: -0.25,
    },
    heading: {
        fontSize: 16,
        fontWeight: 600,
        color: "#404663",
        lineHeight: 24,
    },
    body: {
        color: "#404663",
        fontSize: 16,
        lineHeight: 24,
    },
});

export default MealDetailScreen;
