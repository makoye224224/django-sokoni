import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { facebookAuthenticate } from '../store/actions/auth'
import queryString from 'query-string';

const Facebook = ({ facebookAuthenticate }) => {
    useEffect(() => {
        // Scroll to the top of the page after the route change
        window.scrollTo(0, 0);
      }, []);
      
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            facebookAuthenticate(state, code);
        }
    }, [location]);

    return (
        <div className='container'>
            <div class='jumbotron mt-5'>
                <h1 class='display-4'>Welcome to Sokoni Shopping Centre</h1>
                <p class='lead'>A shopping centre for all you need</p>
                <hr class='my-4' />
                <p>Click the Log In button</p>
                <Link class='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
            </div>
        </div>
    );
};

export default connect(null, { facebookAuthenticate })(Facebook);