"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var query_string_1 = require("query-string");
var router_store_1 = require("../router-store");
var match_url_1 = require("./match-url");
/**
 * Adapter for static routes
 *
 */
var StaticAdapter = /** @class */ (function () {
    function StaticAdapter(routerStore, location) {
        var parsedUrl = query_string_1.parseUrl(location);
        this.routerStore = routerStore;
        this.fullLocation = location;
        this.location = parsedUrl.url;
        this.search = query_string_1.extract(location);
        this.search = '';
    }
    StaticAdapter.prototype.preload = function () {
        if (process.env.NODE_ENV === 'development') {
            console.log("StaticAdapter.preload(" + JSON.stringify("" + this.fullLocation) + ")");
        }
        return Promise.resolve(this.goToLocation(this.location, this.search));
    };
    StaticAdapter.prototype.goToLocation = function (location, search) {
        if (process.env.NODE_ENV === 'development') {
            console.log("StaticAdapter.goToLocation(" + JSON.stringify("" + this.fullLocation) + ")");
        }
        var routes = this.routerStore.routes;
        var route;
        var params = {};
        for (var i = 0; i < routes.length; i++) {
            route = routes[i];
            params = match_url_1.matchUrl(location, route.pattern);
            if (params) {
                break;
            }
        }
        if (!params || !route) {
            return Promise.resolve(this.routerStore.goToNotFound());
        }
        else {
            return Promise.resolve(this.routerStore.goTo(new router_store_1.RouterState(route.name, params, query_string_1.parse(search))));
        }
    };
    return StaticAdapter;
}());
exports.StaticAdapter = StaticAdapter;
//# sourceMappingURL=static-adapter.js.map