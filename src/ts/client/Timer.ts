import Timeout = NodeJS.Timeout;

export class Timer {
    private secondsCounter: number;
    minSec: string;
    private timerId: number;
    constructor() {
        this.secondsCounter = 0;
        this.timerId = 0;
        this.minSec = this.toMMSS();
    }

    startTimer() {
        //console.log("start");
        this.timerId = window.setInterval(() => {
            this.secondsCounter = this.secondsCounter + 1;
            this.minSec = this.toMMSS();
        }, 1000);
    }

    reset() {
        this.secondsCounter = 0;
        this.minSec = this.toMMSS();
    }

    stopTimer() {
        //console.log("stop");
        clearInterval(this.timerId);
    }

    toMMSS() {
        let minutes = Math.floor(this.secondsCounter/60);
        let seconds = Math.floor(this.secondsCounter - minutes*60);

        let minString = (minutes < 10) ? "0" + minutes : "" + minutes;
        let secString = (seconds < 10) ? "0" + seconds : "" + seconds;

        return minString + ":" + secString;
    }
}
