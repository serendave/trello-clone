import React, { Component } from 'react';
import { Route, BrowserRouter, NavLink, Switch } from 'react-router-dom';
import * as actions from "./store/actions";

import Homepage from "./containers/Homepage/Homepage";
import Board from "./containers/Board/Board";
import IconHome from "./components/UI/Icons/IconHome/IconHome";

import styles from "./App.module.scss";
import { connect } from 'react-redux';

class App extends Component {

    componentDidMount() {
        this.props.onSetAppState();
    }

    render() {
        return (
            <BrowserRouter>
                <div className={styles.App}>
                    <header className={styles.header}>
                        <NavLink to="/">
                            <div className={styles.header__icon}>
                                <IconHome />
                            </div>
                        </NavLink>
                    </header>

                    <main className={styles.Content}>
                        <Switch>
                            <Route path="/boards/:boardName" component={Board} />
                            <Route path="/" exact component={Homepage} />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSetAppState: () => dispatch(actions.setState())
    };
};

export default connect(null, mapDispatchToProps)(App);


/*
import React, { Component } from 'react';
import { Route, BrowserRouter, NavLink, Switch, Redirect } from "react-router-dom";

import Homepage from "./containers/Home/Home";
import Courses from "./containers/Courses/Courses";
import Users from './containers/Users/Users';

import "./App.css";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <header>
                        <nav>
                            <ul>
                                <li><NavLink to="/" exact>Home</NavLink></li>
                                <li><NavLink to="/users">Users</NavLink></li>
                                <li><NavLink to="/courses">Courses</NavLink></li>
                            </ul>
                        </nav>
                    </header>

                    <main className="content">
                        <Switch>
                            <Route path="/" exact component={Homepage} />
                            <Route path="/users" component={Users} />
                            <Route path="/courses" component={Courses} />
                            <Redirect from="/all-courses" to="courses" />
                            <Route render={() => <h1>404 Error</h1>} />
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
*/