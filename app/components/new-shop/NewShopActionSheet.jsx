import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";

export default function NewShopActionSheet({ onAction }) {
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
                let decision;

                switch (buttonIndex) {
                    case 0:
                        decision = "shuffle";
                        break;
                    case 1:
                        decision = "manual";
                        break;
                }

                onAction(decision);
            }
        );
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontSize: 40 }}>+</Text>
        </TouchableOpacity>
    );
}
