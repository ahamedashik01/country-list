import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';


const LogIn = () => {
    const { setUser, setError, saveUser, setIsLoading, signInUsingGoogle } = useAuth();
    const location = useLocation();
    let history = useHistory();
    const redirect_uri = location.state?.from || '/home'

    const UseSignInUsingGoogle = () => {
        setIsLoading(true)
        signInUsingGoogle()
            .then(result => {
                const user = result.user;
                setUser(user);
                // save user to the database
                saveUser(user.email, user.displayName, "PUT");
                history.push(redirect_uri);
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <>
            <div className='mt-5 w-50 mx-auto p-5 border border-1'>
                <div className='text-start'>
                    <Link to="/home">
                        <button className='mt-1 btn btn-primary'><i className="me-2 fas fa-chevron-left"></i>Back</button>
                    </Link>
                </div>
                <h2 className='mt-5'>Login</h2>
                <div className="mt-5">
                    <button onClick={UseSignInUsingGoogle} className="btn btn-primary shadow  rounded-pill px-4 text-white"><i className="fab fa-google me-3"> Google Sign In</i></button>
                    <p className='mt-5' >Need sign in for continue</p>
                    <small> use email: 'hitachiuzumakhi@gmail.com' and pass: 'country-list-1234' for super admin login</small>
                </div>
            </div >
        </>
    );
};

export default LogIn;