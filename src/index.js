import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom'

import Login from './container/login/login.js'
import Register from './container/register/register.js'
import reducers from './reducer'
import './config'
import AuthRoute from './component/authrouter/authrouter'


const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): () => {}
))

function Boss() { 
    return (
        <h1>123</h1>
    )
 }

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/boss" component={Boss}></Route>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)