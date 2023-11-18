import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/mainpages/Home';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';
import WorkSpaces from './pages/mainpages/WorkSpaces';
import Footer from './components/Footer';
import CreateCoworkingSpace from './pages/CreateCoworkingSpace';
import PageNotFound from './pages/PageNotFound';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='sign-up' element={<SignUp />}></Route>
        <Route path='workspaces' element={<WorkSpaces />}></Route>
        <Route path='createworkspace' element={<CreateCoworkingSpace />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
