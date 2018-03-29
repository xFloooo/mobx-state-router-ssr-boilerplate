import { RouterState, RouterStore } from 'mobx-state-router';
import { routes } from './routes';
import { ItemsStore } from './items';

const notFound = new RouterState('notFound');

export class RootStore {
    routerStore = null;
    itemsStore = null;

    constructor(initialState){
        if (initialState && initialState.routerStore){
            this.routerStore = new RouterStore(this, routes, notFound, initialState.routerStore);
        }
        else{
            this.routerStore = new RouterStore(this, routes, notFound);
        }

        if (initialState && initialState.itemsStore){
            this.itemsStore = new ItemsStore(this, initialState.itemsStore);
        }
        else{
            this.itemsStore = new ItemsStore(this);
        }
    }

    extractInitialState(){
        return{
            itemsStore: this.itemsStore.extractState(),
            routerStore: this.routerStore.getCurrentRoute()
        }
    }
}
