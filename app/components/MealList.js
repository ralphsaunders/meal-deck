import * as React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    SectionList,
    StatusBar,
} from "react-native";
import ListItem from "../globals/ListItem";

const DATA = [
    {
        title: "Breakfast",
        data: ["Bacon & Eggs", "Porridge"],
    },
    {
        title: "Lunch",
        data: [""],
    },
    {
        title: "Dinner",
        data: ["Filled Pasta", "Chicken Pie", "Steak & Mash"],
    },
    {
        title: "Snacks",
        data: ["Crisps", "Biscuits"],
    },
];

export function MealListScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={ListItem}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
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
