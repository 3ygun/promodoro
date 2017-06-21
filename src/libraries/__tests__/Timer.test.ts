import 'jest';

import Timer from '../Timer';

describe('Timer', () => {
    describe('constructor and get Methods', () => {
        test('Blank', () => {
            const timer = new Timer();
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('5m 2s', () => {
            const timer = new Timer(5, 2);
            expect(timer.getMinutesFormatted()).toBe('05');
            expect(timer.getSecondsFormatted()).toBe('02');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('5m 20s', () => {
            const timer = new Timer(5, 20);
            expect(timer.getMinutesFormatted()).toBe('05');
            expect(timer.getSecondsFormatted()).toBe('20');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('25m 14s', () => {
            const timer = new Timer(25, 14);
            expect(timer.getMinutesFormatted()).toBe('25');
            expect(timer.getSecondsFormatted()).toBe('14');
            expect(timer.getRunningStatus()).toBeFalsy();
        });

        // Edge cases
        test('-10m -1s', () => {
            const timer = new Timer(-10, -1);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('-7m 10s', () => {
            const timer = new Timer(-7, 10);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('10');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('70m -10s', () => {
            const timer = new Timer(70, -10);
            expect(timer.getMinutesFormatted()).toBe('70');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('-15.5m -1.7s', () => {
            const timer = new Timer(-15.5, -2.7);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('15.5m 1.7s', () => {
            const timer = new Timer(15.5, 1.7);
            expect(timer.getMinutesFormatted()).toBe('15');
            expect(timer.getSecondsFormatted()).toBe('01');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('7.2m 5.3s', () => {
            const timer = new Timer(7.2, 5.3);
            expect(timer.getMinutesFormatted()).toBe('07');
            expect(timer.getSecondsFormatted()).toBe('05');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('800.2m 370.5s', () => {
            const timer = new Timer(800.2, 370.5);
            expect(timer.getMinutesFormatted()).toBe('806');
            expect(timer.getSecondsFormatted()).toBe('10');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('25m 100s', () => {
            const timer = new Timer(25, 100);
            expect(timer.getMinutesFormatted()).toBe('26');
            expect(timer.getSecondsFormatted()).toBe('40');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('25m 182s', () => {
            const timer = new Timer(25, 182);
            expect(timer.getMinutesFormatted()).toBe('28');
            expect(timer.getSecondsFormatted()).toBe('02');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
    });

    describe('setupTimer and get Methods', () => {
        test('Blank', () => {
            const timer = new Timer();
            timer.setupTimer(0, 0);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('Blank Test', () => {
            const timer = new Timer();
            timer.setupTimer(0, 0);
            expect(timer).toEqual(new Timer());
        });
        test('5m 2s', () => {
            const timer = new Timer();
            timer.setupTimer(5, 2);
            expect(timer.getMinutesFormatted()).toBe('05');
            expect(timer.getSecondsFormatted()).toBe('02');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('5m 20s', () => {
            const timer = new Timer();
            timer.setupTimer(5, 20);
            expect(timer.getMinutesFormatted()).toBe('05');
            expect(timer.getSecondsFormatted()).toBe('20');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('25m 14s', () => {
            const timer = new Timer();
            timer.setupTimer(25, 14);
            expect(timer.getMinutesFormatted()).toBe('25');
            expect(timer.getSecondsFormatted()).toBe('14');
            expect(timer.getRunningStatus()).toBeFalsy();
        });

        // Edge cases
        test('-10m -1s', () => {
            const timer = new Timer();
            timer.setupTimer(-10, -1);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('-7m 10s', () => {
            const timer = new Timer();
            timer.setupTimer(-7, 10);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('10');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('70m -10s', () => {
            const timer = new Timer();
            timer.setupTimer(70, -10);
            expect(timer.getMinutesFormatted()).toBe('70');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('-15.5m -1.7s', () => {
            const timer = new Timer();
            timer.setupTimer(-15.5, -2.7);
            expect(timer.getMinutesFormatted()).toBe('00');
            expect(timer.getSecondsFormatted()).toBe('00');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('15.5m 1.7s', () => {
            const timer = new Timer();
            timer.setupTimer(15.5, 1.7);
            expect(timer.getMinutesFormatted()).toBe('15');
            expect(timer.getSecondsFormatted()).toBe('01');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('7.2m 5.3s', () => {
            const timer = new Timer();
            timer.setupTimer(7.2, 5.3);
            expect(timer.getMinutesFormatted()).toBe('07');
            expect(timer.getSecondsFormatted()).toBe('05');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('800.2m 370.5s', () => {
            const timer = new Timer();
            timer.setupTimer(800.2, 370.5);
            expect(timer.getMinutesFormatted()).toBe('806');
            expect(timer.getSecondsFormatted()).toBe('10');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('25m 100s', () => {
            const timer = new Timer();
            timer.setupTimer(25, 100);
            expect(timer.getMinutesFormatted()).toBe('26');
            expect(timer.getSecondsFormatted()).toBe('40');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
        test('25m 182s', () => {
            const timer = new Timer();
            timer.setupTimer(25, 182);
            expect(timer.getMinutesFormatted()).toBe('28');
            expect(timer.getSecondsFormatted()).toBe('02');
            expect(timer.getRunningStatus()).toBeFalsy();
        });
    });

    // Tick & startTimer in Timer.test.js
});
