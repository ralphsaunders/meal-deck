import { useActionSheet } from "@expo/react-native-action-sheet";
import { useRoute, useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import { NewShopContext } from "../../globals/NewShopContext";
import { deleteShop } from "../../state/reducers/shopReducer";

export default function EditShopActionSheet() {
    const { showActionSheetWithOptions } = useActionSheet();
    const { setEditShopModalVisible } = useContext(NewShopContext);

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
                        setEditShopModalVisible(true);
                        break;
                    case 1:
                        navigation.goBack();
                        dispatch(deleteShop(route.params.item.id));
                        break;
                }
            }
        );
    };

    return <Item title="..." onPress={handlePress} />;
}
