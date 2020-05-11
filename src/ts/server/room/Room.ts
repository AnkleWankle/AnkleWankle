import { Protocol } from "../../common/protocol/Protocol";
import { Client } from "../client/Client";
import { NeverError } from "../../common/util/NeverError";

export class Room {

    private status: Protocol.RoomStatus = "waitingForOtherDevice";

    public readonly controlDeviceClients: Client[] = [];
    public readonly displayDeviceClients: Client[] = [];

    constructor(public readonly id: string, private onEverybodyLeftCallback: () => void) {

        this.log(`created, status is ${this.status}`);

    }

    private log(...args: any[]) {
        console.log(`Room ${this.id}:`, ...args);
    }

    private setStatus(status: Protocol.RoomStatus): boolean {

        if(status !== this.status) {

            this.status = status;

            // send the new status to all clients
            for(let client of [...this.controlDeviceClients, ...this.displayDeviceClients]) {
                client.sendRoomStatus(this.status);
            }

            return true;

        } else {

            return false;

        }

    }

    private refreshStatus(): boolean {
        return this.setStatus((this.controlDeviceClients.length > 0 && this.displayDeviceClients.length > 0) ? "connected" : "waitingForOtherDevice");
    }

    public isEmpty() {
        return this.controlDeviceClients.length <= 0 && this.displayDeviceClients.length <= 0;
    }

    public addDevice(client: Client, deviceType: Protocol.DeviceType): (() => void) {

        this.log(`client ${client.id} joins as ${deviceType} device`);

        switch(deviceType) {
            case "display": {
                this.displayDeviceClients.push(client);
                break;
            }
            case "control": {
                this.controlDeviceClients.push(client);
                break;
            }
            default: {
                throw new NeverError(deviceType); // the compiler will tell us at compile time if we forget to handle a possible device type case in this switch statement
            }
        }

        let updatedClients = this.refreshStatus();
        if(!updatedClients) {
            // clients were not sent the room status, send it to the new client only
            client.sendRoomStatus(this.status);
        }

        return () => {
            this.log(`client ${client.id} leaves`);

            let index = this.displayDeviceClients.indexOf(client);
            if(index >= 0) {
                this.displayDeviceClients.splice(index, 1);
            }

            index = this.controlDeviceClients.indexOf(client);
            if(index >= 0) {
                this.controlDeviceClients.splice(index, 1);
            }

            this.refreshStatus();

            if(this.displayDeviceClients.length <= 0 && this.controlDeviceClients.length <= 0) {
                this.onEverybodyLeftCallback();
            }
        };

    }

}
