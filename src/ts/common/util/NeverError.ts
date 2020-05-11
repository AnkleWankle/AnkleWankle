
// this is more or less just a dummy error class that accepts an argument of type 'never'
// the only use for this is to get compiler errors when we forget to handle one or more possible cases in, e.g., a switch statement
export class NeverError extends Error {

    constructor(neverValue: never, message?: string) {
        super(`${message !== undefined ? message : `Illegal value`}: ${neverValue}`);
    }

}
