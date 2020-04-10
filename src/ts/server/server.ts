import * as uuid from 'uuid';
import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import { Protocol } from '../common/protocol/Protocol';

const LISTEN_PORT = 8080;

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(httpServer);

//

// serve the files in out/static/js/ for clients requesting /static/js/
app.use('/static/js', express.Router().use('/', express.static('out/static/js', {
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

// always simply serve the index.html file (except if the client requested /static/js/, see the first handler)
app.get('/', express.static('static/html'));

//

io.on('connection', (socket) => {
    console.log('socket.io connection!');

    Protocol.on(socket, Protocol.READY, (roomId) => {

        console.log(`client is ready and in room ${roomId}`)

        // let's tell the client to draw a random star
        Protocol.emit(socket, Protocol.DRAW_STAR, /*x*/ 0, /*y*/ 0, /*number*/ 5 + Math.floor(Math.random() * 5), /*outer radius*/ 100 + (Math.random() * 100), /*inner radius*/ 50 + (Math.random() * 50));

    });
});

//

httpServer.listen(LISTEN_PORT, () => {
    console.log(`HTTP server listening on port ${LISTEN_PORT}`);
});