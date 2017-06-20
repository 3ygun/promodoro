export default class stopWatch {
    private _watch: NodeJS.Timer;
    private _running: boolean;

    constructor(
        private _minutes: number = 0,
        private _seconds: number = 0
    ) { }

    setupTimer(minutes: number, seconds: number) {
        this._minutes = minutes;
        this._seconds = seconds;
    }

    startWatch(perTick: () => void = () => {}) {
        this._running = true;
        this._watch = setInterval(() => { this._tick(perTick) }, 1000);
    }

    stopWatch() {
        clearInterval(this._watch);
        this._running = false;
    }

    getMinutesFormatted(): string {
        return this._minutes > 10 ? this._minutes.toString() : "0" + this._minutes;
    }

    getSecondsFormatted(): string {
        return this._seconds > 10 ? this._seconds.toString() : "0" + this._seconds;
    }

    getRunningStatus(): boolean {
        return this._running;
    }

    private _tick(perTick: () => void) {
        if (this._seconds > 0) {
            this._seconds--;
        } else if (this._minutes > 0) {
            this._seconds = 59;
            this._minutes--;
        } else {
            clearInterval(this._watch);
            this._running = false;
        }
        perTick();
    }
}
