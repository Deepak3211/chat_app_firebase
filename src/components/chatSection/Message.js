import { useStateValue } from '../../context/StateProvider'
import './Message.css'
const Message = ({ message, uid, timestamp, photoURL,name }) => {
  const [{ user }] = useStateValue();
  // const msgClass = name === user.displayName ? 'send' : 'received'
  return (
    <div className={`chat__message ${name === user.displayName &&'chat__receiver'}`}>

      <img className = 'profilepic' src={photoURL } alt = 'profilepic' />
        {/* <p className = 'chat__username'>{name}</p> */}
      <div className = 'chat__text'>{message}
        </div>
      <p className='chat__timestamp'>{new Date(timestamp?.toDate()).toUTCString()}
        </p>
    </div>
  )
}

export default Message
