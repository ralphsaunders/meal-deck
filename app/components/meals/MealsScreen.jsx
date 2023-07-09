import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
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
    const headerHeight = useHeaderHeight();

    const onNewMeal = () => {
        setMealModalVisible(true);
    };

    return (
        <View style={{ ...styles.container, marginTop: headerHeight }}>
            {meals.length > 0 ? (
                <Listing />
            ) : (
                <>
                    <Text>No Meals</Text>
                    <Text>You haven't created any meals yet</Text>
                    <Button title="New Meal" onPress={onNewMeal} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default MealsScreen;
