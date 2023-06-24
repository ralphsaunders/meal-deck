import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    StatusBar,
    Button,
} from "react-native";
import { useSelector } from "react-redux";

import Listing from "./Listing";
import ListItem from "../../globals/ListItem";
import { NewShopContext } from "../../globals/NewShopContext";
import { selectMeals } from "../../state/reducers/mealReducer";

/**
 * Meal List Screen
 * @returns {string} <MealsScreen /> component
 */
function MealsScreen() {
    const { setMealModalVisible } = useContext(NewShopContext);
    const meals = useSelector((state) => selectMeals(state));

    const onNewMeal = () => {
        setMealModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            {meals.length > 0 ? (
                <Listing />
            ) : (
                <>
                    <Text>No Meals</Text>
                    <Text>You haven't created any meals yet</Text>

                    <Button title="New Meal" onPress={onNewMeal} />
                </>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
    },
});

export default MealsScreen;
