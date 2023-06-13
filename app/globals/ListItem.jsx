import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { deleteMeal } from "../state/reducers/mealReducer";
import { useDispatch } from "react-redux";

/**
 *
 * @param {object} props ListItem props
 * @param {string} props.item ListItem text
 * @returns {string} ListItem component
 */
const ListItem = ({ item }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );
};

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8,
    },
    title: {
        fontSize: 24,
    },
});

export default ListItem;
