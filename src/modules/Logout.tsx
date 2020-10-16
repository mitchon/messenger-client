import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'

export const Logout = ({loginHandler}) => {
    const [flag, setFlag] = useState(false);

    const handler = () => {
        localStorage.removeItem('UserID');
        loginHandler(false);
        setFlag(true);     
    }



    return (
        <>
            <button onClick={() => {
                handler();
            }}>
                Log out
            </button>
            {(flag) ? <Redirect to='/' /> : null}
        </>
    )
}