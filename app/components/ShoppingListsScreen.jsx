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
import ListItem from "../globals/ListItem";

const DATA = [
    {
        name: "11 June",
        meals: [
            "Chicken Tacos w/ Slaw",
            "Spag bol",
            "Lasagne",
            "Steak w/ Mash & Asparagus",
            "Filled Pasta",
            "Porridge",
            "Bacon & Eggs on Toast",
        ],
        ingredients: [
            "Chicken Thighs",
            "Tinned Tomatoes",
            "Cabbage",
            "Apple",
            "Spaghetti",
            "Beef Mince",
            "3 Onions",
            "Celery",
            "Carrots",
            "Lasagne Sheets",
            "2 Steaks",
            "Asparagus",
            "Potatoes",
            "Filled Pasta",
            "Porridge Oats",
            "Milk",
            "Bacon",
            "Eggs",
            "Bread",
        ],
    },
    {
        name: "25 May",
    },
    {
        name: "17 May",
    },
];

/**
 * Shopping Lists Screen
 * @returns {string} <ShoppingListListingScreen /> component
 */
export function ShoppingListsScreen({ navigation }) {
    const onPress = (item) => {
        navigation.push("ShoppingListDetail", {
            ...item,
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => (
                    <Pressable onPress={() => onPress(item)}>
                        <ListItem item={item.title} />
                    </Pressable>
                )}
                keyExtractor={(item, index) => item + index}
            />
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
