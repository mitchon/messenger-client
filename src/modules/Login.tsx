import React, {useRef} from 'react';
import {gql, useMutation} from '@apollo/client';

export const Login = ({loginHandler}) => {
    const loginInput = useRef('');
    const passwordInput = useRef('');

    const SignIn = gql`
    mutation ($login: String!, $password: String!){
        signIn(input: { login: $login, password: $password }) {
          id
          login
        }
      }
  `;

    const [signIn] = useMutation(SignIn);

    const buttonHandler = (): any => {
        if (loginInput.current.value && passwordInput.current.value)
        {
            signIn({variables: {
                login: loginInput.current.value,
                password: passwordInput.current.value
            }}).then(res => {
                if (res.data.signIn) {
                    localStorage.setItem('UserID', res.data.signIn.id);
                    loginHandler(true);
                }
                else alert("Incorrect login or password")
            })
        }
        else {
            alert('Incorrect login or password');
        }
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Login"
                    ref={loginInput}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    ref={passwordInput}
                />
            </div>
            <button onClick={buttonHandler}>Сюда жми!</button>
        </>
    )
}
