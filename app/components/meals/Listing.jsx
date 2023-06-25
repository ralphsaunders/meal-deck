import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    StatusBar,
} from "react-native";
import { useSelector } from "react-redux";

import ListItem from "../../globals/ListItem";
import { selectMeals } from "../../state/reducers/mealReducer";

/**
 * Meal List Screen
 * @returns {string} <MealListScreen /> component
 */
function MealsScreen() {
    const meals = useSelector((state) => selectMeals(state));
    const navigation = useNavigation();

    const onPress = (item) => {
        navigation.navigate("MealDetail", {
            ...item,
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                style={styles.listing}
                renderItem={(props) => (
                    <TouchableOpacity onPress={() => onPress(props.item)}>
                        <ListItem {...props} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
        width: "100%",
        marginTop: 20,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
    },
    listing: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
});

export default MealsScreen;
