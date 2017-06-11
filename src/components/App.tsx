/*
* This file demonstrates a basic ReactXP app.
*/

import RX = require('reactxp');

import TodoList from './TodoList';

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    }),
};

class App extends RX.Component<object, object> {

    render(): JSX.Element | null {
        return (
            <RX.View style={styles.container}>
                <RX.Text>{'Test'}</RX.Text>
                <TodoList />
            </RX.View>
        );
    }
}

export = App;
