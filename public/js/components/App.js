/**
 * Created by cds on 2017/1/9.
 */
import React from 'react';
import { DefaultRoute, Link, Route, RouteHandler,browserHistory } from 'react-router';
import Navbar from './Navbar';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <RouteHandler/>
            </div>
        );
    }
}

export default App;
