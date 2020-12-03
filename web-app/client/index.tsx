import * as React from "react";
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { ConnectedRouter, routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware, compose } from "redux";
import { createRootReducer } from "@Client/reducers";
import { Switch } from "react-router-dom";
import createSagaMiddleware from "redux-saga";
import sagas from "@Client/sagas";
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const Route = require("react-router-dom").Route;

import App from '@Client/containers/app';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const reactRouterMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware, reactRouterMiddleware),
);

const store = createStore(
    createRootReducer(history),
    enhancer
);

const client = new ApolloClient({
    link: new HttpLink({
        uri: process.env.NODE_ENV === "test" ? "localhost" : `${window.location.protocol}//${window.location.host}/api`,
    }),
    cache: new InMemoryCache(),
});

sagaMiddleware.run(sagas as any);

render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/*" component={App} />
                </Switch>
            </ConnectedRouter>
        </ApolloProvider>
    </Provider>,
    document.getElementById('ig-web')
);
