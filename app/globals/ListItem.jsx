import PropTypes from "prop-types";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

/**
 *
 * @param {object} props ListItem props
 * @param {string} props.item ListItem text
 * @returns {string} ListItem component
 */
export default function ListItem({ item }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
        </View>
    );
}

ListItem.propTypes = {
    item: PropTypes.string.isRequired,
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
