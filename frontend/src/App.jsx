import React from 'react';
import Header from './components/header/Header';
import { Provider } from 'react-redux';
import Redux from './redux/store';
import RoutesTree from './RoutesTree';
import Alert from './components/Alert/Alert.component';
import {PersistGate} from 'redux-persist/es/integration/react'
function App() {
	return (
		<Provider store={Redux.store}>
			<PersistGate loading={null} persistor={Redux.persistor}>
			<div className="App">
				<Header />
				<Alert />
				<RoutesTree />
			</div>
			</PersistGate>
		</Provider>
	);
}

export default App;
