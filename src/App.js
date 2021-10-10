import './firebase/starter';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import Routes from './Routes';

function App() {
  return (
    <ReduxProvider store={store}>
      <Routes />
    </ReduxProvider>
  );
}

export default App;
