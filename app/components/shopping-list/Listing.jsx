import * as React from "react";
import { Pressable, FlatList, Button, Text } from "react-native";
import { connect } from "react-redux";
import ListItem from "../../globals/ListItem";

function Listing({ shops }) {
    const onPress = (item) => {
        navigation.push("ShoppingListDetail", {
            ...item,
        });
    };

    return (
        <>
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
                <>
                    <Text>No Shopping Lists</Text>
                    <Text>You haven't created any shopping lists yet</Text>
                    <Button title="Create Shop" />
                </>
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        shops: state.shop.shops,
    };
};
const ConnectedComponent = connect(mapStateToProps)(Listing);
export default ConnectedComponent;
