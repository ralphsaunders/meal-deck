import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";
import {
    Pressable,
    SafeAreaView,
    FlatList,
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";
import { useSelector } from "react-redux";

import Listing from "./Listing";
import ListItem from "../../globals/ListItem";
import { selectMeals } from "../../state/reducers/mealReducer";

/**
 * Shopping Lists Screen
 * @returns {string} <ShoppingListListingScreen /> component
 */
function ShoppingListsScreen({ navigation }) {
    const meals = useSelector((state) => selectMeals(state));

    const goToMeals = () => {
        navigation.navigate("Meals");
    };

    return (
        <SafeAreaView style={styles.container}>
            {meals.length > 7 ? (
                <Listing />
            ) : (
                <>
                    <Text>Not Enough Meals</Text>
                    <Text>Add at least 8 meals before creating Shops</Text>
                    <Button title="Go to Meals" onPress={goToMeals} />
                </>
            )}
        </SafeAreaView>
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

export default ShoppingListsScreen;
