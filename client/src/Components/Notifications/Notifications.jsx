import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { NotificationTile } from './NotificationTile.jsx';

export function Notifications (props) {
// console.log("🚀 ~ file: Notifications.jsx:4 ~ Notifications ~ props:", props.userId)
const userId = props.userId;
let incomingRequests = props.incomingRequests;
console.log("🚀 ~ file: Notifications.jsx:9 ~ Notifications ~ incomingRequests:", incomingRequests)
const [friendData, setFriendData] = useState([])


const getFriendInfo = async (list) => {
  try {
    const requests = list.map(name => axios.post('/searchFriend', {searchQuery: name}));
    const results = await Promise.all(requests);
    const friendInfo = results.map(result => result.data);
    setFriendData(friendInfo);
  }
  catch (err) {
    console.error(err);
  }
}

const acceptRequest = (friendName) => {
  // console.log('accepting friend request', friendName);
  let acceptObj = {
    userId: userId,
    friendId: friendName
  }
  axios.post('/acceptRequest', acceptObj)
  .then(() => {
    console.log('accepted friend request');
    // const newFriendData = friendData.filter((friend) => friend !== friendName);
    // setFriendData(newFriendData);

    //need to figure out why state isn't automatically refreshing
    // window.location.reload(false);
  })
  .catch((err) => {
    console.error(err);
  })

}

useEffect(() => {
  getFriendInfo(incomingRequests);
},[incomingRequests]);


  return (
    <div>
      <h4>Notifications</h4>
      {friendData?.map((friend, index) => {
        return (
            <NotificationTile key={index} userId={friend.userId} thumbnailUrl={friend.thumbnailUrl} acceptRequest={acceptRequest} />
          )
      })}
    </div>
  )
}