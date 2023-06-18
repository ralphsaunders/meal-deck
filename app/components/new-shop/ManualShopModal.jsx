import React, { useState, useContext } from "react";
import { TouchableOpacity, Text, Modal, View, StyleSheet } from "react-native";
import { NewShopContext } from "../../globals/NewShopContext";

export function ManualShopModal() {
    const { manualModalVisible, setManualModalVisible } =
        useContext(NewShopContext);

    const onClose = () => {
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
                    <Text style={styles.modalTitle}>Your Picks</Text>
                    <Text>Pick your meals from this list</Text>
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
