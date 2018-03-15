import React from 'react'
import ReactDOM from 'react-dom'
// import { hot } from 'react-hot-loader'
import App from './app'

import  {RootStore} from './stores/root.store'
import { createBrowserHistory } from 'history';
import { HistoryAdapter } from 'mobx-state-router';

const history = createBrowserHistory();
const rootStore = new RootStore();
const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
historyAdapter.observeRouterStateChanges();


ReactDOM.render(
    <App rootStore={rootStore}/>,
    document.getElementById("root")
);

// export default hot(module)(App)