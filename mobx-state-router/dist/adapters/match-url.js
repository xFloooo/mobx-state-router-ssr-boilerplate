"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pathToRegexp = require("path-to-regexp");
var patternInfoCache = {};
var getPatternInfo = function (pattern) {
    var patternInfo = patternInfoCache[pattern];
    if (patternInfo) {
        return patternInfo;
    }
    var keys = [];
    var regExp = pathToRegexp(pattern, keys);
    var newPatternInfo = { regExp: regExp, keys: keys };
    patternInfoCache[pattern] = newPatternInfo;
    return newPatternInfo;
};
/**
 * Matches a URL to a pattern.
 * For example,
 *     matchUrl('/departments/electronics', '/departments/:id'
 *     => { id: 'electronics' }
 */
exports.matchUrl = function (url, pattern) {
    var _a = getPatternInfo(pattern), regExp = _a.regExp, keys = _a.keys;
    var match = regExp.exec(url);
    if (!match) {
        return null;
    }
    var matchedUrl = match[0], values = match.slice(1);
    return keys.reduce(function (params, key, index) {
        params[key.name] = values[index];
        return params;
    }, {});
};
//# sourceMappingURL=match-url.js.map