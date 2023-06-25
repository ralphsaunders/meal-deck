import React, { useState, useEffect, useRef, useContext } from "react";
import {
    TouchableOpacity,
    Pressable,
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
import { useDispatch } from "react-redux";
import Feather from "@expo/vector-icons/Feather";

import { NewShopContext } from "../../globals/NewShopContext";
import { createMeal, updateMeal } from "../../state/reducers/mealReducer";

export function CreateUpdateMealModal({ meal = false }) {
    const dispatch = useDispatch();
    const { mealModalVisible, setMealModalVisible } =
        useContext(NewShopContext);
    const [name, setName] = useState(meal ? meal.name : "New Meal");
    const [ingredients, setIngredients] = useState(
        meal ? meal.ingredients : ""
    );

    // When meal prop changes
    useEffect(() => {
        // Set form state to requested meal
        setName(meal.name || "New Meal");
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
                changes: {
                    name,
                    ingredients,
                },
            };

            dispatch(updateMeal(newMeal));
        } else {
            // Create a new meal
            const newMeal = {
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
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={40}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.secondaryBtn}>Close</Text>
                        </TouchableOpacity>

                        <View style={styles.header}>
                            <Text
                                style={styles.headerText}
                                adjustsFontSizeToFit={true}
                                numberOfLines={2}
                            >
                                {name}
                            </Text>
                            <Pressable onPress={onSave}>
                                <Feather
                                    name="plus-circle"
                                    size={40}
                                    color="#3F37C9"
                                />
                            </Pressable>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Name:</Text>
                            <TextInput
                                style={styles.formInput}
                                value={name}
                                onChangeText={setName}
                                returnKeyType="next"
                                clearTextOnFocus
                                numberOfLines={1}
                                inputMode="text"
                                placeholder="Enter a name"
                                maxLength={70}
                                onSubmitEditing={() =>
                                    ingredientsRef.current.focus()
                                }
                                onKeyPress={(e) =>
                                    handleKeyPress(e, nameRef, ingredientsRef)
                                }
                                ref={nameRef}
                                autoFocus={!meal?.id}
                            />
                        </View>

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
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "flex-start",
    },
    ingredientInput: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    headerText: {
        fontSize: 32,
        fontWeight: "bold",
        flex: 1,
        marginRight: 10,
        color: "#212529",
    },
    primaryBtn: {
        color: "#3F37C9",
        fontWeight: "bold",
        fontSize: 14,
    },
    secondaryBtn: {
        color: "#4361EE",
        fontSize: 14,
    },
    formRow: {
        flexDirection: "row",
        paddingBottom: 4,
        marginBottom: 10,
        overflow: "hidden",
        borderBottomColor: "#E9ECEF",
        borderBottomWidth: 1,
    },
    formLabel: {
        marginRight: 4,
    },
    formInput: {
        flex: 1,
    },
});
