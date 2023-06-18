import React, { createContext, useState } from "react";

const NewShopContext = createContext();

const NewShopProvider = ({ children }) => {
    const [autoModalVisible, setAutoModalVisible] = useState(false);
    const [manualModalVisible, setManualModalVisible] = useState(false);

    return (
        <NewShopContext.Provider
            value={{
                autoModalVisible,
                setAutoModalVisible,
                manualModalVisible,
                setManualModalVisible,
            }}
        >
            {children}
        </NewShopContext.Provider>
    );
};

export { NewShopContext, NewShopProvider };
