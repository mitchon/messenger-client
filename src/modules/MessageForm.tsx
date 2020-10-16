import React, {useRef} from 'react';
import {gql, useMutation} from '@apollo/client';

export const MessageForm = () => {
    const Input = useRef('');

    const SendMessage = gql`
    mutation ($ID: Int!, $text: String!){
        sendMessage(input: {authorID: $ID, text: $text}) {
          id
          text
        }
    }`;

    const [sendMessage] = useMutation(SendMessage);

    const buttonHandler = () => {
        if(Input.current.value) {
            sendMessage({
                variables : {
                    ID: Number(localStorage.getItem('UserID')),
                    text: Input.current.value
                }
            }).then(()=>{Input.current.value = ""});
        }
    }

    return (
        <>
            <input
                type="textarea"
                placeholder="Type your message in..."
                ref={Input}
            />
            <button onClick={() => {buttonHandler()}}>Send!</button>
        </>
    )
}