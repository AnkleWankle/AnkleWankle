
export namespace Protocol {

    export const READY = "ready";
    export const DRAW_STAR = "drawStar";

    export function on<MessageType extends string, OnReturnType>(socket: SocketI<OnReturnType, any>, messageType: MessageType, callback: CallbackTypeFromMessageType<MessageType>) {
        return socket.on(messageType, function(this: any, ...args: any[]) {
            console.log("received", messageType, args);
            return (callback as any).apply(this, args);
        });
    }

    export function emit<MessageType extends string, EmitReturnType>(socket: SocketI<any, EmitReturnType>, messageType: MessageType, ...args: Parameters<CallbackTypeFromMessageType<MessageType>>) {
        console.log("sending", messageType, args);
        return socket.emit(messageType, ...args);
    }

    //

    export type CallbackTypeFromMessageType<MessageType extends string> =
        (MessageType extends typeof READY ? ((roomId: string) => void) : never)
        | (MessageType extends typeof DRAW_STAR ? ((...args: Parameters<PIXI.Graphics["drawStar"]>) => void) : never);

    export interface SocketI<OnReturnType, EmitReturnType> {
        on: (messageType: string, callback: (...args: any[]) => void) => OnReturnType;
        emit: (messageType: string, ...args: any[]) => EmitReturnType;
    }

}