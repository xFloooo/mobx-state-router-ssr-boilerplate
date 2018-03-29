"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var generate_url_1 = require("../adapters/generate-url");
function isLeftClickEvent(event) {
    return event.button === 0;
}
function isModifiedEvent(event) {
    return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}
/**
 * Creates an <a> element that links to a router state. Redirects to the target
 * state without reloading the entire app, thus avoiding potential flickers.
 */
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleClick = function (event) {
            // Ignore if link is clicked using a modifier key or not left-clicked
            if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
                return undefined;
            }
            // Prevent default action which reloads the app
            event.preventDefault();
            // Change the router state to trigger a refresh
            var _a = _this.props, routerStore = _a.routerStore, toState = _a.toState;
            return routerStore.goTo(toState);
        };
        return _this;
    }
    Link.prototype.render = function () {
        var _a = this.props, routerStore = _a.routerStore, toState = _a.toState, children = _a.children;
        return (React.createElement("a", { href: generate_url_1.routerStateToUrl(routerStore, toState), onClick: this.handleClick }, children));
    };
    return Link;
}(React.Component));
exports.Link = Link;
//# sourceMappingURL=link.js.map