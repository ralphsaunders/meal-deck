import * as React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    StatusBar,
} from "react-native";
import ListItem from "../../globals/ListItem";
import { useNavigation } from "@react-navigation/native";
import { selectMeals } from "../../state/reducers/mealReducer";
import { useSelector } from "react-redux";

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
        <SafeAreaView style={styles.container}>
            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={(props) => (
                    <TouchableOpacity onPress={() => onPress(props.item)}>
                        <ListItem {...props} />
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff",
    },
});

export default MealsScreen;
