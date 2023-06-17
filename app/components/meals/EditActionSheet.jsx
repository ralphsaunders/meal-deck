import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { deleteMeal } from "../../state/reducers/mealReducer";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function EditActionSheet({ onAction }) {
    const { showActionSheetWithOptions } = useActionSheet();
    const dispatch = useDispatch();
    const route = useRoute();
    const navigation = useNavigation();

    const handlePress = () => {
        const options = ["Edit", "Delete", "Cancel"];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            (buttonIndex) => {
                let decision = null;

                switch (buttonIndex) {
                    case 0:
                        decision = "edit";
                        break;
                    case 1:
                        decision = "delete";
                        dispatch(deleteMeal(route.params.id));
                        navigation.goBack();
                        break;
                }

                onAction(decision);
            }
        );
    };

    return <Item title="..." onPress={handlePress} />;
}
