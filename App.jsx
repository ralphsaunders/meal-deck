import React, { useState } from "react";
import { TouchableOpacity, Text, Modal, View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MealsScreen } from "./app/components/MealsScreen";
import { MealDetailScreen } from "./app/components/MealDetailScreen";
import { ShoppingListsScreen } from "./app/components/ShoppingListsScreen";
import { ShoppingListDetailScreen } from "./app/components/ShoppingListDetailScreen";
import { NewShopScreen } from "./app/components/NewShopScreen";
import NewShopActionSheet from "./app/components/NewShopActionSheet";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MealsStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Meals" component={MealsScreen} />
        <Stack.Screen name="MealDetail" component={MealDetailScreen} />
    </Stack.Navigator>
);

const ShoppingListsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Shopping Lists"
                component={ShoppingListsScreen}
            />
            <Stack.Screen
                name="ShoppingListDetail"
                component={ShoppingListDetailScreen}
            />
        </Stack.Navigator>
    );
};

/**
 * Root App component
 * @returns {string} App component tree
 */
export default function App() {
    const [newShopModalVisible, setNewShopModalVisible] = useState(false);

    const handleNewShopPress = () => {
        setNewShopModalVisible(true);
    };
    const handleModalClose = () => {
        setNewShopModalVisible(false);
    };

    return (
        <ActionSheetProvider>
            <View style={styles.container}>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="MealsTab"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <Tab.Screen
                            name="MealsTab"
                            component={MealsStack}
                            options={{
                                tabBarLabel: "Meals",
                            }}
                        />
                        <Tab.Screen
                            name="ShoppingListTab"
                            component={ShoppingListsStack}
                            options={{
                                tabBarLabel: "Shopping Lists",
                            }}
                        />
                        <Tab.Screen
                            name="New Shop"
                            component={NewShopScreen}
                            options={{
                                tabBarLabel: "",
                                tabBarButton: (props) => (
                                    <NewShopActionSheet {...props} />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                    <Modal
                        visible={newShopModalVisible}
                        animationType="slide"
                        presentationStyle="pageSheet"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TouchableOpacity
                                    onPress={handleModalClose}
                                    style={styles.modalCloseButton}
                                >
                                    <Text style={styles.modalCloseButtonText}>
                                        Close
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>New Shop</Text>
                                <Text>Modal content goes here</Text>
                            </View>
                        </View>
                    </Modal>
                </NavigationContainer>
            </View>
        </ActionSheetProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBarButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tabBarButtonText: {
        fontSize: 24,
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    modalTitle: {
        fontSize: 20,
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
