import * as React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    FlatList,
    StatusBar,
} from "react-native";
import { connect } from "react-redux";
import ListItem from "../../globals/ListItem";

/**
 * Meal List Screen
 * @returns {string} <MealListScreen /> component
 */
function MealsScreen({ meals }) {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={meals}
                keyExtractor={(item) => item.id}
                renderItem={ListItem}
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

const mapStateToProps = (state) => {
    return {
        meals: state.meal.meals,
    };
};

const ConnectedMealsScreen = connect(mapStateToProps)(MealsScreen);

export default ConnectedMealsScreen;
