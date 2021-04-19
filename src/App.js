import { useEffect } from 'react';
import './App.css';
import Auth from './components/auth/Auth';
import ChatSection from './components/chatSection/ChatSection';
import { auth } from './config/firebase';
import { SET_USER } from './context/action-types';
import { useStateValue } from './context/StateProvider';


function App() {
  const [{ user }, dispatch] = useStateValue()
  
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // console.log(userAuth);
        dispatch({
          type: SET_USER,
          user: {
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL : userAuth.photoURL
          }
        })

      }
      
      else {
        dispatch({
          type: SET_USER,
          user: null
        })
      }
    })
  }, [dispatch])
  return (
    <div className='app'>

      {!user ? (

        <Auth />
      ) : (
          
     <ChatSection /> 
      )}
    </div>
  );
}

export default App;
