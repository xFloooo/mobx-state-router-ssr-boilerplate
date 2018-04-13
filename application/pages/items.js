import React from 'react';
import {RouterLink } from 'mobx-state-router'
import {inject, observer}from 'mobx-react'
import injectSheet from 'react-jss'

const styles = (theme) => ({
    wrapper: {
        background: theme.background,
        textAlign: (props) => {
            console.log('items -> Вот тут можно можно брать windowSizes и рассчитывать что надо', props)
        }
    },
    title: {
        color: theme.colorPrimary
    },
    listItem: {
        color: theme.colorPrimary
    }
});

@inject("rootStore")
@injectSheet(styles)
@observer
export class Items extends React.Component{
    render(){
        const {rootStore: {itemsStore, routerStore}, classes} = this.props;
        return(
            <div className={classes.wrapper}>
                <h1 className={classes.title}>Hello items page!</h1>
                <div>
                    <RouterLink routeName="home">
                        Go to Items page
                    </RouterLink>
                </div>
                <ul>
                    {
                        itemsStore.items.map((item, index) => {
                            return <li key={index} className={classes.listItem}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}