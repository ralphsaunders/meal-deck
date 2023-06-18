import React, { useState, useContext } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./app/state/persistor";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    Button,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import MealsScreen from "./app/components/meals/MealsScreen";
import MealDetailScreen from "./app/components/meals/MealDetailScreen";
import ShoppingListsScreen from "./app/components/shopping-list/ShoppingListsScreen";
import { ShoppingListDetailScreen } from "./app/components/shopping-list/ShoppingListDetailScreen";
import { NewShopScreen } from "./app/components/new-shop/NewShopScreen";
import NewShopActionSheet from "./app/components/new-shop/NewShopActionSheet";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { ManualShopModal } from "./app/components/new-shop/ManualShopModal";
import ShuffleShopModal from "./app/components/new-shop/ShuffleShopModal";
import { CreateUpdateMealModal } from "./app/components/meals/CreateUpdateMealModal";
import { OverflowMenuProvider, Item } from "react-navigation-header-buttons";
import EditActionSheet from "./app/components/meals/EditActionSheet";

import { NewShopProvider, NewShopContext } from "./app/globals/NewShopContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MealsStack = () => {
    const { mealModalVisible, setMealModalVisible } =
        useContext(NewShopContext);
    const [meal, setMeal] = useState(false);

    const onAddMeal = () => {
        setMeal(false);
        setMealModalVisible(true);
    };

    const onEdit = (meal) => {
        setMeal(meal);
        setMealModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Meals"
                    component={MealsScreen}
                    options={{
                        headerRight: () => (
                            <Item title="Add Meal" onPress={onAddMeal} />
                        ),
                    }}
                />
                <Stack.Screen
                    name="MealDetail"
                    component={MealDetailScreen}
                    options={{
                        headerRight: () => <EditActionSheet onEdit={onEdit} />,
                    }}
                />
            </Stack.Navigator>
            <CreateUpdateMealModal
                visible={mealModalVisible}
                setVisible={setMealModalVisible}
                meal={meal}
            />
        </View>
    );
};

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

function App() {
    const {
        autoModalVisible,
        setAutoModalVisible,
        manualModalVisible,
        setManualModalVisible,
    } = useContext(NewShopContext);

    return (
        <View style={styles.container}>
            <NavigationContainer>
                <OverflowMenuProvider>
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
                                tabBarButton: (props) => <NewShopActionSheet />,
                            }}
                        />
                    </Tab.Navigator>
                </OverflowMenuProvider>
            </NavigationContainer>
            <ManualShopModal />
            <ShuffleShopModal />
        </View>
    );
}

/**
 * Root App component
 * @returns {string} App component tree
 */
export default function Root() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NewShopProvider>
                    <ActionSheetProvider>
                        <App />
                    </ActionSheetProvider>
                </NewShopProvider>
            </PersistGate>
        </Provider>
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
