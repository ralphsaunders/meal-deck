import { useNavigation } from "@react-navigation/native";
import React, { useState, useContext } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    FlatList,
} from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";

import { pickRandom } from "../../../helpers/pick-random/PickRandom";
import { NewShopContext } from "../../globals/NewShopContext";
import { selectMeals } from "../../state/reducers/mealReducer";
import { createShop } from "../../state/reducers/shopReducer";

function ShuffleShopModal() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { autoModalVisible, setAutoModalVisible } =
        useContext(NewShopContext);
    const meals = useSelector((state) => selectMeals(state));

    const randomMeals = pickRandom(meals, 7);
    const [selectedMeals, setSelectedMeals] = useState(randomMeals);

    const onClose = () => {
        setAutoModalVisible(false);
    };

    /**
     * Swap tapped meal with another meal from the store, avoiding any meals
     * that are currently in the list.
     */
    const swap = (item) => {
        const exclude = [...selectedMeals.map((meal) => meal.id)];

        const remainingOptions = meals.filter(
            (meal) => !exclude.includes(meal.id)
        );

        console.log("remaining", remainingOptions.length);
        const swapItem = pickRandom(remainingOptions, 1)[0];
        const swapIndex = selectedMeals.findIndex(
            (meal) => meal.id === item.id
        );

        const newSelection = [...selectedMeals];
        newSelection[swapIndex] = swapItem;

        setSelectedMeals(newSelection);
    };

    const onSave = () => {
        const newShop = [...selectedMeals].map((meal) => meal.id);
        dispatch(createShop(newShop));

        // Close modal
        setAutoModalVisible(false);

        //navigation.navigate('ShoppingListDetail', { item: { id: newShop.id } });
    };

    return (
        <Modal
            visible={autoModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.modalCloseButton}
                    >
                        <Text style={styles.modalCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSave}>
                        <Text style={styles.modalCloseButtonText}>Save</Text>
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Chef&apos;s Choice</Text>

                    <FlatList
                        data={selectedMeals}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => swap(item)}>
                                <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
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

export default ShuffleShopModal;
