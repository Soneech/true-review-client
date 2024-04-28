import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import HomePage from './component/HomePage';
import LoginFrom from './component/LoginForm';
import AuthService from './service/AuthService';
import RegistrationForm from './component/RegistrationFrom';
import UsersPage from './component/UsersPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  const isAuthenticated = () => {
    return AuthService.checkAuthentication();
  } 

  return (
    <div className="App">
      <BrowserRouter>
            <Header /> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/login" element={<LoginFrom />} />
              <Route path="/auth/registration" element={<RegistrationForm />} />
              <Route path="/users" element={<UsersPage />}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
