import RX = require('reactxp');
import { ComponentBase } from 'resub';
import { VirtualListView, VirtualListViewItemInfo } from 'reactxp-virtuallistview';

import TodosStore = require('../stores/TodosStore');
import { Todo } from '../types';

interface TodoListViewItemInfo extends VirtualListViewItemInfo {
    index: number;
    id: number;
    name: string;
    completed: boolean;
}

interface TodoListState {
    todos?: TodoListViewItemInfo[];
}

const _itemHeight = 28;

const _styles = {
    listScroll: RX.Styles.createViewStyle({
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    }),
    todoRow: RX.Styles.createViewStyle({
        padding: 5,
        flex: 2,
        height: _itemHeight,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    }),
    fillWithBorder: RX.Styles.createViewStyle({
        position: 'absolute',
        top: 1,
        right: 1,
        bottom: 1,
        left: 1,
    }),

    todoStatusButton: RX.Styles.createButtonStyle({
        width: 26,
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 6,
    }),
    todoTextAdjust: RX.Styles.createViewStyle({
        left: 32,
        justifyContent: 'center',
    }),
    todoText: RX.Styles.createTextStyle({
        fontSize: 20,
        color: '#666',
    }),

    buttonGreen: RX.Styles.createViewStyle({
        backgroundColor: '#bbb',
    }),
    buttonRed: RX.Styles.createViewStyle({
        // backgroundColor: '#111',
    }),

    center: RX.Styles.createTextStyle({
        alignSelf: 'center',
    }),
};

export default class TodoList extends ComponentBase<{}, TodoListState> {
    protected _buildState(props: {}, initialBuild: boolean): TodoListState {
        return {
            todos: TodosStore.getTodos().map((todo, i) => {
                return {
                    index: i,
                    key: i.toString(),
                    height: _itemHeight,
                    template: 'todo',
                    ...todo,
                };
            })
        };
    }

    componentDidMount() {
        TodosStore.addTodo("Hello World");
        TodosStore.addTodo("Hello 2");
        TodosStore.addTodo("3");
    }

    render() {
        return (
            <VirtualListView
                itemList={this.state.todos}
                renderItem={this._renderItem}
                style={_styles.listScroll}
            />
        );
    }

    private _renderItem = (item: TodoListViewItemInfo, hasFocus?: boolean) => {
        const buttonStyle: RX.Types.StyleRuleSet<RX.Types.ViewStyle> = item.completed ?  _styles.buttonGreen : _styles.buttonRed;

        return (
            <RX.View style={_styles.todoRow}>
                <RX.Button
                    style={[_styles.todoStatusButton, _styles.fillWithBorder, buttonStyle]}
                    onPress={() => this._onToggleStatus(item.index, item.id)}
                >
                    <RX.Text style={[_styles.center]}>{item.completed ? '\u2714' : ' '}</RX.Text>
                </RX.Button>
                <RX.View style={[_styles.fillWithBorder, _styles.todoTextAdjust]}>
                    <RX.Text style={[_styles.todoText]}>
                        {item.name}
                    </RX.Text>
                </RX.View>
            </RX.View >
        );
    }

    private _onToggleStatus = (index: number, id: number) => {
        TodosStore.toggleStatus(index, id);
    }
}
