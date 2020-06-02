import Timeout = NodeJS.Timeout;

export class Timer {
    counter: number;
    minSec: string;
    private timerId: number;
    constructor() {
        this.counter = 0;
        this.timerId = 0;
        this.minSec = this.toMMSS();
    }

    startTimer() {
        //console.log("start");
        this.timerId = window.setInterval(() => {
            this.counter = this.counter + 1;
            this.minSec = this.toMMSS();
        }, 10);
    }

    reset() {
        this.counter = 0;
        this.minSec = this.toMMSS();
    }

    stopTimer() {
        //console.log("stop");
        clearInterval(this.timerId);
    }

    toMMSS() {
        let minutes = Math.floor(this.counter/6000);
        let seconds = Math.floor(this.counter/100 - minutes*60);

        let minString = (minutes < 10) ? "0" + minutes : "" + minutes;
        let secString = (seconds < 10) ? "0" + seconds : "" + seconds;

        return minString + ":" + secString;
    }
}
