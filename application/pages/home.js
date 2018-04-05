import React from 'react'
import {Link, RouterState } from 'mobx-state-router'
import {inject} from 'mobx-react'
import injectSheet from 'react-jss'

const styles = (theme) => ({
    wrapper: {
        background: theme.background,
        textAlign: (props) => {
            console.log('home -> Вот тут можно можно брать windowSizes и рассчитывать что надо', props)
        }
    },
    title: {
        color: theme.colorPrimary
    }
});

@inject("rootStore")
@injectSheet(styles)
export class Home extends React.Component{
    render(){
        let {classes} = this.props;
        const toState = new RouterState('items');
        const {rootStore, rootStore: { routerStore }} = this.props;
        return (
            <div className={classes.wrapper}>
                <div><button onClick={() => rootStore.toggleTheme()}>toggle theme</button></div>
                <h1 className={classes.title}>Hello Home page!</h1>
                <Link routerStore={routerStore} toState={toState}>
                    Go to Items page
                </Link>
            </div>
        )
    }
}