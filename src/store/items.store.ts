import { SetStateAction, Dispatch } from "react";
import { Subject } from "rxjs";

const subject = new Subject<ItemsState>();

export interface Item {
    id: string;
    title: string;
}

export interface ItemsState {
    items: Item[]
}


export const initialState: ItemsState = {
    items: []
};

let state = initialState;

export const itemsStore = {
    subscribe: (setItemsState: Dispatch<SetStateAction<ItemsState>>) => subject.subscribe((state) => setItemsState(state)),
    addItem: (item: Omit<Item, "id">) => {
        state = {
            ...state,
            items: [
                ...state.items,
                {
                    id: Date.now().toString(),
                    title: item.title,
                }
            ]
        }
        subject.next(state);
    }
};