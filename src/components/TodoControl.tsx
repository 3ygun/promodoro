import RX = require('reactxp');
import { ComponentBase } from 'resub';

import TodosStore = require('../stores/TodosStore');

interface TodoControlState {
    showComplete?: boolean;
}

const _styles = {
    controlBar: RX.Styles.createTextStyle({
        margin: 5,
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    }),
    showComplete: RX.Styles.createButtonStyle({
        alignSelf: 'flex-end',
    }),
};

export default class TodoControl extends ComponentBase<{}, TodoControlState> {
    protected _buildState(props: {}, initialBuild: boolean): TodoControlState {
        return {
            showComplete: TodosStore.getShowComplete(),
        };
    }

    render() {
        return (
            <RX.View style={[_styles.controlBar]}>
                <RX.Button
                    style={[_styles.showComplete]}
                    onPress={() => TodosStore.toggleShowComplete()}
                >
                    <RX.Text>
                        {this.state.showComplete ? 'showing all' : 'hiding complete'}
                    </RX.Text>
                </RX.Button>
            </RX.View>
        );
    }
}
