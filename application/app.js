import React from 'react';
import { Provider, observer } from 'mobx-react';
import { ShellBase } from './shell';

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