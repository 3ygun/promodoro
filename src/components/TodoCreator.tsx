import RX = require('reactxp');
import { ComponentBase } from 'resub';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import TodosStore = require('../stores/TodosStore');

interface State {
    todoText: string;
}

const _itemHeight = 32;

const _styles = {
    editTodoItem: RX.Styles.createTextStyle({
        margin: 8,
        height: 32,
        fontSize: 20,
        alignSelf: 'stretch',
        backgroundColor: 'transparent'
    })
};

export default class TodoCreator extends ComponentBase<{}, State> {
    render() {
        return (
            <RX.View>
                <RX.TextInput
                    style={ _styles.editTodoItem }
                    value={ this.state.todoText }
                    placeholder={ 'Enter reminder' }
                    placeholderTextColor={ 'What todo?' }
                    onChangeText={ this._onChangeText }
                    onSubmitEditing={ this._onSubmitEditing }
                    autoFocus={ true }
                    textAlign={ 'left' }
                />
            </RX.View>
        );
    }

    private _onChangeText = (newText: string) => {
        this.setState({ todoText: newText });
    }

    private _onSubmitEditing = () => {
        if (this.state.todoText) {
            TodosStore.addTodo(this.state.todoText)
            this.setState({ todoText: '' });
        }
    }
}
