import React from "react";
import ReactDOMServer from "react-dom/server";
import ServerApp from './app';
import { StaticAdapter } from 'mobx-state-router';
import  {RootStore} from './stores/root.store'

export const App = {
    getHTML: async(location) => {
        const rootStore = new RootStore();
        const staticAdapter = new StaticAdapter(rootStore.routerStore, location);
        await staticAdapter.preloadReady();
        const html = (
            <Html
                content={ReactDOMServer.renderToString(<ServerApp rootStore={rootStore}/>)}
                initialState={rootStore.extractInitialState()}
            />
        );

        return {
            html: `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(
                html
            )}`
        };
    }
};

function Html({ content, initialState}) {
    return (
        <html>
        <head>
        </head>
        <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
            dangerouslySetInnerHTML={{
                __html: `window.__MOBX_INITIAL_STATE__=${JSON.stringify(
                    initialState
                )};`
            }}
        />
        <script src="/app.js" />
        <script>window.main();</script>
        </body>
        </html>
    );
}