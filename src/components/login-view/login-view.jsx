import React, { useState } from 'react';

import  './login-view.scss';


export function LoginView(props){
    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* 
            Send a request to the server for authentication
            then call this.props.onLoggedIn(username)
        */
        props.onLoggedIn(username);        
    };

    return (
        <div className="login">
            <form>
                <label htmlFor="username">Username: </label>
                <input type="text" value={username} id="username" name="username" placeholder="jd01" minLength="5" maxLength="20" onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input type="password" value={password} id="password" id="password" name="password" minLength="5" maxLength="20" onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
            <button className="cursor-pointer" onClick={() => { props.onRegisterClick(true); }}>Register</button>
        </div>
    );

}