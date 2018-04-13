import React from 'react'
import { RouterLink } from 'mobx-state-router'
import {inject} from 'mobx-react'
import injectSheet from 'react-jss'

const styles = (theme) => ({
    wrapper: {
        background: theme.background,
        display: 'flex',
        transition: '2s',
        boxSizing: 'content-box',
        justifyContent: 'center',
        opacity: 0.3,
        transform: 'translateX(100px)',
        textAlign: (props) => {
            console.log('home -> Вот тут можно можно брать windowSizes и рассчитывать что надо', props)
        }
    },
    title: {
        color: theme.colorPrimary,
        "text-size-adjust": "10%"
    },
    link: {
        "color": "black",
        "&:visited": {
            "color": "green",
        }
    }
});

@inject("rootStore")
@injectSheet(styles)
export class Home extends React.Component{
    render(){
        let {classes} = this.props;
        const {rootStore, rootStore: { routerStore }} = this.props;
        return (
            <div className={classes.wrapper}>
                <div><button onClick={() => rootStore.toggleTheme()}>toggle theme</button></div>
                <h1 className={classes.title}>Hello Home page!</h1>
                <RouterLink className={classes.link} routeName="items">
                    Go to Items page
                </RouterLink>
            </div>
        )
    }
}