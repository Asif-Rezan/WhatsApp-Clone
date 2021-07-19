import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar } from '@material-ui/core'
import { IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from "@material-ui/icons"
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

function Chat() {
  const [seed, setseed] = useState("");
  const [input, setinput] = useState("");
  const {roomId} = useParams();
  
  const [roomName, setroomName] = useState("");
  const [messages, setmessages] = useState([]);
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    if(roomId)
    {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
        setroomName(snapshot.data().name)
      ))

      db.collection('rooms').doc(roomId).collection("messages").orderBy('timestamp','asc').onSnapshot(snapshot=>(
        setmessages(snapshot.docs.map(doc => doc.data()))
      ))


    }
   
  }, [roomId])



  const sendMessage=(e)=>
  {
    e.preventDefault();
    
    console.log("You typed >>>",input);

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()



    })

    setinput("");

  }

  useEffect(() => {
    setseed(Math.floor(Math.random()*5000))
  }, [roomId])


  return (
    <div className='chat'>
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="chat_header_info">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {
              new Date(
                messages[messages.length-1]?.timestamp?.toDate()
              ).toUTCString()

            }
          </p>
        </div>

        <div className="chat_header_right">
        <IconButton>
        <SearchOutlined/>
        </IconButton>

        <IconButton>
         <AttachFile/>
        </IconButton>

        <IconButton>
           <MoreVert/>
        </IconButton>

        </div>

      </div>

      <div className="chat_body">
        {messages.map(message=>(

        <p className={`chat_message ${ message.name===user.displayName && "chat_reciver"} `}>
        <span className='chat_name'>
            {message.name}
          </span>
          {message.message}

          <span className="chat_timestamp">
           {new Date(message.timestamp?.toDate()).toUTCString()}
          </span>
          
        </p>

        ))}
       
      </div>

      <div className="chat_footer">
        <InsertEmoticon/>
         <form action="">
           <input value={input} onChange={(e)=>{setinput(e.target.value)}} type="text" placeholder="Type a message" />
           <button onClick={sendMessage} type="submit">Send a message</button>
         </form>
        <Mic/>


      </div>
      
    </div>
  )
}

export default Chat
