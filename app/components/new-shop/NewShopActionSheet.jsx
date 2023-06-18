import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NewShopContext } from "../../globals/NewShopContext";

export default function NewShopActionSheet({ DisplayComponent = null }) {
    const { showActionSheetWithOptions } = useActionSheet();
    const { setManualModalVisible, setAutoModalVisible } =
        useContext(NewShopContext);

    const handlePress = () => {
        const options = ["Chef's Choice", "Your Picks", "Cancel"];
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        setAutoModalVisible(true);
                        break;
                    case 1:
                        setManualModalVisible(true);
                        break;
                }
            }
        );
    };

    return (
        <>
            {DisplayComponent ? (
                <DisplayComponent onPress={handlePress} />
            ) : (
                <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center", fontSize: 40 }}>+</Text>
                </TouchableOpacity>
            )}
        </>
    );
}
