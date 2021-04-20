import { useStateValue } from '../../context/StateProvider'
import './Message.css'
const Message = ({ message, timestamp, photoURL,email }) => {
const [{ user }] = useStateValue();
// const msgClass = name === user.displayName ? 'send' : 'received'
return (
<div className={`chat__message ${email === user.email &&'chat__receiver'}`}>

<img className = 'profilepic' src={photoURL } alt = 'profilepic' />
{/* <p className = 'chat__username'>{name}</p> */}
<div className = 'chat__text'>{message}
</div>
<p className='chat__timestamp'>{timestamp}
</p>
</div>
)
}

export default Message
