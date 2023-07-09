import PropTypes from "prop-types";
import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import {
    countIngredients,
    ingredientLabel,
} from "../../helpers/formatting/formatting";
import { deleteMeal } from "../state/reducers/mealReducer";

/**
 *
 * @param {object} props ListItem props
 * @param {string} props.item ListItem text
 * @returns {string} ListItem component
 */
const ListItem = ({ item }) => {
    const count = countIngredients(item.ingredients);
    const label = ingredientLabel(count);

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subTitle}>
                {count} {label}
            </Text>
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
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomColor: "#E6E8EF",
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 15,
        color: "#404663",
        fontWeight: 500,
    },
    subTitle: {
        color: "#8F98B7",
    },
});

export default ListItem;
