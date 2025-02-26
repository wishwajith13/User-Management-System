import { useNavigate } from 'react-router-dom';
import './App.css';
import WelcomePage from './WelcomePage/WelcomePage';

function App() {

  const navigate = useNavigate()

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to User Management System</h1>
        <button className='users-button' onClick={()=>navigate('/users')}>Users</button>
        <br></br>
        <WelcomePage/>
      </header>
    </div>
  );
}

export default App;
