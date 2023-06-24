import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { connect, useSelector } from "react-redux";

import EditShopModal from "./EditShopModal";
import { selectMeals } from "../../state/reducers/mealReducer";
import { selectShopById } from "../../state/reducers/shopReducer";

function ShoppingListDetailScreen({ route, navigation }) {
    const { id } = route.params.item;
    const meals = useSelector((state) => selectMeals(state));
    const shop = useSelector((state) => selectShopById(state, id));
    const mealsOnList = meals.filter((meal) => shop.meals.includes(meal.id));
    const ingredients = mealsOnList.map((meal) => meal.ingredients);

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
