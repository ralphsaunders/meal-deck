import React, { useState, useEffect, useRef } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    TextInput,
} from "react-native";

export function AddMealModal({ visible = false, setVisible }) {
    const [name, setName] = useState("Add Meal");
    const [ingredients, setIngredients] = useState("");

    const nameRef = useRef(null);
    const ingredientsRef = useRef(null);

    const onClose = () => {
        setVisible(false);
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
                    <Text style={styles.modalTitle}>{name}</Text>
                    <Text>Add a meal to your deck</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        returnKeyType="next"
                        clearTextOnFocus
                        onSubmitEditing={() => ingredientsRef.current.focus()}
                        onKeyPress={(e) =>
                            handleKeyPress(e, nameRef, ingredientsRef)
                        }
                        ref={nameRef}
                        autoFocus
                    />

                    <TextInput
                        value={ingredients}
                        placeholder="ingredients"
                        numberOfLines={8}
                        multiline
                        onChangeText={setIngredients}
                        onKeyPress={(e) =>
                            handleKeyPress(e, ingredientsRef, nameRef)
                        }
                        ref={ingredientsRef}
                        blurOnSubmit={false}
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
