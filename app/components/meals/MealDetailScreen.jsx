import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { connect } from "react-redux";

function MealDetailScreen({ route, navigation, meals }) {
    const { id } = route.params;
    const [meal, setMeal] = useState(null);

    const findMeal = () => {
        if (!id) {
            return;
        }

        const match = meals.find((meal) => meal.id === id);
        setMeal(match);
    };

    useEffect(findMeal, []);
    useEffect(findMeal, [meals]);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{meal?.name}</Text>
                <Text>{meal?.ingredients}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        meals: state.meal.meals,
    };
};

const ConnectedMealDetailScreen = connect(mapStateToProps)(MealDetailScreen);

export default ConnectedMealDetailScreen;
