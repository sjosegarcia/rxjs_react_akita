import { Store, StoreConfig } from "@datorama/akita";

export interface Item {
    id: string;
    title: string;
}

export interface ItemsState {
    items: Item[];
}

export const createInitialState: ItemsState = { 
    items: []
};

@StoreConfig({ name: "items" })
export class ItemsStore extends Store<ItemsState> {
    constructor() {
        super(createInitialState);
    }
}