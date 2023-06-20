import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { connect } from "react-redux";

function ShoppingListDetailScreen({ route, navigation, meals }) {
    const { title } = route.params.item;
    const mealsOnList = meals.filter((meal) =>
        route.params.item.meals.includes(meal.id)
    );

    const ingredients = mealsOnList.map((meal) => meal.ingredients);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>{title}</Text>

                <Text>Meals</Text>
                {mealsOnList.map((meal) => (
                    <Text key={meal.id}>{meal.name}</Text>
                ))}

                <Text>Ingredients</Text>
                {ingredients.map((ingredient) => (
                    <Text key={ingredient}>{ingredient}</Text>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        meals: state.meal.meals,
    };
};

const ConnectedComponent = connect(mapStateToProps)(ShoppingListDetailScreen);
export default ConnectedComponent;
