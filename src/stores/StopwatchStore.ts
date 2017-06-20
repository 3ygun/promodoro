import { StoreBase, AutoSubscribeStore, autoSubscribe } from 'resub';
import stopWatch from '../libraries/stopWatch';

@AutoSubscribeStore
class StopwatchStore extends StoreBase {
    private _stopWatch: stopWatch = new stopWatch();

    setupTimer(minutes: number, seconds: number) {
        this._stopWatch.setupTimer(minutes, seconds);
        this.trigger();
    }

    startWatch() {
        this._stopWatch.startWatch(() => this.trigger());
        this.trigger();
    }

    stopWatch() {
        this._stopWatch.stopWatch();
        this.trigger();
    }

    @autoSubscribe
    getMinutesFormatted(): string {
        return this._stopWatch.getMinutesFormatted();
    }

    @autoSubscribe
    getSecondsFormatted(): string {
        return this._stopWatch.getSecondsFormatted();
    }

    @autoSubscribe
    getRunningStatus(): boolean {
        return this._stopWatch.getRunningStatus();
    }
}

export = new StopwatchStore();
