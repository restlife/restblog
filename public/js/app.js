import React from 'react';
import Router ,{ DefaultRoute, Link, Route, RouteHandler,browserHistory } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import TalkIndex from './components/TalkIndex';
import SkillIndex from './components/SkillIndex';
import LoginHandler from './components/Login';
import subArticle from './components/SubArticle';

export default (
        <Route name="app" handler={App}>
            <Route name="home"  path="/" handler={Home} />
            <Route name="skillPage"  path="/skill" handler={SkillIndex} />
            <Route name="talkPage"  path="/talk" handler={TalkIndex} />
            <Route name="login" path="/login" handler={LoginHandler}/>
            <Route name="subArticle" path="/subArticle" handler={subArticle} />
        </Route>
);

