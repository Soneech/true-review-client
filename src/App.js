import './css/App.css';
import'./css/Auth.css';
import './css/User.css';
import './css/Review.css';
import './css/Category.css';
import './css/Rating.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './component/main/Header';
import HomePage from './component/main/HomePage';
import LoginFrom from './component/auth/LoginForm';
import RegistrationForm from './component/auth/RegistrationFrom';
import UsersPage from './component/user/UsersPage';
import UserProfilePage from './component/user/UserProfilePage';
import ReviewPage from './component/review/ReviewPage';
import ReviewsList from './component/review/ReviewsList';
import CreateReviewPage from './component/review/CreateReviewPage';
import UpdateCategoryPage from './component/category/UpdateCategoryPage';
import CategoriesList from './component/category/CategoriesList';
import ItemsList from './component/review/ItemsList';
import ForbiddenPage from './component/auth/ForbiddenPage';


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
              <Route path="/categories/:id/items" element={<ItemsList forCategory={true}/>}></Route>
              <Route path="/users/:id/reviews" element={<ReviewsList forUser={true}/>}></Route>
              <Route path="/items/:id/reviews" element={<ReviewsList forItem={true}/>}></Route>
              <Route path="/reviews/new" element={<CreateReviewPage/>}></Route>
              <Route path="/categories/:id/update" element={<UpdateCategoryPage/>}></Route>
              <Route path="/categories" element={<CategoriesList/>}></Route>
              <Route path="/items" element={<ItemsList/>}></Route>
              <Route path="/access/error" element={<ForbiddenPage needAuth={true}/>}></Route>
              <Route path="/operations/error" element={<ForbiddenPage/>}></Route>
              
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
