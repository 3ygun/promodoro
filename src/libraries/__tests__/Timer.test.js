var Timer = require('./Timer.setup');

const timer = Timer;

describe('Timer', () => {
    describe('startTimer', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        test('0s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(0, 0);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runAllTimers();
            expect(perTick).toHaveBeenCalledTimes(1);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('2s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(0, 2);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runAllTimers();
            expect(perTick).toHaveBeenCalledTimes(3);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('12s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(0, 12);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runAllTimers();
            expect(perTick).toHaveBeenCalledTimes(13);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('1m 0s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(1, 0);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runAllTimers();
            expect(perTick).toHaveBeenCalledTimes(61);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('1m 10s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(1, 10);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runAllTimers();
            expect(perTick).toHaveBeenCalledTimes(71);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });
    });

    describe('startTimer ticking', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runAllTimers();
        });

        test('0s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(0, 0);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runAllTimers();
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(perTick).toHaveBeenCalledTimes(1);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('2s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(0, 2);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runTimersToTime(1000);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('01');
            expect(perTick).toHaveBeenCalledTimes(1);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('12s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(0, 12);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runTimersToTime(1000);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('11');
            expect(perTick).toHaveBeenCalledTimes(1);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('1m 0s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(1, 0);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runTimersToTime(1000);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('59');
            expect(perTick).toHaveBeenCalledTimes(1);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });

        test('1m 10s running', () => {
            const perTick = jest.fn();
            timer.setupTimer(1, 10);
            expect(timer.getRunningStatus()).toBeFalsy();
            timer.startTimer(perTick);
            jest.runTimersToTime(1000);
            expect(timer.getMinutesFormatted()).toBe('01');
            expect(timer.getSecondsFormatted()).toBe('09');
            expect(perTick).toHaveBeenCalledTimes(1);
            expect(setInterval.mock.calls.length).toBe(1);
            expect(setInterval.mock.calls[0][1]).toBe(1000);
        });
    });
});