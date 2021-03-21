// zwraca string po ? lub pusty string
// "http://localhost:4700?a=5&b=2" => "a=5&b=2"

/**
 * gets string after "?"
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2" 
 * @return {string} - query part, e.g. "a=5&b=2"
 */
function getQueryFromUrl(url: string): string {
    let query: string = url.split("?")[1];
    return query ? query : "";
}

function isEmptyString(text: string) {
    return !Boolean(text.trim());
}

function isQueryInUrl(url: string): boolean {
    let query: string = getQueryFromUrl(url);
    return !isEmptyString(query);
}

/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2" 
 * @return {Array<string>} - urlArgs part, e.g. ["a=5", "b=2"]
 */
function getArgsFromUrl(url: string): Array<string> {
    let query: string = getQueryFromUrl(url);
    // if query === "", then urlArgs === [""]
    let urlArgs: Array<string> = query.split("&");
    return urlArgs;
}

/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2" 
 * @return {Array<string>} - urlArgs part, e.g. ["a", "b"]
 */
function getArgsNames(url: string): Array<string> {
    let urlArgs: Array<string> = getArgsFromUrl(url);
    let argsNames: Array<string> = urlArgs.map((arg) => {
        return arg.split("=")[0];
    })
    return argsNames;
}

/**
 * gets urlArgs names from query of url (url must contain query)
 * does not test for tricky urls
 * @param {string} url - url, e.g. "http://localhost:4700?a=5&b=2" 
 * @return {Array<string>} - urlArgs part, e.g. ["5", "2"]
 */
function getArgsValsStr(url: string): Array<string> {
    let urlArgs: Array<string> = getArgsFromUrl(url);
    let argsNames: Array<string> = urlArgs.map((arg) => {
        return arg.split("=")[1];
    })
    return argsNames;
}

function stringsToInts(numsAsStr: Array<string>): Array<number> {
    return numsAsStr.map((elt) => {
        return parseInt(elt);
    })
}

function getArgsValsInt(url: string): Array<number> {
    let argsValsStr: Array<string> = getArgsValsStr(url);
    return stringsToInts(argsValsStr);
}


export {
    isQueryInUrl,
    getArgsFromUrl,
    getArgsValsInt,
};
