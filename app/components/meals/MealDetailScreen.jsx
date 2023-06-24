import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { selectMealById } from "../../state/reducers/mealReducer";
import { useSelector } from "react-redux";

function MealDetailScreen({ route, navigation }) {
    const { id } = route.params;
    const meal = useSelector((state) => selectMealById(state, id));

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{meal?.name}</Text>
                <Text>{meal?.ingredients}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default MealDetailScreen;
