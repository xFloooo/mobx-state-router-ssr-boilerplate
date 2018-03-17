import { RouterStore } from '../router-store';
/**
 * Adapter for static routes
 *
 */
export declare class StaticAdapter {
    routerStore: RouterStore;
    fullLocation: string;
    location: string;
    search: string;
    readyLoad: Promise<any>;
    constructor(routerStore: RouterStore, location: string);
    preloadReady(): Promise<any>;
    goToLocation(location: string, search: string): Promise<any>;
}
