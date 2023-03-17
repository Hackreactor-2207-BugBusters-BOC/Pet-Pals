import React, {useState, useEffect} from 'react';
import "../../../../client/chat.css";
import {socket} from '../../socket.js'

export default function Message(props) {
  const [newMessage, setNewMessage] = useState({
    sender:props.sender,
    content:'',
    type:'text',
    conversationId:props.conversationID,
    test:true
  });
  const [message, setMessage] = useState('');
  const handleChange = (event) => {
    setMessage(event.target.value)

}
  const handleKeyDown =  (event) => {
    if (event.key === 'Enter') {
      console.log(event.target.value)
      setNewMessage({...newMessage,content:event.target.value})
    }
  };
  useEffect(() => {
    console.log(`sender inside message is equal to :${props.sender}`);
    setNewMessage(prevNewMessage => ({
      ...prevNewMessage,
      sender: props.sender
    }));
  },[props.sender])
  useEffect(()=>{
    console.log(`new message is equal to ${JSON.stringify(newMessage)}`);
    if(newMessage.content){
      socket.emit('new-message', newMessage);
    }

  },[newMessage]);
  return (
    <div className = 'user_input'>
       <textarea
            class = "write_message"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
         />
    </div>
  )
}