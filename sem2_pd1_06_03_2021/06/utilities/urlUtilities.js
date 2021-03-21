"use strict";
// zwraca string po ? lub pusty string
// "http://localhost:4700?a=5&b=2" => "a=5&b=2"
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgsValsInt = exports.getArgsFromUrl = exports.isQueryInUrl = void 0;
/**
 * gets string after "?"
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2"
 * @return {string} - query part, e.g. "a=5&b=2"
 */
function getQueryFromUrl(url) {
    var query = url.split("?")[1];
    return query ? query : "";
}
function isEmptyString(text) {
    return !Boolean(text.trim());
}
function isQueryInUrl(url) {
    var query = getQueryFromUrl(url);
    return !isEmptyString(query);
}
exports.isQueryInUrl = isQueryInUrl;
/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2"
 * @return {Array<string>} - urlArgs part, e.g. ["a=5", "b=2"]
 */
function getArgsFromUrl(url) {
    var query = getQueryFromUrl(url);
    // if query === "", then urlArgs === [""]
    var urlArgs = query.split("&");
    return urlArgs;
}
exports.getArgsFromUrl = getArgsFromUrl;
/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2"
 * @return {Array<string>} - urlArgs part, e.g. ["a", "b"]
 */
function getArgsNames(url) {
    var urlArgs = getArgsFromUrl(url);
    var argsNames = urlArgs.map(function (arg) {
        return arg.split("=")[0];
    });
    return argsNames;
}
/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2"
 * @return {Array<string>} - urlArgs part, e.g. ["5", "2"]
 */
function getArgsValsStr(url) {
    var urlArgs = getArgsFromUrl(url);
    var argsNames = urlArgs.map(function (arg) {
        return arg.split("=")[1];
    });
    return argsNames;
}
function stringsToInts(numsAsStr) {
    return numsAsStr.map(function (elt) {
        return parseInt(elt);
    });
}
function getArgsValsInt(url) {
    var argsValsStr = getArgsValsStr(url);
    return stringsToInts(argsValsStr);
}
exports.getArgsValsInt = getArgsValsInt;
