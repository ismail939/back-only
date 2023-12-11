import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/mainpages/Home';
import Login from './pages/Login';
import SignUp from './pages/Sign-up';
import WorkSpaces from './pages/mainpages/WorkSpaces';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import CreateOffer from './pages/CreateOffer';
import OfferList from './pages/mainpages/OfferList';
import Dashboard from './pages/AdminPages/Dashboard';
import DiscoverAdmin from './pages/AdminPages/DiscoverAdmin';
import OfferAdmin from './pages/AdminPages/OfferAdmin';
import DashboardProfile from './pages/DashboardProfile';
import CreateFullWorkSpace from './pages/CreateFullWorkSpace';
import RequireAuth from './components/RequireAuth';
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='login' element={<Login />}></Route>
        <Route path='sign-up' element={<SignUp />}></Route>
        <Route path='workspaces' element={<WorkSpaces />}></Route>
        <Route path='offers' element={<OfferList />}></Route>
        <Route element={<RequireAuth />} >
          <Route path='createworkspace' element={<CreateFullWorkSpace />}></Route>
          <Route path='dashboardProfile' element={<DashboardProfile />}></Route>
          <Route path='createOffer' element={<CreateOffer />}></Route>
          <Route path='discoverEdit' element={<DiscoverAdmin />}></Route>
          <Route path='offerEdit' element={<OfferAdmin />}></Route>
        </Route>
        <Route path='dashboard' element={<Dashboard />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
