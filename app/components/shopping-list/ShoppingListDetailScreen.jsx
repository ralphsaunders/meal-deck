import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { connect, useSelector } from "react-redux";

import EditShopModal from "./EditShopModal";
import {
    tokenizeInput,
    processIngredients,
} from "../../../helpers/user-input/UserInput";
import { selectMeals } from "../../state/reducers/mealReducer";
import { selectShopById } from "../../state/reducers/shopReducer";

function ShoppingListDetailScreen({ route, navigation }) {
    const { id } = route.params.item;
    const meals = useSelector((state) => selectMeals(state));
    const shop = useSelector((state) => selectShopById(state, id));
    const mealsOnList = meals.filter((meal) => shop.meals.includes(meal.id));
    const ingredients = mealsOnList.map((meal) => meal.ingredients);

    const processedIngredients = processIngredients(ingredients.join("\n"));

    return (
        <SafeAreaView>
            <ScrollView>
                <Text>Meals</Text>
                {mealsOnList.map((meal) => (
                    <Text key={meal.id}>{meal.name}</Text>
                ))}

                <Text>Ingredients</Text>
                {processedIngredients.map((i) => (
                    <Text key={i.ingredient}>{i.display}</Text>
                ))}
            </ScrollView>
            <EditShopModal />
        </SafeAreaView>
    );
}
export default ShoppingListDetailScreen;
