"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: How to get the following imports working without allowSyntheticDefaultImports
// import find from 'lodash/find';
// import isEqual from 'lodash/isEqual';
var _ = require("lodash");
var mobx_1 = require("mobx");
/**
 * Holds the state of the router. Always use the constructor to create
 * an instance. Once an instance is created, don't mutate it - create a
 * fresh instance instead.
 */
var RouterState = /** @class */ (function () {
    /**
     * Creates RouterState
     * @param {string} routeName, e.g. 'department'
     * @param {StringMap} params, e.g. { id: 'electronics' }
     * @param {Object} queryParams, e.g. { q: 'apple' } or { items: ['E1', 'E2'] }
     */
    function RouterState(routeName, params, queryParams) {
        if (params === void 0) { params = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        this.routeName = routeName;
        this.params = params;
        this.queryParams = queryParams;
    }
    RouterState.prototype.isEqual = function (other) {
        return (this.routeName === other.routeName &&
            _.isEqual(this.params, other.params) &&
            _.isEqual(this.queryParams, other.queryParams));
    };
    return RouterState;
}());
exports.RouterState = RouterState;
var INITIAL_ROUTE_NAME = '__initial__';
var INITIAL_ROUTE_PATTERN = '';
/**
 * Holds the router state. It allows transitioning between states using
 * the `goTo()` method.
 */
var RouterStore = /** @class */ (function () {
    function RouterStore(rootStore, routes, notFoundState, initialState) {
        this.rootStore = rootStore;
        this.routes = routes;
        this.notFoundState = notFoundState;
        // if not initial state, set default
        if (!initialState) {
            initialState = {
                name: INITIAL_ROUTE_NAME,
                pattern: INITIAL_ROUTE_PATTERN
            };
        }
        // Set initial state to an internal initial state
        this.routes.push(initialState);
        this.routerState = new RouterState(initialState.name);
    }
    RouterStore.prototype.goTo = function (toStateOrRouteName, params, queryParams) {
        if (params === void 0) { params = {}; }
        if (queryParams === void 0) { queryParams = {}; }
        var toState = toStateOrRouteName instanceof RouterState
            ? toStateOrRouteName
            : new RouterState(toStateOrRouteName, params, queryParams);
        var fromState = this.routerState;
        return this.transition(fromState, toState);
    };
    RouterStore.prototype.goToNotFound = function () {
        this.setRouterState(this.notFoundState);
    };
    RouterStore.prototype.getRoute = function (routeName) {
        var route = _.find(this.routes, { name: routeName });
        if (!route) {
            throw new Error("Route " + routeName + " does not exist");
        }
        return route;
    };
    RouterStore.prototype.extractState = function () {
        var route = this.getRoute(this.routerState.routeName);
        return {
            name: route.name,
            pattern: route.pattern
        };
    };
    /**
     * Requests a transition from fromState to toState. Note that the
     * actual transition may be different from the requested one
     * based on enter and exit hooks.
     */
    RouterStore.prototype.transition = function (fromState, toState) {
        var _this = this;
        // If fromState = toState, do nothing
        // This is important to avoid infinite loops caused by RouterStore.goTo()
        // triggering a change in history, which in turn causes HistoryAdapter
        // to call RouterStore.goTo().
        if (fromState.isEqual(toState)) {
            /* istanbul ignore if */
            if (process.env.NODE_ENV === 'development') {
                var fromStateStr = JSON.stringify(fromState);
                console.log("RouterStore.transition(" + fromStateStr + "):", 'states are equal, skipping');
            }
            return Promise.resolve(toState);
        }
        /* istanbul ignore if */
        if (process.env.NODE_ENV === 'development') {
            var fromStateStr = JSON.stringify(fromState);
            var toStateStr = JSON.stringify(toState);
            console.log("RouterStore.transition(" + fromStateStr + ", " + toStateStr + ")");
        }
        // Get transition hooks from the two states
        var _a = this.getRoute(fromState.routeName), beforeExit = _a.beforeExit, onExit = _a.onExit;
        var _b = this.getRoute(toState.routeName), beforeEnter = _b.beforeEnter, onEnter = _b.onEnter;
        // Call the transition hook chain
        return ([beforeExit, beforeEnter, onExit, onEnter]
            .reduce(function (promise, hook) {
            return hook
                ? promise.then(function () { return hook(fromState, toState, _this); })
                : promise;
        }, Promise.resolve())
            .then(function () {
            _this.setRouterState(toState);
            return toState;
        })
            .catch(function (redirectState) {
            if (redirectState instanceof RouterState === false) {
                throw new Error('toState is undefined');
            }
            _this.setRouterState(redirectState);
            return redirectState;
        }));
    };
    RouterStore.prototype.setRouterState = function (routerState) {
        this.routerState = routerState;
    };
    __decorate([
        mobx_1.observable.ref
    ], RouterStore.prototype, "routerState", void 0);
    __decorate([
        mobx_1.action
    ], RouterStore.prototype, "setRouterState", null);
    return RouterStore;
}());
exports.RouterStore = RouterStore;
//# sourceMappingURL=router-store.js.map