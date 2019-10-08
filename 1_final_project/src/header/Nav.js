import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';


class Nav extends Component {
    render() {
        return (
            <nav className="navbar bg-dark text-light p-3">
                <NavLink to="/"> Home </NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/clubhouse"> Clubhouse </NavLink>
                <NavLink to="/library"> Library </NavLink>
                <NavLink to="/fair"> Fair </NavLink>

            </nav>
        );
    }
}

export default Nav;
