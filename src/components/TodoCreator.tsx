import RX = require('reactxp');
import { ComponentBase } from 'resub';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import TodosStore = require('../stores/TodosStore');

interface TodoCreatorState {
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

export default class TodoCreator extends ComponentBase<{}, TodoCreatorState> {
    protected _buildState(props: {}, initialBuild: boolean): TodoCreatorState {
        return {
            todoText: TodosStore.getTodoText(),
        };
    }

    render() {
        return (
            <RX.View>
                <RX.TextInput
                    style={_styles.editTodoItem}
                    value={this.state.todoText}
                    placeholder={'Enter reminder'}
                    placeholderTextColor={'What todo?'}
                    onChangeText={(newText: string) => TodosStore.editTodoText(newText)}
                    onSubmitEditing={() => TodosStore.submitTodo()}
                    autoFocus={true}
                    textAlign={'left'}
                />
            </RX.View>
        );
    }
}
