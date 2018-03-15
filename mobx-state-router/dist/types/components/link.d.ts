/// <reference types="react" />
import * as React from 'react';
import { RouterState, RouterStore } from '../router-store';
export interface LinkProps {
    routerStore: RouterStore;
    toState: RouterState;
}
/**
 * Creates an <a> element that links to a router state. Redirects to the target
 * state without reloading the entire app, thus avoiding potential flickers.
 */
export declare class Link extends React.Component<LinkProps, {}> {
    render(): JSX.Element;
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}
