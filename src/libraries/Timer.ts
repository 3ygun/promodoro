/**
 * Timer class that allows declaration of a time and then start and stop functionality.
 */
export default class Timer {
    private _minutes: number;
    private _seconds: number
    private _watch: NodeJS.Timer;
    private _running: boolean;

    /**
     * Create a new Timer with the provided minutes & seconds on the clock.
     *
     * @param minutes -- Integer > 0 rounded down
     * @param seconds -- Integer > 0 rounded down
     */
    constructor(
        minutes: number = 0,
        seconds: number = 0
    ) {
        this._init(minutes, seconds);
    }

    /**
     * Set the Timer to have the provided minutes & seconds on the clock.
     *
     * @param minutes -- Integer > 0 rounded down
     * @param seconds -- Integer > 0 rounded down
     */
    setupTimer(minutes: number, seconds: number) {
        this._init(minutes, seconds);
    }

    startTimer(perTick: () => void = () => {}) {
        this._running = true;
        this._watch = setInterval(() => { this._tick(perTick) }, 1000);
    }

    stopTimer() {
        clearInterval(this._watch);
        this._running = false;
    }

    getMinutesFormatted(): string {
        return this._minutes >= 10 ? this._minutes.toString() : "0" + this._minutes;
    }

    getSecondsFormatted(): string {
        return this._seconds >= 10 ? this._seconds.toString() : "0" + this._seconds;
    }

    getRunningStatus(): boolean {
        return this._running;
    }

    private _init(minutes: number, seconds: number) {
        minutes = parseInt(Math.max(0, minutes).toString());
        seconds = parseInt(Math.max(0, seconds).toString());
        this._minutes = minutes + parseInt((seconds / 60).toString());
        this._seconds = seconds % 60;
    }

    protected _tick(perTick: () => void) {
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
