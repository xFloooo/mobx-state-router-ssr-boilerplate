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
    constructor(routerStore: RouterStore, location: string);
    preload(): Promise<any>;
    goToLocation(location: string, search: string): Promise<any>;
}
