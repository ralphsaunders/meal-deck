import React, { createContext, useState } from "react";

const NewShopContext = createContext();

const NewShopProvider = ({ children }) => {
    const [autoModalVisible, setAutoModalVisible] = useState(false);
    const [manualModalVisible, setManualModalVisible] = useState(false);
    const [mealModalVisible, setMealModalVisible] = useState(false);
    const [editShopModalVisible, setEditShopModalVisible] = useState(false);

    return (
        <NewShopContext.Provider
            value={{
                autoModalVisible,
                setAutoModalVisible,
                manualModalVisible,
                setManualModalVisible,
                mealModalVisible,
                setMealModalVisible,
                editShopModalVisible,
                setEditShopModalVisible,
            }}
        >
            {children}
        </NewShopContext.Provider>
    );
};

export { NewShopContext, NewShopProvider };
