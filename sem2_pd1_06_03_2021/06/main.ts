///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import http, { RequestListener, IncomingMessage, ServerResponse } from "http";

// moje importy
import {
    isQueryInUrl,
    getArgsFromUrl,
    getArgsValsInt,
} from "./utilities/urlUtilities";


///////////////////////////////////////////////////////////////////////////////
//                              global variables                             //
///////////////////////////////////////////////////////////////////////////////
const port: number = 4700;
const host: string = "localhost";
const reqListn: RequestListener = (
    req: IncomingMessage,
    res: ServerResponse
) => {
    //////////////////
    // handle request
    //////////////////

    // url typed by user
    const typedUrl: URL = new URL(`http://${req.headers.host}${req.url}`);

    if (isQueryInUrl(typedUrl.toString())) {
        let urlArgs: Array<string> = getArgsFromUrl(typedUrl.toString());
        let urlArgsNums: Array<number> = getArgsValsInt(
            typedUrl.toString()
        );
        let sum: number = urlArgsNums.reduce((acc, curVal) => {
            return acc + curVal;
        }, 0);
        res.write(
            "if: " + urlArgs.toString() + " then they sum is equal to: " + sum
        );
    } else {
        res.write("Hello there! How can I help You?");
    }

    ///////////////////
    // create response
    ///////////////////
    res.statusCode = 200;
    res.end(); // end the connection
};
const server = http.createServer(reqListn);

///////////////////////////////////////////////////////////////////////////////
//                           functions declarations                          //
///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
server.listen(port, host, () => {
    console.log(`listening on port: ${port} and host: ${host}`);
});
