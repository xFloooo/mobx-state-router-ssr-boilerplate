import React from 'react'
import {Link, RouterState } from 'mobx-state-router'
import {inject}from 'mobx-react'

@inject("rootStore")
export class Home extends React.Component{
    render(){
        const toState = new RouterState('items');
        const {rootStore: { routerStore }} = this.props;
        return (
            <div>
                <h1>Hello Home page!</h1>
                <Link routerStore={routerStore} toState={toState}>
                    Go to Items page
                </Link>
            </div>
        )
    }
}