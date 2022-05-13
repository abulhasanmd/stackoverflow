import React from 'react';
import Header from './components/header/Header';
import { Provider } from 'react-redux';
import store from './redux/store';
import RoutesTree from './RoutesTree';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Header />
				{/* <Alert /> */}
				<RoutesTree />
			</div>
		</Provider>
	);
}

export default App;
