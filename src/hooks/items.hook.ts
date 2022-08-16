import { useState, useEffect } from "react";
import { itemsStore, ItemsState, initialState } from "../store/items.store";

export const useItem = () => {
    const [itemsState, setItemsState] = useState<ItemsState>(initialState);

    useEffect(() => {
        const subscription = itemsStore.subscribe(setItemsState);
        return () => {
            subscription.unsubscribe();
        };
    }, []);
    return itemsState;
};
