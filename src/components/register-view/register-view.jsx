import React, { useState } from 'react';
import PropTypes from 'prop-types';

import  './register-view.scss';


export function RegisterView(props){
    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthDate, setBirthDate ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, firstName, lastName, email, birthDate);    
    };

    return (
        <div className="register">
            <form>
                <label htmlFor="username">Username: </label>
                <input type="text" value={username} id="username" name="username" placeholder="jd01" minLength="5" maxLength="20" onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password: </label>
                <input type="password" value={password} id="password" id="password" name="password" minLength="5" maxLength="20" onChange={e => setPassword(e.target.value)} />
                <label htmlFor="firstName">First Name: </label>
                <input type="text" value={firstName} id="firstName" name="firstName" placeholder="John" minLength="2" maxLength="20" onChange={e => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Last Name: </label>
                <input type="text" value={lastName} id="lastName" name="lastName" placeholder="Doe" minLength="2" maxLength="20" onChange={e => setLastName(e.target.value)} />
                <label htmlFor="email">Email Address: </label>
                <input type="text" value={email} id="email" name="lastName" placeholder="jd01@johndoe.com" minLength="5" maxLength="20" onChange={e => setEmail(e.target.value)} />
                <label htmlFor="birthDate">Birthday: </label>
                <input type="date" value={birthDate} id="birthDate" name="birthDate" placeholder="2021-07-22" min="1900-01-01" max="2022-12-31" onChange={e => setBirthDate(e.target.value)} />
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
            <button className="cursor-pointer" onClick={() => { props.onBackClick(false); }}>Back</button>
        </div>
    );

}

RegisterView.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    birthdate: PropTypes.date,
}