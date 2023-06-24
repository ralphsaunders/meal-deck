import { useRoute } from "@react-navigation/native";
import React, { useState, useContext, useEffect } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { NewShopContext } from "../../globals/NewShopContext";
import { selectMeals } from "../../state/reducers/mealReducer";
import { updateShop, selectShopById } from "../../state/reducers/shopReducer";

function EditShopModal() {
    const dispatch = useDispatch();
    const route = useRoute();
    const { editShopModalVisible, setEditShopModalVisible } =
        useContext(NewShopContext);

    const meals = useSelector((state) => selectMeals(state));
    const shop = useSelector((state) =>
        selectShopById(state, route.params.item.id)
    );

    const [selectedMeals, setSelectedMeals] = useState([...shop.meals]);

    const onClose = () => {
        setEditShopModalVisible(false);
    };

    const onPress = (item) => {
        const pressedItem = selectedMeals.indexOf(item.id);
        const copySelection = [...selectedMeals];
        if (pressedItem > -1) {
            // deselection
            copySelection.splice(pressedItem, 1);
        } else {
            // new selection
            copySelection.push(item.id);
        }
        setSelectedMeals(copySelection);
    };

    const onSave = () => {
        const updatedShop = {
            id: shop.id,
            changes: {
                meals: selectedMeals,
            },
        };
        dispatch(updateShop(updatedShop));
        setEditShopModalVisible(false);
    };

    return (
        <Modal
            visible={editShopModalVisible}
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

                    <TouchableOpacity onPress={onSave}>
                        <Text style={styles.modalCloseButtonText}>Save</Text>
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>Edit Shop</Text>

                    <Text style={styles.modalTitle}>Meals</Text>
                    <FlatList
                        data={meals}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onPress(item)}>
                                <Text>
                                    {selectedMeals.includes(item.id) && <>*</>}
                                    {item.name}
                                </Text>
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

export default EditShopModal;
