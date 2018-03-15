/**
 * A map from string to string (key-value pairs). Based on:
 * https://stackoverflow.com/questions/13631557/typescript-objects-as-dictionary-types-as-in-c-sharp
 *
 * Example:
 * {
 *     id: 'electronics',
 *     category: 'computers'
 * }
 */
export interface StringMap {
    [param: string]: string;
}
/**
 * Holds the state of the router. Always use the constructor to create
 * an instance. Once an instance is created, don't mutate it - create a
 * fresh instance instead.
 */
export declare class RouterState {
    readonly routeName: string;
    readonly params: StringMap;
    readonly queryParams: Object;
    /**
     * Creates RouterState
     * @param {string} routeName, e.g. 'department'
     * @param {StringMap} params, e.g. { id: 'electronics' }
     * @param {Object} queryParams, e.g. { q: 'apple' } or { items: ['E1', 'E2'] }
     */
    constructor(routeName: string, params?: StringMap, queryParams?: Object);
    isEqual(other: RouterState): boolean;
}
export interface TransitionHook {
    (fromState: RouterState, toState: RouterState, routerStore: RouterStore): Promise<void>;
}
/**
 * A `Route` consists of a name, a URL matching pattern and optional
 * enter/exit hooks. The `RouterStore` is initialized with an array
 * of routes which it uses to transition between states.
 */
export interface Route {
    name: string;
    pattern: string;
    beforeExit?: TransitionHook;
    beforeEnter?: TransitionHook;
    onExit?: TransitionHook;
    onEnter?: TransitionHook;
}
/**
 * Holds the router state. It allows transitioning between states using
 * the `goTo()` method.
 */
export declare class RouterStore {
    rootStore: any;
    routes: Route[];
    notFoundState: RouterState;
    routerState: RouterState;
    constructor(rootStore: any, routes: Route[], notFoundState: RouterState);
    /**
     * Requests a transition to a new state. Note that the actual transition
     * may be different from the requested one based on enter and exit hooks.
     */
    goTo(toState: RouterState): Promise<RouterState>;
    goTo(routeName: string, params?: StringMap, queryParams?: Object): Promise<RouterState>;
    goToNotFound(): void;
    getRoute(routeName: string): Route;
    /**
     * Requests a transition from fromState to toState. Note that the
     * actual transition may be different from the requested one
     * based on enter and exit hooks.
     */
    private transition(fromState, toState);
    private setRouterState(routerState);
}
