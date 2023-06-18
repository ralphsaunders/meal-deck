import React, { useState, useEffect, useRef, useContext } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    TextInput,
    Keyboard,
    ScrollView,
    Button,
    Platform,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
} from "react-native";
import "react-native-get-random-values"; // before uuid
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { createMeal, updateMeal } from "../../state/reducers/mealReducer";
import { NewShopContext } from "../../globals/NewShopContext";

export function CreateUpdateMealModal({ meal = false }) {
    const dispatch = useDispatch();
    const { mealModalVisible, setMealModalVisible } =
        useContext(NewShopContext);
    const [name, setName] = useState(meal ? meal.name : "Add Meal");
    const [ingredients, setIngredients] = useState(
        meal ? meal.ingredients : ""
    );

    // When meal prop changes
    useEffect(() => {
        // Set form state to requested meal
        setName(meal.name || "Add Meal");
        setIngredients(meal.ingredients || "");
    }, [meal]);

    const nameRef = useRef(null);
    const ingredientsRef = useRef(null);

    const onClose = () => {
        setMealModalVisible(false);
    };

    const handleKeyPress = (e, currentFieldRef, nextFieldRef) => {
        if (e.nativeEvent.key === "ArrowDown") {
            if (nextFieldRef.current) {
                nextFieldRef.current.focus();
            } else {
                Keyboard.dismiss();
            }
        } else if (e.nativeEvent.key === "ArrowUp") {
            if (currentFieldRef.current) {
                currentFieldRef.current.focus();
            }
        } else if (
            e.nativeEvent.key === "Enter" ||
            e.nativeEvent.key === "Done"
        ) {
            if (currentFieldRef.current) {
                currentFieldRef.current.blur();
            }
        }
    };

    const ingredientsPlaceholder = [
        "Onions",
        "Tomatoes",
        "Garlic",
        "Red Pepper",
        "Green Peppers",
        "Fresh Coriander",
    ].join("\n");

    const onSave = () => {
        if (meal.id) {
            // Update existing meal
            const newMeal = {
                id: meal.id,
                name,
                ingredients,
            };

            dispatch(updateMeal(newMeal));
        } else {
            // Create a new meal
            const newMeal = {
                id: uuidv4(),
                name,
                ingredients,
            };

            dispatch(createMeal(newMeal));
        }

        Keyboard.dismiss();
        onClose();
    };

    return (
        <Modal
            visible={mealModalVisible}
            animationType="slide"
            presentationStyle="pageSheet"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPress={onClose}
                                style={styles.modalCloseButton}
                            >
                                <Text style={styles.modalCloseButtonText}>
                                    Close
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={onSave}
                                style={styles.modalDoneButton}
                            >
                                <Text style={styles.modalCloseButtonText}>
                                    Save
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>{name}</Text>

                            <Text>Name:</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                returnKeyType="next"
                                clearTextOnFocus
                                inputMode="text"
                                placeholder="Enter a name"
                                onSubmitEditing={() =>
                                    ingredientsRef.current.focus()
                                }
                                onKeyPress={(e) =>
                                    handleKeyPress(e, nameRef, ingredientsRef)
                                }
                                ref={nameRef}
                                autoFocus={meal?.id ? false : true}
                            />

                            <TextInput
                                value={ingredients}
                                numberOfLines={8}
                                placeholder={ingredientsPlaceholder}
                                ref={ingredientsRef}
                                onChangeText={setIngredients}
                                keyboardType="default"
                                multiline={true}
                                blurOnSubmit={false}
                                style={styles.ingredientInput}
                            />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    modalDoneButton: {
        alignSelf: "flex-end",
        paddingVertical: 8,
        paddingHorizontal: 0,
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
    ingredientInput: {
        borderWidth: 3,
        borderColor: "#000",
    },
});
