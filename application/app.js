import React from 'react';
import { Provider, observer } from 'mobx-react';
import { ShellBase } from './shell';
import  {RootStore} from './stores/root.store'
import { createBrowserHistory } from 'history';
import { HistoryAdapter } from 'mobx-state-router';

const history = createBrowserHistory();
const rootStore = new RootStore();
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();

// const staticAdapter = new StaticAdapter(rootStore.routerStore, '/items');
// staticAdapter.preload();
@observer
class App extends React.Component {
    render() {

        return (
                <Provider rootStore={rootStore}>
                    <ShellBase />
                </Provider>
        );
    }
}

export default App;