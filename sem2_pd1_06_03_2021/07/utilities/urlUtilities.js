"use strict";

/**
 * gets string after "?"
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2"
 * @return {string} - query part, e.g. "a=5&b=2"
 */
function getQueryFromUrl(url) {
  let query = url.split("?")[1];
  return query ? query : "";
}

function isEmptyString(text) {
  return !Boolean(text.trim());
}

function isQueryInUrl(url) {
  let query = getQueryFromUrl(url);
  return !isEmptyString(query);
}

/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2"
 * @return {Array<string>} - urlArgs part, e.g. ["a=5", "b=2"]
 */
function getArgsFromUrl(url) {
  let query = getQueryFromUrl(url);
  // if query === "", then urlArgs === [""]
  let urlArgs = query.split("&");
  return urlArgs;
}

/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2"
 * @return {Array<string>} - urlArgs part, e.g. ["a", "b"]
 */
function getArgsNames(url) {
  let urlArgs = getArgsFromUrl(url);
  let argsNames = urlArgs.map((arg) => {
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
  let urlArgs = getArgsFromUrl(url);
  let argsNames = urlArgs.map((arg) => {
    return arg.split("=")[1];
  });
  return argsNames;
}

function stringsToInts(numsAsStr) {
  return numsAsStr.map((elt) => {
    return parseInt(elt);
  });
}

function getArgsValsInt(url) {
  let argsValsStr = getArgsValsStr(url);
  return stringsToInts(argsValsStr);
}

module.exports = { isQueryInUrl, getArgsFromUrl, getArgsValsInt, getArgsNames };
