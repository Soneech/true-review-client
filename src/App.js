import logo from './logo.svg';
import './App.css';
import Header from './component/main/Header';
import HomePage from './component/main/HomePage';
import LoginFrom from './component/auth/LoginForm';
import AuthService from './service/AuthService';
import RegistrationForm from './component/auth/RegistrationFrom';
import UsersPage from './component/user/UsersPage';
import UserProfilePage from './component/user/UserProfilePage';
import ReviewPage from './component/review/ReviewPage';
import ReviewsList from './component/review/ReviewsList';
import CreateReviewPage from './component/review/CreateReviewPage';
import UpdateCategoryPage from './component/category/UpdateCategoryPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Header /> 
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth/login" element={<LoginFrom />} />
              <Route path="/auth/registration" element={<RegistrationForm />} />
              <Route path="/users" element={<UsersPage />}/>
              <Route path="/users/:id" element={<UserProfilePage/>}></Route>
              <Route path="/reviews/:id" element={<ReviewPage/>}></Route>
              <Route path="/categories/:id/reviews" element={<ReviewsList/>}></Route>
              <Route path="/reviews/new" element={<CreateReviewPage/>}></Route>
              <Route path="/categories/:id/update" element={<UpdateCategoryPage/>}></Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
