import React, { useState, useContext } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    FlatList,
} from "react-native";
import { NewShopContext } from "../../globals/NewShopContext";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createShop } from "../../state/reducers/shopReducer";

function ManualShopModal({ meals }) {
    const dispatch = useDispatch();
    const { manualModalVisible, setManualModalVisible } =
        useContext(NewShopContext);

    const [selectedMeals, setSelectedMeals] = useState(meals);

    const onClose = () => {
        setManualModalVisible(false);
    };

    const onPress = (item) => {
        const selectedIndex = selectedMeals.findIndex(
            (meal) => meal.id === item.id
        );
        const selectedMealsCopy = [...selectedMeals];
        const updatedMeal = {
            ...item,
            selected: !item?.selected,
        };

        selectedMealsCopy[selectedIndex] = updatedMeal;
        setSelectedMeals(selectedMealsCopy);
    };

    const onSave = () => {
        const newShop = {
            id: uuidv4(),
            timestamp: Math.floor(Date.now() / 1000),
            meals: [...selectedMeals],
        };

        dispatch(createShop(newShop));

        // Close modal
        setManualModalVisible(false);
    };

    return (
        <Modal
            visible={manualModalVisible}
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

                    <Text style={styles.modalTitle}>Your Picks</Text>
                    <Text>Pick your meals from this list</Text>

                    <FlatList
                        data={selectedMeals}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onPress(item)}>
                                <Text>
                                    {item.selected && <>*</>}
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

const mapStateToProps = (state) => {
    return {
        meals: state.meal.meals,
    };
};

const ConnectedComponent = connect(mapStateToProps)(ManualShopModal);
export default ConnectedComponent;
