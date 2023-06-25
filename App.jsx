import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useContext } from "react";
import {
    TouchableOpacity,
    Text,
    Modal,
    View,
    StyleSheet,
    Button,
} from "react-native";
import { OverflowMenuProvider, Item } from "react-navigation-header-buttons";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { CreateUpdateMealModal } from "./app/components/meals/CreateUpdateMealModal";
import EditActionSheet from "./app/components/meals/EditActionSheet";
import MealDetailScreen from "./app/components/meals/MealDetailScreen";
import MealsScreen from "./app/components/meals/MealsScreen";
import ManualShopModal from "./app/components/new-shop/ManualShopModal";
import NewShopActionSheet from "./app/components/new-shop/NewShopActionSheet";
import { NewShopScreen } from "./app/components/new-shop/NewShopScreen";
import ShuffleShopModal from "./app/components/new-shop/ShuffleShopModal";
import EditShopActionSheet from "./app/components/shopping-list/EditShopActionSheet";
import ShoppingListDetailScreen from "./app/components/shopping-list/ShoppingListDetailScreen";
import ShoppingListsScreen from "./app/components/shopping-list/ShoppingListsScreen";
import { NewShopProvider, NewShopContext } from "./app/globals/NewShopContext";
import store, { persistor } from "./app/state/persistor";
import { totalMeals } from "./app/state/reducers/mealReducer";

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
        <>
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
        </>
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
                options={{
                    headerRight: () => <EditShopActionSheet />,
                }}
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

    const meals = useSelector((state) => totalMeals(state));

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
                {meals > 7 && (
                    <>
                        <ManualShopModal />
                        <ShuffleShopModal />
                    </>
                )}
            </NavigationContainer>
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
});
