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

/**
 * Shopping Lists Screen
 * @returns {string} <ShoppingListListingScreen /> component
 */
function ShoppingListsScreen({ navigation, shops }) {
    const onPress = (item) => {
        navigation.push("ShoppingListDetail", {
            ...item,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            {shops.length ? (
                <FlatList
                    data={shops}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => onPress(item)}>
                            <ListItem item={item} />
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => item + index}
                />
            ) : (
                <Text>Nothing to see here</Text>
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

const mapStateToProps = (state) => {
    return {
        shops: state.shop.shops,
    };
};

const ConnectedShoppingListsScreen =
    connect(mapStateToProps)(ShoppingListsScreen);

export default ConnectedShoppingListsScreen;
