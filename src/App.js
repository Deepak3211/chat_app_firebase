import './App.css';
import Auth from './components/auth/Auth';
import ChatSection from './components/chatSection/ChatSection';
import { useStateValue } from './context/StateProvider';


function App() {
  const [{ user}, dispatch] = useStateValue()
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
