import RX = require('reactxp');
import { ComponentBase } from 'resub';

import StopwatchStore = require('../stores/StopwatchStore');


interface PromodoroState {
    running?: boolean;
    minutes?: string;
    seconds?: string;
}

const _styles = {
    controlBar: RX.Styles.createTextStyle({
        margin: 5,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    }),
    optionsRow: RX.Styles.createViewStyle({
        flexDirection: 'row',
        alignSelf: 'stretch',
    }),

    optionButton: RX.Styles.createButtonStyle({
        flex: 1,
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 6,
    }),
    optionText: RX.Styles.createTextStyle({
        textAlign: 'center',
    }),
    timer: RX.Styles.createTextStyle({
        flex: 1,
        fontSize: 30,
        textAlign: 'center',
    }),

    showComplete: RX.Styles.createButtonStyle({
        alignSelf: 'flex-end',
    }),
};

export default class TodoControl extends ComponentBase<object, PromodoroState> {
    protected _buildState(props: {}, initialBuild: boolean): PromodoroState {
        return {
            running: StopwatchStore.getRunningStatus(),
            minutes: StopwatchStore.getMinutesFormatted(),
            seconds: StopwatchStore.getSecondsFormatted(),
        };
    }

    render() {
        return (
            <RX.View style={[_styles.controlBar]}>
                <RX.View style={[_styles.optionsRow]}>
                    <RX.Button
                        style={[_styles.optionButton]}
                        onPress={() => StopwatchStore.setupTimer(25, 0)}
                    >
                        <RX.Text style={[_styles.optionText]}>
                            {'Promodoro'}
                        </RX.Text>
                    </RX.Button>
                    <RX.Button
                        style={[_styles.optionButton]}
                        onPress={() => StopwatchStore.setupTimer(5, 0)}
                    >
                        <RX.Text style={[_styles.optionText]}>
                            {'Break'}
                        </RX.Text>
                    </RX.Button>
                    <RX.Button
                        style={[_styles.optionButton]}
                        onPress={() => {
                            this.state.running ? StopwatchStore.stopWatch() : StopwatchStore.startWatch()
                        }}
                    >
                        <RX.Text style={[_styles.optionText]}>
                            {this.state.running ? 'Pause' : 'Start'}
                        </RX.Text>
                    </RX.Button>
                    <RX.Button
                        style={[_styles.optionButton]}
                        onPress={() => StopwatchStore.setupTimer(0, 0)}
                    >
                        <RX.Text style={[_styles.optionText]}>
                            {'Reset'}
                        </RX.Text>
                    </RX.Button>
                </RX.View>

                <RX.View style={[_styles.optionsRow]}>
                    <RX.Text style={[_styles.timer]}>
                        {this.state.minutes + ':' + this.state.seconds}
                    </RX.Text>
                </RX.View>
            </RX.View>
        );
    }
}
