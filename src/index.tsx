import RX = require('reactxp');
import App = require('./components/App');

RX.App.initialize(true, true);
RX.UserInterface.setMainView(<App />);
