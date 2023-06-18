import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    Pressable,
    SafeAreaView,
    FlatList,
    View,
    Text,
    StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import ListItem from "../../globals/ListItem";
import Listing from "./Listing";

/**
 * Shopping Lists Screen
 * @returns {string} <ShoppingListListingScreen /> component
 */
function ShoppingListsScreen({ navigation, shops, meals }) {
    const onPress = (item) => {
        navigation.push("ShoppingListDetail", {
            ...item,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Listing />
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

const mapStateToProps = (state) => {
    return {
        shops: state.shop.shops,
        meals: state.meal.meals,
    };
};

const ConnectedShoppingListsScreen =
    connect(mapStateToProps)(ShoppingListsScreen);

export default ConnectedShoppingListsScreen;
