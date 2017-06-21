import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import stopTimer from '../libraries/Timer';

@AutoSubscribeStore
class TimerStore extends StoreBase {
    private _stopTimer: stopTimer = new stopTimer();

    setupTimer(minutes: number, seconds: number) {
        this._stopTimer.setupTimer(minutes, seconds);
        this.trigger();
    }

    startTimer() {
        this._stopTimer.startTimer(() => this.trigger());
        this.trigger();
    }

    stopTimer() {
        this._stopTimer.stopTimer();
        this.trigger();
    }

    @autoSubscribe
    getMinutesFormatted(): string {
        return this._stopTimer.getMinutesFormatted();
    }

    @autoSubscribe
    getSecondsFormatted(): string {
        return this._stopTimer.getSecondsFormatted();
    }

    @autoSubscribe
    getRunningStatus(): boolean {
        return this._stopTimer.getRunningStatus();
    }
}

export = new TimerStore();
