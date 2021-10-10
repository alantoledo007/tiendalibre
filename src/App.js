import './firebase/starter';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
