import React from 'react';
import {Link, RouterState } from 'mobx-state-router'
import {inject, observer}from 'mobx-react'

@inject("rootStore")
@observer
export class Items extends React.Component{
    render(){
        const {rootStore: {itemsStore, routerStore}} = this.props;
        const toState = new RouterState('home');
        return(
            <div>
                <h1>Hello items page!</h1>
                <div>
                    <Link routerStore={routerStore} toState={toState}>
                        Go to Home page
                    </Link>
                </div>
                <ul>
                    {
                        itemsStore.items.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}