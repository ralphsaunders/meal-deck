import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NewShopContext } from "../../globals/NewShopContext";
import { connect } from "react-redux";

function NewShopActionSheet({ meals, DisplayComponent = null }) {
    const { showActionSheetWithOptions } = useActionSheet();
    const { setManualModalVisible, setAutoModalVisible } =
        useContext(NewShopContext);

    const allOptions = (index) => {
        switch (index) {
            case 0:
                setAutoModalVisible(true);
                break;
            case 1:
                setManualModalVisible(true);
                break;
            case 2:
                console.log("Add Meal");
                break;
        }
    };

    const limitedOptions = (index) => {
        switch (index) {
            case 0:
                console.log("Add Meal");
                break;
        }
    };

    const handlePress = () => {
        if (meals.length > 6) {
            const options = [
                "Chef's Choice",
                "Your Picks",
                "Add Meal",
                "Cancel",
            ];
            const cancelButtonIndex = 3;

            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                allOptions
            );
        } else {
            options = ["Add Meal", "Cancel"];
            cancelButtonIndex = 1;
            showActionSheetWithOptions(
                {
                    options,
                    cancelButtonIndex,
                },
                limitedOptions
            );
        }
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress} style={{ flex: 1 }}>
                {DisplayComponent ? (
                    <DisplayComponent />
                ) : (
                    <Text style={{ textAlign: "center", fontSize: 40 }}>+</Text>
                )}
            </TouchableOpacity>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        meals: state.meal.meals,
    };
};

const ConnectedComponent = connect(mapStateToProps)(NewShopActionSheet);
export default ConnectedComponent;
