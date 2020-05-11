import { Protocol } from "../../common/protocol/Protocol";
import { Room } from "../room/Room";

export class Client {

    private leaveRoomCallback: undefined | (() => void) = undefined;

    constructor(public readonly id: number, private readonly socket: SocketIO.Socket, roomRegistry: Map<string, Room>) {

        Protocol.on(socket, Protocol.READY, (deviceType, roomId) => {

            this.log(`received ready: device type ${deviceType}, room ${roomId}`);

            if(this.leaveRoomCallback !== undefined) {
                this.leaveRoomCallback();
                this.leaveRoomCallback = undefined;
            }

            let room = roomRegistry.get(roomId);
            if(room === undefined) {
                room = new Room(roomId, () => roomRegistry.delete(roomId));
                roomRegistry.set(roomId, room);
            }

            this.leaveRoomCallback = room.addDevice(this, deviceType);

        });

        socket.on('disconnect', () => {

            this.log(`disconnected`);

            if(this.leaveRoomCallback !== undefined) {
                this.leaveRoomCallback();
                this.leaveRoomCallback = undefined;
            }

        });

        this.log(`created`);

    }

    private log(...args: any[]) {
        console.log(`Client ${this.id}:`, ...args);
    }

    public sendRoomStatus(roomStatus: Protocol.RoomStatus) {

        this.log(`sending room status ${roomStatus}`);

        Protocol.emit(this.socket, Protocol.ROOM_STATUS, roomStatus);

    }

}
