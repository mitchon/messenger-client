import React, {useEffect, useState} from 'react';
import {gql, useQuery, useSubscription} from '@apollo/client';
import { MessageForm } from './MessageForm';

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  
    const GetMsg = gql`
      query {
        messages {
          id
          text
          author {
            login
          }
        }
      }
    `;

    const GetNewMsg = gql`
      subscription {
        newMessage {
          id
          text
          author {
            login
          }
        }
      }
    `;

    const {loading, error, data: msglist} = useQuery(GetMsg);
    const {data: newMsg, error: errget} = useSubscription(GetNewMsg);

    useEffect(()=> {
      if (errget) console.log('error');
      if (newMsg && !errget) setMessages(previous => [...previous, newMsg?.newMessage])
    }, [newMsg, errget])

    useEffect(() => {
      if (msglist && !error) setMessages(msglist.messages);
    }, [msglist, error]);

    const statusShow = () => {
      if(error) return <p>error</p>
      else if(loading) return <p>loading</p>
    }

    return (
      <div>
        {statusShow()}
        <ul>{messages.map((message) : any => {
          return <li key={message?.id}>{message?.text + " " + message?.author?.login}</li>
        })}
        </ul>
        <MessageForm />
      </div>
    )
}