///////////////////////////////////////////////////////////////////////////////
//                                  imports                                  //
///////////////////////////////////////////////////////////////////////////////
import http, { RequestListener, IncomingMessage, ServerResponse } from "http";


///////////////////////////////////////////////////////////////////////////////
//                              global variables                             //
///////////////////////////////////////////////////////////////////////////////
const port: number = 4700;
const host: string = "localhost";
const reqListn: RequestListener = (req: IncomingMessage,
    res: ServerResponse) => {
    // handle request

    // create response
    res.statusCode = 600;
    res.end(); // end the connection
}
const server = http.createServer(reqListn);

///////////////////////////////////////////////////////////////////////////////
//                           functions declarations                          //
///////////////////////////////////////////////////////////////////////////////

server.listen(port, host, () => {
    console.log(`listening on port: ${port} and host: ${host}`);
});


///////////////////////////////////////////////////////////////////////////////
//                             program execution                             //
///////////////////////////////////////////////////////////////////////////////
