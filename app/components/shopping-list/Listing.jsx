import React, { useState, useEffect } from "react";
import { Pressable, FlatList, Button, Text, StyleSheet } from "react-native";
import ListItem from "../../globals/ListItem";
import NewShopActionSheet from "../new-shop/NewShopActionSheet";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation } from "@react-navigation/native";
import { selectShops } from "../../state/reducers/shopReducer";
import { useSelector } from "react-redux";

function Listing() {
    const shops = useSelector((state) => selectShops(state));
    const navigation = useNavigation();
    dayjs.extend(relativeTime);

    const onPress = (item) => {
        navigation.push("ShoppingListDetail", {
            item,
        });
    };

    return (
        <>
            {shops.length ? (
                <FlatList
                    data={shops}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => onPress(item)}>
                            <Text>{dayjs.unix(item.timestamp).fromNow()}</Text>
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => item + index}
                />
            ) : (
                <>
                    <Text>No Shopping Lists</Text>
                    <Text>You haven't created any shopping lists yet</Text>

                    <NewShopActionSheet
                        DisplayComponent={() => (
                            <Text style={styles.newShopButton}>New Shop</Text>
                        )}
                    />
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    newShopButton: {
        fontSize: 16,
        color: "blue",
    },
});

export default Listing;
