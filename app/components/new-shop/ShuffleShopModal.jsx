import React, { useState } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    Button,
    FlatList,
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

function ShuffleShopModal({ visible = false, setVisible, meals }) {
    const navigation = useNavigation();

    const onClose = () => {
        setVisible(false);
    };

    const onAddMeals = () => {
        setVisible(false);
        navigation.navigate("Meals");
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.modalCloseButton}
                    >
                        <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Chef's Choice</Text>

                    {meals.length > 6 ? (
                        <FlatList
                            data={meals}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => onPress(props.item)}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <>
                            <Text>More Meals Required</Text>
                            <Text>
                                Add atleast 7 meals to your Meal Deck before
                                creating a shop
                            </Text>
                            <Button onPress={onAddMeals} title="Add Meals" />
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    modalTitle: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalCloseButton: {
        alignSelf: "flex-start",
        paddingVertical: 8,
        paddingHorizontal: 0,
        marginBottom: 10,
    },
    modalCloseButtonText: {
        fontSize: 16,
        color: "#007AFF", // iOS blue color
    },
});

const mapStateToProps = (state) => {
    return {
        meals: state.meal.meals,
    };
};

const ConnectedShuffleShopScreen = connect(mapStateToProps)(ShuffleShopModal);

export default ConnectedShuffleShopScreen;
