import React from "react";
import ReactDOMServer from "react-dom/server";
import ServerApp from './app';
import { StaticAdapter } from 'mobx-state-router';
import  {RootStore} from './stores/root.store'

export const App = {
    getHTML: async(location) => {
        const rootStore = new RootStore();
        const staticAdapter = new StaticAdapter(rootStore.routerStore, location);
        await staticAdapter.preload();
        const htmlNew = (
            <Html
                content={ReactDOMServer.renderToString(<ServerApp rootStore={rootStore}/>)}
            />
        );

        return {
            html: htmlNew,
            newHtml: `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(
                htmlNew
            )}`
        };
    }
};

function Html({ content}) {
    return (
        <html>
        <head>
        </head>
        <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script src="/app.js" />
        <script>window.main();</script>
        </body>
        </html>
    );
}