import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { deleteShop } from "../../state/reducers/shopReducer";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function EditShopActionSheet({ onEdit }) {
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
                switch (buttonIndex) {
                    case 0:
                        onEdit(route.params);
                        break;
                    case 1:
                        dispatch(deleteShop(route.params.id));
                        navigation.goBack();
                        break;
                    case 2:
                        onEdit(false);
                        break;
                }
            }
        );
    };

    return <Item title="..." onPress={handlePress} />;
}
