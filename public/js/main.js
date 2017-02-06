/**
 * Created by cds on 2017/1/9.
 */
import React from 'react';
import Router from 'react-router';
import routes from './app';

Router.run(routes, Router.HistoryLocation ,function (Handler) {
    React.render(<Handler/> , document.body);
});