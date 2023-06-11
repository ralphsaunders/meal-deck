import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function NewShopActionSheet() {
    const { showActionSheetWithOptions } = useActionSheet();

    const handlePress = () => {
        const options = ["Chef's Choice", "Your Picks", "Cancel"];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                // Handle button press
                if (buttonIndex === 0) {
                    console.log("Shuffle Shop");
                }

                if (buttonIndex === 1) {
                    console.log("Manual Shop");
                }
            }
        );
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 40 }}>+</Text>
        </TouchableOpacity>
    );
}
