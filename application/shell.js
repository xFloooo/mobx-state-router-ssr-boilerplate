import React from 'react';
import { inject } from 'mobx-react';
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
export class ShellBase extends React.Component {
    render() {
        const { rootStore: { routerStore } } = this.props;
        return (
            <RouterView routerStore={routerStore} viewMap={viewMap} />
        );
    }
}