import {observable, action, runInAction, toJS} from "mobx"
export class ItemsStore {
    rootStore = null;
    @observable items = [];

    constructor(rootStore, initialState){
        this.rootStore = rootStore;
        if (initialState){
            this.items = initialState;
        }
    }

    @action
    loadItems(){
        //emulate async load
        return new Promise(resolve => {
            setTimeout(() => {
                runInAction(() => {
                    this.items.replace(['item-1', 'item-2', 'item-3']);
                    resolve();
                });
            }, 500);
        });
    }

    extractState(){
        return toJS(this.items);
    }
}
