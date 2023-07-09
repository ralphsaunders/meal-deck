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
                showsVerticalScrollIndicator={false}
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
        width: "100%",
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
    },
    listing: {
        backgroundColor: "#fff",
        flexGrow: 0,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
    },
});

export default MealsScreen;
