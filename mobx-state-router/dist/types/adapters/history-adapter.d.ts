import { History, Location } from 'history';
import { RouterState, RouterStore } from '../router-store';
/**
 * Responsible for keeping the browser address bar and the `RouterState`
 * in sync. It also provides a `goBack()` method to go back in history.
 */
export declare class HistoryAdapter {
    routerStore: RouterStore;
    history: History;
    constructor(routerStore: RouterStore, history: History);
    goToLocation: (location: Location) => void;
    goBack: () => void;
    observeRouterStateChanges: () => void;
}
export declare const routerStateToUrl: (routerStore: RouterStore, routerState: RouterState) => string;
