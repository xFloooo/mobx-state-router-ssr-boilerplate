import React from 'react';
import { Provider, observer } from 'mobx-react';
import { ShellBase } from './shell';


// const staticAdapter = new StaticAdapter(rootStore.routerStore, '/items');
// staticAdapter.preload();
class App extends React.Component {
    render() {

        return (
                <Provider rootStore={this.props.rootStore}>
                    <ShellBase />
                </Provider>
        );
    }
}

export default App;