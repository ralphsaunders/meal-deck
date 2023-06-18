import React, { createContext, useState } from "react";

const NewShopContext = createContext();

const NewShopProvider = ({ children }) => {
    const [autoModalVisible, setAutoModalVisible] = useState(false);
    const [manualModalVisible, setManualModalVisible] = useState(false);
    const [mealModalVisible, setMealModalVisible] = useState(false);

    return (
        <NewShopContext.Provider
            value={{
                autoModalVisible,
                setAutoModalVisible,
                manualModalVisible,
                setManualModalVisible,
                mealModalVisible,
                setMealModalVisible,
            }}
        >
            {children}
        </NewShopContext.Provider>
    );
};

export { NewShopContext, NewShopProvider };
