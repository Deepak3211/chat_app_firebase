import './ChatSection.css';
import {GrEmoji } from 'react-icons/gr';
import { useEffect, useRef, useState } from 'react';
import db, { auth }  from '../../config/firebase';
import { useStateValue } from '../../context/StateProvider';
import firebase from 'firebase/app'
import Message from './Message';
import { v4 as uuidv4 } from 'uuid';
import {FiSend , FiLogOut} from 'react-icons/fi'
import { SET_USER } from '../../context/action-types';
const ChatSection = () => {

const [{ user },dispatch ] = useStateValue();
// console.log(user);
const [input, setInput] = useState('');
const [message, setMessage] = useState([]);
const messageRef = useRef(null)

const scrollToBottom = () => {
messageRef.current?.scrollIntoView({behavior: 'smooth'})
}
useEffect(() => {
scrollToBottom()
},[message])
useEffect(() => {
db.collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
setMessage(snapshot.docs.map(doc => doc.data()))

})
},[])

const sendMsg = e => {
e.preventDefault();
if (input) {

db.collection('messages').doc(uuidv4()).set({
id: uuidv4(),
msg: input,
name: user.displayName,
photoURL: user.photoURL,
timestamp: firebase.firestore.FieldValue.serverTimestamp(),

})
setInput('')

}
}

const logOut = () => {
auth.signOut()
dispatch({
type: SET_USER,
user: null
})
}

return (
<div className='chatSection'>
<div className="chat__header">
<div className="userProfile">

<img className = 'header__avatar' src={user.photoURL} alt="profilepic"/>
<h4> Hello,{user.displayName}</h4>
</div>
<div className="signOut">
<button onClick={logOut}><FiLogOut /> </button>
<h4>SignOut</h4>
</div>
</div>
{/* <h2>SuperChat</h2> */}
<div className="chat">
{message && message.map(msg => (
<Message key={msg.id} name={msg.name} photoURL = {msg.photoURL} message={msg.msg} timestamp = {msg.timestamp} />
))}
<div ref = {messageRef}></div>
</div>
<div className="chat__input">
<form onSubmit={sendMsg}>
<GrEmoji className = 'chat__icon'/>

<input type="text"
value = {input}
onChange={e=>{setInput(e.target.value)}}

placeholder='Type a message' />
<button type="submit"><FiSend /></button>
</form>   
</div>
</div>
)
}

export default ChatSection
