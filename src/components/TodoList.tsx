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

const _itemHeight = 30;

const _styles = {
    listScroll: RX.Styles.createViewStyle({
        flexDirection: 'column',
        alignSelf: 'stretch',
        backgroundColor: '#fff',
    }),
    todoRow: RX.Styles.createViewStyle({
        padding: 5,
        height: _itemHeight,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    }),

    todoStatusButton: RX.Styles.createButtonStyle({
        flex: 0,
        width: 20,
        borderWidth: 2,
        borderColor: '#000',
        borderStyle: 'solid',
        borderRadius: 6,
    }),
    todoTextAdjust: RX.Styles.createViewStyle({
        flex: 1,
        marginHorizontal: 5,
        justifyContent: 'center',
    }),
    todoText: RX.Styles.createTextStyle({
        fontSize: 20,
        color: '#666',
    }),
    todoOptions: RX.Styles.createViewStyle({
        flex: 0,
        width: 40,
        justifyContent: 'flex-end',
        flexDirection: 'row',
    }),

    buttonGreen: RX.Styles.createViewStyle({
        backgroundColor: '#bbb',
    }),
    buttonRed: RX.Styles.createViewStyle({
        // backgroundColor: '#111',
    }),

    todoOptionsButton: RX.Styles.createButtonStyle({
        flex: 1,
        width: 20,
    }),

    deleteTodo: RX.Styles.createTextStyle({
        color: '#f00',
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
        TodosStore.addTodo("3 is bea");
        TodosStore.addTodo("may is hay");
        TodosStore.addTodo("   Winner!");
        TodosStore.addTodo("This is a super long message of love, peace, and war!");
        TodosStore.addTodo("Winner Chicken!");
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
        const buttonStyle: RX.Types.StyleRuleSet<RX.Types.ViewStyle> = item.completed ? _styles.buttonGreen : _styles.buttonRed;

        return (
            <RX.View style={_styles.todoRow}>
                <RX.Button
                    style={[_styles.todoStatusButton, buttonStyle]}
                    onPress={() => this._onToggleStatus(item.index, item.id)}
                >
                    <RX.Text style={[_styles.center]}>
                        {item.completed ? '\u2714' : ' '}
                    </RX.Text>
                </RX.Button>
                <RX.View style={[_styles.todoTextAdjust]}>
                    <RX.Text style={[_styles.todoText]}>
                        {item.name}
                    </RX.Text>
                </RX.View>
                <RX.View style={[_styles.todoOptions]}>
                    <RX.Button
                        style={[_styles.todoOptionsButton]}
                        onPress={() => TodosStore.editTodo(item.index, item.id)}
                    >
                        <RX.Text>
                            {'\u270E'}
                        </RX.Text>
                    </RX.Button>
                    <RX.Button
                        style={[_styles.todoOptionsButton]}
                        onPress={() => TodosStore.removeTodo(item.index, item.id)}
                    >
                        <RX.Text style={[_styles.deleteTodo]}>
                            {'X'}
                        </RX.Text>
                    </RX.Button>
                </RX.View>
            </RX.View >
        );
    }

    private _onToggleStatus = (index: number, id: number) => {
        TodosStore.toggleStatus(index, id);
    }
}
