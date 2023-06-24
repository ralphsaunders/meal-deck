import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { connect, useSelector } from "react-redux";

import EditShopModal from "./EditShopModal";
import { tokenizeInput } from "../../../helpers/user-input/UserInput";
import { selectMeals } from "../../state/reducers/mealReducer";
import { selectShopById } from "../../state/reducers/shopReducer";

function ShoppingListDetailScreen({ route, navigation }) {
    const { id } = route.params.item;
    const meals = useSelector((state) => selectMeals(state));
    const shop = useSelector((state) => selectShopById(state, id));
    const mealsOnList = meals.filter((meal) => shop.meals.includes(meal.id));
    const ingredients = mealsOnList.map((meal) => meal.ingredients);

    const processedIngredients = ingredients
        .join("\n")
        .split("\n")
        .map((ingredient) => tokenizeInput(ingredient))
        .reduce((acc, cur) => {
            if (!acc.includes((i) => i.ingredient === cur.ingredient)) {
                // if ingredient not present in accumulator
                acc.push(cur);
            }
            return acc;
        }, []);

    console.log(processedIngredients);

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Meals</Text>
                {mealsOnList.map((meal) => (
                    <Text key={meal.id}>{meal.name}</Text>
                ))}

                <Text>Ingredients</Text>
                {ingredients.map((ingredient) => (
                    <Text key={ingredient}>{ingredient}</Text>
                ))}
            </ScrollView>
            <EditShopModal />
        </SafeAreaView>
    );
}
export default ShoppingListDetailScreen;
