import { auth, provider } from '../../config/firebase';
import { SET_USER } from '../../context/action-types';
import { useStateValue } from '../../context/StateProvider'
import './Auth.css'
import logo from './img/google-login-button.png'
const Auth = () => {
  const [{ user}, dispatch] = useStateValue();

  const signIn = e =>{
    // console.log('😆')
    e.preventDefault()
    auth.signInWithPopup(provider)
      .then(result => {
        // console.log(result)
        dispatch({
          type: SET_USER,
          user: result.user
        })
        
        // localStorage.setItem('token',{token:result.user.refreshToken,name: result.user.displayName,photoURL:result.user.photoURL})
      })
      .catch(error=> {
  console.log(error);
      })
    }
   
  return (
    <div className="auth">
      <img className="auth__logo" onClick = {signIn} src={logo} alt="logo"/>
    </div>
  )
}

export default Auth
