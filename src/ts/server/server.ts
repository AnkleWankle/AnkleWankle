import * as fs from 'fs';
import * as uuid from 'uuid';
import * as express from 'express';
import * as https from 'https';
import * as socketIo from 'socket.io';
import { Protocol } from '../common/protocol/Protocol';
import { NeverError } from "../common/util/NeverError";
import { Room } from "./room/Room";
import { Client } from "./client/Client";

const LISTEN_PORT = 8080;

const app = express();
const httpsServer = https.createServer({
    key: fs.readFileSync('dev-server.key'),
    cert: fs.readFileSync('dev-server.crt')
}, app);
const io = socketIo(httpsServer);

const roomRegistry = new Map<string, Room>();

//

// serve the files in out/static/js/ for clients requesting /static/js/
app.use('/static/js', express.Router().use('/', express.static('out/static/js', {
    fallthrough: false
})));

// serve the files in static/img/ for clients requesting /static/img/
app.use('/static/img', express.Router().use('/', express.static('static/img', {
    fallthrough: false
})));

// serve the files in static/css/ for clients requesting /static/css/
app.use('/static/css', express.Router().use('/', express.static('static/css', {
    fallthrough: false
})));

app.get('/', (req, res, next) => {
    // someone just requested the index page of our site, they're not yet in a room
    // forward them to a new room
    res.redirect(`/${uuid.v4()}`);
});

app.get('/:roomId', (req, res, next) => {
    // someone just requested a specific room, however, we don't care, since the HTML and JavaScript we'll be serving them is not room-specific
    // their client will send the room ID again when connecting via socket.io
    req.url = '/'; // pretend there was no room ID in the url for further request handling (i.e. all handlers that have been attache after this one)
    next(); // we didn't complete the request, continue searching for a handler
});

// always simply serve the index.html file (except if the client requested /static/, see the first handlers)
app.get('/', express.static('static/html'));

//

let nextClientId = 0;

io.on('connection', (socket) => {
    new Client(nextClientId++, socket, roomRegistry);
});

//

httpsServer.listen(LISTEN_PORT, () => {
    console.log(`HTTPS server listening on port ${LISTEN_PORT}`);
});
