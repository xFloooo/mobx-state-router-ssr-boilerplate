import { RouterState, RouterStore } from '../router-store';
/**
 * Responsible for keeping the `RouterState` without sync with the Browser bar.
 */
export declare class StaticAdapter {
    routerStore: RouterStore;
    constructor(routerStore: RouterStore);
    goToLocation: (location: Location) => Promise<RouterState>;
}
