import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { deleteMeal } from "../state/reducers/mealReducer";

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
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomColor: "#E9ECEF",
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 14,
    },
});

export default ListItem;
