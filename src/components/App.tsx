/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

import TodoList from './TodoList';
import TodoCreator from './TodoCreator';
import TodoControl from './TodoControl';

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    }),
    box: RX.Styles.createViewStyle({
        height: 500,
        width: 300,
    }),
};

class App extends RX.Component<object, object> {

    render(): JSX.Element | null {
        return (
            <RX.View style={styles.container}>
                <RX.View style={styles.box}>
                    <TodoCreator />
                    <TodoList />
                    <TodoControl />
                </RX.View>
            </RX.View>
        );
    }
}

export = App;
