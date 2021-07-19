import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { SearchOutlined } from "@material-ui/icons"
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {
  const [rooms, setrooms] = useState([])
  const [{user}, dispatch]= useStateValue()


  useEffect(() => {
   const unsubscribe= db.collection("rooms").onSnapshot((snapShot)=>(
      setrooms(snapShot.docs.map((doc)=>(
        {
          id: doc.id,
          data: doc.data() 
        }
      )))
    ))
  return ()=>{
    unsubscribe();
  }
   
  }, [])



  return (
    <div className="sidebar">
 
     

      <div className="sidebar_header">
      {/* <i class="fas fa-user-circle"></i> */}
      <Avatar src={user?.photoURL}/>

        <div className='sidebar_header_right'>

          <IconButton>
          <i class="far fa-circle"></i>
          </IconButton>

          <IconButton> 
            <i class="fas fa-comment-alt"></i>
            </IconButton>
          <IconButton><i class="fas fa-ellipsis-v"></i></IconButton>
       
        

        </div>
     

      </div>
      <div className="sidebar_search">
        <div className='sidebar_search_container'>
        <IconButton>
        <SearchOutlined/>
        </IconButton>
       
        <input placeholder='Search or start new chat' type='text' />
      </div>

        </div>
       

      <div className='sidebar_chats'>
        <SidebarChat addNewChat/>

        {
          rooms.map(room =>(
            <SidebarChat key={room.id} 
            id={room.id}
            name={room.data.name} 
            />
          ))
        }
        
      </div>
    </div>
  )
}

export default Sidebar
