import React from "react";
import ReactDOM from "react-dom";
import App from './app';
import  {RootStore} from './stores/root.store'
import { createBrowserHistory } from 'history';
import { HistoryAdapter } from 'mobx-state-router';

window.main = () => {
    const history = createBrowserHistory();
    const rootStore = new RootStore(window.__MOBX_INITIAL_STATE__);
    const historyAdapter = new HistoryAdapter(rootStore.routerStore, history);
    historyAdapter.observeRouterStateChanges();
    ReactDOM.hydrate(
        <App rootStore={rootStore}/>,
        document.getElementById("root")
    );
};