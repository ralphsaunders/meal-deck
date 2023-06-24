import * as React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { connect } from "react-redux";
import { selectShopById } from "../../state/reducers/shopReducer";
import { useSelector } from "react-redux";

function ShoppingListDetailScreen({ route, navigation, meals, shops }) {
    const { id } = route.params.item;
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
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        meals: state.meal.meals,
        shops: state.shop.shops,
    };
};

const ConnectedComponent = connect(mapStateToProps)(ShoppingListDetailScreen);
export default ConnectedComponent;
