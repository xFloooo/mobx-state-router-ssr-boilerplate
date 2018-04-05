import React from 'react';
import {ThemeProvider} from 'react-jss'
import { inject, observer } from 'mobx-react';
import { RouterView } from 'mobx-state-router';
import { Home } from './pages/home';
import { Items } from './pages/items';
import { Notfound } from './pages/notfound';


const viewMap = {
    home: <Home />,
    notFound: <Notfound />,
    items: <Items />
};

@inject('rootStore')
@observer
export class ShellBase extends React.Component {
    render() {
        const {rootStore,  rootStore: { routerStore } } = this.props;
        return (
            <ThemeProvider theme={rootStore.theme}>
                <RouterView routerStore={routerStore} viewMap={viewMap} />
            </ThemeProvider>
        );
    }
}